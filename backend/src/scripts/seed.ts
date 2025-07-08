import { CreateInventoryLevelInput, ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createApiKeysWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function seedDemoData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const storeModuleService = container.resolve(Modules.STORE);

  const countries = ["gb", "de", "dk", "se", "fr", "es", "it"];

  logger.info("Seeding store data...");
  const [store] = await storeModuleService.listStores();
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultSalesChannel.length) {
    // create the default sales channel
    const { result: salesChannelResult } = await createSalesChannelsWorkflow(
      container
    ).run({
      input: {
        salesChannelsData: [
          {
            name: "Default Sales Channel",
          },
        ],
      },
    });
    defaultSalesChannel = salesChannelResult;
  }

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        supported_currencies: [
          {
            currency_code: "eur",
            is_default: true,
          },
          {
            currency_code: "usd",
          },
        ],
        default_sales_channel_id: defaultSalesChannel[0].id,
      },
    },
  });
  logger.info("Seeding region data...");
  
  // Check if Europe region already exists
  let region;
  const existingRegions = await query.graph({
    entity: "region",
    fields: ["id", "name"],
    filters: { name: "Europe" },
  });
  
  if (existingRegions.data.length > 0) {
    logger.info("Europe region already exists, skipping creation...");
    region = existingRegions.data[0];
  } else {
    const { result: regionResult } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "Europe",
            currency_code: "eur",
            countries,
            payment_providers: ["pp_system_default"],
          },
        ],
      },
    });
    region = regionResult[0];
  }
  logger.info("Finished seeding regions.");

  logger.info("Seeding tax regions...");
  
  // Check if tax regions already exist
  const existingTaxRegions = await query.graph({
    entity: "tax_region",
    fields: ["id", "country_code"],
  });
  
  if (existingTaxRegions.data.length === 0) {
    await createTaxRegionsWorkflow(container).run({
      input: countries.map((country_code) => ({
        country_code,
        provider_id: "tp_system"
      })),
    });
  } else {
    logger.info("Tax regions already exist, skipping creation...");
  }
  
  logger.info("Finished seeding tax regions.");

  logger.info("Seeding stock location data...");
  const { result: stockLocationResult } = await createStockLocationsWorkflow(
    container
  ).run({
    input: {
      locations: [
        {
          name: "European Warehouse",
          address: {
            city: "Copenhagen",
            country_code: "DK",
            address_1: "",
          },
        },
      ],
    },
  });
  const stockLocation = stockLocationResult[0];

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_provider_id: "manual_manual",
    },
  });

  logger.info("Seeding fulfillment data...");
  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
    type: "default"
  })
  let shippingProfile = shippingProfiles.length ? shippingProfiles[0] : null

  if (!shippingProfile) {
    const { result: shippingProfileResult } =
    await createShippingProfilesWorkflow(container).run({
      input: {
        data: [
          {
            name: "Default Shipping Profile",
            type: "default",
          },
        ],
      },
    });
    shippingProfile = shippingProfileResult[0];
  }

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "European Warehouse delivery",
    type: "shipping",
    service_zones: [
      {
        name: "Europe",
        geo_zones: [
          {
            country_code: "gb",
            type: "country",
          },
          {
            country_code: "de",
            type: "country",
          },
          {
            country_code: "dk",
            type: "country",
          },
          {
            country_code: "se",
            type: "country",
          },
          {
            country_code: "fr",
            type: "country",
          },
          {
            country_code: "es",
            type: "country",
          },
          {
            country_code: "it",
            type: "country",
          },
        ],
      },
    ],
  });

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_set_id: fulfillmentSet.id,
    },
  });

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Standard Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Ship in 2-3 days.",
          code: "standard",
        },
        prices: [
          {
            currency_code: "usd",
            amount: 10,
          },
          {
            currency_code: "eur",
            amount: 10,
          },
          {
            region_id: region.id,
            amount: 10,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
      {
        name: "Express Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Express",
          description: "Ship in 24 hours.",
          code: "express",
        },
        prices: [
          {
            currency_code: "usd",
            amount: 10,
          },
          {
            currency_code: "eur",
            amount: 10,
          },
          {
            region_id: region.id,
            amount: 10,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
    ],
  });
  logger.info("Finished seeding fulfillment data.");

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: [defaultSalesChannel[0].id],
    },
  });
  logger.info("Finished seeding stock location data.");

  logger.info("Seeding publishable API key data...");
  const { result: publishableApiKeyResult } = await createApiKeysWorkflow(
    container
  ).run({
    input: {
      api_keys: [
        {
          title: "Webshop",
          type: "publishable",
          created_by: "",
        },
      ],
    },
  });
  const publishableApiKey = publishableApiKeyResult[0];

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [defaultSalesChannel[0].id],
    },
  });
  logger.info("Finished seeding publishable API key data.");

  logger.info("Seeding product data...");

  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: [
        {
          name: "Tatranský profil",
          handle: "tatransky-profil",
          is_active: true,
          description: "Kvalitné drevené profily z Vysokých Tatier pre obklady stien a fasády",
        },
        {
          name: "Terásové dosky",
          handle: "terasove-dosky", 
          is_active: true,
          description: "Dosky pre terasy a vonkajšie podlahy",
        },
        {
          name: "Fasádne dosky",
          handle: "fasadne-dosky",
          is_active: true,
          description: "Obklady vonkajších stien",
        },
        {
          name: "Podlahové dosky",
          handle: "podlahove-dosky",
          is_active: true,
          description: "Masívne drevené podlahy",
        },
        {
          name: "Drevo",
          handle: "drevo",
          is_active: true,
          description: "Rôzne druhy dreva a drevené produkty",
        },
        {
          name: "Merch",
          handle: "merch",
          is_active: true,
        },
      ],
    },
  });

  await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: "SHOU SUGI BAN + kartáč + olej",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Tatranský profil")!.id,
          ],
          description:
            "Tradičná japonská technika spracowania dreva. Prémiové opalené drevené dosky s kartáčovaným povrchom a olejovaným finišom pre exteriérovú fasádu.",
          handle: "shou-sugi-ban-kartac-olej",
          weight: 2800,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://cdn.sellio.net/vendors/phpThumb/phpThumb.php?w=350&h=240&far=0&src=/uploads/96/categories/_kg12836.jpg",
            },
          ],
          options: [
            {
              title: "Rozmer",
              values: ["20×140", "20×146", "25×146"],
            },
            {
              title: "Materiál",
              values: ["Sibírsky smrek AB", "Céder A", "Sibírsky smrekovec"],
            },
            {
              title: "Typ",
              values: ["SHOU SUGI BAN + kartáč + olej", "extra + olej"],
            },
            {
              title: "Dostupnosť",
              values: ["Na sklade", "Do mesiaca", "Na objednávku"],
            },
          ],
          variants: [
            {
              title: "20×140 / Sibírsky smrek AB / SHOU SUGI BAN + kartáč + olej",
              sku: "WOOD-20X140-SIBSMREK-SSBAN",
              options: {
                Rozmer: "20×140",
                Materiál: "Sibírsky smrek AB",
                Typ: "SHOU SUGI BAN + kartáč + olej",
                Dostupnosť: "Na sklade",
              },
              prices: [
                {
                  amount: 4600,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "20×146 / Sibírsky smrek AB / SHOU SUGI BAN + kartáč + olej",
              sku: "WOOD-20X146-SIBSMREK-SSBAN",
              options: {
                Rozmer: "20×146",
                Materiál: "Sibírsky smrek AB",
                Typ: "SHOU SUGI BAN + kartáč + olej",
                Dostupnosť: "Do mesiaca",
              },
              prices: [
                {
                  amount: 4900,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "20×140 / Sibírsky smrekovec / extra + olej",
              sku: "WOOD-20X140-SIBSMREKOVEC-EXTRA",
              options: {
                Rozmer: "20×140",
                Materiál: "Sibírsky smrekovec",
                Typ: "extra + olej",
                Dostupnosť: "Na sklade",
              },
              prices: [
                {
                  amount: 6590,
                  currency_code: "eur",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Bangkirai terásové dosky",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Terásové dosky")!.id,
          ],
          description:
            "Prémiové tropické drevo pre terasy. Vysoká odolnosť proti vlhkosti a mechanickému poškodeniu. Prírodná farba a štruktúra.",
          handle: "bangkirai-terasove-dosky",
          weight: 3200,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://cdn.sellio.net/vendors/phpThumb/phpThumb.php?w=350&h=240&far=0&src=/uploads/96/categories/_kg12836.jpg",
            },
          ],
          options: [
            {
              title: "Rozmer",
              values: ["25×140", "32×140", "45×140"],
            },
            {
              title: "Materiál",
              values: ["Bangkirai A", "Bangkirai AB"],
            },
            {
              title: "Typ",
              values: ["prírodný", "olejovaný", "antislip"],
            },
            {
              title: "Dostupnosť",
              values: ["Na sklade", "Do mesiaca", "Na objednávku"],
            },
          ],
          variants: [
            {
              title: "25×140 / Bangkirai A / prírodný",
              sku: "WOOD-25X140-BANGKIRAI-PRIRODNY",
              options: {
                Rozmer: "25×140",
                Materiál: "Bangkirai A",
                Typ: "prírodný",
                Dostupnosť: "Na sklade",
              },
              prices: [
                {
                  amount: 8900,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "32×140 / Bangkirai A / olejovaný",
              sku: "WOOD-32X140-BANGKIRAI-OLEJ",
              options: {
                Rozmer: "32×140",
                Materiál: "Bangkirai A",
                Typ: "olejovaný",
                Dostupnosť: "Do mesiaca",
              },
              prices: [
                {
                  amount: 12500,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "45×140 / Bangkirai AB / antislip",
              sku: "WOOD-45X140-BANGKIRAI-ANTISLIP",
              options: {
                Rozmer: "45×140",
                Materiál: "Bangkirai AB",
                Typ: "antislip",
                Dostupnosť: "Na objednávku",
              },
              prices: [
                {
                  amount: 15800,
                  currency_code: "eur",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Cédrové fasádne dosky",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Fasádne dosky")!.id,
          ],
          description:
            "Luxusné cédrové dosky pre fasády s výnimočnou odolnosťou a aromatickými vlastnosťami. Prirodzene odpudzuje hmyz a má dlhú životnosť.",
          handle: "cedrove-fasadne-dosky",
          weight: 2100,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://cdn.sellio.net/vendors/phpThumb/phpThumb.php?w=350&h=240&far=0&src=/uploads/96/categories/_kg12836.jpg",
            },
          ],
          options: [
            {
              title: "Rozmer",
              values: ["18×140", "20×140", "25×146"],
            },
            {
              title: "Materiál",
              values: ["Céder A", "Céder AB", "Červený céder"],
            },
            {
              title: "Typ",
              values: ["prirodzený", "kartáčovaný", "extra hladký"],
            },
            {
              title: "Dostupnosť",
              values: ["Na sklade", "Do mesiaca", "Na objednávku"],
            },
          ],
          variants: [
            {
              title: "18×140 / Céder A / prirodzený",
              sku: "WOOD-18X140-CEDER-PRIRODNY",
              options: {
                Rozmer: "18×140",
                Materiál: "Céder A",
                Typ: "prirodzený",
                Dostupnosť: "Na sklade",
              },
              prices: [
                {
                  amount: 11000,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "20×140 / Červený céder / kartáčovaný",
              sku: "WOOD-20X140-CERVCEDER-KARTAC",
              options: {
                Rozmer: "20×140",
                Materiál: "Červený céder",
                Typ: "kartáčovaný",
                Dostupnosť: "Do mesiaca",
              },
              prices: [
                {
                  amount: 13500,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "25×146 / Céder AB / extra hladký",
              sku: "WOOD-25X146-CEDER-EXTRA",
              options: {
                Rozmer: "25×146",
                Materiál: "Céder AB",
                Typ: "extra hladký",
                Dostupnosť: "Na objednávku",
              },
              prices: [
                {
                  amount: 9800,
                  currency_code: "eur",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Dubové masívne podlahy",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Podlahové dosky")!.id,
          ],
          description:
            "Prémiové dubové podlahy z masívneho dreva. Nadčasová elegancia a výnimočná odolnosť pre interiérovú použitie.",
          handle: "dubove-masivne-podlahy",
          weight: 2500,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://cdn.sellio.net/vendors/phpThumb/phpThumb.php?w=350&h=240&far=0&src=/uploads/96/categories/_kg12836.jpg",
            },
          ],
          options: [
            {
              title: "Rozmer",
              values: ["15×140", "18×140", "22×180"],
            },
            {
              title: "Materiál",
              values: ["Dub A", "Dub AB", "Dub rustik"],
            },
            {
              title: "Typ",
              values: ["prirodzený", "olejovaný", "lakovaný matný", "lakovaný lesklý"],
            },
            {
              title: "Dostupnosť",
              values: ["Na sklade", "Do mesiaca", "Na objednávku"],
            },
          ],
          variants: [
            {
              title: "15×140 / Dub A / olejovaný",
              sku: "WOOD-15X140-DUB-OLEJ",
              options: {
                Rozmer: "15×140",
                Materiál: "Dub A",
                Typ: "olejovaný",
                Dostupnosť: "Na sklade",
              },
              prices: [
                {
                  amount: 12000,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "18×140 / Dub AB / lakovaný matný",
              sku: "WOOD-18X140-DUB-LAKMAT",
              options: {
                Rozmer: "18×140",
                Materiál: "Dub AB",
                Typ: "lakovaný matný",
                Dostupnosť: "Na sklade",
              },
              prices: [
                {
                  amount: 9500,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "22×180 / Dub rustik / prirodzený",
              sku: "WOOD-22X180-DUB-PRIRODNY",
              options: {
                Rozmer: "22×180",
                Materiál: "Dub rustik",
                Typ: "prirodzený",
                Dostupnosť: "Do mesiaca",
              },
              prices: [
                {
                  amount: 8500,
                  currency_code: "eur",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Smrekové konštrukčné hranoly",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Drevo")!.id,
          ],
          description:
            "Kvalitné smrekové konštrukčné hranoly pre stavebné účely. Sušené a impregnované drevo vhodné pre rôzne konštrukčné aplikácie.",
          handle: "smrekove-konstrukcne-hranoly",
          weight: 4500,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://cdn.sellio.net/vendors/phpThumb/phpThumb.php?w=350&h=240&far=0&src=/uploads/96/categories/_kg12836.jpg",
            },
          ],
          options: [
            {
              title: "Rozmer",
              values: ["40×60", "50×80", "60×120", "80×160"],
            },
            {
              title: "Materiál",
              values: ["Smrek SI", "Smrek KVH", "Smrek C24"],
            },
            {
              title: "Typ",
              values: ["surový", "impregnovaný", "hoblovaný"],
            },
            {
              title: "Dostupnosť",
              values: ["Na sklade", "Do mesiaca", "Na objednávku"],
            },
          ],
          variants: [
            {
              title: "40×60 / Smrek SI / impregnovaný",
              sku: "WOOD-40X60-SMREK-IMPREG",
              options: {
                Rozmer: "40×60",
                Materiál: "Smrek SI",
                Typ: "impregnovaný",
                Dostupnosť: "Na sklade",
              },
              prices: [
                {
                  amount: 1800,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "50×80 / Smrek KVH / hoblovaný",
              sku: "WOOD-50X80-SMREK-HOBLOVANY",
              options: {
                Rozmer: "50×80",
                Materiál: "Smrek KVH",
                Typ: "hoblovaný",
                Dostupnosť: "Na sklade",
              },
              prices: [
                {
                  amount: 2200,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "80×160 / Smrek C24 / surový",
              sku: "WOOD-80X160-SMREK-SUROVY",
              options: {
                Rozmer: "80×160",
                Materiál: "Smrek C24",
                Typ: "surový",
                Dostupnosť: "Do mesiaca",
              },
              prices: [
                {
                  amount: 4200,
                  currency_code: "eur",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Teak terásové dosky Premium",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Terásové dosky")!.id,
          ],
          description:
            "Najkvalitnejšie teak terásové dosky s výnimočnou odolnosťou voči poveternostným vplyvom. Luxusný vzhľad a dlhá životnosť.",
          handle: "teak-terasove-dosky-premium",
          weight: 2800,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://cdn.sellio.net/vendors/phpThumb/phpThumb.php?w=350&h=240&far=0&src=/uploads/96/categories/_kg12836.jpg",
            },
          ],
          options: [
            {
              title: "Rozmer",
              values: ["20×140", "25×140", "30×140"],
            },
            {
              title: "Materiál",
              values: ["Teak Premium", "Teak A", "Teak FAS"],
            },
            {
              title: "Typ",
              values: ["prirodzený", "olejovaný", "smooth", "antislip"],
            },
            {
              title: "Dostupnosť",
              values: ["Na sklade", "Do mesiaca", "Na objednávku"],
            },
          ],
          variants: [
            {
              title: "20×140 / Teak Premium / olejovaný",
              sku: "WOOD-20X140-TEAK-OLEJ",
              options: {
                Rozmer: "20×140",
                Materiál: "Teak Premium",
                Typ: "olejovaný",
                Dostupnosť: "Na sklade",
              },
              prices: [
                {
                  amount: 18000,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "25×140 / Teak A / antislip",
              sku: "WOOD-25X140-TEAK-ANTISLIP",
              options: {
                Rozmer: "25×140",
                Materiál: "Teak A",
                Typ: "antislip",
                Dostupnosť: "Do mesiaca",
              },
              prices: [
                {
                  amount: 16500,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "30×140 / Teak FAS / prirodzený",
              sku: "WOOD-30X140-TEAK-PRIRODNY",
              options: {
                Rozmer: "30×140",
                Materiál: "Teak FAS",
                Typ: "prirodzený",
                Dostupnosť: "Na objednávku",
              },
              prices: [
                {
                  amount: 14500,
                  currency_code: "eur",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Smrekové dosky kartáčované",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Tatranský profil")!.id,
          ],
          description:
            "Kvalitný smrekový profil kartáčovaný povrch zo Sibírskeho smreka. Ideálny pre obklady a fasády.",
          handle: "smrekove-dosky-kartacovane",
          weight: 2500,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://cdn.sellio.net/vendors/phpThumb/phpThumb.php?w=350&h=240&far=0&src=/uploads/96/categories/_kg12836.jpg",
            },
          ],
          options: [
            {
              title: "Rozmer",
              values: ["20x140", "20x146", "25x146"],
            },
            {
              title: "Materiál", 
              values: ["Sibírsky smrek", "Smrek"],
            },
            {
              title: "Typ",
              values: ["kartáčovaný", "klasik"],
            },
          ],
          variants: [
            {
              title: "20x140 / Sibírsky smrek / kartáčovaný",
              sku: "WOOD-20X140-SIBSMREK-KARTAC",
              options: {
                Rozmer: "20x140",
                Materiál: "Sibírsky smrek",
                Typ: "kartáčovaný",
              },
              prices: [
                {
                  amount: 4600,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "20x146 / Sibírsky smrek / kartáčovaný",
              sku: "WOOD-20X146-SIBSMREK-KARTAC",
              options: {
                Rozmer: "20x146",
                Materiál: "Sibírsky smrek", 
                Typ: "kartáčovaný",
              },
              prices: [
                {
                  amount: 4900,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "25x146 / Smrek / klasik",
              sku: "WOOD-25X146-SMREK-KLASIK",
              options: {
                Rozmer: "25x146",
                Materiál: "Smrek",
                Typ: "klasik",
              },
              prices: [
                {
                  amount: 3800,
                  currency_code: "eur",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Borovicové profily opalované",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Tatranský profil")!.id,
          ],
          description:
            "Opalované borovicové profily s prirodzenou odolnosťou. Perfektné pre exteriérovú fasádu.",
          handle: "borovicove-profily-opalovane",
          weight: 2200,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://cdn.sellio.net/vendors/phpThumb/phpThumb.php?w=350&h=240&far=0&src=/uploads/96/categories/_kg12836.jpg",
            },
          ],
          options: [
            {
              title: "Rozmer",
              values: ["14x121", "18x140", "20x175"],
            },
            {
              title: "Materiál",
              values: ["Sibírska borovica", "Červený smrek"],
            },
            {
              title: "Typ",
              values: ["opalovaný a kartáčovaný", "soft"],
            },
          ],
          variants: [
            {
              title: "14x121 / Sibírska borovica / opalovaný a kartáčovaný",
              sku: "WOOD-14X121-SIBBOROV-OPAL",
              options: {
                Rozmer: "14x121",
                Materiál: "Sibírska borovica",
                Typ: "opalovaný a kartáčovaný",
              },
              prices: [
                {
                  amount: 5200,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "18x140 / Červený smrek / soft",
              sku: "WOOD-18X140-CERVSMREK-SOFT",
              options: {
                Rozmer: "18x140",
                Materiál: "Červený smrek",
                Typ: "soft",
              },
              prices: [
                {
                  amount: 4800,
                  currency_code: "eur",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Termicky ošetrené smrekové fasády",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Fasádne dosky")!.id,
          ],
          description:
            "Termicky ošetrené smrekové dosky pre fasády s vylepšenou odolnosťou a stabilitou. Ekologické ošetrenie bez chemikálií.",
          handle: "termicky-osetrene-smrekove-fasady",
          weight: 2400,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://cdn.sellio.net/vendors/phpThumb/phpThumb.php?w=350&h=240&far=0&src=/uploads/96/categories/_kg12836.jpg",
            },
          ],
          options: [
            {
              title: "Rozmer",
              values: ["20×140", "25×140", "28×140"],
            },
            {
              title: "Materiál",
              values: ["Smrek ThermoWood", "Smrek TMT", "Smrek termo A"],
            },
            {
              title: "Typ",
              values: ["smooth", "ryhovaný", "kartáčovaný", "rustikal"],
            },
            {
              title: "Dostupnosť",
              values: ["Na sklade", "Do mesiaca", "Na objednávku"],
            },
          ],
          variants: [
            {
              title: "20×140 / Smrek ThermoWood / smooth",
              sku: "WOOD-20X140-THERMO-SMOOTH",
              options: {
                Rozmer: "20×140",
                Materiál: "Smrek ThermoWood",
                Typ: "smooth",
                Dostupnosť: "Na sklade",
              },
              prices: [
                {
                  amount: 7200,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "25×140 / Smrek TMT / ryhovaný",
              sku: "WOOD-25X140-TMT-RYHOWANY",
              options: {
                Rozmer: "25×140",
                Materiál: "Smrek TMT",
                Typ: "ryhovaný",
                Dostupnosť: "Na sklade",
              },
              prices: [
                {
                  amount: 8100,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "28×140 / Smrek termo A / rustikal",
              sku: "WOOD-28X140-TERMO-RUSTIKAL",
              options: {
                Rozmer: "28×140",
                Materiál: "Smrek termo A",
                Typ: "rustikal",
                Dostupnosť: "Do mesiaca",
              },
              prices: [
                {
                  amount: 6800,
                  currency_code: "eur",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Klasické smrekové dosky",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Tatranský profil")!.id,
          ],
          description:
            "Tradičné smrekové dosky klasického spracovania. AB trieda kvality pre dlhodobú použitie.",
          handle: "klasicke-smrekove-dosky",
          weight: 1800,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://cdn.sellio.net/vendors/phpThumb/phpThumb.php?w=350&h=240&far=0&src=/uploads/96/categories/_kg12836.jpg",
            },
          ],
          options: [
            {
              title: "Rozmer",
              values: ["11x96", "12x96", "12.5x96"],
            },
            {
              title: "Materiál",
              values: ["Smrek"],
            },
            {
              title: "Typ",
              values: ["klasik", "originál"],
            },
          ],
          variants: [
            {
              title: "11x96 / Smrek / klasik",
              sku: "WOOD-11X96-SMREK-KLASIK",
              options: {
                Rozmer: "11x96",
                Materiál: "Smrek",
                Typ: "klasik",
              },
              prices: [
                {
                  amount: 2800,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "12x96 / Smrek / originál",
              sku: "WOOD-12X96-SMREK-ORIGINAL",
              options: {
                Rozmer: "12x96",
                Materiál: "Smrek",
                Typ: "originál",
              },
              prices: [
                {
                  amount: 3200,
                  currency_code: "eur",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
        {
          title: "Javorová masívna podlaha",
          category_ids: [
            categoryResult.find((cat) => cat.name === "Podlahové dosky")!.id,
          ],
          description:
            "Svetlá javorová masívna podlaha s jemnou štruktúrou. Ideálna pre moderné interiéry a priestory s vysokou záťažou.",
          handle: "javorova-masivna-podlaha",
          weight: 2200,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://cdn.sellio.net/vendors/phpThumb/phpThumb.php?w=350&h=240&far=0&src=/uploads/96/categories/_kg12836.jpg",
            },
          ],
          options: [
            {
              title: "Rozmer",
              values: ["14×140", "16×140", "20×180"],
            },
            {
              title: "Materiál",
              values: ["Javor A", "Javor AB", "Javor Prime"],
            },
            {
              title: "Typ",
              values: ["prirodzený", "bielený", "olejovaný", "lakovaný ultra mat"],
            },
            {
              title: "Dostupnosť",
              values: ["Na sklade", "Do mesiaca", "Na objednávku"],
            },
          ],
          variants: [
            {
              title: "14×140 / Javor A / olejovaný",
              sku: "WOOD-14X140-JAVOR-OLEJ",
              options: {
                Rozmer: "14×140",
                Materiál: "Javor A",
                Typ: "olejovaný",
                Dostupnosť: "Na sklade",
              },
              prices: [
                {
                  amount: 9500,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "16×140 / Javor Prime / bielený",
              sku: "WOOD-16X140-JAVOR-BIELENY",
              options: {
                Rozmer: "16×140",
                Materiál: "Javor Prime",
                Typ: "bielený",
                Dostupnosť: "Do mesiaca",
              },
              prices: [
                {
                  amount: 11500,
                  currency_code: "eur",
                },
              ],
            },
            {
              title: "20×180 / Javor AB / lakovaný ultra mat",
              sku: "WOOD-20X180-JAVOR-ULTRAMAT",
              options: {
                Rozmer: "20×180",
                Materiál: "Javor AB",
                Typ: "lakovaný ultra mat",
                Dostupnosť: "Na objednávku",
              },
              prices: [
                {
                  amount: 8900,
                  currency_code: "eur",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: defaultSalesChannel[0].id,
            },
          ],
        },
      ],
    },
  });
  logger.info("Finished seeding product data.");

  logger.info("Seeding inventory levels.");

  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  });

  const inventoryLevels: CreateInventoryLevelInput[] = [];
  for (const inventoryItem of inventoryItems) {
    const inventoryLevel = {
      location_id: stockLocation.id,
      stocked_quantity: 1000000,
      inventory_item_id: inventoryItem.id,
    };
    inventoryLevels.push(inventoryLevel);
  }

  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryLevels,
    },
  });

  logger.info("Finished seeding inventory levels data.");
}
