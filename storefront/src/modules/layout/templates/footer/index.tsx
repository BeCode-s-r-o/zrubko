import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { MapPin, Mail, Phone, Users, Heart, Star, ArrowRight } from "lucide-react"
import FooterAccordion from "@modules/layout/templates/footer/footer-accordion"

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="w-full bg-gradient-to-b from-white to-amber-50 border-t border-accent-light/30">
      <div className="flex flex-col w-full content-container">
        {/* Enhanced Newsletter Section */}
        <div className="py-16 mx-4 my-8 bg-gradient-to-br from-accent-light/20 via-amber-50 to-accent-light/10 rounded-3xl border border-accent-light/30 shadow-lg">
          <div className="w-full max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Enhanced Text */}
              <div className="text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-accent to-accent-dark rounded-xl">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-accent-dark uppercase tracking-wide">
                    Exkluzívna komunita
                  </span>
                </div>
                <h3 className="mb-4 text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Pripojte sa k našej{" "}
                  <span className="bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
                    komunite
                  </span>
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Získajte ako prvý informácie o novinkách, exkluzívnych zľavách a odborných radách pre prácu s drevom.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-accent" />
                    <span>15 000+ spokojných zákazníkov</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-accent" />
                    <span>Žiadny spam</span>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Enhanced Form */}
              <div className="text-left">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-accent-light/20">
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Zadajte váš email"
                        className="w-full px-6 py-4 rounded-xl border-2 border-accent-light/30 bg-white/90 text-gray-900 placeholder-gray-500 text-base transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none backdrop-blur-sm"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <ArrowRight className="w-5 h-5 text-accent-light" />
                      </div>
                    </div>
                    <button className="w-full px-6 py-4 text-white bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent-dark rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 text-base flex items-center justify-center gap-2">
                      <Users className="w-5 h-5" />
                      Pridať sa do komunity
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                      Ochrana súkromia zaručená. Odhlásenie kedykoľvek jedným klikom.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content with Enhanced Styling */}
        <div className="py-12 md:py-16 md:grid md:grid-cols-5 md:gap-8">
          {/* Enhanced Company Info */}
          <div className="pr-4 mb-8 md:mb-0">
            <LocalizedClientLink href="/" className="block mb-6 text-3xl font-bold bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
              Zrubko
            </LocalizedClientLink>
            <p className="mb-8 text-gray-600 leading-relaxed">
              Vytvárame kvalitné drevené riešenia pre váš domov a záhradu. Tradícia a remeselná dokonalosť v každom kuse dreva.
            </p>
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-accent-light to-accent rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Ručná práca</p>
                <p className="text-sm text-gray-600">Tradičné remeslo</p>
              </div>
            </div>
          </div>

          {/* Enhanced Product Categories */}
          {product_categories && product_categories?.length > 0 && (
            <FooterAccordion title="Naše Produkty">
              <div className="pb-4 md:pb-0">
                <div className="space-y-3">
                  {product_categories?.slice(0, 6).map((c) => {
                    if (c.parent_category) return null
                    return (
                      <div key={c.id} className="group">
                        <LocalizedClientLink
                          className="block p-3 bg-gradient-to-r from-accent-light/10 to-transparent hover:from-accent-light/20 hover:to-accent-light/10 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-105 border border-accent-light/20"
                          href={`/categories/${c.handle}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-accent to-accent-dark rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                              <ArrowRight className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h5 className="text-gray-900 font-medium group-hover:text-accent transition-colors">
                                {c.name}
                              </h5>
                              <p className="text-xs text-gray-500 group-hover:text-accent-light transition-colors">
                                Preskúmať kategóriu
                              </p>
                            </div>
                          </div>
                        </LocalizedClientLink>
                      </div>
                    )
                  })}
                </div>
                
                {/* View All Categories Link */}
                <div className="mt-4 pt-4 border-t border-accent-light/20">
                  <LocalizedClientLink
                    href="/categories"
                    className="flex items-center gap-2 text-accent hover:text-accent-dark font-medium transition-colors group"
                  >
                    <span>Všetky kategórie</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </LocalizedClientLink>
                </div>
              </div>
            </FooterAccordion>
          )}

          {/* Enhanced Company Links */}
          <FooterAccordion title="O Spoločnosti">
            <div className="pb-4 md:pb-0">
              <div className="space-y-2">
                <LocalizedClientLink 
                  href="/about" 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent-light/10 transition-colors duration-200 group"
                >
                  <div className="w-2 h-2 bg-accent rounded-full group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 group-hover:text-accent font-medium">O nás</span>
                </LocalizedClientLink>
                
                <LocalizedClientLink 
                  href="/careers" 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent-light/10 transition-colors duration-200 group"
                >
                  <div className="w-2 h-2 bg-accent rounded-full group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 group-hover:text-accent font-medium">Kariéra</span>
                </LocalizedClientLink>
                
                <LocalizedClientLink 
                  href="/contact" 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent-light/10 transition-colors duration-200 group"
                >
                  <div className="w-2 h-2 bg-accent rounded-full group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 group-hover:text-accent font-medium">Kontakt</span>
                </LocalizedClientLink>
                
                <LocalizedClientLink 
                  href="/purchase-advisor" 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent-light/10 transition-colors duration-200 group"
                >
                  <div className="w-2 h-2 bg-accent rounded-full group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 group-hover:text-accent font-medium">Sprievodca nákupom</span>
                </LocalizedClientLink>
              </div>
            </div>
          </FooterAccordion>

          {/* Enhanced Legal Links */}
          <FooterAccordion title="Právne a Podpora">
            <div className="pb-4 md:pb-0">
              <div className="space-y-2">
                <LocalizedClientLink 
                  href="/terms" 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent-light/10 transition-colors duration-200 group"
                >
                  <div className="w-2 h-2 bg-accent rounded-full group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 group-hover:text-accent font-medium">Obchodné podmienky</span>
                </LocalizedClientLink>
                
                <LocalizedClientLink 
                  href="/privacy" 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent-light/10 transition-colors duration-200 group"
                >
                  <div className="w-2 h-2 bg-accent rounded-full group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 group-hover:text-accent font-medium">Ochrana osobných údajov</span>
                </LocalizedClientLink>
                
                <LocalizedClientLink 
                  href="/cookies" 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent-light/10 transition-colors duration-200 group"
                >
                  <div className="w-2 h-2 bg-accent rounded-full group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 group-hover:text-accent font-medium">Používanie cookies</span>
                </LocalizedClientLink>
                
                <LocalizedClientLink 
                  href="/shipping" 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent-light/10 transition-colors duration-200 group"
                >
                  <div className="w-2 h-2 bg-accent rounded-full group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 group-hover:text-accent font-medium">Doprava a dodanie</span>
                </LocalizedClientLink>
              </div>
            </div>
          </FooterAccordion>

          {/* Enhanced Contact Information */}
          <FooterAccordion title="Kontakt a Lokácia">
            <div className="pb-4 md:pb-0">
              {/* Enhanced Google Map */}
              <div className="overflow-hidden mb-6 h-40 rounded-xl border-2 border-accent-light/30 shadow-lg relative group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2613.9887890420147!2d19.1537885!3d49.0681225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4714f6c1e89fc3e3%3A0x2c8c7e0c7e0c7e0c!2sZrubko!5e0!3m2!1sen!2ssk!4v1620000000000!5m2!1sen!2ssk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute inset-0 bg-accent-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold bg-accent/90 px-3 py-1 rounded-lg">
                    Zobraziť mapu
                  </span>
                </div>
              </div>
              
              {/* Enhanced Contact Details */}
              <div className="space-y-3">
                <div className="flex gap-3 items-center p-3 bg-gradient-to-r from-accent-light/10 to-transparent rounded-xl hover:from-accent-light/20 hover:to-accent-light/10 transition-all duration-300 group">
                  <div className="p-2 bg-gradient-to-r from-accent to-accent-dark rounded-lg group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <a href="mailto:info@zrubko.sk" className="text-gray-900 hover:text-accent font-medium block">
                      info@zrubko.sk
                    </a>
                    <span className="text-xs text-gray-500">Napíšte nám kedykoľvek</span>
                  </div>
                </div>
                
                <div className="flex gap-3 items-center p-3 bg-gradient-to-r from-accent-light/10 to-transparent rounded-xl hover:from-accent-light/20 hover:to-accent-light/10 transition-all duration-300 group">
                  <div className="p-2 bg-gradient-to-r from-accent to-accent-dark rounded-lg group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <a href="tel:+421900000000" className="text-gray-900 hover:text-accent font-medium block">
                      +421 900 000 000
                    </a>
                    <span className="text-xs text-gray-500">Po-Pia 8:00 - 18:00</span>
                  </div>
                </div>
                
                <div className="flex gap-3 items-center p-3 bg-gradient-to-r from-accent-light/10 to-transparent rounded-xl group">
                  <div className="p-2 bg-gradient-to-r from-accent to-accent-dark rounded-lg group-hover:scale-110 transition-transform">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-gray-900 font-medium block">Drevená ulica 123</span>
                    <span className="text-xs text-gray-500">Bratislava 12345, Slovensko</span>
                  </div>
                </div>
              </div>
            </div>
          </FooterAccordion>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="flex flex-col justify-between items-center py-8 border-t border-accent-light/30 bg-gradient-to-r from-accent-light/5 to-amber-50 rounded-t-3xl">
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6">
            <Text className="text-gray-600 text-sm font-medium">
              © {new Date().getFullYear()} Zrubko. Všetky práva vyhradené.
            </Text>
            <div className="flex gap-3">
              <a href="#" className="p-3 bg-gradient-to-r from-accent-light to-accent rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 group">
                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="p-3 bg-gradient-to-r from-accent-light to-accent rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 group">
                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="p-3 bg-gradient-to-r from-accent-light to-accent rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 group">
                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
