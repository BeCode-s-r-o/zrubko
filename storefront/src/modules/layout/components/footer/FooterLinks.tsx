import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRight, Package, Info, Shield, Truck, Star, Crown, Diamond } from "lucide-react"
import { HttpTypes } from "@medusajs/types"

interface FooterLinksProps {
  categories?: HttpTypes.StoreProductCategory[]
}

export default function FooterLinks({ categories }: FooterLinksProps) {
  const mainCategories = categories?.filter(cat => !cat.parent_category)?.slice(0, 6) || []

  return (
    <div className="py-12 border-b border-gold/15">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        
        {/* Produkty */}
        <div className="group">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="p-2 bg-gold/10 rounded-lg border border-gold/20">
                <Package className="w-5 h-5 text-gold-dark" />
              </div>
            </div>
            <h4 className="font-bold text-lg text-ebony">
              Produkty
            </h4>
          </div>
          <div className="space-y-3">
            {mainCategories.map((category) => (
              <LocalizedClientLink
                key={category.id}
                href={`/categories/${category.handle}`}
                className="flex items-center gap-3 text-ebony-light hover:text-gold-dark transition-all duration-300 group/item hover:transform hover:translate-x-1"
              >
                <div className="w-1.5 h-1.5 bg-gold rounded-full group-hover/item:scale-125 transition-transform duration-300"></div>
                <span className="text-sm font-medium">{category.name}</span>
              </LocalizedClientLink>
            ))}
            <LocalizedClientLink
              href="/categories"
              className="flex items-center gap-3 text-gold-dark hover:text-gold font-semibold transition-all duration-300 group/item pt-3 border-t border-gold/20 hover:transform hover:translate-x-1"
            >
              <Crown className="w-4 h-4 group-hover/item:rotate-6 transition-transform" />
              <span className="text-sm">Všetky kategórie</span>
              <ArrowRight className="w-3 h-3 group-hover/item:translate-x-1 transition-transform" />
            </LocalizedClientLink>
          </div>
        </div>

        {/* O spoločnosti */}
        <div className="group">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="p-2 bg-gold/10 rounded-lg border border-gold/20">
                <Info className="w-5 h-5 text-gold-dark" />
              </div>
            </div>
            <h4 className="font-bold text-lg text-ebony">
              O nás
            </h4>
          </div>
          <div className="space-y-3">
            <LocalizedClientLink
              href="/about"
              className="flex items-center gap-3 text-ebony-light hover:text-gold-dark transition-all duration-300 group/item hover:transform hover:translate-x-1"
            >
              <div className="w-1.5 h-1.5 bg-gold rounded-full group-hover/item:scale-125 transition-transform duration-300"></div>
              <span className="text-sm font-medium">O spoločnosti</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/contact"
              className="flex items-center gap-3 text-ebony-light hover:text-gold-dark transition-all duration-300 group/item hover:transform hover:translate-x-1"
            >
              <div className="w-1.5 h-1.5 bg-gold rounded-full group-hover/item:scale-125 transition-transform duration-300"></div>
              <span className="text-sm font-medium">Kontakt</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/purchase-advisor"
              className="flex items-center gap-3 text-ebony-light hover:text-gold-dark transition-all duration-300 group/item hover:transform hover:translate-x-1"
            >
              <div className="w-1.5 h-1.5 bg-gold rounded-full group-hover/item:scale-125 transition-transform duration-300"></div>
              <span className="text-sm font-medium">Sprievodca nákupom</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/kalkulacka"
              className="flex items-center gap-3 text-ebony-light hover:text-gold-dark transition-all duration-300 group/item hover:transform hover:translate-x-1"
            >
              <div className="w-1.5 h-1.5 bg-gold rounded-full group-hover/item:scale-125 transition-transform duration-300"></div>
              <span className="text-sm font-medium">Kalkulačka</span>
            </LocalizedClientLink>
          </div>
        </div>

        {/* Právne */}
        <div className="group">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="p-2 bg-gold/10 rounded-lg border border-gold/20">
                <Shield className="w-5 h-5 text-gold-dark" />
              </div>
            </div>
            <h4 className="font-bold text-lg text-ebony">
              Právne
            </h4>
          </div>
          <div className="space-y-3">
            <LocalizedClientLink
              href="/terms"
              className="flex items-center gap-3 text-ebony-light hover:text-gold-dark transition-all duration-300 group/item hover:transform hover:translate-x-1"
            >
              <div className="w-1.5 h-1.5 bg-gold rounded-full group-hover/item:scale-125 transition-transform duration-300"></div>
              <span className="text-sm font-medium">Obchodné podmienky</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/privacy"
              className="flex items-center gap-3 text-ebony-light hover:text-gold-dark transition-all duration-300 group/item hover:transform hover:translate-x-1"
            >
              <div className="w-1.5 h-1.5 bg-gold rounded-full group-hover/item:scale-125 transition-transform duration-300"></div>
              <span className="text-sm font-medium">Ochrana údajov</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/cookies"
              className="flex items-center gap-3 text-ebony-light hover:text-gold-dark transition-all duration-300 group/item hover:transform hover:translate-x-1"
            >
              <div className="w-1.5 h-1.5 bg-gold rounded-full group-hover/item:scale-125 transition-transform duration-300"></div>
              <span className="text-sm font-medium">Cookies</span>
            </LocalizedClientLink>
          </div>
        </div>

        {/* Služby */}
        <div className="group">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="p-2 bg-gold/10 rounded-lg border border-gold/20">
                <Truck className="w-5 h-5 text-gold-dark" />
              </div>
            </div>
            <h4 className="font-bold text-lg text-ebony">
              Služby
            </h4>
          </div>
          <div className="space-y-3">
            <LocalizedClientLink
              href="/shipping"
              className="flex items-center gap-3 text-ebony-light hover:text-gold-dark transition-all duration-300 group/item hover:transform hover:translate-x-1"
            >
              <div className="w-1.5 h-1.5 bg-gold rounded-full group-hover/item:scale-125 transition-transform duration-300"></div>
              <span className="text-sm font-medium">Doprava a dodanie</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/store"
              className="flex items-center gap-3 text-ebony-light hover:text-gold-dark transition-all duration-300 group/item hover:transform hover:translate-x-1"
            >
              <div className="w-1.5 h-1.5 bg-gold rounded-full group-hover/item:scale-125 transition-transform duration-300"></div>
              <span className="text-sm font-medium">Kamenná predajňa</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/quality"
              className="flex items-center gap-3 text-ebony-light hover:text-gold-dark transition-all duration-300 group/item hover:transform hover:translate-x-1"
            >
              <div className="w-1.5 h-1.5 bg-gold rounded-full group-hover/item:scale-125 transition-transform duration-300"></div>
              <span className="text-sm font-medium">Kvalita dreva</span>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
} 