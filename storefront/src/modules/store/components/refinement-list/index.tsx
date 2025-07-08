"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ sortBy, 'data-testid': dataTestId }: RefinementListProps) => {
  // Všade použijem drevo filtre - je to e-shop pre drevo
  return <WoodRefinementList sortBy={sortBy} dataTestId={dataTestId} />
}

// Komponent pre drevo filtre
const WoodRefinementList = ({ sortBy, dataTestId }: { sortBy: SortOptions, dataTestId?: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState({
    typ: [] as string[],
    rozmer: [] as string[],
    material: [] as string[],
    trieda: [] as string[],
    vhodnePre: [] as string[],
    dlzka: [] as string[],
    sposobPouzitia: [] as string[]
  })

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  const filterOptions = {
    typ: ["kartáčovaný", "klasik", "ležiačy povrch", "obojstranný", "opalovaný a kartáčovaný", "originál", "soft", "sts", "utc"],
    rozmer: ["11x96", "12x96", "12.5x96", "14x121", "15x121", "16x140", "18x140", "20x140", "20x171", "20x175", "20x195", "21x245", "25x146", "28x196", "28x200", "42x275"],
    material: ["Červený smrek", "Sibírska borovica", "Sibírsky smrek", "Smrek"],
    trieda: ["AB trieda"],
    vhodnePre: ["Interiér", "Exteriér", "Fasády", "Terasy"],
    dlzka: ["2,4 m", "3,0 m", "4,0 m", "6,0 m"],
    sposobPouzitia: ["Horizontálny", "Vertikálny", "Diagonálny", "Mozaika"]
  }

  const filterDescriptions = {
    "kartáčovaný": "Kartáčovanie sa vykonáva nástrojmi so špeciálnymi kefami",
    "klasik": "Klasický hladký povrch získaný štandardným hobľovaním",
    "ležiačy povrch": "Ležiaci povrch má horizontálne drážky",
    "obojstranný": "Obojstranný profil má na každej strane inú textúru",
    "opalovaný a kartáčovaný": "Kombinácia opaľovania a kartáčovania - technika SHOU SUGI BAN",
    "originál": "Originál zachováva prirodzenú textúru dreva",
    "soft": "Soft profil má jemne zaoblené hrany",
    "sts": "STS je špeciálny technologický systém opracovania",
    "utc": "UTC je univerzálny technologický rez",
    "11x96": "Rozmer 11×96 mm - tenký profil",
    "12x96": "Rozmer 12×96 mm - štandardný tenký profil",
    "12.5x96": "Rozmer 12,5×96 mm - mierne silnejší profil",
    "14x121": "Rozmer 14×121 mm - širší profil",
    "15x121": "Rozmer 15×121 mm - silnejší profil",
    "16x140": "Rozmer 16×140 mm - robustný profil",
    "18x140": "Rozmer 18×140 mm - hrubý profil",
    "20x140": "Rozmer 20×140 mm - veľmi silný profil",
    "20x171": "Rozmer 20×171 mm - extra široký profil",
    "20x175": "Rozmer 20×175 mm - najširší štandardný profil",
    "20x195": "Rozmer 20×195 mm - extra široký profil",
    "21x245": "Rozmer 21×245 mm - najširší dostupný profil",
    "25x146": "Rozmer 25×146 mm - extra hrubý profil",
    "28x196": "Rozmer 28×196 mm - masívny profil",
    "28x200": "Rozmer 28×200 mm - najhrubší profil",
    "42x275": "Rozmer 42×275 mm - masívny hranol",
    "Červený smrek": "Červený smrek - nordická kvalita s výraznou červenkastou farbou",
    "Sibírska borovica": "Sibírska borovica - extrémne odolná proti poveternostným vplyvom",
    "Sibírsky smrek": "Sibírsky smrek - prémiová kvalita zo Sibírie",
    "Smrek": "Smrek - tradičný stredoeurópsky materiál",
    "AB trieda": (
      <>
        <a 
          href="/kvalita-ab" 
          className="text-amber-600 hover:text-amber-700 underline decoration-amber-300 hover:decoration-amber-500 transition-colors"
          title="Dozvedieť sa viac o kvalite AB"
        >
          AB trieda
        </a>
        {" - prémiová kvalita s minimálnym výskytom sukov"}
      </>
    ),
    "Interiér": "Vhodné pre interiérové použitie - obklady stien, stropov",
    "Exteriér": "Vhodné pre exteriérové použitie - fasády, terasy",
    "Fasády": "Špeciálne určené pre fasádne systémy",
    "Terasy": "Optimalizované pre terasové aplikácie",
    "2,4 m": "Štandardná dĺžka 2,4 metra",
    "3,0 m": "Dĺžka 3,0 metre",
    "4,0 m": "Dlhá dĺžka 4,0 metre",
    "6,0 m": "Extra dlhá dĺžka 6,0 metrov",
    "Horizontálny": "Horizontálna montáž",
    "Vertikálny": "Vertikálna montáž",
    "Diagonálny": "Diagonálna montáž",
    "Mozaika": "Mozaikové usporiadanie"
  }

  const handleFilterChange = (category: keyof typeof filters, value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev[category], value]
        : prev[category].filter(item => item !== value)
    }))
  }

  // SVG ilustrácie pre rôzne typy dreva
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'kartáčovaný':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-2">
            <rect x="2" y="4" width="20" height="16" rx="2" fill="#D4A574" stroke="#8B4513" strokeWidth="0.5"/>
            <path d="M3 8h18M3 12h18M3 16h18" stroke="#8B4513" strokeWidth="0.3" opacity="0.7"/>
            <path d="M4 6l16 0M4 10l16 0M4 14l16 0M4 18l16 0" stroke="#A0522D" strokeWidth="0.2"/>
          </svg>
        )
      case 'klasik':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-2">
            <rect x="2" y="4" width="20" height="16" rx="2" fill="#DEB887" stroke="#8B4513" strokeWidth="0.5"/>
            <path d="M3 7h18M3 11h18M3 15h18" stroke="#8B4513" strokeWidth="0.2" opacity="0.5"/>
          </svg>
        )
      case 'ležiačy povrch':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-2">
            <rect x="2" y="4" width="20" height="16" rx="2" fill="#F4E4BC" stroke="#8B4513" strokeWidth="0.5"/>
            <ellipse cx="8" cy="10" rx="2" ry="1" fill="white" opacity="0.6"/>
            <ellipse cx="16" cy="14" rx="1.5" ry="0.8" fill="white" opacity="0.4"/>
            <path d="M3 7h18M3 11h18M3 15h18" stroke="#8B4513" strokeWidth="0.15" opacity="0.3"/>
          </svg>
        )
      case 'obojstranný':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-2">
            <rect x="2" y="4" width="9" height="16" rx="1" fill="#D4A574" stroke="#8B4513" strokeWidth="0.5"/>
            <rect x="13" y="4" width="9" height="16" rx="1" fill="#CD853F" stroke="#8B4513" strokeWidth="0.5"/>
            <path d="M3 8h7M3 12h7M3 16h7" stroke="#8B4513" strokeWidth="0.3" opacity="0.7"/>
            <path d="M14 8h7M14 12h7M14 16h7" stroke="#8B4513" strokeWidth="0.3" opacity="0.7"/>
          </svg>
        )
      case 'opalovaný a kartáčovaný':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-2">
            <rect x="2" y="4" width="20" height="16" rx="2" fill="#8B4513" stroke="#654321" strokeWidth="0.5"/>
            <path d="M3 8h18M3 12h18M3 16h18" stroke="#654321" strokeWidth="0.4" opacity="0.8"/>
            <path d="M4 6l16 0M4 10l16 0M4 14l16 0M4 18l16 0" stroke="#5D4037" strokeWidth="0.3"/>
            <circle cx="6" cy="8" r="0.5" fill="#FF6B35" opacity="0.6"/>
            <circle cx="18" cy="12" r="0.5" fill="#FF6B35" opacity="0.6"/>
          </svg>
        )
      case 'originál':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-2">
            <rect x="2" y="4" width="20" height="16" rx="2" fill="#F5DEB3" stroke="#8B4513" strokeWidth="0.5"/>
            <path d="M3 7h18M3 11h18M3 15h18" stroke="#8B4513" strokeWidth="0.1" opacity="0.3"/>
            <ellipse cx="7" cy="9" rx="1" ry="0.5" fill="#8B4513" opacity="0.2"/>
            <ellipse cx="15" cy="13" rx="1.5" ry="0.8" fill="#8B4513" opacity="0.2"/>
          </svg>
        )
      case 'soft':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-2">
            <rect x="2" y="4" width="20" height="16" rx="2" fill="#F0E68C" stroke="#8B4513" strokeWidth="0.5"/>
            <path d="M3 7h18M3 11h18M3 15h18" stroke="#8B4513" strokeWidth="0.15" opacity="0.4"/>
            <circle cx="8" cy="9" r="0.3" fill="white" opacity="0.8"/>
            <circle cx="16" cy="13" r="0.3" fill="white" opacity="0.8"/>
          </svg>
        )
      case 'sts':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-2">
            <rect x="2" y="4" width="20" height="16" rx="2" fill="#DAA520" stroke="#8B4513" strokeWidth="0.5"/>
            <path d="M3 8h18M3 12h18M3 16h18" stroke="#8B4513" strokeWidth="0.25" opacity="0.6"/>
            <rect x="6" y="7" width="2" height="1" fill="#8B4513" opacity="0.3"/>
            <rect x="14" y="11" width="3" height="1" fill="#8B4513" opacity="0.3"/>
          </svg>
        )
      case 'utc':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-2">
            <rect x="2" y="4" width="20" height="16" rx="2" fill="#CD853F" stroke="#8B4513" strokeWidth="0.5"/>
            <path d="M3 8h18M3 12h18M3 16h18" stroke="#8B4513" strokeWidth="0.2" opacity="0.5"/>
            <path d="M5 6v14M9 6v14M13 6v14M17 6v14" stroke="#8B4513" strokeWidth="0.15" opacity="0.3"/>
          </svg>
        )
      default:
        return null
    }
  }

  // Fotky textúr pre materiály
  const getMaterialIcon = (material: string) => {
    switch (material) {
      case 'Červený smrek':
        return (
          <div className="w-6 h-6 rounded mr-2 border border-gray-300 bg-gradient-to-br from-red-100 to-red-200">
            <div className="w-full h-full rounded bg-gradient-to-r from-red-200 to-red-300 opacity-60"></div>
          </div>
        )
      case 'Sibírska borovica':
        return (
          <div className="w-6 h-6 rounded mr-2 border border-gray-300 bg-gradient-to-br from-yellow-100 to-yellow-200">
            <div className="w-full h-full rounded bg-gradient-to-r from-yellow-200 to-yellow-300 opacity-60"></div>
          </div>
        )
      case 'Sibírsky smrek':
        return (
          <div className="w-6 h-6 rounded mr-2 border border-gray-300 bg-gradient-to-br from-amber-100 to-amber-200">
            <div className="w-full h-full rounded bg-gradient-to-r from-amber-200 to-amber-300 opacity-60"></div>
          </div>
        )
      case 'Smrek':
        return (
          <div className="w-6 h-6 rounded mr-2 border border-gray-300 bg-gradient-to-br from-stone-100 to-stone-200">
            <div className="w-full h-full rounded bg-gradient-to-r from-stone-200 to-stone-300 opacity-60"></div>
          </div>
        )
      default:
        return null
    }
  }

  // Detailné technické popisy pre tooltips
  const detailedDescriptions = {
    // Typy dreva
    "kartáčovaný": "Kartáčovanie sa vykonáva strojom so špeciálnymi keramickými nožmi, ktoré pri opracovaní pohľadovej strany odstránia z povrchu mäkké vlákna dreva (nazývane aj jarné), čím vytvárajú prírodnú kresby s výstupnou tvrdou štruktúrou tzv. zimných vlákien s jedinečným vzhľadom.",
    "klasik": "Klasický hladký povrch získaný presným hobľovaním. Vytvárajú sa rovnomerné, hladké plochy s minimálnou drsnosťou povrchu. Ideálne pre interiérové použitie kde je potrebný elegantný a čistý vzhľad.",
    "ležiačy povrch": "Špeciálne opracovanie s horizontálnymi drážkami, ktoré vytvárajú charakteristický reliéfny povrch. Drážky majú hĺbku 2-3mm a sú vedené v pravidelných intervaloch po celej dĺžke profilu.",
    "obojstranný": "Profil opracovaný z oboch strán s rôznymi povrchmi. Jedna strana môže byť kartáčovaná, druhá hladká. Umožňuje flexibilné použitie podľa potreby dizajnu a funkcie.",
    "opalovaný a kartáčovaný": "Kombinácia tepelného ošetrenia (opaľovanie) a mechanického kartáčovania. Opaľovanie zvyšuje odolnosť proti vlhkosti a hmyzu, kartáčovanie vytvára atraktívnu textúru povrchu.",
    "originál": "Prirodzený povrch dreva bez špeciálneho opracovania, zachováva pôvodné vlastnosti a kresbu dreva. Môže obsahovať prírodné nedokonalosti ako suky, čo dodáva authentický vzhľad.",
    "soft": "Jemne zaoblené hrany a povrch vytvárajú príjemný hmatový zážitok. Hrany sú zaoblené s polomerom 2-3mm, čo eliminuje ostré hrany a zvyšuje bezpečnosť použitia.",
    "sts": "Špeciálny technologický systém opracovania, ktorý kombinuje rôzne techniky na dosiahnutie optimálnych vlastností povrchu. Zahŕňa presné dimenzovanie a kvalitný povrch.",
    "utc": "Univerzálny technologický cut - presné opracovanie s využitím najmodernejších technológií. Zaručuje vysokú presnosť rozmerov a kvalitný povrch s minimálnymi odchýlkami.",
    
    // Materiály
    "Červený smrek": "Červený smrek (Picea abies) - domáci druh s charakteristickou červenkastou farbou. Hustota 420-450 kg/m³, vlhkosť 12-15%. Vhodný pre interiérové aj exteriérové použitie. Prírodná odolnosť proti škodcom.",
    "Sibírska borovica": "Sibírska borovica (Pinus sibirica) - extrémne odolný druh z chladných oblastí Sibíri. Hustota 450-480 kg/m³, nízka vlhkosť 8-12%. Vynikajúca odolnosť proti poveternostným vplyvom.",
    "Sibírsky smrek": "Sibírsky smrek (Picea obovata) - kvalitný druh s jemnou štruktúrou a svetlou farbou. Hustota 400-430 kg/m³, vlhkosť 10-14%. Minimálne suky, rovnomerná štruktúra, ideálny pre náročné aplikácie.",
    "Smrek": "Smrek (Picea abies) - najpoužívanejší druh v strednej Európe. Hustota 380-420 kg/m³, vlhkosť 12-18%. Dobrá spracovateľnosť, univerzálne použitie, ekonomicky výhodný.",
    
    // Triedy
    "AB trieda": "AB trieda - najvyššia kvalita dreva. Minimálne suky do 15mm, bez prasklín a výrazných defektov. Rovnomerná farba a štruktúra. Ideálne pre pohľadové plochy a náročné aplikácie.",
    
    // Rozmery
    "11x96": "Rozmer 11×96mm - tenký profil vhodný pre obklady a dekoratívne účely. Nízka hmotnosť, ľahká montáž, vhodný pre interiérové použitie.",
    "12x96": "Rozmer 12×96mm - štandardný obkladový profil. Optimálny pomer hrúbky a šírky, univerzálne použitie, dobrá stabilita.",
    "12.5x96": "Rozmer 12,5×96mm - silnejší profil s vyššou nosnosťou. Vhodný pre namáhanejšie aplikácie, lepšia tepelná izolácia.",
    "14x121": "Rozmer 14×121mm - širší profil pre rýchlejšie pokrytie plôch. Ideálny pre fasády a väčšie interiérové plochy.",
    "15x121": "Rozmer 15×121mm - robustný profil s výbornou stabilitou. Vhodný pre exteriérové použitie, vysoká odolnosť.",
    "16x140": "Rozmer 16×140mm - široký profil pre efektívne pokrytie. Minimálny počet spojov, rýchla montáž.",
    "18x140": "Rozmer 18×140mm - hrubý profil s maximálnou stabilitou. Ideálny pre náročné podmienky a dlhodobé použitie.",
    "20x140": "Rozmer 20×140mm - najhrubší štandardný profil. Maximálna nosnosť a odolnosť, vhodný pre konštrukčné účely.",
    "20x171": "Rozmer 20×171mm - extra široký profil. Rýchle pokrytie veľkých plôch, minimálne spoje.",
    "20x175": "Rozmer 20×175mm - široký konštrukčný profil. Vysoká nosnosť, vhodný pre namáhané konštrukcie.",
    "20x195": "Rozmer 20×195mm - najširší profil pre špeciálne aplikácie. Maximálna efektivita pokrytia plôch.",
    "21x245": "Rozmer 21×245mm - extra široký profil pre veľké plochy. Minimálny počet spojov, rýchla montáž.",
    "25x146": "Rozmer 25×146mm - hrubý profil s vynikajúcou stabilitou. Ideálny pre konštrukčné a nosné účely.",
    "28x196": "Rozmer 28×196mm - silný široký profil. Maximálna nosnosť, vhodný pre namáhané konštrukcie.",
    "28x200": "Rozmer 28×200mm - najsilnejší profil. Extrémna nosnosť, ideálny pre hlavné nosné prvky.",
    "42x275": "Rozmer 42×275mm - masívny profil pre špeciálne konštrukcie. Maximálna nosnosť a stabilita.",
    
    // Vhodné pre
    "Interiér": "Použitie v interiéri - chránené pred priamymi poveternostnými vplyvmi. Ideálne pre obklady stien, stropy, podlahy. Vlhkosť dreva 8-12%. Vhodné pre všetky druhy dreva.",
    "Exteriér": "Použitie v exteriéri - vystavené poveternostným vplyvom. Vyžaduje dodatočnú ochranu alebo prirodzene odolné druhy. Vlhkosť dreva 12-18%. Odporúčané impregnácie.",
    "Fasády": "Fasádne použitie - vonkajšie obklady budov. Vyžaduje vysokú odolnosť voči UV žiareniu a vlhkosti. Odporúčané ošetrenie ochranným náterom a pravidelná údržba.",
    "Terasy": "Terasové použitie - pochôdzne exteriérové plochy. Vyžaduje špeciálnu protišmykovú úpravu a odolnosť voči abrazívnemu opotrebovaniu. Špeciálne ošetrenie proti vlhkosti.",
    
    // Dĺžky
    "2,4 m": "Dĺžka 2400mm - štandardná dĺžka pre bežné aplikácie. Ľahká manipulácia a transport. Najobľúbenejšia dĺžka pre domáce projekty.",
    "3,0 m": "Dĺžka 3000mm - predĺžená dĺžka pre vyššie miestnosti. Menej spojov, lepší vzhľad. Ideálna pre štandardné stropy výšky 2,7-2,8m.",
    "4,0 m": "Dĺžka 4000mm - dlhá dĺžka pre minimálne spoje. Ideálna pre veľké neprerušované plochy a komerčné aplikácie.",
    "6,0 m": "Dĺžka 6000mm - maximálna štandardná dĺžka. Pre najnáročnejšie aplikácie s minimálnymi spojmi. Vyžaduje špeciálnu manipuláciu a dopravu.",
    
    // Spôsob použitia
    "Horizontálny": "Horizontálna montáž - profily sa inštalujú vodorovne. Tradičný spôsob montáže, jednoduchá inštalácia. Vizuálne rozširuje priestor a zdôrazňuje šírku.",
    "Vertikálny": "Vertikálna montáž - profily sa inštalujú zvisle. Moderný vzhľad, vizuálne predlžuje priestor. Vhodné pre nižšie miestnosti a súčasný dizajn.",
    "Diagonálny": "Diagonálna montáž - profily sa inštalujú pod uhlom. Dynamický a výrazný vzhľad, unikátny dizajn. Vyžaduje precíznu prácu a viac odpadu.",
    "Mozaika": "Mozaikové usporiadanie - kombinácia rôznych smerov a dĺžok. Kreatívny prístup, jedinečný vzhľad. Umožňuje použitie kratších kusov a rôznych farieb."
  }

  const FilterSection = ({ title, options, category, showImages = false }: {
    title: string
    options: string[]
    category: keyof typeof filters
    showImages?: boolean
  }) => (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b-2 border-amber-500">
        {title}
      </h3>
      <div className="space-y-4">
        {options.map((option) => (
          <div key={option} className="relative group">
            <label className="flex items-center cursor-pointer group p-3 rounded-xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-150 ease-in-out transform hover:scale-105">
              <div className="relative">
                <input
                  type="checkbox"
                  id={`${category}-${option}`}
                  checked={filters[category].includes(option)}
                  onChange={(e) => 
                    handleFilterChange(category, option, e.target.checked)
                  }
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-lg border-2 transition-all duration-150 shadow-md ${
                  filters[category].includes(option) 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 border-transparent shadow-lg shadow-amber-500/25' 
                    : 'bg-white border-gray-300 group-hover:border-amber-400 group-hover:shadow-lg'
                }`}>
                  {filters[category].includes(option) && (
                    <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="flex items-center flex-1 ml-4">
                {category === 'typ' && getTypeIcon(option)}
                {category === 'material' && getMaterialIcon(option)}
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-150">
                  {option}
                </span>
                
                {/* Info ikona s tooltipom */}
                {detailedDescriptions[option as keyof typeof detailedDescriptions] && (
                  <div className="relative ml-2">
                    <div 
                      className="w-4 h-4 bg-amber-100 hover:bg-amber-200 rounded-full flex items-center justify-center cursor-help transition-colors duration-100"
                      title={detailedDescriptions[option as keyof typeof detailedDescriptions]}
                    >
                      <svg className="w-2.5 h-2.5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="w-80 bg-gradient-to-br from-white to-stone-50 border-r border-gray-200 p-8 h-full overflow-y-auto shadow-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
          Filtre
        </h2>
        <p className="text-sm text-gray-500">Nájdite presne to, čo hľadáte</p>
      </div>
      
      <div className="space-y-8">
        <FilterSection 
          title="Typ" 
          options={filterOptions.typ}
          category="typ"
        />
        
        <FilterSection 
          title="Rozmer" 
          options={filterOptions.rozmer}
          category="rozmer"
        />
        
        <FilterSection 
          title="Materiál" 
          options={filterOptions.material}
          category="material"
        />
        
        <FilterSection 
          title="Trieda" 
          options={filterOptions.trieda}
          category="trieda"
        />

        <FilterSection 
          title="Vhodné pre" 
          options={filterOptions.vhodnePre}
          category="vhodnePre"
        />

        <FilterSection 
          title="Dĺžka" 
          options={filterOptions.dlzka}
          category="dlzka"
        />

        <FilterSection 
          title="Spôsob použitia" 
          options={filterOptions.sposobPouzitia}
          category="sposobPouzitia"
        />
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button 
          onClick={() => {
            setFilters({
              typ: [],
              rozmer: [],
              material: [],
              trieda: [],
              vhodnePre: [],
              dlzka: [],
              sposobPouzitia: []
            })
          }}
          className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-150 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Resetovať filtre
        </button>
      </div>
    </div>
  )
}

export default RefinementList
