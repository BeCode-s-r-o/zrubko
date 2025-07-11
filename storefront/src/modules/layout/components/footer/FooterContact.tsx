import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function FooterContact() {
  return (
    <div className="py-8 border-b border-gold/15">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
        
        {/* Kontaktné informácie */}
        <div>
          <h4 className="font-bold text-ebony mb-6 text-lg">Kontaktné informácie</h4>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gold/10 rounded-lg border border-gold/20">
                <Mail className="w-5 h-5 text-gold-dark" />
              </div>
              <div>
                <a href="mailto:info@zrubko.sk" className="text-ebony hover:text-gold-dark font-medium transition-colors">
                  info@zrubko.sk
                </a>
                <p className="text-sm text-ebony-light">Napíšte nám kedykoľvek</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gold/10 rounded-lg border border-gold/20">
                <Phone className="w-5 h-5 text-gold-dark" />
              </div>
              <div>
                <a href="tel:+421900000000" className="text-ebony hover:text-gold-dark font-medium transition-colors">
                  +421 900 000 000
                </a>
                <p className="text-sm text-ebony-light">Pondelok - Piatok</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gold/10 rounded-lg border border-gold/20">
                <MapPin className="w-5 h-5 text-gold-dark" />
              </div>
              <div>
                <span className="text-ebony font-medium">Drevená ulica 123</span>
                <p className="text-sm text-ebony-light">Bratislava 12345, Slovensko</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gold/10 rounded-lg border border-gold/20">
                <Clock className="w-5 h-5 text-gold-dark" />
              </div>
              <div>
                <span className="text-ebony font-medium">Otváracie hodiny</span>
                <p className="text-sm text-ebony-light">Po-Pia: 8:00 - 18:00</p>
                <p className="text-sm text-ebony-light">So: 9:00 - 14:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div>
          <h4 className="font-bold text-ebony mb-6 text-lg">Kde nás nájdete</h4>
          
          <div className="h-64 bg-gold/5 rounded-lg border border-gold/20 overflow-hidden relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2613.9887890420147!2d19.1537885!3d49.0681225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4714f6c1e89fc3e3%3A0x2c8c7e0c7e0c7e0c!2sZrubko!5e0!3m2!1sen!2ssk!4v1620000000000!5m2!1sen!2ssk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
          
          <p className="text-sm text-ebony-light mt-3 text-center">
            Kliknite na mapu pre navigáciu
          </p>
        </div>
      </div>
    </div>
  )
} 