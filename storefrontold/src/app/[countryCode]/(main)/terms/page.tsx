import { Metadata } from "next"
import LegalPageTemplate, { 
  LegalSection, 
  LegalParagraph, 
  LegalList, 
  LegalSubsection 
} from "@modules/layout/components/legal-page-template"
import PageBreadcrumbs from "@modules/common/components/breadcrumbs/page-breadcrumbs"

export const metadata: Metadata = {
  title: "Obchodné podmienky - Zrubko",
  description: "Obchodné podmienky pre nákup drevených produktov v e-shope Zrubko.",
}

export default async function TermsPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <PageBreadcrumbs 
        items={[
          { label: "Obchodné podmienky", isActive: true }
        ]}
      />

      <LegalPageTemplate
        title="Obchodné podmienky"
        subtitle="Tieto obchodné podmienky upravujú vzťahy medzi spoločnosťou Zrubko a zákazníkmi pri nákupe drevených produktov."
        lastUpdated="15. január 2024"
      >
      <LegalSection title="1. Základné ustanovenia">
        <LegalParagraph>
          Tieto obchodné podmienky (ďalej len "podmienky") upravujú vzájomné práva a povinnosti 
          medzi spoločnosťou Zrubko s.r.o., so sídlom Bratislava, IČO: 12345678 (ďalej len "predávajúci") 
          a fyzickou osobou konajúcou mimo rámca svojej podnikateľskej činnosti (ďalej len "kupujúci") 
          pri nákupe tovaru prostredníctvom internetového obchodu.
        </LegalParagraph>
        
        <LegalSubsection title="1.1 Platnosť podmienok">
          <LegalParagraph>
            Tieto obchodné podmienky sa stávajú platné a záväzné okamihom odoslania objednávky kupujúcim. 
            Akceptáciou týchto podmienok kupujúci vyjadruje súhlas s ich obsahom.
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="2. Objednávka a kúpna zmluva">
        <LegalParagraph>
          Kúpna zmluva sa uzatvára na základe objednávky vytvorenej kupujúcim a jej potvrdenia predávajúcim.
        </LegalParagraph>
        
        <LegalList items={[
          "Objednávka musí obsahovať všetky požadované údaje",
          "Predávajúci si vyhradzuje právo odmietnuť objednávku z objektívnych dôvodov",
          "Ceny tovaru sú uvedené vrátane DPH",
          "Platba je možná online kartou alebo bankovým prevodom"
        ]} />
      </LegalSection>

      <LegalSection title="3. Dodanie tovaru">
        <LegalParagraph>
          Tovar je dodávaný na adresu uvedenú kupujúcim v objednávke. Dodacie lehoty sa môžu líšiť 
          v závislosti od typu produktu a dostupnosti.
        </LegalParagraph>
        
        <LegalSubsection title="3.1 Štandardné dodanie">
          <LegalParagraph>
            Štandardná dodacia lehota je 3-7 pracovných dní od potvrdenia objednávky.
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="4. Právo na odstúpenie">
        <LegalParagraph>
          Kupujúci má právo odstúpiť od zmluvy bez uvedenia dôvodu do 14 dní od prevzatia tovaru.
        </LegalParagraph>
        
        <LegalList items={[
          "Oznámenie o odstúpení musí byť doručené písomne",
          "Tovar musí byť vrátený v pôvodnom stave",
          "Náklady na vrátenie tovaru znáša kupujúci",
          "Kúpna cena bude vrátená do 14 dní"
        ]} />
      </LegalSection>

      <LegalSection title="5. Reklamácie">
        <LegalParagraph>
          Kupujúci má právo uplatniť reklamáciu v prípade, že tovar nie je v súlade s kúpnou zmluvou.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="6. Ochrana osobných údajov">
        <LegalParagraph>
          Predávajúci spracúva osobné údaje kupujúceho v súlade s platnou legislatívou a zásadami 
          ochrany osobných údajov uvedenými v samostatnom dokumente.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="7. Záverečné ustanovenia">
        <LegalParagraph>
          Tieto obchodné podmienky sú platné a účinné od 1. januára 2024. Predávajúci si vyhradzuje 
          právo kedykoľvek tieto podmienky zmeniť alebo doplniť.
        </LegalParagraph>
      </LegalSection>
      </LegalPageTemplate>
    </>
  )
} 