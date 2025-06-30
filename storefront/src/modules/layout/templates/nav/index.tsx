import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import dynamic from "next/dynamic"

// Dynamický import, lebo NavClient je Client Component
const NavClient = dynamic(() => import("./nav-client"), { ssr: false })

export default async function Nav() {
  const regions: StoreRegion[] = await listRegions()

  return <NavClient regions={regions} />
}
