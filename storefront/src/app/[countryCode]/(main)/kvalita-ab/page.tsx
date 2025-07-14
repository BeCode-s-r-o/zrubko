import { Metadata } from "next"
import { StarIcon, ShieldCheckIcon, TreePineIcon, AwardIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Kvalita drevených profilov AB - Zrubko",
  description: "Detailné informácie o kvalite drevených profilov triedy AB - najvyššia kvalita s minimálnymi sukami a defektmi.",
}

export default async function KvalitaABPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      {/* Header s breadcrumb */}
      <div className="bg-white border-b border-accent-light/30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <nav className="text-sm">
            <a href="/" className="text-gray-500 hover:text-accent transition-colors">Domov</a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-accent font-medium">Kvalita drevených profilov AB</span>
          </nav>
        </div>
      </div>

      {/* Hero sekcia s drevou textúrou na pozadí */}
      <div className="bg-gradient-to-r from-accent to-accent-dark text-white py-20 relative overflow-hidden">
        {/* Wood texture background */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.3'%3E%3Cpath d='M0 0h50v50H0z'/%3E%3Cpath d='M50 50h50v50H50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-white/40 border border-white/30 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                <AwardIcon size={40} className="text-white" />
              </div>
              <div className="w-20 h-20 bg-white/40 border border-white/30 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                <StarIcon size={40} className="text-white" />
              </div>
              <div className="w-20 h-20 bg-white/40 border border-white/30 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                <ShieldCheckIcon size={40} className="text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent">
            Kvalita drevených profilov AB
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Najvyššia trieda kvality pre náročných zákazníkov. Minimálne defekty, rovnomerná štruktúra a prémiový vzhľad.
          </p>
        </div>
      </div>

      {/* Hlavný obsah */}
      <main className="max-w-6xl mx-auto py-20 px-4">
        {/* Úvod do AB kvality */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center">
                <TreePineIcon className="mr-4 text-accent" size={48} />
                Čo znamená AB kvalita?
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-gray-900">AB trieda</strong> predstavuje najvyššiu kvalitu drevených profilov dostupnú na trhu. 
                  Táto klasifikácia zaručuje minimálny výskyt sukov, prasklín a ďalších prírodných defektov.
                </p>
                <p>
                  Drevo AB kvality prochádza prísnym výberom a kontrolou kvality, čím sa zabezpečuje 
                  konzistentný vzhľad a vynikajúce mechanické vlastnosti.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-10 border border-accent-light/30 hover:shadow-2xl transition-all duration-300">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <span className="text-white font-bold text-4xl">AB</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Prémiová kvalita</h3>
                <p className="text-gray-600 text-lg">
                  Len 5-10% z celkovej produkcie dreva dosahuje štandard AB kvality
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technické parametre s obrázkami */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Technické parametre AB kvality
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Suky",
                value: "Max. 15mm",
                description: "Zdravé suky bez prasklín",
                image: "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"
              },
              {
                title: "Praskliny",
                value: "Žiadne",
                description: "Bez povrchových prasklín",
                image: "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"
              },
              {
                title: "Farba",
                value: "Rovnomerná",
                description: "Konzistentný odtieň",
                image: "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"
              },
              {
                title: "Vlhkosť",
                value: "8-12%",
                description: "Optimálna pre použitie",
                image: "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"
              },
              {
                title: "Rovnosť",
                value: "±0.5mm",
                description: "Presné rozmery",
                image: "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"
              },
              {
                title: "Povrch",
                value: "Hladký",
                description: "Bez hrubých nerovností",
                image: "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"
              }
            ].map((param, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-accent-light/20 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={param.image} 
                    alt={param.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl text-gray-900 mb-3">{param.title}</h3>
                  <div className="text-3xl font-bold text-accent mb-3">{param.value}</div>
                  <p className="text-gray-600">{param.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Porovnanie s inými triedami */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Porovnanie tried kvality
          </h2>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-accent-light/20">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-accent to-accent-dark text-white">
                  <tr>
                    <th className="px-8 py-6 text-left font-bold text-lg">Vlastnosť</th>
                    <th className="px-8 py-6 text-center font-bold text-lg">AB trieda</th>
                    <th className="px-8 py-6 text-center font-bold text-lg">B trieda</th>
                    <th className="px-8 py-6 text-center font-bold text-lg">C trieda</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-accent-light/20">
                  {[
                    ["Veľkosť sukov", "Max 15mm", "Max 25mm", "Max 40mm"],
                    ["Praskliny", "Žiadne", "Malé povrchové", "Prípustné"],
                    ["Farba", "Rovnomerná", "Mierne odlišnosti", "Výrazné rozdiely"],
                    ["Cena", "Najvyššia", "Stredná", "Najnižšia"],
                    ["Použitie", "Pohľadové plochy", "Štandardné", "Konštrukčné"]
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-accent-light/5 transition-colors">
                      <td className="px-8 py-6 font-semibold text-gray-900 text-lg">{row[0]}</td>
                      <td className="px-8 py-6 text-center">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-800 border border-green-200">
                          {row[1]}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">
                          {row[2]}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-accent-light/20 text-accent-dark border border-accent-light/40">
                          {row[3]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Výhody AB kvality s obrázkami */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Prečo si vybrať AB kvalitu?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         {[
               {
                 title: "Estetický vzhľad",
                 description: "Rovnomerná štruktúra a farba vytvárajú luxusný a harmonický vzhľad interiéru.",
                 image: "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"
               },
               {
                 title: "Dlhá životnosť",
                 description: "Minimálne defekty znamenajú vyššiu odolnosť a dlhšiu životnosť materiálu.",
                 image: "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"
               },
               {
                 title: "Jednoduchá údržba",
                 description: "Hladký povrch bez nerovností uľahčuje čistenie a údržbu.",
                 image: "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"
               },
               {
                 title: "Investícia do kvality",
                 description: "Vyššia hodnota nehnuteľnosti vďaka použitiu prémiových materiálov.",
                 image: "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"
               }
             ].map((advantage, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-accent-light/20 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={advantage.image} 
                    alt={advantage.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-bold text-2xl text-gray-900 mb-4">{advantage.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Použitie s obrázkami interiérov */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Ideálne použitie AB kvality
          </h2>
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-accent-light/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                             {[
                 { 
                   title: "Obývačky", 
                   desc: "Reprezentačné priestory",
                   image: "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"
                 },
                 { 
                   title: "Spálne", 
                   desc: "Útulné prostredie",
                   image: "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"
                 },
                 { 
                   title: "Kancelárie", 
                   desc: "Profesionálny vzhľad",
                   image: "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"
                 },
                 { 
                   title: "Reštaurácie", 
                   desc: "Luxusná atmosféra",
                   image: "https://bucket-production-b953.up.railway.app/medusa-media/hranol_product-01JZT329WRTGJ0A746ASXVE2E2.png"
                 }
               ].map((use, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6 overflow-hidden rounded-2xl shadow-lg">
                    <img 
                      src={use.image} 
                      alt={use.title}
                      className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{use.title}</h3>
                  <p className="text-accent font-medium">{use.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA sekcia */}
        <section className="text-center bg-white rounded-3xl shadow-xl p-16 border border-accent-light/20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Chcete sa dozvedieť viac o našich AB produktoch?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Kontaktujte nás pre personalizovanú konzultáciu a výber najvhodnejších riešení pre váš projekt.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/contact" 
              className="inline-flex items-center bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent-dark text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
            >
              Kontaktovať nás
            </a>
            <a 
              href="/store" 
              className="inline-flex items-center bg-white border-2 border-accent text-accent hover:bg-accent-light/10 hover:border-accent-dark px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Prehliadnuť produkty
            </a>
          </div>
        </section>
      </main>
    </div>
  )
} 