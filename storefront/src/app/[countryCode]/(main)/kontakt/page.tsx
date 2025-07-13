import ContactForm from '@modules/common/components/contact-form'
import { Mail, MapPin, Phone, Crown, Sparkles, Clock, Shield, Heart, Star } from 'lucide-react'

export const metadata = {
  title: 'Kontakt - Zrubko',
  description: "Máte predstavu? My máme drevo a skúsenosti. Kontaktujte nás pre váš projekt.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10">
      {/* Hero sekcia */}
      <div className="relative overflow-hidden pt-[88px] min-h-[220px]">
        {/* Drevené pozadie */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('/drevo.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        ></div>
        {/* Jemný zelený overlay pre lepšiu čitateľnosť */}
        <div className="absolute inset-0 bg-primary/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-transparent to-primary/80 z-20"></div>
        <div className="relative z-30 content-container py-4">
          <h1 className="text-4xl lg:text-5xl font-light text-primary leading-tight mb-4 text-center">Kontakt</h1>
        </div>
      </div>

      {/* Hlavný obsah */}
      <div className="content-container pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Ľavý stĺpec - Kontaktné informácie */}
          <div className="space-y-10">
            {/* Prémiové výhody */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-primary/10">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-primary font-heading">Prečo si vybrať Zrubko?</h2>
              </div>
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary">Prémiová kvalita</h3>
                    <p className="text-primary/70 text-sm">Najvyššia kvalita dreva a materiálov</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary">Rýchle dodanie</h3>
                    <p className="text-primary/70 text-sm">Dodanie do 2-5 pracovných dní</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary">Osobný prístup</h3>
                    <p className="text-primary/70 text-sm">Individuálne poradenstvo pre každý projekt</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kontaktné karty */}
            <div className="space-y-8">
              {/* Telefón */}
              <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-primary/10 hover:shadow-3xl hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-all duration-300">
                    <Phone className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary font-heading">Zavolajte nám</h3>
                    <p className="text-primary/70">Pondelok – Piatok, 8:00 – 16:00</p>
                  </div>
                </div>
                <a 
                  href="tel:+421907695363" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-semibold hover:bg-primary-dark transition-all duration-300 hover:scale-105"
                >
                  +421 907 695 363
                </a>
              </div>

              {/* Email */}
              <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-primary/10 hover:shadow-3xl hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-all duration-300">
                    <Mail className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary font-heading">Napíšte nám</h3>
                    <p className="text-primary/70">Poradíme vám s výberom a technickými otázkami</p>
                  </div>
                </div>
                <a 
                  href="mailto:info@zrubko.sk" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-semibold hover:bg-primary-dark transition-all duration-300 hover:scale-105"
                >
                  info@zrubko.sk
                </a>
              </div>

              {/* Návšteva */}
              <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-primary/10 hover:shadow-3xl hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-all duration-300">
                    <MapPin className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary font-heading">Navštívte nás</h3>
                    <p className="text-primary/70">Pozrite si materiály naživo v našej predajni</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">Predajňa Zrubko</span>
                  </div>
                  <p className="text-primary/80 ml-6">
                    Žilina<br />
                    Slovakia
                  </p>
                   <a 
                     href="https://www.google.com/maps/dir/?api=1&destination=Predajňa+Zrubko,+Žilina" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-semibold hover:bg-primary-dark transition-all duration-300 hover:scale-105 mt-4"
                   >
                     Trasa
                   </a>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-primary/10">
              <h3 className="text-xl font-bold text-primary font-heading mb-4">Našu predajňu nájdete tu</h3>
              <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2613.9887890420147!2d19.1537885!3d49.0681225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4714f6c1e89fc3e3%3A0x2c8c7e0c7e0c7e0c!2sZrubko!5e0!3m2!1sen!2ssk!4v1620000000000!5m2!1sen!2ssk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                ></iframe>
              </div>
            </div>

            {/* Sociálne siete */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-primary/10">
              <h3 className="text-xl font-bold text-primary font-heading mb-6">Sledujte nás</h3>
              <div className="flex gap-4">
                <a href="#" className="group p-4 bg-primary/10 rounded-2xl transition-all duration-300 hover:bg-primary/20 hover:scale-110">
                  <svg className="w-6 h-6 text-primary group-hover:text-primary-dark transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="group p-4 bg-primary/10 rounded-2xl transition-all duration-300 hover:bg-primary/20 hover:scale-110">
                  <svg className="w-6 h-6 text-primary group-hover:text-primary-dark transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.683-.566 1.15-.748.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="group p-4 bg-primary/10 rounded-2xl transition-all duration-300 hover:bg-primary/20 hover:scale-110">
                  <svg className="w-6 h-6 text-primary group-hover:text-primary-dark transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Pravý stĺpec - Formulár */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-primary/10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-primary font-heading mb-2">Začnite váš projekt</h2>
                <p className="text-primary/70 text-base">
                  Napíšte nám, čo plánujete, a my vám pomôžeme s výberom aj realizáciou.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 