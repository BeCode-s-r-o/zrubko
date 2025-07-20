import { ArrowRight, Users, Award, Truck, Heart } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PageBreadcrumbs from "@modules/common/components/breadcrumbs/page-breadcrumbs"

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Breadcrumbs */}
      <PageBreadcrumbs 
        items={[
          { label: "O nás", isActive: true }
        ]}
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="px-6 mx-auto max-w-8xl">
          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-7xl font-light mb-6 leading-tight">
              O našej spoločnosti
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
              Viac ako 25 rokov sa venujeme kvalitnému drevu a pomáhame zákazníkom vytvárať jedinečné priestory
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-8xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Naša spoločnosť"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-2xl flex items-center justify-center">
                <Heart className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-light text-black mb-6 leading-tight">
                  Naša história a hodnoty
                </h2>
                <div className="w-24 h-px bg-black mb-6"></div>
              </div>

              <div className="space-y-6 text-lg text-black/70 leading-relaxed font-light">
                <p>
                  Spoločnosť Zrubko.sk vznikla v roku 1998 s cieľom prinášať na slovenský trh najkvalitnejšie drevené materiály a profesionálne poradenstvo.
                </p>
                <p>
                  Za viac ako dve desaťročia sme sa stali dôveryhodným partnerom pre tisíce zákazníkov, ktorí si vybrali naše produkty pre svoje domovy, firmy a projekty.
                </p>
                <p>
                  Naša filozofia je jednoduchá - kvalita, spoľahlivosť a zákaznícky servis na prvom mieste. Veríme, že každý projekt si zaslúži najlepšie materiály a odborné poradenstvo.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <LocalizedClientLink href="/kontakt">
                  <button className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 group">
                    Kontaktovať nás
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
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 mx-auto max-w-8xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center items-center w-16 h-16 bg-primary rounded-xl mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-light text-black mb-2">15 000+</div>
              <div className="text-black/60 font-light">Spokojných zákazníkov</div>
            </div>

            <div className="text-center">
              <div className="flex justify-center items-center w-16 h-16 bg-primary rounded-xl mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-light text-black mb-2">25+</div>
              <div className="text-black/60 font-light">Rokov skúseností</div>
            </div>

            <div className="text-center">
              <div className="flex justify-center items-center w-16 h-16 bg-primary rounded-xl mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-light text-black mb-2">50 000+</div>
              <div className="text-black/60 font-light">Doručených objednávok</div>
            </div>

            <div className="text-center">
              <div className="flex justify-center items-center w-16 h-16 bg-primary rounded-xl mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-light text-black mb-2">99%</div>
              <div className="text-black/60 font-light">Spokojnosť zákazníkov</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-8xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-light text-black mb-6 leading-tight">
              Náš tím
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-6"></div>
            <p className="text-xl text-black/60 max-w-2xl mx-auto leading-relaxed font-light">
              Skúsení odborníci, ktorí vám pomôžu vybrať najlepšie riešenie pre váš projekt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Peter Novák",
                position: "Generálny riaditeľ",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
              },
              {
                name: "Mária Kováčová",
                position: "Vedúca predaja",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
              },
              {
                name: "Ján Svoboda",
                position: "Technický poradca",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
              }
            ].map((member, index) => (
              <div key={index} className="text-center group">
                <div className="w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden bg-gray-100">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-medium text-black mb-2">{member.name}</h3>
                <p className="text-black/60 font-light">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 