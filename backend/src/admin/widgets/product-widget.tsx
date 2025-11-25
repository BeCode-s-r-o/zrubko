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

type OsmoSectionProps = {
  title: string
  description: string
  highlightLabel?: string
}

const OsmoSection = ({ title, description, highlightLabel }: OsmoSectionProps) => (
  <div className="border border-gray-200 rounded-md p-4 space-y-1">
    <div className="flex items-center gap-x-2">
      {highlightLabel ? (
        <>
          <span
            className="text-sm font-semibold tracking-wide uppercase"
            style={{ color: "rgb(229, 32, 32)" }}
          >
            {highlightLabel}
          </span>
          <span className="text-sm font-medium text-gray-900">{title.replace(highlightLabel, "").trimStart()}</span>
        </>
      ) : (
        <>
          <span
            className="text-sm font-semibold tracking-wide uppercase"
            style={{ color: "rgb(229, 32, 32)" }}
          >
            OSMO
          </span>
          <span className="text-sm font-medium text-gray-900">{title}</span>
        </>
      )}
    </div>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
)

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
      <div className="px-6 pb-6 space-y-4">
        <OsmoSection
          title="Osmo pre interiér"
          description="Produkty vhodné na interiérové drevené povrchy so zvýraznenou odolnosťou voči opotrebeniu."
        />
        <OsmoSection
          title="OSMO pre exteriér"
          highlightLabel="OSMO"
          description="Vodoodpudivé a UV stabilné nátery zabezpečujúce dlhodobú ochranu dreva v exteriéri."
        />
      </div>
    </div>
  )
}


export const config = defineWidgetConfig({
  zone: "product.details.before",
})

export default ProductWidget
