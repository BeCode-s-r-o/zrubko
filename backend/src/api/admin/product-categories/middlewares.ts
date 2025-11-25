import { 
  defineMiddlewares,
  validateAndTransformQuery
} from "@medusajs/framework/http"
import { createFindParams } from "@medusajs/medusa/api/utils/validators"

// Schema pre GET /admin/product-categories
export const AdminGetProductCategoriesSchema = createFindParams({
  limit: 50,
  offset: 0,
})

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/product-categories",
      method: ["GET"],
      middlewares: [
        (req, res, next) => {
          // Vždy nastaviť rank ordering
          if (!req.query.order || req.query.order === '') {
            req.query.order = "rank"
          }
          
          console.log("[ADMIN CATEGORIES MIDDLEWARE] Order set to:", req.query.order)
          next()
        },
        validateAndTransformQuery(
          AdminGetProductCategoriesSchema,
          {
            defaults: [
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
            ],
            isList: true,
          }
        ),
      ],
    },
  ],
})

