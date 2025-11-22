import { defineMiddlewares } from "@medusajs/medusa"

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/product-categories",
      method: ["GET"],
      middlewares: [
        (req, res, next) => {
          console.log("[MIDDLEWARE] Product categories request intercepted")
          console.log("[MIDDLEWARE] Original query:", req.query)
          
          // Vždy pridaj rank ordering pre admin kategórie
          req.query.order = "rank"
          
          console.log("[MIDDLEWARE] Modified query:", req.query)
          next()
        },
      ],
    },
  ],
})

