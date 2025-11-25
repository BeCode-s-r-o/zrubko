import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
} from "@medusajs/framework/utils";
import {
  createProductCategoriesWorkflow,
} from "@medusajs/medusa/core-flows";

type BaseCategoryInput = {
  name: string
  handle: string
  description: string
  is_active: boolean
  rank: number
}

type ChildCategoryInput = BaseCategoryInput & {
  parentHandle: string
}

/**
 * Script na pridanie parent kategórií a default child kategórie
 * Parent kategórie slúžia ako kontajnery pre ďalšie podkategórie
 */
export default async function addCategories({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  
  logger.info("Pridávam nové parent kategórie...");

  // Parent kategórie pre hlavné sekcie menu
  // Tieto kategórie budú matériať podkategórie (child categories)
  const parentCategories: BaseCategoryInput[] = [
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

  const childCategories: ChildCategoryInput[] = [
    {
      name: "Najpredávanejšie OSMO produkty",
      handle: "najpredavanejsie-osmo-produkty",
      description: "Produkty priradené do tejto kategórie sa zobrazujú na homepage v sekcii Najpredávanejšie OSMO produkty",
      is_active: true,
      rank: 10,
      parentHandle: "najpredavanejsie-produkty",
    },
  ];

  try {
    // Kontrola existujúcich parent kategórií podľa handle
    const existingCategories = await query.graph({
      entity: "product_category",
      fields: ["id", "name", "handle"],
      filters: {
        handle: {
          $in: parentCategories.map((cat) => cat.handle),
        },
      },
    });

    const existingHandles = new Set(
      existingCategories.data.map((cat: any) => cat.handle)
    );

    // Filtrovanie len nových kategórií (ktoré ešte neexistujú)
    const categoriesToCreate = parentCategories.filter(
      (cat) => !existingHandles.has(cat.handle)
    );

    if (categoriesToCreate.length === 0) {
      logger.info("Všetky parent kategórie už existujú. Nepotrebné vytvárať nové parent kategórie.");
    } else {
      // Vytvorenie nových parent kategórií
      const { result: categoryResult } = await createProductCategoriesWorkflow(
        container
      ).run({
        input: {
          product_categories: categoriesToCreate,
        },
      });

      logger.info(`Úspešne vytvorené ${categoryResult.length} nových parent kategórií:`);
      categoryResult.forEach((cat) => {
        logger.info(`  - ${cat.name} (ID: ${cat.id}, Handle: ${cat.handle})`);
      });
    }

    if (existingCategories.data.length > 0) {
      logger.info(`Existujúce parent kategórie (neboli vytvorené znovu):`);
      existingCategories.data.forEach((cat: any) => {
        logger.info(`  - ${cat.name} (ID: ${cat.id}, Handle: ${cat.handle})`);
      });
    }

    logger.info("Kontrolujem a vytváram child kategórie...");

    // Získame aktuálne parent kategórie pre mapovanie handle -> ID
    const { data: currentParents } = await query.graph({
      entity: "product_category",
      fields: ["id", "handle"],
      filters: {
        handle: {
          $in: parentCategories.map((cat) => cat.handle),
        },
      },
    });

    const parentHandleMap = new Map(
      currentParents.map((cat: any) => [cat.handle, cat.id])
    );

    // Zistíme, ktoré child kategórie už existujú
    const existingChildCategories = await query.graph({
      entity: "product_category",
      fields: ["id", "handle"],
      filters: {
        handle: {
          $in: childCategories.map((cat) => cat.handle),
        },
      },
    });

    const existingChildHandles = new Set(
      existingChildCategories.data.map((cat: any) => cat.handle)
    );

    const childCategoriesToCreate = childCategories
      .filter((cat) => !existingChildHandles.has(cat.handle))
      .map((cat) => {
        const parentId = parentHandleMap.get(cat.parentHandle);
        if (!parentId) {
          throw new Error(
            `Parent kategória s handle "${cat.parentHandle}" neexistuje. Spustite skript znova po jej vytvorení.`
          );
        }

        const { parentHandle, ...rest } = cat;
        return {
          ...rest,
          parent_category_id: parentId,
        };
      });

    if (childCategoriesToCreate.length > 0) {
      const { result: childResult } = await createProductCategoriesWorkflow(
        container
      ).run({
        input: {
          product_categories: childCategoriesToCreate,
        },
      });

      logger.info(`Úspešne vytvorené ${childResult.length} child kategórie:`);
      childResult.forEach((cat) => {
        logger.info(`  - ${cat.name} (ID: ${cat.id}, Handle: ${cat.handle})`);
      });
    } else {
      logger.info("Žiadne nové child kategórie nebolo potrebné vytvoriť.");
    }

    logger.info("Kategórie sú pripravené na priradenie podkategórií.");
    
    return {
      parents: currentParents,
      children: childCategoriesToCreate,
    };
  } catch (error) {
    logger.error("Chyba pri vytváraní kategórií:", error);
    throw error;
  }
}

