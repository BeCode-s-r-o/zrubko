import { ArrowRight, Sparkles } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const images = [
  "/inspiration.jpg",
]


export default function InspirationSection() {
  return (
    <section className="py-8 md:py-12 lg:py-20 w-full bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="px-6 mx-auto max-w-8xl">
        <div className="grid grid-cols-1 gap-16 items-center lg:grid-cols-2">
          {/* Photo */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl">
              <img 
                src="/inspiration.jpg"
                alt="Inšpirácia pre váš projekt"
                className="object-cover w-full h-full"
              />
            </div>
    
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-6 text-3xl font-light leading-tight text-black lg:text 4xl">
                Premeníme víziu na realitu
              </h2>
              <div className="mb-6 w-24 h-px bg-black"></div>
            </div>

            <div className="space-y-6 text-lg font-light leading-relaxed text-black/70">
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

            <div className="flex flex-col gap-4 sm:flex-row">
              <LocalizedClientLink href="/vizualizacie">
                <button className="flex gap-3 items-center px-8 py-4 text-white rounded-lg transition-all duration-300 bg-primary hover:bg-primary-dark group">
                  Realizácie
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </LocalizedClientLink>
              
              <LocalizedClientLink href="/projekty">
                <button className="flex gap-3 items-center px-8 py-4 rounded-lg border transition-all duration-300 border-primary text-primary hover:bg-primary hover:text-white group">
                  Použité materiály
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </LocalizedClientLink>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="mb-1 text-2xl font-light text-black lg:text-3xl">500+</div>
                <div className="text-sm font-light text-black/60">Realizovaných projektov</div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-2xl font-light text-black lg:text-3xl">50+</div>
                <div className="text-sm font-light text-black/60">Dizajnových štýlov</div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-2xl font-light text-black lg:text-3xl">100%</div>
                <div className="text-sm font-light text-black/60">Spokojnosť klientov</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 