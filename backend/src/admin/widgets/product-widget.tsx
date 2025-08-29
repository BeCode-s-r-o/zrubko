import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useQuery } from "@tanstack/react-query"
import { sdk } from "../lib/sdk"
import {
  DetailWidgetProps,
  AdminProduct,
} from "@medusajs/framework/types"

type WishlistResponse = {
  count: number
}

const ProductWidget = ({
  data: product,
}: DetailWidgetProps<AdminProduct>) => {
  const { data, isLoading } = useQuery<WishlistResponse>({
    queryFn: () => sdk.client.fetch(`/admin/products/${product.id}/wishlist`),
    queryKey: [["products", product.id, "wishlist"]],
  })

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Wishlist</h2>
      </div>
      <div className="px-6 py-4 text-sm text-gray-700">
        {isLoading ?
          "Loading..." : `This product is in ${data?.count} wishlist(s).`
        }
      </div>
    </div>
  )
}


export const config = defineWidgetConfig({
  zone: "product.details.before",
})

export default ProductWidget
