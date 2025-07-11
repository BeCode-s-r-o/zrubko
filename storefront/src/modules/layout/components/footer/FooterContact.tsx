import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function FooterContact() {
  return (
    <div className="py-8 border-b border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Kontaktné informácie */}
        <div>
          <h4 className="font-medium text-white mb-4 text-base">Kontaktné informácie</h4>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-white mt-0.5" />
              <div>
                <a href="mailto:info@zrubko.sk" className="text-white hover:text-white/80 font-medium transition-colors text-sm">
                  info@zrubko.sk
                </a>
                <p className="text-xs text-white/70">Napíšte nám kedykoľvek</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-white mt-0.5" />
              <div>
                <a href="tel:+421900000000" className="text-white hover:text-white/80 font-medium transition-colors text-sm">
                  +421 900 000 000
                </a>
                <p className="text-xs text-white/70">Pondelok - Piatok</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-white mt-0.5" />
              <div>
                <span className="text-white font-medium text-sm">Drevená ulica 123</span>
                <p className="text-xs text-white/70">Bratislava 12345, Slovensko</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-white mt-0.5" />
              <div>
                <span className="text-white font-medium text-sm">Otváracie hodiny</span>
                <p className="text-xs text-white/70">Po-Pia: 8:00 - 18:00</p>
                <p className="text-xs text-white/70">So: 9:00 - 14:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div>
          <h4 className="font-medium text-white mb-4 text-base">Kde nás nájdete</h4>
          
          <div className="h-48 bg-white/10 rounded-lg border border-white/10 overflow-hidden relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2613.9887890420147!2d19.1537885!3d49.0681225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4714f6c1e89fc3e3%3A0x2c8c7e0c7e0c7e0c!2sZrubko!5e0!3m2!1sen!2ssk!4v1620000000000!5m2!1sen!2ssk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
          
          <p className="text-xs text-white/70 mt-2 text-center">
            Kliknite na mapu pre navigáciu
          </p>
        </div>
      </div>
    </div>
  )
} 