import { Metadata } from "next"
import LegalPageTemplate, { 
  LegalSection, 
  LegalParagraph, 
  LegalList, 
  LegalSubsection 
} from "@modules/layout/components/legal-page-template"

export const metadata: Metadata = {
  title: "Zásady ochrany osobných údajov - Zrubko",
  description: "Zásady ochrany osobných údajov v e-shope Zrubko. Ako spracúvame a chránime vaše osobné údaje.",
}

export default async function PrivacyPage() {
  return (
    <LegalPageTemplate
      title="Zásady ochrany osobných údajov"
      subtitle="Informácie o tom, ako zhromažďujeme, používame a chránime vaše osobné údaje pri nákupe drevených produktov."
      lastUpdated="15. január 2024"
    >
      <LegalSection title="1. Správca osobných údajov">
        <LegalParagraph>
          Správcom vašich osobných údajov je spoločnosť Zrubko s.r.o., so sídlom Bratislava, 
          IČO: 12345678, DIČ: 2023456789 (ďalej len "správca").
        </LegalParagraph>
        
        <LegalSubsection title="1.1 Kontaktné údaje">
          <LegalParagraph>
            Pre otázky týkajúce sa ochrany osobných údajov nás môžete kontaktovať na e-mailovej 
            adrese: privacy@zrubko.sk alebo poštou na adrese sídla spoločnosti.
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="2. Aké osobné údaje zhromažďujeme">
        <LegalParagraph>
          Pri využívaní našich služieb môžeme zhromaždiť nasledujúce kategórie osobných údajov:
        </LegalParagraph>
        
        <LegalList items={[
          "Identifikačné údaje: meno, priezvisko, tituly",
          "Kontaktné údaje: e-mailová adresa, telefónne číslo",
          "Adresné údaje: dodacia a fakturačná adresa",
          "Platobné údaje: informácie o platbe (bez údajov o karte)",
          "Objednávkové údaje: história objednávek a nákupov",
          "Technické údaje: IP adresa, typ prehliadača, cookies"
        ]} />
      </LegalSection>

      <LegalSection title="3. Účely spracovania osobných údajov">
        <LegalSubsection title="3.1 Plnenie zmluvy">
          <LegalParagraph>
            Spracúvame vaše osobné údaje za účelom spracovania objednávky, dodania tovaru 
            a poskytnutia zákazníckej podpory.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="3.2 Oprávnený záujem">
          <LegalParagraph>
            Na základe oprávneného záujmu spracúvame údaje pre marketingové účely, 
            analýzu návštevnosti a zlepšenie služieb.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="3.3 Súhlas">
          <LegalParagraph>
            S vaším súhlasom môžeme zasielať newsletter a personalizované ponuky.
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="4. Doba uchovávania údajov">
        <LegalParagraph>
          Osobné údaje uchovávame len po dobu nevyhnutnú na dosiahnutie účelu spracovania:
        </LegalParagraph>
        
        <LegalList items={[
          "Objednávkové údaje: 10 rokov (daňové a účtovné povinnosti)",
          "Marketingové súhlasy: do odvolania súhlasu",
          "Technické údaje: 2 roky",
          "Zákaznícka podpora: 3 roky"
        ]} />
      </LegalSection>

      <LegalSection title="5. Vaše práva">
        <LegalParagraph>
          V súvislosti so spracovaním osobných údajov máte nasledujúce práva:
        </LegalParagraph>
        
        <LegalList items={[
          "Právo na prístup k osobným údajom",
          "Právo na opravu nesprávnych údajov",
          "Právo na vymazanie údajov (\"právo byť zabudnutý\")",
          "Právo na obmedzenie spracovania",
          "Právo na prenosnosť údajov",
          "Právo namietať proti spracovaniu",
          "Právo odvolať súhlas",
          "Právo podať sťažnosť na Úrad na ochranu osobných údajov"
        ]} />
      </LegalSection>

      <LegalSection title="6. Cookies a sledovanie">
        <LegalParagraph>
          Naša webová stránka používa cookies pre zlepšenie používateľskej skúsenosti. 
          Podrobné informácie nájdete v našich zásadách používania cookies.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="7. Bezpečnosť údajov">
        <LegalParagraph>
          Implementovali sme primerané technické a organizačné opatrenia na ochranu vašich 
          osobných údajov pred neoprávneným prístupom, zmenou, zverejnením alebo zničením.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="8. Zmeny zásad">
        <LegalParagraph>
          Tieto zásady môžeme čas od času aktualizovať. O významných zmenách vás budeme 
          informovať prostredníctvom e-mailu alebo oznámenia na webovej stránke.
        </LegalParagraph>
      </LegalSection>
    </LegalPageTemplate>
  )
} 