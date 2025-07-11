import { getCategoriesList } from "@lib/data/categories"
import { FooterHero, FooterNewsletter, FooterLinks, FooterContact, FooterBottom } from "@modules/layout/components/footer"

export default async function Footer() {
  const { product_categories } = await getCategoriesList(0, 10)

  return (
    <footer className="w-full bg-white">
      <div className="content-container">
        <FooterHero />
        <FooterNewsletter />
        <FooterLinks categories={product_categories} />
        <FooterContact />
        <FooterBottom />
      </div>
    </footer>
  )
}
