import { listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import { StoreRegion } from "@medusajs/types"
import dynamic from "next/dynamic"

// Dynamický import, lebo NavClient je Client Component
const NavClient = dynamic(() => import("./nav-client"), { ssr: false })

interface NavProps {
  countryCode?: string
}

export default async function Nav({ countryCode }: NavProps) {
  const regions: StoreRegion[] = await listRegions()
  const categories = await listCategories()
  
  // Find current region based on countryCode using countries array
  const currentRegion = regions.find(region => 
    region.countries?.some(country => 
      country.iso_2?.toLowerCase() === countryCode?.toLowerCase()
    )
  ) || regions[0]

  return <NavClient regions={regions} categories={categories || []} currentRegion={currentRegion} />
}
