import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRight, Package, Info, Shield, Truck } from "lucide-react"
import { HttpTypes } from "@medusajs/types"

interface FooterLinksProps {
  categories?: HttpTypes.StoreProductCategory[]
}

export default function FooterLinks({ categories }: FooterLinksProps) {
  const mainCategories = categories?.filter(cat => !cat.parent_category)?.slice(0, 6) || []

  return (
    <div className="py-8 border-b border-gold/10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        
        {/* Produkty */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Package className="w-5 h-5 text-gold" />
            <h4 className="font-bold text-ebony">Produkty</h4>
          </div>
          <div className="space-y-3">
            {mainCategories.map((category) => (
              <LocalizedClientLink
                key={category.id}
                href={`/categories/${category.handle}`}
                className="flex items-center gap-2 text-ebony-light hover:text-gold transition-colors group"
              >
                <div className="w-1 h-1 bg-gold rounded-full group-hover:scale-150 transition-transform"></div>
                <span className="text-sm">{category.name}</span>
              </LocalizedClientLink>
            ))}
            <LocalizedClientLink
              href="/categories"
              className="flex items-center gap-2 text-gold hover:text-gold-dark font-medium transition-colors group pt-2 border-t border-gold/20"
            >
              <span className="text-sm">Všetky kategórie</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </LocalizedClientLink>
          </div>
        </div>

        {/* O spoločnosti */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Info className="w-5 h-5 text-gold" />
            <h4 className="font-bold text-ebony">O nás</h4>
          </div>
          <div className="space-y-3">
            <LocalizedClientLink
              href="/about"
              className="flex items-center gap-2 text-ebony-light hover:text-gold transition-colors group"
            >
              <div className="w-1 h-1 bg-gold rounded-full group-hover:scale-150 transition-transform"></div>
              <span className="text-sm">O spoločnosti</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/contact"
              className="flex items-center gap-2 text-ebony-light hover:text-gold transition-colors group"
            >
              <div className="w-1 h-1 bg-gold rounded-full group-hover:scale-150 transition-transform"></div>
              <span className="text-sm">Kontakt</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/purchase-advisor"
              className="flex items-center gap-2 text-ebony-light hover:text-gold transition-colors group"
            >
              <div className="w-1 h-1 bg-gold rounded-full group-hover:scale-150 transition-transform"></div>
              <span className="text-sm">Sprievodca nákupom</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/kalkulacka"
              className="flex items-center gap-2 text-ebony-light hover:text-gold transition-colors group"
            >
              <div className="w-1 h-1 bg-gold rounded-full group-hover:scale-150 transition-transform"></div>
              <span className="text-sm">Kalkulačka</span>
            </LocalizedClientLink>
          </div>
        </div>

        {/* Právne */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-gold" />
            <h4 className="font-bold text-ebony">Právne</h4>
          </div>
          <div className="space-y-3">
            <LocalizedClientLink
              href="/terms"
              className="flex items-center gap-2 text-ebony-light hover:text-gold transition-colors group"
            >
              <div className="w-1 h-1 bg-gold rounded-full group-hover:scale-150 transition-transform"></div>
              <span className="text-sm">Obchodné podmienky</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/privacy"
              className="flex items-center gap-2 text-ebony-light hover:text-gold transition-colors group"
            >
              <div className="w-1 h-1 bg-gold rounded-full group-hover:scale-150 transition-transform"></div>
              <span className="text-sm">Ochrana údajov</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/cookies"
              className="flex items-center gap-2 text-ebony-light hover:text-gold transition-colors group"
            >
              <div className="w-1 h-1 bg-gold rounded-full group-hover:scale-150 transition-transform"></div>
              <span className="text-sm">Cookies</span>
            </LocalizedClientLink>
          </div>
        </div>

        {/* Služby */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Truck className="w-5 h-5 text-gold" />
            <h4 className="font-bold text-ebony">Služby</h4>
          </div>
          <div className="space-y-3">
            <LocalizedClientLink
              href="/shipping"
              className="flex items-center gap-2 text-ebony-light hover:text-gold transition-colors group"
            >
              <div className="w-1 h-1 bg-gold rounded-full group-hover:scale-150 transition-transform"></div>
              <span className="text-sm">Doprava a dodanie</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/store"
              className="flex items-center gap-2 text-ebony-light hover:text-gold transition-colors group"
            >
              <div className="w-1 h-1 bg-gold rounded-full group-hover:scale-150 transition-transform"></div>
              <span className="text-sm">Kamenná predajňa</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/quality"
              className="flex items-center gap-2 text-ebony-light hover:text-gold transition-colors group"
            >
              <div className="w-1 h-1 bg-gold rounded-full group-hover:scale-150 transition-transform"></div>
              <span className="text-sm">Kvalita dreva</span>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
} 