import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import Categories from "@modules/home/components/categories"
import { getRegion } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import InfoStepsSection from "@modules/home/components/info-steps-section"
import FavoriteProductsSection from "@modules/home/components/favorite-products-section"
import ScrollingBar from "@modules/home/components/ScrollingBar"
import HomepageAccordion from "@modules/home/components/HomepageAccordion"
import WoodConfiguratorSection from "@modules/home/components/wood-configurator-section"

export const metadata: Metadata = {
  title: "Zrubko.sk - Luxusné drevené riešenia pre váš domov",
  description:
    "Objavte našu kolekciu prémiových drevených produktov. Kvalitné drevo na mieru, remeselná dokonalosť a nezabudnuteľný dizajn pre váš domov a záhradu.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const region = await getRegion(countryCode)
  const categories = await listCategories()

  if (!region) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />
      
      {/* Scrolling Bar */}
      <ScrollingBar />
      
      {/* Categories */}
      <div className="bg-slate-50">
        <Categories categories={categories} />
      </div>
      
      {/* Info Steps */}
      <InfoStepsSection />
      
      {/* Wood Configurator */}
      <WoodConfiguratorSection />
      
      {/* Favorite Products */}
      <FavoriteProductsSection countryCode={countryCode} region={region} />
      
      {/* Inspiration Section */}
      <div className="py-16 bg-slate-50">
        <div className="content-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-black mb-6 leading-tight">
              Inšpirácia pre váš projekt
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-8"></div>
            <p className="text-xl text-black/60 max-w-3xl mx-auto leading-relaxed font-light">
              Objavte možnosti použitia našich produktov v rôznych priestoroch a projektoch
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Interiér */}
            <div className="bg-white rounded-lg shadow-sm border border-black/10 overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] bg-slate-100 relative">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop"
                  alt="Interiér s drevenými obkladmi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1a2e1a] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Interiér
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-black mb-2">Obklady stien</h3>
                <p className="text-black/60 font-light">
                  Vytvorte útulný interiér s prémiovými drevenými obkladmi a podlahami
                </p>
              </div>
            </div>

            {/* Exteriér */}
            <div className="bg-white rounded-lg shadow-sm border border-black/10 overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] bg-slate-100 relative">
                <img 
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop"
                  alt="Exteriér s drevenými fasádami"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1a2e1a] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Exteriér
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-black mb-2">Fasády a terasy</h3>
                <p className="text-black/60 font-light">
                  Ochráňte a skrášlite svoj domov s odolnými fasádami a terasami
                </p>
              </div>
            </div>

            {/* Sauna */}
            <div className="bg-white rounded-lg shadow-sm border border-black/10 overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] bg-slate-100 relative">
                <img 
                  src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop"
                  alt="Sauna s drevenými doskami"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1a2e1a] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Wellness
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-black mb-2">Sauny a wellness</h3>
                <p className="text-black/60 font-light">
                  Vytvorte si osobný wellness priestor s cédrových a smrekových dosiek
                </p>
              </div>
            </div>

            {/* Záhrada */}
            <div className="bg-white rounded-lg shadow-sm border border-black/10 overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] bg-slate-100 relative">
                <img 
                  src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop"
                  alt="Záhradné drevené prvky"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1a2e1a] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Záhrada
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-black mb-2">Záhradná architektúra</h3>
                <p className="text-black/60 font-light">
                  Doplňte záhradu o prírodné drevené prvky a konštrukcie
                </p>
              </div>
            </div>

            {/* Komerčné */}
            <div className="bg-white rounded-lg shadow-sm border border-black/10 overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] bg-slate-100 relative">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
                  alt="Komerčné priestory s drevom"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1a2e1a] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Komerčné
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-black mb-2">Komerčné priestory</h3>
                <p className="text-black/60 font-light">
                  Vytvorte reprezentatívne kancelárske a obchodné priestory
                </p>
              </div>
            </div>

            {/* Renovácie */}
            <div className="bg-white rounded-lg shadow-sm border border-black/10 overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] bg-slate-100 relative">
                <img 
                  src="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop"
                  alt="Renovované priestory s drevom"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1a2e1a] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Renovácie
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-black mb-2">Renovácie a rekonštrukcie</h3>
                <p className="text-black/60 font-light">
                  Obnovte staré priestory a dodajte im moderný vzhľad
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ */}
      <div className="py-16 bg-white">
        <HomepageAccordion />
      </div>
    </div>
  )
}
