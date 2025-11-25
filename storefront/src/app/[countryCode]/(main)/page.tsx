import { Metadata } from "next"

import Home10 from "@modules/home/components/home-10"

export const metadata: Metadata = {
  title: "Home - Furnitor",
  description: "Modern furniture shop with the best designs for your home.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  return <Home10 countryCode={countryCode} />
}
