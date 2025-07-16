import { ArrowRight, Sparkles } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function InspirationSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 w-full">
      <div className="px-6 mx-auto max-w-8xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Inšpirácia pre váš projekt"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-light text-black mb-6 leading-tight">
                Inšpirácia pre váš projekt
              </h2>
              <div className="w-24 h-px bg-black mb-6"></div>
            </div>

            <div className="space-y-6 text-lg text-black/70 leading-relaxed font-light">
              <p>
                Objavte nekonečné možnosti drevených materiálov v našej galérii realizovaných projektov. 
                Každý projekt je jedinečný a môže byť inšpiráciou pre váš vlastný.
              </p>
              <p>
                Od moderných interiérov po tradičné exteriéry, naša kolekcia obsahuje rôzne štýly a riešenia, 
                ktoré vám pomôžu vizualizovať potenciál drevených materiálov vo vašom priestore.
              </p>
              <p>
                Nechajte sa inšpirovať skutočnými príkladmi a vytvorte si vlastný jedinečný dizajn s našimi 
                kvalitnými drevenými produktmi.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <LocalizedClientLink href="/vizualizacie">
                <button className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 group">
                  Prezrieť galériu
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </LocalizedClientLink>
              
              <LocalizedClientLink href="/projekty">
                <button className="flex items-center gap-3 px-8 py-4 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300 group">
                  Naše projekty
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </LocalizedClientLink>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-light text-black mb-1">500+</div>
                <div className="text-sm text-black/60 font-light">Realizovaných projektov</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-light text-black mb-1">50+</div>
                <div className="text-sm text-black/60 font-light">Dizajnových štýlov</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-light text-black mb-1">100%</div>
                <div className="text-sm text-black/60 font-light">Spokojnosť klientov</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 