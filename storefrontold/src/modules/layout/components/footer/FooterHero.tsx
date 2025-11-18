import { Heart, TreePine, Star, Award, Shield, Users } from "lucide-react"

export default function FooterHero() {
  return (
    <div className="py-16 text-center border-b border-gold/20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Luxusný brand */}
        <div className="mb-16">
          <h2 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent mb-6 tracking-wide">
            Zrubko.sk
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-gold via-gold-light to-gold rounded-full mx-auto mb-6 shadow-lg shadow-gold/25"></div>
          <p className="text-xl text-gold/80 font-light tracking-wide">LUXUSNÁ TRADÍCIA V DREVE</p>
        </div>
        
        {/* Elegantný popis */}
        <div className="mb-16">
          <p className="text-xl text-champagne/90 leading-relaxed mb-6 max-w-3xl mx-auto font-light">
            Vytváranie výnimočných drevených riešení pre náročných zákazníkov už viac ako 25 rokov.
          </p>
          <p className="text-lg text-champagne/70 leading-relaxed max-w-2xl mx-auto">
            Kombinujeme tradičné remeselné techniky s modernými technológiami pre dokonalý výsledok.
          </p>
        </div>
        
        {/* Luxusné štatistiky */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-ebony-light/80 to-ebony/60 p-8 rounded-2xl border border-gold/30 backdrop-blur-sm hover:border-gold/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold/25 group-hover:shadow-gold/40 transition-all duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gold mb-2">15 000+</div>
              <div className="text-champagne/80 font-medium">Spokojných zákazníkov</div>
              <div className="text-sm text-champagne/60 mt-1">v celej Európe</div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-ebony-light/80 to-ebony/60 p-8 rounded-2xl border border-gold/30 backdrop-blur-sm hover:border-gold/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold/25 group-hover:shadow-gold/40 transition-all duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gold mb-2">25+</div>
              <div className="text-champagne/80 font-medium">Rokov tradície</div>
              <div className="text-sm text-champagne/60 mt-1">a remeselnej dokonalosti</div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-ebony-light/80 to-ebony/60 p-8 rounded-2xl border border-gold/30 backdrop-blur-sm hover:border-gold/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold/25 group-hover:shadow-gold/40 transition-all duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gold mb-2">100%</div>
              <div className="text-champagne/80 font-medium">Prírodné materiály</div>
              <div className="text-sm text-champagne/60 mt-1">najvyššej kvality</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 