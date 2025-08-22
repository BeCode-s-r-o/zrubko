"use client"

import { ArrowRight, Users, Award, Truck, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PageBreadcrumbs from "@modules/common/components/breadcrumbs/page-breadcrumbs"
import LandingBanner from "@modules/common/components/landing-banner"
import { useRef } from "react"

export default function AboutPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -250, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 250, behavior: 'smooth' })
    }
  }

  return (
    <div className="">
    

      {/* Hero Section - using reusable component */}
      <LandingBanner
        title="Zrubko "
        subtitle="Záruka kvality v každom kúsku dreva"
        backgroundImage="https://console-production-f027.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=o-nas%2Fo-nas_banner.webp&version_id=null"
        backgroundColor="from-primary/70 via-transparent to-primary/80"
        textColor="text-white"
        overlay="dark"
      />

      
      {/* Breadcrumbs */}
      <PageBreadcrumbs className='max-w-7xl mx-auto'
        items={[
          { label: "O nás", isActive: true }
        ]}
      />

      {/* Main Content */}
      <section className="bg-white">
        <div className="py-5 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content - First on mobile, first on desktop */}
            <div className="space-y-8 p-4 md:p-0 order-1 lg:order-1">
              <div>
                <h2 className="mb-4 text-3xl font-light leading-tight text-black lg:text-4xl">
                  O nás
                </h2>
                <div className="w-24 h-px bg-black mb-6"></div>
              </div>

              <div className="space-y-6 text-lg text-black/70 leading-relaxed font-light">
                <p>
                V Zrubko veríme, že drevo nie je len materiál, ale základ pre tvorbu útulných a trvácnych priestorov. Dodávame na slovenský trh kvalitné drevené produkty, ktoré spájajú remeselnú precíznosť, prírodnú krásu a moderný dizajn.
                </p>
                <p>
                Našou misiou je poskytovať zákazníkom nielen materiál, ale aj odborné poradenstvo a spoľahlivý servis. Či už ide o obklady, podlahy, terasové dosky alebo konštrukčné drevo, každý kus prechádza starostlivým výberom, aby splnil naše prísne štandardy kvality.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <LocalizedClientLink href="/projekty">
                  <button className="flex items-center gap-3 px-8 py-4 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300 group">
                    Pozrieť ponuku
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </LocalizedClientLink>

                <LocalizedClientLink href="/kontakt">
                  <button className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 group">
                    Kontaktovať nás
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </LocalizedClientLink>
              </div>
            </div>

            {/* Photo - Second on mobile, second on desktop */}
            <div className="relative order-2 lg:order-2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 max-w-md mx-auto lg:max-w-none">
                <img 
                  src="https://console-production-f027.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=o-nas%2Fo-onas_banner_2.webp&version_id=null"
                  alt="Skladové zásoby kvalitného reziva pripravené na expedíciu"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          {/* Desktop Layout - Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
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
              <div className="text-3xl lg:text-4xl font-light text-black mb-2">98%</div>
              <div className="text-black/60 font-light">Spokojnosť zákazníkov</div>
            </div>
          </div>

          {/* Mobile Layout - Horizontal Scrolling with Navigation */}
          <div className="md:hidden">
            <div className="relative">
              {/* Left Arrow */}
              <button 
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              {/* Right Arrow */}
              <button 
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>

              {/* Scrollable Container */}
              <div 
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-4 px-12 scrollbar-hide"
              >
                <div className="text-center min-w-[200px] flex-shrink-0">
                  <div className="flex justify-center items-center w-16 h-16 bg-primary rounded-xl mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-light text-black mb-2">15 000+</div>
                  <div className="text-black/60 font-light text-sm">Spokojných zákazníkov</div>
                </div>

                <div className="text-center min-w-[200px] flex-shrink-0">
                  <div className="flex justify-center items-center w-16 h-16 bg-primary rounded-xl mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-light text-black mb-2">25+</div>
                  <div className="text-black/60 font-light text-sm">Rokov skúseností</div>
                </div>

                <div className="text-center min-w-[200px] flex-shrink-0">
                  <div className="flex justify-center items-center w-16 h-16 bg-primary rounded-xl mx-auto mb-4">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-light text-black mb-2">50 000+</div>
                  <div className="text-black/60 font-light text-sm">Doručených objednávok</div>
                </div>

                <div className="text-center min-w-[200px] flex-shrink-0">
                  <div className="flex justify-center items-center w-16 h-16 bg-primary rounded-xl mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-light text-black mb-2">98%</div>
                  <div className="text-black/60 font-light text-sm">Spokojnosť zákazníkov</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-light leading-tight text-black lg:text-4xl">
              Náš tím
            </h2>
            <div className="w-24 h-px bg-black mx-auto mb-6"></div>
            <p className="text-xl text-black/60 max-w-2xl mx-auto leading-relaxed font-light">
              Skúsení odborníci, ktorí vám pomôžu vybrať najlepšie riešenie pre váš projekt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {[
              {
                name: "Ján Mindek",
                position: "CEO / konateľ",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
              },
              
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
                <p className="text-black/60">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 