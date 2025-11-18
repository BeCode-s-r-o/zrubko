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
      {/* Hero Section - using reusable component */}
      <LandingBanner
        title="Kontakt"
        subtitle="Máte predstavu? My máme drevo a skúsenosti."
        backgroundImage="https://console-production-f027.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=kontakt%2Fkontakt_banner.webp&version_id=null"
        backgroundColor="from-primary/70 via-transparent to-primary/80"
        textColor="text-white"
        overlay="dark"
      />

      {/* Breadcrumbs */}
      <PageBreadcrumbs className='max-w-7xl mx-auto'
        items={[
          { label: "Kontakt", isActive: true }
        ]}
      />

      {/* Main Content - Two Rows Layout */}
      <div className="mx-auto max-w-7xl">
        {/* First Row - Company Information in Two Columns */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* First Column - Contact Information */}
          <div className="space-y-6">
            {/* Contact Information - Combined Card */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-xl border border-primary/10 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Kontaktné informácie</h3>

              {/* Operating Hours Section */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Prevádzkové hodiny</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 px-4 bg-white/70 rounded-lg shadow-sm">
                    <span className="text-gray-700 font-medium">Po - Pi</span>
                    <span className="font-semibold text-primary text-lg">7:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-red-50 rounded-lg shadow-sm">
                    <span className="text-gray-700 font-medium">So - Ne</span>
                    <span className="font-semibold text-red-600 text-lg">ZATVORENÉ</span>
                  </div>
                </div>
              </div>

              {/* Store Address Section */}
              <div className="mb-8">
                <a href="https://www.google.com/maps/place/Hviezdoslavova+1118,+024+01+Kysuck%C3%A9+Nov%C3%A9+Mesto,+Slovakia/@49.3040271,18.7817497,17z/data=!3m1!4b1!4m6!3m5!1s0x4714434aeeb6b70f:0x74178ef6095d00ff!2sHviezdoslavova+1118,+024+01+Kysuck%C3%A9+Nov%C3%A9+Mesto,+Slovakia!5e0!3m2!1ssk!2ssk!4v1754941903082!5m2!1ssk!2ssk"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="group block">
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-secondary transition-colors mb-4">Adresa Predajne</h4>
                </a>
                <div className="space-y-2">
                  <p className="text-gray-700 text-lg">Hviezdoslavova 1118</p>
                  <p className="text-gray-900 font-semibold text-lg">Kysucké Nové Mesto</p>
                  <p className="text-gray-700">024 01, Slovensko</p>
                </div>
              </div>

              {/* Customer Support Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Zákaznícka podpora</h4>
                <div className="space-y-3">
                  <a href="tel:+421911869777" className="block p-4 bg-white/70 rounded-lg hover:bg-white transition-all duration-300 group shadow-sm">
                    <span className="text-gray-900 group-hover:text-primary transition-colors font-medium text-lg">+421 911 869 777</span>
                  </a>
                  <a href="mailto:info@zrubko.sk" className="block p-4 bg-white/70 rounded-lg hover:bg-white transition-all duration-300 group shadow-sm">
                    <span className="text-gray-900 group-hover:text-secondary transition-colors font-medium text-lg">info@zrubko.sk</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Second Column - Company Details */}
          <div className="space-y-6">
            {/* Company Details - Combined Card */}
            <div className="bg-gradient-to-br from-secondary/10 to-primary/5 p-8 rounded-xl border border-secondary/20 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Firemné údaje</h3>

              {/* Billing Address Section */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Fakturačná adresa</h4>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900 text-lg">Zrubko s.r.o.</p>
                  <p className="text-gray-700">Pribinova 3030/30</p>
                  <p className="text-gray-700">010 01 Žilina</p>
                  <p className="text-gray-700">Slovensko</p>
                </div>
              </div>

              {/* Company Identification Section */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Identifikačné údaje</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-3 px-4 bg-white/70 rounded-lg shadow-sm">
                    <span className="text-gray-700 font-medium">IČO:</span>
                    <span className="font-semibold text-primary text-lg">55933190</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-white/70 rounded-lg shadow-sm">
                    <span className="text-gray-700 font-medium">DIČ:</span>
                    <span className="font-semibold text-secondary text-lg">2122132529</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-white/70 rounded-lg shadow-sm">
                    <span className="text-gray-700 font-medium">IČ DPH:</span>
                    <span className="font-semibold text-primary text-lg">SK2122132529</span>
                  </div>
                </div>
              </div>

              {/* Bank Information Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Bankové informácie</h4>
                <div className="space-y-3">
                  <p className="font-semibold text-gray-900 text-lg">Tatra Banka, a.s.</p>
                  <div className="bg-white/70 rounded-lg p-4 shadow-sm">
                    <div className="text-sm text-gray-600 mb-2">IBAN:</div>
                    <div className="font-mono text-base font-semibold text-primary break-all">SK98 1100 0000 0029 4316 9345</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row - Contact Form Full Width */}
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary"></div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative p-6 lg:p-8 text-white">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold leading-tight lg:text-3xl mb-3">Kontaktujte nás</h2>
                <p className="text-white/90 text-base leading-relaxed max-w-xl">
                  Napíšte nám, čo plánujete, a my vám pomôžeme s výberom aj realizáciou vášho projektu.
                </p>
              </div>

              {/* Custom Contact Form */}
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block mb-1 text-sm font-medium">
                       Meno*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="Vaše meno"
                      className="px-3 py-2 w-full text-white rounded-md border transition-colors bg-white/10 border-white/20 placeholder-white/60 focus:outline-none focus:border-white/40 text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block mb-1 text-sm font-medium">
                      Priezvisko*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Vaše priezvisko"
                      className="px-3 py-2 w-full text-white rounded-md border transition-colors bg-white/10 border-white/20 placeholder-white/60 focus:outline-none focus:border-white/40 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Váš email"
                      className="px-3 py-2 w-full text-white rounded-md border transition-colors bg-white/10 border-white/20 placeholder-white/60 focus:outline-none focus:border-white/40 text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block mb-1 text-sm font-medium">
                      Mesto*
                    </label>
                    <input
                      type="text"
                      id="city"
                      placeholder="Vaše mesto"
                      className="px-3 py-2 w-full text-white rounded-md border transition-colors bg-white/10 border-white/20 placeholder-white/60 focus:outline-none focus:border-white/40 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="mobile" className="block mb-1 text-sm font-medium">
                    Telefón*
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    placeholder="Vaše telefónne číslo"
                    className="px-3 py-2 w-full text-white rounded-md border transition-colors bg-white/10 border-white/20 placeholder-white/60 focus:outline-none focus:border-white/40 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-1 text-sm font-medium">
                    Správa
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Vaša správa"
                    className="px-3 py-2 w-full text-white rounded-md border transition-colors resize-none bg-white/10 border-white/20 placeholder-white/60 focus:outline-none focus:border-white/40 text-sm"
                  ></textarea>
                </div>

                <div className="flex gap-2 items-start">
                  <input
                    type="checkbox"
                    id="privacy"
                    className="mt-0.5 w-4 h-4 rounded text-secondary bg-white/10 border-white/20 focus:ring-secondary focus:ring-2"
                  />
                  <label htmlFor="privacy" className="text-xs text-white/80">
                    Súhlasím so{' '}
                    <a href="/privacy" className="underline hover:text-white transition-colors">
                      Spracovaním osobných údajov
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="flex gap-3 justify-center items-center px-6 py-3 w-auto mx-auto font-medium text-base text-primary bg-white/95 backdrop-blur-sm rounded-full border border-white/20 shadow-lg transition-all duration-300 hover:bg-white hover:shadow-xl hover:scale-105 active:scale-95 hover:border-white/40"
                >
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Odoslať</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section - Enhanced Design */}
        <div className="mt-16 mb-16">
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-semibold text-gray-900 mb-4">Naša lokácia</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Navštívte nás osobne v našej predajni alebo nás kontaktujte pre konzultáciu vášho projektu.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Map */}
              <div className="lg:col-span-2">
                <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2601.5415505096144!2d18.781749677105715!3d49.304027071396106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4714434aeeb6b70f%3A0x74178ef6095d00ff!2sHviezdoslavova%201118%2C%20024%2001%20Kysuck%C3%A9%20Nov%C3%A9%20Mesto!5e0!3m2!1ssk!2ssk!4v1754941903082!5m2!1ssk!2ssk"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl">
                  </iframe>

                  {/* Map overlay with address */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-gray-900">Zrubko s.r.o.</span>
                    </div>
                    <p className="text-sm text-gray-700">Hviezdoslavova 1118</p>
                    <p className="text-sm text-gray-700">024 01 Kysucké Nové Mesto</p>
                  </div>
                </div>
              </div>

              {/* Contact Info Sidebar */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Rýchly kontakt</h4>

                  <div className="space-y-4">
                    <a href="tel:+421911869777" className="block p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-all duration-300 group">
                      <div className="font-medium text-gray-900">Volejte nám</div>
                      <div className="text-sm text-gray-600">+421 911 869 777</div>
                    </a>

                    <a href="mailto:info@zrubko.sk" className="block p-3 bg-secondary/5 rounded-lg hover:bg-secondary/10 transition-all duration-300 group">
                      <div className="font-medium text-gray-900">Napíšte nám</div>
                      <div className="text-sm text-gray-600">info@zrubko.sk</div>
                    </a>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-gray-900">Otváracie hodiny</div>
                      <div className="text-sm text-gray-600">Po - Pi: 7:00 - 17:00</div>
                      <div className="text-sm text-red-600">So - Ne: Zatvorené</div>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/place/Hviezdoslavova+1118,+024+01+Kysuck%C3%A9+Nov%C3%A9+Mesto,+Slovakia/@49.3040271,18.7817497,17z/data=!3m1!4b1!4m6!3m5!1s0x4714434aeeb6b70f:0x74178ef6095d00ff!2sHviezdoslavova+1118,+024+01+Kysuck%C3%A9+Nov%C3%A9+Mesto,+Slovakia!5e0!3m2!1ssk!2ssk!4v1754941903082!5m2!1ssk!2ssk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-secondary text-white font-medium py-2 px-4 rounded-lg hover:bg-secondary/90 transition-all duration-300 text-center hover:shadow-lg"
                >
                  Otvoriť v Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}