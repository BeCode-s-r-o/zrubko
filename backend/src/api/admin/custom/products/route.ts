import { 
  MedusaRequest, 
  MedusaResponse,
} from "@medusajs/framework"
import { 
  IProductModuleService 
} from "@medusajs/framework/types"
import { 
  Modules,
  ProductStatus 
} from "@medusajs/framework/utils"

interface ProductCreateRequest {
  title: string;
  description?: string;
  handle?: string;
  category_ids?: string[];
  images?: Array<{ url: string }>;
  options?: Array<{
    title: string;
    values: string[];
  }>;
  variants?: Array<{
    title: string;
    sku?: string;
    options: Record<string, string>;
    prices: Array<{
      amount: number;
      currency_code: string;
    }>;
  }>;
  weight?: number;
  status?: ProductStatus;
}

// GET - List all products with wood categories
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const productModuleService: IProductModuleService = req.scope.resolve(
      Modules.PRODUCT
    )

    // Get wood-related categories
    const categories = await productModuleService.listProductCategories({
      name: ["Tatranský profil", "Drevo", "Fasáda", "Terasa", "Podlaha", "Sauna"]
    })

    const categoryIds = categories.map(cat => cat.id)

    // Get all products and filter by categories
    const products = await productModuleService.listProducts({}, {
      relations: ["categories", "images", "variants", "options"]
    })

    // Filter products that belong to wood categories
    const woodProducts = products.filter(product => 
      product.categories?.some(cat => categoryIds.includes(cat.id))
    )

    res.json({
      products: woodProducts || []
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message
    })
  }
}

// POST - Create new wood product
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const body = req.body as ProductCreateRequest
    const { 
      title, 
      description, 
      handle, 
      category_ids,
      images,
      options,
      variants,
      weight,
      status = ProductStatus.PUBLISHED
    } = body

    if (!title) {
      res.status(400).json({
        message: "Title is required"
      })
      return
    }

    const productModuleService: IProductModuleService = req.scope.resolve(
      Modules.PRODUCT
    )

    const productData = {
      title,
      description: description || "",
      handle: handle || title.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, ''),
      status,
      weight: weight || 0,
      category_ids: category_ids || [],
      images: images || [],
      options: options || [
        {
          title: "Rozmer",
          values: ["Štandardný"]
        },
        {
          title: "Materiál",
          values: ["Smrek"]
        }
      ],
      variants: variants || [
        {
          title: `${title} - Štandardný`,
          sku: `WOOD-${Date.now()}`,
          options: {
            "Rozmer": "Štandardný",
            "Materiál": "Smrek"
          },
          prices: [
            {
              amount: 5000, // 50 EUR in cents
              currency_code: "eur"
            }
          ]
        }
      ]
    }

    const product = await productModuleService.createProducts([productData])

    res.json({
      message: "Product created successfully",
      product: product[0]
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to create product",
      error: error.message
    })
  }
} 