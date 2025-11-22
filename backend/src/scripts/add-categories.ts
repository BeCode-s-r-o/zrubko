import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
} from "@medusajs/framework/utils";
import {
  createProductCategoriesWorkflow,
} from "@medusajs/medusa/core-flows";

/**
 * Script na pridanie 2 nových parent kategórií
 * Tieto kategórie môžu mať podkategórie (child categories)
 */
export default async function addCategories({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  
  logger.info("Pridávam nové parent kategórie...");

  // Parent kategórie pre hlavné sekcie menu
  // Tieto kategórie budú matériať podkategórie (child categories)
  const newCategories = [
    {
      name: "OSMO",
      handle: "osmo",
      description: "Parent kategória pre OSMO produkty - tu vytvárajte podkategórie pre OSMO",
      is_active: true,
      rank: 10, // Nastavenie rank pre poradie zobrazenia
    },
    {
      name: "Najpredávanejšie produkty",
      handle: "najpredavanejsie-produkty",
      description: "Parent kategória pre najpredávanejšie produkty - tu vytvárajte podkategórie pre najpredávanejšie produkty",
      is_active: true,
      rank: 20, // Nastavenie rank pre poradie zobrazenia
    },
  ];

  try {
    // Kontrola existujúcich kategórií podľa handle
    const existingCategories = await query.graph({
      entity: "product_category",
      fields: ["id", "name", "handle"],
      filters: {
        handle: {
          $in: newCategories.map((cat) => cat.handle),
        },
      },
    });

    const existingHandles = new Set(
      existingCategories.data.map((cat: any) => cat.handle)
    );

    // Filtrovanie len nových kategórií (ktoré ešte neexistujú)
    const categoriesToCreate = newCategories.filter(
      (cat) => !existingHandles.has(cat.handle)
    );

    if (categoriesToCreate.length === 0) {
      logger.info("Všetky kategórie už existujú. Žiadne nové kategórie neboli vytvorené.");
      return existingCategories.data;
    }

    // Vytvorenie nových kategórií
    const { result: categoryResult } = await createProductCategoriesWorkflow(
      container
    ).run({
      input: {
        product_categories: categoriesToCreate,
      },
    });

    logger.info(`Úspešne vytvorené ${categoryResult.length} nových kategórií:`);
    categoryResult.forEach((cat) => {
      logger.info(`  - ${cat.name} (ID: ${cat.id}, Handle: ${cat.handle})`);
    });

    if (existingCategories.data.length > 0) {
      logger.info(`Existujúce kategórie (neboli vytvorené znovu):`);
      existingCategories.data.forEach((cat: any) => {
        logger.info(`  - ${cat.name} (ID: ${cat.id}, Handle: ${cat.handle})`);
      });
    }

    logger.info("Kategórie sú pripravené na priradenie podkategórií.");
    
    return categoryResult;
  } catch (error) {
    logger.error("Chyba pri vytváraní kategórií:", error);
    throw error;
  }
}

