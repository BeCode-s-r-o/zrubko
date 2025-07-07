import { Metadata } from "next"
import LegalPageTemplate, { 
  LegalSection, 
  LegalParagraph, 
  LegalList, 
  LegalSubsection 
} from "@modules/layout/components/legal-page-template"

export const metadata: Metadata = {
  title: "Doprava a dodanie - Zrubko",
  description: "Informácie o doprave, dodacích lehotách a nákladoch na dopravu drevených produktov z e-shopu Zrubko.",
}

export default async function ShippingPage() {
  return (
    <LegalPageTemplate
      title="Doprava a dodanie"
      subtitle="Všetko, čo potrebujete vedieť o doprave, dodacích lehotách a nákladoch na dopravu našich drevených produktov."
      lastUpdated="15. január 2024"
    >
      <LegalSection title="1. Spôsoby dopravy">
        <LegalParagraph>
          Ponúkame niekoľko možností dopravy prispôsobených rôznym typom produktov a vašim potrebám.
        </LegalParagraph>
        
        <LegalSubsection title="1.1 Štandardná doprava">
          <LegalList items={[
            "Kuriérska služba (do 30 kg) - 5,90 €",
            "Špecializovaná doprava pre drevo (nad 30 kg) - podľa hmotnosti",
            "Dodanie na adresu po celom Slovensku",
            "Dodacia lehota: 3-7 pracovných dní"
          ]} />
        </LegalSubsection>

        <LegalSubsection title="1.2 Expresná doprava">
          <LegalList items={[
            "Expresná kuriérska služba - 12,90 €",
            "Dodanie do 24 hodín (iba pre dostupné produkty)",
            "Dostupné len v hlavných mestách",
            "Objednávka musí byť potvrdená do 14:00"
          ]} />
        </LegalSubsection>

        <LegalSubsection title="1.3 Osobný odber">
          <LegalList items={[
            "Bezplatný odber v našom sklade v Bratislave",
            "Možnosť obhliadky tovaru pred prevzatím",
            "Otváracie hodiny: Po-Pia 8:00-17:00, So 9:00-13:00",
            "Nutné objednať vopred a počkať na potvrdenie"
          ]} />
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="2. Dodacie lehoty">
        <LegalParagraph>
          Dodacie lehoty sa môžu líšiť v závislosti od typu produktu a dostupnosti na sklade.
        </LegalParagraph>
        
        <LegalList items={[
          "Produkty na sklade: 3-5 pracovných dní",
          "Produkty na objednávku: 7-14 pracovných dní",
          "Veľkoformátové rezané drevo: 5-10 pracovných dní",
          "Špecialné objednávky: 14-21 pracovných dní"
        ]} />

        <LegalSubsection title="2.1 Faktory ovplyvňujące dodanie">
          <LegalList items={[
            "Dostupnosť produktu na sklade",
            "Potreba špeciálneho spracovania alebo rezania",
            "Sezónne výkyvy a počasie",
            "Vzdialenosť dodacej adresy",
            "Zložitosť prístupu k dodacej adrese"
          ]} />
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="3. Náklady na dopravu">
        <LegalSubsection title="3.1 Cenník dopravy na Slovensku">
          <LegalList items={[
            "Do 5 kg: 3,90 €",
            "5-15 kg: 5,90 €",
            "15-30 kg: 8,90 €",
            "30-50 kg: 15,90 €",
            "Nad 50 kg: individuálny prepočet"
          ]} />
        </LegalSubsection>

        <LegalSubsection title="3.2 Bezplatná doprava">
          <LegalParagraph>
            Bezplatnú dopravu poskytujeme pri splnení nasledujúcich podmienok:
          </LegalParagraph>
          
          <LegalList items={[
            "Objednávka nad 150 € (štandardná doprava)",
            "Objednávka nad 300 € (všetky spôsoby dopravy)",
            "Osobný odber je vždy bezplatný",
            "Akciové ponuky môžu obsahovať bezplatnú dopravu"
          ]} />
        </LegalSubsection>

        <LegalSubsection title="3.3 Doprava do zahraničia">
          <LegalList items={[
            "Česká republika: od 12,90 €",
            "Rakúsko, Maďarsko: od 18,90 €",
            "Ostatné krajiny EÚ: individuálna kalkulácia",
            "Dodacie lehoty sa predlžujú o 2-5 pracovných dní"
          ]} />
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="4. Špecialná doprava pre drevo">
        <LegalParagraph>
          Pre veľké drevené produkty používame špeciálne vozidlá s hydraulickou rukou a odborných pracovníkov.
        </LegalParagraph>
        
        <LegalSubsection title="4.1 Služby zahrnuté">
          <LegalList items={[
            "Transport na špeciálnom vozadle",
            "Vyloženie pomocou hydraulickej ruky",
            "Uloženie na dohodnutom mieste (do 50 m od vozidla)",
            "Základná ochrana pred poveternostnými vplyvmi"
          ]} />
        </LegalSubsection>

        <LegalSubsection title="4.2 Dodatočné služby">
          <LegalList items={[
            "Donos do interiéru: +25 € (do 3. poschodia)",
            "Montáž a inštalácia: podľa cenníka",
            "Znesenie starého materiálu: +15 €/m³",
            "Víkendové dodanie: +50 €"
          ]} />
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="5. Prevzatie zásielky">
        <LegalSubsection title="5.1 Povinnosti príjemcu">
          <LegalList items={[
            "Byť prítomný v dohodnutom čase dodania",
            "Skontrolovať balenie pred podpisom dodacieho listu",
            "Nahlásiť viditeľné poškodenia ihneď kuriérovi",
            "Podpísať dodací list po kontrole zásielky"
          ]} />
        </LegalSubsection>

        <LegalSubsection title="5.2 Čo robiť pri poškodení">
          <LegalParagraph>
            V prípade poškodenia zásielky postupujte nasledovne:
          </LegalParagraph>
          
          <LegalList items={[
            "Neotváranie poškodeného balenia",
            "Vyhotovenie fotografií poškodenia",
            "Zaznamenanie škody v dodacom liste",
            "Okamžité kontaktovanie našej zákazníckej podpory"
          ]} />
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="6. Kontakt pre dopravu">
        <LegalParagraph>
          Pre otázky týkajúce sa dopravy a dodania nás kontaktujte:
        </LegalParagraph>
        
        <LegalList items={[
          "Telefón: +421 123 456 789 (Po-Pia 8:00-17:00)",
          "E-mail: doprava@zrubko.sk",
          "Online chat na webovej stránke",
          "Kontaktný formulár v sekcii Kontakt"
        ]} />
      </LegalSection>
    </LegalPageTemplate>
  )
} 