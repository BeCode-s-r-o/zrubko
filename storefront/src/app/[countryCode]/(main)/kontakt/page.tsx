import ContactForm from '@modules/common/components/contact-form'
import { Mail, MapPin, Phone, Clock, Shield, Heart } from 'lucide-react'
import PageBreadcrumbs from "@modules/common/components/breadcrumbs/page-breadcrumbs"
import LandingBanner from "@modules/common/components/landing-banner"

export const metadata = {
  title: 'Kontakt - Zrubko',
  description: "Máte predstavu? My máme drevo a skúsenosti. Kontaktujte nás pre váš projekt.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <PageBreadcrumbs 
        items={[
          { label: "Kontakt", isActive: true }
        ]}
      />

      {/* Hero Section - using reusable component */}
      <LandingBanner
        title="Kontakt"
        subtitle="Máte predstavu? My máme drevo a skúsenosti. Kontaktujte nás pre váš projekt."
        backgroundImage="https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"
        backgroundColor="from-primary/70 via-transparent to-primary/80"
        textColor="text-primary"
      />

      {/* Main Content - Two Column Layout */}
      <div className="px-6 py-16 mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-8 min-h-[600px]">
          {/* Left Column - Company Information (White Background) */}
          <div className="p-8 space-y-8 bg-white rounded-lg shadow-sm lg:p-12">
          {/* Operating Hours */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Prevádzkové hodiny</h3>
            <div className="space-y-2">
              <div className="flex gap-4">
                <span className="text-gray-700">Po - Pi</span>
                <span className="font-medium text-gray-900">9:00 - 17:00</span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-700">So - Ne</span>
                <span className="font-medium text-gray-900">ZATVORENÉ</span>
              </div>
            </div>
          </div>

          {/* Customer Support */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Zákaznícka podpora</h3>
            <div className="space-y-3">
              <div className="flex gap-3 items-center">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-gray-700">pon-pia: 09:00-17:00</span>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-gray-700">Tel.č. +421 907 695 363</span>
              </div>
              <div className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-gray-700">Mail: info@zrubko.sk</span>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Fakturačná adresa</h3>
            <div className="space-y-2">
              <div className="flex gap-3 items-center">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-gray-900">Zrubko s.r.o.</p>
                  <p className="text-gray-700">Žilina</p>
                  <p className="text-gray-700">Slovakia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Identification */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Identifikačné údaje</h3>
            <div className="space-y-2 text-sm">
              <div className="flex gap-4">
                <span className="text-gray-700">IČO:</span>
                <span className="font-medium text-gray-900">12345678</span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-700">DIČ:</span>
                <span className="font-medium text-gray-900">SK1234567890</span>
              </div>
              <div className="flex gap-4">
                <span className="text-gray-700">IČ DPH:</span>
                <span className="font-medium text-gray-900">SK1234567890</span>
              </div>
            </div>
          </div>

          {/* Bank Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Bankové informácie</h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-gray-900">Tatra Banka, a.s.</p>
              <div className="space-y-1">
                <div className="flex gap-4">
                  <span className="text-gray-700">IBAN:</span>
                  <span className="font-medium text-gray-900">SK86 1100 0000 0029 4707 1871</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-700">SWIFT:</span>
                  <span className="font-medium text-gray-900">TATRSKBX</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Našu predajňu nájdete tu</h3>
            <div className="w-full h-[250px] rounded-lg overflow-hidden border border-gray-200">
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
          </div>
        </div>

        {/* Right Column - Contact Form (Dark Teal Background) */}
        <div className="p-8 text-white rounded-lg shadow-sm lg:p-12 bg-primary">
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold">Kontakt</h2>
            <p className="text-white/80">
              Napíšte nám, čo plánujete, a my vám pomôžeme s výberom aj realizáciou.
            </p>
          </div>
          
          {/* Custom Contact Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium">
                  Krstné meno*
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Vaše krstné meno"
                  className="px-4 py-3 w-full text-white rounded-lg border transition-colors bg-white/10 border-white/20 placeholder-white/60 focus:outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium">
                  Priezvisko*
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Vaše priezvisko"
                  className="px-4 py-3 w-full text-white rounded-lg border transition-colors bg-white/10 border-white/20 placeholder-white/60 focus:outline-none focus:border-white/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email*
              </label>
              <input
                type="email"
                id="email"
                placeholder="Váš email"
                className="px-4 py-3 w-full text-white rounded-lg border transition-colors bg-white/10 border-white/20 placeholder-white/60 focus:outline-none focus:border-white/40"
              />
            </div>

            <div>
              <label htmlFor="city" className="block mb-2 text-sm font-medium">
                Mesto*
              </label>
              <input
                type="text"
                id="city"
                defaultValue="Košice"
                className="px-4 py-3 w-full text-white rounded-lg border transition-colors bg-white/10 border-white/20 placeholder-white/60 focus:outline-none focus:border-white/40"
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block mb-2 text-sm font-medium">
                Mobil*
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-sm">🇸🇰</span>
                </div>
                <input
                  type="tel"
                  id="mobile"
                  defaultValue="0912 123 456"
                  className="py-3 pr-4 pl-12 w-full text-white rounded-lg border transition-colors bg-white/10 border-white/20 placeholder-white/60 focus:outline-none focus:border-white/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium">
                Správa
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Vaša správa"
                className="px-4 py-3 w-full text-white rounded-lg border transition-colors resize-none bg-white/10 border-white/20 placeholder-white/60 focus:outline-none focus:border-white/40"
              ></textarea>
            </div>

            <div className="flex gap-3 items-start">
              <input
                type="checkbox"
                id="privacy"
                className="mt-1 w-4 h-4 rounded text-primary bg-white/10 border-white/20 focus:ring-primary focus:ring-2"
              />
              <label htmlFor="privacy" className="text-sm text-white/80">
                Súhlasím so Spracovaním osobných údajov
              </label>
            </div>

            <button
              type="submit"
              className="flex gap-2 justify-center items-center px-6 py-3 w-full font-medium text-white bg-orange-500 rounded-lg transition-colors hover:bg-orange-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Odoslať
                         </button>
           </form>
         </div>
       </div>
     </div>
   </div>
   )
 }
