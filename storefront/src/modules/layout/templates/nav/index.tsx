import { listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import { StoreRegion } from "@medusajs/types"
import dynamic from "next/dynamic"

// Dynamický import, lebo NavClient je Client Component
const NavClient = dynamic(() => import("./nav-client"), { ssr: false })

export default async function Nav() {
  const regions: StoreRegion[] = await listRegions()
  const categories = await listCategories()

  return <NavClient regions={regions} categories={categories || []} />
}
