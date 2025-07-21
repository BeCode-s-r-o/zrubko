import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRight, Package, Info, Shield, Truck } from "lucide-react"
import { HttpTypes } from "@medusajs/types"

interface FooterLinksProps {
  categories?: HttpTypes.StoreProductCategory[]
}

export default function FooterLinks({ categories }: FooterLinksProps) {
  const mainCategories = categories?.filter(cat => !cat.parent_category)?.slice(0, 6) || []

  return (
    <div className="py-12 border-b border-white/10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Produkty */}
        <div>
          <div className="flex gap-2 items-center mb-4">
            <Package className="w-4 h-4 text-white" />
            <h4 className="text-base font-medium text-white">
              Produkty
            </h4>
          </div>
          <div className="space-y-2">
            {mainCategories.map((category) => (
              <LocalizedClientLink
                key={category.id}
                href={`/categories/${category.handle}`}
                className="block text-sm transition-colors duration-200 text-white/70 hover:text-white"
              >
                {category.name}
              </LocalizedClientLink>
            ))}
            <LocalizedClientLink
              href="/categories"
              className="flex gap-1 items-center pt-2 text-sm font-medium text-white border-t transition-colors duration-200 hover:text-white/80 border-white/10"
            >
              <span>Všetky kategórie</span>
              <ArrowRight className="w-3 h-3" />
            </LocalizedClientLink>
          </div>
        </div>

        {/* O spoločnosti */}
        <div>
          <div className="flex gap-2 items-center mb-4">
            <Info className="w-4 h-4 text-white" />
            <h4 className="text-base font-medium text-white">
              O nás
            </h4>
          </div>
          <div className="space-y-2">
            <LocalizedClientLink
              href="/about"
              className="block text-sm transition-colors duration-200 text-white/70 hover:text-white"
            >
              O spoločnosti
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/kontakt"
              className="block text-sm transition-colors duration-200 text-white/70 hover:text-white"
            >
              Kontakt
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/purchase-advisor"
              className="block text-sm transition-colors duration-200 text-white/70 hover:text-white"
            >
              Sprievodca nákupom
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/kalkulacka"
              className="block text-sm transition-colors duration-200 text-white/70 hover:text-white"
            >
              Kalkulačka
            </LocalizedClientLink>
          </div>
        </div>

        {/* Právne */}
        <div>
          <div className="flex gap-2 items-center mb-4">
            <Shield className="w-4 h-4 text-white" />
            <h4 className="text-base font-medium text-white">
              Právne
            </h4>
          </div>
          <div className="space-y-2">
            <LocalizedClientLink
              href="/terms"
              className="block text-sm transition-colors duration-200 text-white/70 hover:text-white"
            >
              Obchodné podmienky
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/privacy"
              className="block text-sm transition-colors duration-200 text-white/70 hover:text-white"
            >
              Ochrana údajov
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/cookies"
              className="block text-sm transition-colors duration-200 text-white/70 hover:text-white"
            >
              Cookies
            </LocalizedClientLink>
          </div>
        </div>

        {/* Služby */}
        <div>
          <div className="flex gap-2 items-center mb-4">
            <Truck className="w-4 h-4 text-white" />
            <h4 className="text-base font-medium text-white">
              Služby
            </h4>
          </div>
          <div className="space-y-2">
            <LocalizedClientLink
              href="/shipping"
              className="block text-sm transition-colors duration-200 text-white/70 hover:text-white"
            >
              Doprava a dodanie
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/store"
              className="block text-sm transition-colors duration-200 text-white/70 hover:text-white"
            >
              Kamenná predajňa
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/quality"
              className="block text-sm transition-colors duration-200 text-white/70 hover:text-white"
            >
              Kvalita dreva
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
} 