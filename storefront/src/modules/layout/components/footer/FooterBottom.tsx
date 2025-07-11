import { Facebook, Instagram, Twitter } from "lucide-react"

export default function FooterBottom() {
  return (
    <div className="py-6 bg-gold/5">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4">
        
        {/* Copyright */}
        <div className="text-center md:text-left">
          <span className="text-ebony font-medium">© {new Date().getFullYear()} Zrubko</span>
          <p className="text-sm text-ebony-light">Všetky práva vyhradené</p>
        </div>
        
        {/* Social Links */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-ebony-light">Sledujte nás:</span>
          <div className="flex gap-3">
            <a 
              href="#" 
              className="p-2 bg-gold/10 hover:bg-gold/20 rounded-lg transition-all duration-300 hover:scale-105 border border-gold/20"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4 text-gold-dark" />
            </a>
            <a 
              href="#" 
              className="p-2 bg-gold/10 hover:bg-gold/20 rounded-lg transition-all duration-300 hover:scale-105 border border-gold/20"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 text-gold-dark" />
            </a>
            <a 
              href="#" 
              className="p-2 bg-gold/10 hover:bg-gold/20 rounded-lg transition-all duration-300 hover:scale-105 border border-gold/20"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4 text-gold-dark" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 