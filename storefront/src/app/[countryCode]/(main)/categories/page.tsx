import { Metadata } from "next"
import { listCategories } from "@lib/data/categories"
import CategoriesPageComponent from "@modules/categories/components/categories-page"

export const metadata: Metadata = {
  title: "Kategórie produktov - Zrubko.sk",
  description: "Preskúmajte všetky kategórie našich prémiových drevených produktov. Obklad, podlaha, terasové dosky a ďalšie kvalitné drevené riešenia.",
}

export default async function CategoriesPage({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const categories = await listCategories()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 mx-auto mt-2 max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex relative items-center py-2 mb-2 space-x-2 text-sm" aria-label="Breadcrumb">
          <a href="/" className="transition-colors text-ui-fg-subtle hover:text-ui-fg-base text-small-regular">
            Domov
          </a>
          <div className="flex items-center">
            <span className="mx-[4px] text-ui-fg-muted">/</span>
            <span className="font-medium text-ui-fg-base text-small-regular">
              Kategórie
            </span>
          </div>
        </nav>
      </div>

      {/* Categories Section */}
      <div className="w-full">
        <div className="px-6 mx-auto max-w-8xl">
          <CategoriesPageComponent categories={categories} />
        </div>
      </div>
    </div>
  )
} 