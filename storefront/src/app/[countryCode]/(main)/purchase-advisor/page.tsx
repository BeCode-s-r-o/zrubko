import { Metadata } from "next"
import PurchaseAdvisorPage from "@modules/pages/purchase-advisor-page"

export const metadata: Metadata = {
  title: "Sprievodca nákupom dreva - Zrubko",
  description: "Nevíte, ktorý produkt je pre vás ten pravý? Využite nášho sprievodcu nákupom a nájdite najvhodnejšie drevené riešenia pre váš projekt.",
}

export default async function PurchaseAdvisor({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  return <PurchaseAdvisorPage />
} 