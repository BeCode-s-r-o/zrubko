import type { 
  MedusaRequest, 
  MedusaResponse,
} from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

// Custom endpoint pre zoznam kategórií s rank orderingom
export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  try {
    console.log("[CUSTOM ADMIN CATEGORIES] Request received")
    console.log("[CUSTOM ADMIN CATEGORIES] Query params:", req.query)
    
    const query = req.scope.resolve("query")
    
    // Parse query parameters
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0
    const q = req.query.q as string | undefined

    // Build filters
    const filters: any = {}
    if (q) {
      filters.name = { $ilike: `%${q}%` }
    }

    // Query categories with rank ordering
    const { data: product_categories, metadata } = await query.graph({
      entity: "product_category",
      fields: [
        "id",
        "name",
        "description",
        "handle",
        "is_active",
        "is_internal",
        "rank",
        "parent_category_id",
        "created_at",
        "updated_at",
        "metadata",
      ],
      filters,
      pagination: {
        skip: offset,
        take: limit,
        order: {
          rank: "ASC"
        }
      },
    })

    console.log("[CUSTOM ADMIN CATEGORIES] Returning", product_categories?.length, "categories ordered by rank")

    res.json({
      product_categories,
      count: metadata?.count || product_categories?.length || 0,
      offset,
      limit,
    })
  } catch (error) {
    console.error("[CUSTOM ADMIN CATEGORIES] Error:", error)
    res.status(500).json({
      message: "Error fetching product categories",
      error: error.message,
    })
  }
}

