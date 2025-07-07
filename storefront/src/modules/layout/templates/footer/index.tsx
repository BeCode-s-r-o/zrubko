import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { MapPin, Mail, Phone } from "lucide-react"
import FooterAccordion from "@modules/layout/templates/footer/footer-accordion"

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="w-full bg-white border-t border-ui-border-base">
      <div className="flex flex-col w-full content-container">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-ui-border-base bg-gray-25 rounded-2xl mx-4 my-8">
          <div className="w-full max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left Column - Text */}
              <div className="text-left">
                <h3 className="mb-3 text-2xl font-bold text-gray-900 leading-tight">
                  Pripojte sa k našej komunite
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Získajte najnovšie informácie o drevených produktoch a exkluzívne ponuky.
                </p>
              </div>
              
              {/* Right Column - Form */}
              <div className="text-left">
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Zadajte váš email"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-500 text-sm transition-all focus:border-amber-400 focus:ring-0 focus:outline-none"
                  />
                  <button className="w-full px-6 py-3 text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg font-medium transition-all hover:from-amber-600 hover:to-amber-700 hover:shadow-md text-sm">
                    Odoberať
                  </button>
                  <p className="text-xs text-gray-500">
                    Žiadny spam. Odhlásenie kedykoľvek.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-8 md:py-12 md:grid md:grid-cols-5 md:gap-4">
          {/* Company Info */}
          <div className="pr-2 mb-8 md:mb-0">
            <LocalizedClientLink href="/" className="block mb-4 text-2xl font-bold text-ui-fg-base">
              Zrubko
            </LocalizedClientLink>
            <p className="mb-6 text-ui-fg-subtle">
              Design amazing digital experiences that create more happy in the world.
            </p>
          </div>

          {/* Product Categories */}
          {product_categories && product_categories?.length > 0 && (
            <FooterAccordion title="Product">
              <div className="pb-4 md:pb-0">
                <ul className="grid grid-cols-1 gap-2">
                  {product_categories?.slice(0, 6).map((c) => {
                    if (c.parent_category) return null
                    return (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className="text-ui-fg-subtle hover:text-ui-fg-base"
                          href={`/categories/${c.handle}`}
                        >
                          {c.name}
                        </LocalizedClientLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </FooterAccordion>
          )}

          {/* Company Links */}
          <FooterAccordion title="Company">
            <div className="pb-4 md:pb-0">
              <ul className="grid grid-cols-1 gap-2">
                <li>
                  <LocalizedClientLink href="/about" className="text-ui-fg-subtle hover:text-ui-fg-base">
                    About us
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/careers" className="text-ui-fg-subtle hover:text-ui-fg-base">
                    Careers
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/contact" className="text-ui-fg-subtle hover:text-ui-fg-base">
                    Contact
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </FooterAccordion>

          {/* Legal Links */}
          <FooterAccordion title="Legal">
            <div className="pb-4 md:pb-0">
              <ul className="grid grid-cols-1 gap-2">
                <li>
                  <LocalizedClientLink href="/terms" className="text-ui-fg-subtle hover:text-ui-fg-base">
                    Terms
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/privacy" className="text-ui-fg-subtle hover:text-ui-fg-base">
                    Privacy
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/cookies" className="text-ui-fg-subtle hover:text-ui-fg-base">
                    Cookies
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </FooterAccordion>

          {/* Contact Information */}
          <FooterAccordion title="Contact">
            <div className="pb-4 md:pb-0">
              {/* Google Map */}
              <div className="overflow-hidden mb-3 h-32 rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2613.9887890420147!2d19.1537885!3d49.0681225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4714f6c1e89fc3e3%3A0x2c8c7e0c7e0c7e0c!2sZrubko!5e0!3m2!1sen!2ssk!4v1620000000000!5m2!1sen!2ssk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              {/* Contact Details */}
              <ul className="grid grid-cols-1 gap-3">
                <li className="flex gap-2 items-center text-ui-fg-subtle">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:info@zrubko.sk" className="hover:text-ui-fg-base">info@zrubko.sk</a>
                </li>
                <li className="flex gap-2 items-center text-ui-fg-subtle">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+421900000000" className="hover:text-ui-fg-base">+421 900 000 000</a>
                </li>
                <li className="flex gap-2 items-center text-ui-fg-subtle">
                  <MapPin className="w-4 h-4" />
                  <span>Zrubko Street 123, City 12345</span>
                </li>
              </ul>
            </div>
          </FooterAccordion>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col justify-between items-center py-6 border-t md:flex-row border-ui-border-base">
          <Text className="text-ui-fg-subtle text-small-regular">
            © {new Date().getFullYear()} Zrubko. All rights reserved.
          </Text>
          <div className="flex gap-x-3 mt-4 md:mt-0">
            <a href="#" className="p-2 bg-amber-50 rounded-lg transition-colors hover:bg-amber-100">
              <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="p-2 bg-amber-50 rounded-lg transition-colors hover:bg-amber-100">
              <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="p-2 bg-amber-50 rounded-lg transition-colors hover:bg-amber-100">
              <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
