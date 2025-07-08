import { sdk } from "@lib/config"
import { cache } from "react"

export const listCategories = cache(async function () {
  return sdk.store.category
    .list({ fields: "+category_children" }, { next: { tags: ["categories"] } })
    .then(({ product_categories }) => {
      // Add test image to the second category for demonstration
      if (product_categories && product_categories.length > 1) {
        (product_categories[1] as any).image = "/test-category.png"
      }
      // Add test image to the third category as well (merch category)
      if (product_categories && product_categories.length > 2) {
        (product_categories[2] as any).image = "/test-category.png"
      }
      return product_categories
    })
})

export const getCategoriesList = cache(async function (
  offset: number = 0,
  limit: number = 100
) {
  return sdk.store.category.list(
    // TODO: Look into fixing the type
    // @ts-ignore
    { limit, offset },
    { next: { tags: ["categories"] } }
  )
})

export const getCategoryByHandle = cache(async function (
  categoryHandle: string[]
) {

  return sdk.store.category.list(
    // TODO: Look into fixing the type
    // @ts-ignore
    { handle: categoryHandle },
    { next: { tags: ["categories"] } }
  )
})
