import { getCategoriesList } from "@lib/data/categories"
import { FooterLinks, FooterContact, FooterBottom } from "@modules/layout/components/footer"

export default async function Footer() {
  const { product_categories } = await getCategoriesList(0, 10)

  return (
    <footer className="w-full bg-[#1a2e1a]">
      <div className="px-6 mx-auto max-w-8xl">
        <FooterLinks categories={product_categories} />
        <FooterContact />
        <FooterBottom />
      </div>
    </footer>
  )
}
