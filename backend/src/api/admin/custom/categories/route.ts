import { 
  MedusaRequest, 
  MedusaResponse,
} from "@medusajs/framework"
import { 
  IProductModuleService,
  IFileModuleService 
} from "@medusajs/framework/types"
import { 
  Modules 
} from "@medusajs/framework/utils"

// GET - List all categories
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const productModuleService: IProductModuleService = req.scope.resolve(
      Modules.PRODUCT
    )

    const categories = await productModuleService.listProductCategories({}, {
      relations: ["category_children"]
    })

    res.json({
      categories: categories || []
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch categories",
      error: error.message
    })
  }
}

// POST - Create new category
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const { name, description, handle, parent_category_id, image_url } = req.body

    if (!name) {
      res.status(400).json({
        message: "Name is required"
      })
      return
    }

    const productModuleService: IProductModuleService = req.scope.resolve(
      Modules.PRODUCT
    )

    const categoryData = {
      name,
      description,
      handle: handle || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      is_active: true,
      parent_category_id,
      metadata: image_url ? { image_url } : {}
    }

    const category = await productModuleService.createProductCategories([categoryData])

    res.json({
      message: "Category created successfully",
      category: category[0]
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to create category",
      error: error.message
    })
  }
} 