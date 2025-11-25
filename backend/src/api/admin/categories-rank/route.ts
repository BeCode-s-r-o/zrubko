import type { 
  MedusaRequest, 
  MedusaResponse,
} from "@medusajs/framework/http"

// Endpoint na kontrolu rank hodnôt kategórií
export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  try {
    const query = req.scope.resolve("query")
    
    const { data: categories } = await query.graph({
      entity: "product_category",
      fields: [
        "id",
        "name",
        "handle",
        "rank",
        "parent_category_id",
      ],
      pagination: {
        order: {
          rank: "ASC"
        }
      },
    })

    res.json({
      categories: categories.map((cat: any) => ({
        name: cat.name,
        handle: cat.handle,
        rank: cat.rank,
        parent_category_id: cat.parent_category_id || null
      })),
      message: "Kategórie zoradené podľa rank"
    })
  } catch (error) {
    console.error("Error fetching categories rank:", error)
    res.status(500).json({
      message: "Error fetching categories",
      error: error.message,
    })
  }
}

