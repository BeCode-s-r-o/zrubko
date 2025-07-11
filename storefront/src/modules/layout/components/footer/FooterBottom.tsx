import { Facebook, Instagram, Twitter } from "lucide-react"

export default function FooterBottom() {
  return (
    <div className="py-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Copyright */}
        <div className="text-center md:text-left">
          <span className="text-white font-medium text-sm">© {new Date().getFullYear()} Zrubko</span>
          <p className="text-xs text-white/60">Všetky práva vyhradené</p>
        </div>
        
        {/* Social Links */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/60">Sledujte nás:</span>
          <div className="flex gap-2">
            <a 
              href="#" 
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4 text-white" />
            </a>
            <a 
              href="#" 
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 text-white" />
            </a>
            <a 
              href="#" 
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 