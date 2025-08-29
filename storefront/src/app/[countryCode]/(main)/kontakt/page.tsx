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
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* First Column - Company Information */}
          <div className="p-8 space-y-8 bg-white rounded-lg shadow-sm ">
            {/* Operating Hours */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Prevádzkové hodiny</h3>
              <div className="space-y-2">
                <div className="flex gap-4">
                  <span className="text-gray-700">Po - Pi</span>
                  <span className="font-medium text-gray-900">7:00 - 17:00</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-700">So - Ne</span>
                  <span className="font-medium text-gray-900">ZATVORENÉ</span>
                </div>
              </div>
            </div>

            {/* Store Address */}
            <div className="space-y-4">
              <a href="https://www.google.com/maps/place/Hviezdoslavova+1118,+024+01+Kysuck%C3%A9+Nov%C3%A9+Mesto,+Slovakia/@49.3040271,18.7817497,17z/data=!3m1!4b1!4m6!3m5!1s0x4714434aeeb6b70f:0x74178ef6095d00ff!2sHviezdoslavova+1118,+024+01+Kysuck%C3%A9+Nov%C3%A9+Mesto,+Slovakia!5e0!3m2!1ssk!2ssk!4v1754941903082!5m2!1ssk!2ssk" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="hover:text-primary transition-colors underline">
                <h3 className="text-xl font-semibold text-gray-900">Adresa Predajne</h3>
              </a>

              <div className="space-y-2">
                <div className="flex gap-3 items-center">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-gray-700">Hviezdoslavova 1118</p>
                    <p className="font-medium text-gray-900">Kysucké Nové Mesto</p>
                    <p className="text-gray-700">024 01</p>
                    
                    <p className="text-gray-700">Slovenska republika</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Support */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Zákaznícka podpora</h3>
              <div className="space-y-3">
                <div className="flex gap-3 items-center">
                  <Phone className="w-5 h-5 text-primary" />
                  <a href="tel:+421911869777" className="text-gray-700 hover:text-primary transition-colors underline">
                    +421 911 869 777
                  </a>
                </div>
                <div className="flex gap-3 items-center">
                  <Mail className="w-5 h-5 text-primary" />
                  <a href="mailto:info@zrubko.sk" className="text-gray-700 hover:text-primary transition-colors underline">
                    info@zrubko.sk
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Second Column - Billing and Company Info */}
          <div className="p-8 space-y-8 bg-white rounded-lg shadow-sm">
            {/* Billing Address */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Fakturačná adresa</h3>
              <div className="space-y-2">
                <div className="flex gap-3 items-center">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-gray-900">Zrubko s.r.o.</p>
                    <p className="text-gray-700">Pribinova 3030/30</p>
                    <p className="text-gray-700">010 01 Žilina</p>
                    <p className="text-gray-700">Slovensko</p>
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
                  <span className="font-medium text-gray-900">55933190</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-700">DIČ:</span>
                  <span className="font-medium text-gray-900">2122132529</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-700">IČ DPH:</span>
                  <span className="font-medium text-gray-900">SK2122132529</span>
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
                    <span className="font-medium text-gray-900">SK98 1100 0000 0029 4316 9345</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row - Contact Form Full Width */}
        <div className="mb-8">
          <div className="p-8 text-white rounded-lg shadow-sm lg:p-12 bg-primary">
            <div className="mb-8">
              <h2 className="mb-4 text-3xl font-light leading-tight text-white lg:text-4xl">Kontaktujte nás</h2>
              <p className="text-white/80">
                Napíšte nám, čo plánujete, a my vám pomôžeme s výberom aj realizáciou.
              </p>
            </div>
            
            {/* Custom Contact Form */}
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block mb-2 text-sm font-medium">
                     Meno*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Vaše meno"
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
                  placeholder="Vaše mesto"
                  className="px-4 py-3 w-full text-white rounded-lg border transition-colors bg-white/10 border-white/20 placeholder-white/60 focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label htmlFor="mobile" className="block mb-2 text-sm font-medium">
                  Telefón*
                </label>
                <input
                  type="tel"
                  id="mobile"
                  placeholder="Vaše telefónne číslo"
                  className="px-4 py-3 w-full text-white rounded-lg border transition-colors bg-white/10 border-white/20 placeholder-white/60 focus:outline-none focus:border-white/40"
                />
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
                  Súhlasím so{' '}
                  <a href="/privacy" className="underline hover:text-white transition-colors">
                    Spracovaním osobných údajov
                  </a>
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

        {/* Map Section - Full Width Below */} 
        <div className="mt-12 mb-12 ">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 text-center md:p-0">
              <a href="https://www.google.com/maps/place/Hviezdoslavova+1118,+024+01+Kysuck%C3%A9+Nov%C3%A9+Mesto,+Slovakia/@49.3040271,18.7817497,17z/data=!3m1!4b1!4m6!3m5!1s0x4714434aeeb6b70f:0x74178ef6095d00ff!2sHviezdoslavova+1118,+024+01+Kysuck%C3%A9+Nov%C3%A9+Mesto,+Slovakia!5e0!3m2!1ssk!2ssk!4v1754941903082!5m2!1ssk!2ssk" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="hover:text-primary transition-colors underline">
                Našu predajňu nájdete tu
              </a>
            </h3>
            <div className="w-full h-[450px] rounded-lg overflow-hidden border border-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2601.5415505096144!2d18.781749677105715!3d49.304027071396106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4714434aeeb6b70f%3A0x74178ef6095d00ff!2sHviezdoslavova%201118%2C%20024%2001%20Kysuck%C3%A9%20Nov%C3%A9%20Mesto!5e0!3m2!1ssk!2ssk!4v1754941903082!5m2!1ssk!2ssk" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
