import { getCategoriesList } from "@lib/data/categories"
import { FooterLinks, FooterContact, FooterBottom } from "@modules/layout/components/footer"

export default async function Footer() {
  const { product_categories } = await getCategoriesList(0, 10)

  return (
    <footer className="w-full bg-gradient-to-t from-champagne via-champagne-light to-white relative overflow-hidden">
      {/* Jemné dekoratívne pozadie */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/3 via-transparent to-gold/2"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      
      <div className="content-container relative z-10">
        <FooterLinks categories={product_categories} />
        <FooterContact />
        <FooterBottom />
      </div>
    </footer>
  )
}
