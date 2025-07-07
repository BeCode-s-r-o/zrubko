"use client"

import { useState } from "react"
import { Flame, Shield, Sparkles, ChevronDown, ChevronUp } from "lucide-react"

export default function ShouSugiBanInfo() {
  const [isExpanded, setIsExpanded] = useState(false)

  const shortText = (
    <p className="text-xl mb-8 leading-relaxed">
      <span className="bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent font-bold">Tatranský profil EXTRA PÁLENÝ</span> je špeciálne opracovaný obklad pomocou starodávnej japonskej technológie <span className="font-bold text-gray-900">SHOU SUGI BAN</span>. 
      Povrch obkladu je zo strán výstredne spálený. Prakticky vyzerá ako dlho ohorené čierne drevo. 
      Shou sugi ban má nezameniteľný prasknutý efekt.
    </p>
  )

  const fullText = (
    <>
      <p className="text-xl mb-8 leading-relaxed">
        <span className="bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent font-bold">Tatranský profil EXTRA PÁLENÝ</span> je špeciálne opracovaný obklad pomocou starodávnej japonskej technológie <span className="font-bold text-gray-900">SHOU SUGI BAN</span>. 
        Povrch obkladu je zo strán výstredne spálený. Prakticky vyzerá ako dlho ohorené čierne drevo. 
        Shou sugi ban má nezameniteľný prasknutý efekt.
      </p>
      
      <p className="text-lg mb-8 leading-relaxed">
        Povrch je po prvom opálení jemne prekefovaný pre dosiahnutie čistejších línii. 
        Následne je opätovne opálený pre dokonalé spálenie a trvácnu čiernu farbu dreva. 
        Opálenie zo všetkých strán zabezpečuje dôkladnú impregnáciu pred vplyvmi počasia.
      </p>
      
      <p className="text-lg mb-8 leading-relaxed">
        Finálne povrch je olegovaný prírodným ľanovým olejom (linseed oil) čo mu dodáva 
        elegantný vzhľad a poskytuje dlhodobú ochranu proti vode a UV žiareniu. 
        Výsledok je jednoducho nádherný – čisté čierne drevo s dĺžkovými stochastickými 
        prasklinami ktoré dodávajú obkladu jedinečný vzhľad a štruktúru.
      </p>

      <p className="text-lg mb-8 leading-relaxed">
        Táto technika sa tradične používa v japonskej architektúre pre chrámy, pagody a obytné domy. 
        Drevo opálené touto metódou vydrží desiatky rokov bez akéhokoľvek ošetrenia. 
        V súčasnosti sa SHOU SUGI BAN používa po celom svete pre moderné fasády, interiérové obklady a dizajnové prvky.
      </p>

      <p className="text-lg mb-8 leading-relaxed">
        Naše Tatranské profily EXTRA PÁLENÉ sú vyrábané z kvalitného smrekového dreva z tatranských lesov. 
        Každá doska prechádza precíznym procesom opálenia pri kontrolovanej teplote, 
        následným kefovaním a finálnym ošetrením prírodným olejom. 
        Garantujeme 15-ročnú životnosť bez potreby ďalšieho ošetrenia.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mb-4">Aplikácie a použitie opáleného dreva</h3>
      <p className="text-lg mb-8 leading-relaxed">
        <span className="font-bold text-gray-900">Drevené obklady SHOU SUGI BAN</span> sú ideálne pre exteriérové fasády rodinných domov, apartmánov a komerčných budov. 
        Vhodné pre interiérové obklady stien v obývacích izbách, kúpeľniach, saunách a wellness centrách. 
        Používa sa aj pre <span className="font-bold text-gray-900">terasové dosky, pergoly, ploty a záhradné stavby</span>. 
        Vo Svidníku, Prešove, Košiciach aj Bratislave rastie dopyt po tomto ekologickom stavebnom materiáli.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mb-4">Výhody oproti klasickým impregnačným lazúram</h3>
      <p className="text-lg mb-8 leading-relaxed">
        Na rozdiel od chemických impregnácií, <span className="font-bold text-gray-900">opálené drevo je 100% prírodné</span> bez toxických látok. 
        Nevyžaduje pravidelnú obnovu lazúr každé 3-5 rokov. <span className="font-bold text-gray-900">Bez údržby vydrží 15-20 rokov</span> aj v náročných klimatických podmienkach Slovenska. 
        Odolné proti hmyzu, plesni a vlhkosti. Ideálne pre alergikov a citlivé osoby. 
        Dlhodobá úspora nákladov na údržbu oproti bežným dreveným materiálom.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mb-4">Technické parametre a rozmery</h3>
      <p className="text-lg mb-8 leading-relaxed">
        Ponúkame <span className="font-bold text-gray-900">Tatranský profil v rozmeroch 20x140mm, 20x146mm a 25x146mm</span>. 
        Štandardná dĺžka 3-6 metrov podľa požiadaviek. Vlhkosť dreva 12-16%. 
        Hustota 450-550 kg/m³. Trieda odolnosti 1-2 podľa EN 350. 
        Možnosť dodania s perom a drážkou pre jednoduchú montáž. 
        Vhodné pre <span className="font-bold text-gray-900">kontaktné zateplenie, predizoláciu aj ako samostatný obklad</span>.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mb-4">Montáž a pokyny pre stavebníkov</h3>
      <p className="text-lg mb-8 leading-relaxed">
        <span className="font-bold text-gray-900">Montáž opáleného dreva</span> je jednoduchá pomocou nerezových skrutiek alebo klipov. 
        Odporúčame <span className="font-bold text-gray-900">ventilovanú fasádu s latovaním</span> pre optimálnu cirkuláciu vzduchu. 
        Minimálny odstup od zeme 150mm. Pre interiérové obklady možná montáž priamo na stenu. 
        Spolupracujeme so <span className="font-bold text-gray-900">stavebými firmami z Prešova, Košíc, Bratislavy a celého Slovenska</span>. 
        Poskytujeme technické poradenstvo a montážne návody.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mb-4">Ekologické a zdravotné aspekty</h3>
      <p className="text-lg mb-8 leading-relaxed">
        <span className="font-bold text-gray-900">Certifikované drevo FSC z udržateľných zdrojov</span> tatranských lesov. 
        Nulové emisie VOC látok do interiéru. Prirodzená regulácia vlhkosti vzduchu. 
        Priaznivé pre alergikov a astmatikov. <span className="font-bold text-gray-900">Uhlíková stopa o 60% nižšia</span> než u betónových fasád. 
        Plne recyklovateľný materiál. Podporuje zdravé bývanie a <span className="font-bold text-gray-900">zelené stavby</span>. 
        Vhodné pre pasívne domy a nízkoenergetické stavby.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mb-4">Cena a dodanie na Slovensku</h3>
      <p className="text-lg mb-12 leading-relaxed">
        <span className="font-bold text-gray-900">Konkurenčné ceny opáleného dreva</span> s dopravou po celom Slovensku. 
        Expresné dodanie do 48 hodín do Bratislavy, Košíc, Prešova, Žiliny a Nitry. 
        Možnosť <span className="font-bold text-gray-900">odberov na palete alebo kamióne</span> priamo z nášho skladu. 
        Množstevné zľavy pre stavebné firmy a architektov. 
        Bezplatné vzorky a kalkulácie. Podpora slovenského lesníctva a lokálnych výrobcov. 
        <span className="font-bold text-gray-900">Financovanie na splátky možné</span> pre väčšie projekty.
      </p>
    </>
  )

  return (
    <section id="shou-sugi-ban-info" className="py-16 lg:py-24 bg-gradient-to-br from-stone-50/80 via-amber-25/60 to-orange-50/40 relative overflow-hidden">
      {/* Wood rings pattern background */}
      <div className="absolute inset-0" style={{ opacity: 0.5 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wood-rings" patternUnits="userSpaceOnUse" width="300" height="300">
              {/* First tree cross-section - top left */}
              <g transform="translate(50, 50)">
                {/* Outer rings */}
                <ellipse cx="0" cy="0" rx="80" ry="75" stroke="#8B4513" strokeWidth="1.5" fill="none" opacity="0.2"/>
                <ellipse cx="2" cy="-1" rx="65" ry="62" stroke="#A0522D" strokeWidth="1.2" fill="none" opacity="0.25"/>
                <ellipse cx="1" cy="1" rx="50" ry="48" stroke="#8B4513" strokeWidth="1" fill="none" opacity="0.2"/>
                <ellipse cx="-1" cy="0" rx="35" ry="34" stroke="#CD853F" strokeWidth="0.8" fill="none" opacity="0.3"/>
                <ellipse cx="1" cy="-1" rx="22" ry="21" stroke="#A0522D" strokeWidth="0.6" fill="none" opacity="0.25"/>
                <ellipse cx="0" cy="1" rx="12" ry="11" stroke="#8B4513" strokeWidth="0.4" fill="none" opacity="0.2"/>
                {/* Inner core */}
                <circle cx="0" cy="0" r="4" fill="#6B3410" opacity="0.15"/>
              </g>
              
              {/* Second tree cross-section - bottom right */}
              <g transform="translate(220, 200)">
                <ellipse cx="0" cy="0" rx="70" ry="68" stroke="#A0522D" strokeWidth="1.3" fill="none" opacity="0.2"/>
                <ellipse cx="1" cy="1" rx="55" ry="53" stroke="#8B4513" strokeWidth="1" fill="none" opacity="0.25"/>
                <ellipse cx="-1" cy="0" rx="40" ry="39" stroke="#CD853F" strokeWidth="0.9" fill="none" opacity="0.2"/>
                <ellipse cx="0" cy="-1" rx="28" ry="27" stroke="#A0522D" strokeWidth="0.7" fill="none" opacity="0.3"/>
                <ellipse cx="1" cy="0" rx="18" ry="17" stroke="#8B4513" strokeWidth="0.5" fill="none" opacity="0.25"/>
                <ellipse cx="0" cy="1" rx="10" ry="9" stroke="#6B3410" strokeWidth="0.3" fill="none" opacity="0.2"/>
                <circle cx="0" cy="0" r="3" fill="#6B3410" opacity="0.15"/>
              </g>
              
              {/* Third tree cross-section - center */}
              <g transform="translate(150, 120)">
                <ellipse cx="0" cy="0" rx="45" ry="43" stroke="#CD853F" strokeWidth="1" fill="none" opacity="0.2"/>
                <ellipse cx="1" cy="-1" rx="32" ry="31" stroke="#A0522D" strokeWidth="0.8" fill="none" opacity="0.25"/>
                <ellipse cx="0" cy="1" rx="22" ry="21" stroke="#8B4513" strokeWidth="0.6" fill="none" opacity="0.2"/>
                <ellipse cx="-1" cy="0" rx="14" ry="13" stroke="#CD853F" strokeWidth="0.4" fill="none" opacity="0.3"/>
                <ellipse cx="1" cy="0" rx="8" ry="7" stroke="#A0522D" strokeWidth="0.3" fill="none" opacity="0.25"/>
                <circle cx="0" cy="0" r="2" fill="#6B3410" opacity="0.15"/>
              </g>
              
              {/* Small tree ring - top right */}
              <g transform="translate(250, 70)">
                <ellipse cx="0" cy="0" rx="25" ry="24" stroke="#A0522D" strokeWidth="0.8" fill="none" opacity="0.2"/>
                <ellipse cx="1" cy="0" rx="18" ry="17" stroke="#8B4513" strokeWidth="0.6" fill="none" opacity="0.25"/>
                <ellipse cx="0" cy="-1" rx="12" ry="11" stroke="#CD853F" strokeWidth="0.4" fill="none" opacity="0.2"/>
                <circle cx="0" cy="0" r="6" fill="#6B3410" opacity="0.1"/>
              </g>
              
              {/* Small tree ring - bottom left */}
              <g transform="translate(80, 230)">
                <ellipse cx="0" cy="0" rx="30" ry="28" stroke="#8B4513" strokeWidth="0.9" fill="none" opacity="0.2"/>
                <ellipse cx="-1" cy="1" rx="21" ry="20" stroke="#A0522D" strokeWidth="0.7" fill="none" opacity="0.25"/>
                <ellipse cx="1" cy="0" rx="14" ry="13" stroke="#CD853F" strokeWidth="0.5" fill="none" opacity="0.2"/>
                <ellipse cx="0" cy="-1" rx="8" ry="7" stroke="#A0522D" strokeWidth="0.3" fill="none" opacity="0.3"/>
                <circle cx="0" cy="0" r="3" fill="#6B3410" opacity="0.15"/>
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wood-rings)"/>
        </svg>
      </div>

      <div className="content-container relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hlavný obsah v karte */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-amber-100 mb-16">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {isExpanded ? fullText : shortText}
              
              {/* Čítať viac / Čítať menej button */}
              <div className="flex justify-center">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {isExpanded ? (
                    <>
                      Čítať menej
                      <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </>
                  ) : (
                    <>
                      Čítať viac
                      <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Karty s výhodami */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tradičná technika</h3>
              <p className="text-gray-600 leading-relaxed">
                Japonská technika SHOU SUGI BAN sa používa už viac ako 400 rokov 
                pre svoju výnimočnú odolnosť a jedinečný vzhľad.
              </p>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Prírodná ochrana</h3>
              <p className="text-gray-600 leading-relaxed">
                Opálenie dreva vytvára prirodzenú ochranu proti hmyzu, pleseň a vlhkosti 
                bez potreby chemických prípravkov.
              </p>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Jedinečný vzhľad</h3>
              <p className="text-gray-600 leading-relaxed">
                Každý kus má unikátny vzor prasklín a textúru, ktoré vytvárajú 
                nezameniteľný a elegantný vzhľad vášho projektu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 