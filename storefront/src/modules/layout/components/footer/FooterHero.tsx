import { Heart, TreePine, Star } from "lucide-react"

export default function FooterHero() {
  return (
    <div className="py-8 text-center border-b border-gold/10">
      <div className="max-w-4xl mx-auto px-4">
        {/* Brand */}
        <div className="mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-ebony mb-4">
            Zrubko.sk
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-gold to-mahogany rounded-full mx-auto"></div>
        </div>
        
        {/* Description */}
        <p className="text-lg text-ebony-light leading-relaxed mb-12 max-w-2xl mx-auto">
          Vytváranie krásnych drevených riešení pre váš domov už viac ako 25 rokov. 
          Kvalita, tradícia a remeselná dokonalosť.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group">
            <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-ebony mb-1">15 000+</div>
            <div className="text-sm text-ebony-light">Spokojných zákazníkov</div>
          </div>
          
          <div className="group">
            <div className="w-12 h-12 bg-mahogany rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <TreePine className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-ebony mb-1">25+</div>
            <div className="text-sm text-ebony-light">Rokov tradície</div>
          </div>
          
          <div className="group">
            <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-ebony mb-1">100%</div>
            <div className="text-sm text-ebony-light">Prírodné materiály</div>
          </div>
        </div>
      </div>
    </div>
  )
} 