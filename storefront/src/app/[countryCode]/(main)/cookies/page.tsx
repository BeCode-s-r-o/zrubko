import { Metadata } from "next"
import LegalPageTemplate, { 
  LegalSection, 
  LegalParagraph, 
  LegalList, 
  LegalSubsection 
} from "@modules/layout/components/legal-page-template"

export const metadata: Metadata = {
  title: "Zásady používania cookies - Zrubko",
  description: "Informácie o používaní cookies na webovej stránke Zrubko a ako ich môžete spravovať.",
}

export default async function CookiesPage() {
  return (
    <LegalPageTemplate
      title="Zásady používania cookies"
      subtitle="Informácie o tom, aké cookies používame na našej webovej stránke a ako ich môžete spravovať."
      lastUpdated="15. január 2024"
    >
      <LegalSection title="1. Čo sú cookies">
        <LegalParagraph>
          Cookies sú malé textové súbory, ktoré sa ukladajú vo vašom prehliadači pri návšteve 
          webových stránok. Pomáhajú nám zlepšiť fungovanie stránky a poskytovať personalizovanú skúsenosť.
        </LegalParagraph>
        
        <LegalSubsection title="1.1 Typy cookies">
          <LegalList items={[
            "Nevyhnutné cookies - potrebné pre základné fungovanie stránky",
            "Funkcionálne cookies - zlepšujú funkcionalitu a personalizáciu",
            "Analytické cookies - pomáhajú nám pochopiť, ako používate stránku",
            "Marketingové cookies - používajú sa na zobrazenie relevantných reklám"
          ]} />
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="2. Aké cookies používame">
        <LegalSubsection title="2.1 Nevyhnutné cookies">
          <LegalParagraph>
            Tieto cookies sú nevyhnutné pre správne fungovanie webovej stránky a nemožno ich vypnúť.
          </LegalParagraph>
          
          <LegalList items={[
            "Cookies na udržanie relácie používateľa",
            "Cookies pre bezpečnosť a autentifikáciu",
            "Cookies pre fungovanie nákupného košíka",
            "Cookies pre jazykové nastavenia"
          ]} />
        </LegalSubsection>

        <LegalSubsection title="2.2 Analytické cookies">
          <LegalParagraph>
            Používame Google Analytics na analýzu návštevnosti a zlepšenie našich služieb.
          </LegalParagraph>
          
          <LegalList items={[
            "_ga - identifikuje unikátnych používateľov (platnosť: 2 roky)",
            "_ga_* - uchováva stav relácie (platnosť: 2 roky)",
            "_gid - rozlišuje používateľov (platnosť: 24 hodín)",
            "_gat - obmedzuje rýchlosť požiadaviek (platnosť: 1 minúta)"
          ]} />
        </LegalSubsection>

        <LegalSubsection title="2.3 Funkcionálne cookies">
          <LegalParagraph>
            Tieto cookies zlepšujú funkcionalitu stránky a zapamätajú si vaše preferencie.
          </LegalParagraph>
          
          <LegalList items={[
            "Jazykové preferencie",
            "Regionálne nastavenia",
            "Preferencie zobrazenia",
            "Uložené položky v wishlist"
          ]} />
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="3. Cookies tretích strán">
        <LegalParagraph>
          Okrem vlastných cookies môžeme používať aj cookies od tretích strán:
        </LegalParagraph>
        
        <LegalList items={[
          "Google Analytics - na analýzu návštevnosti",
          "Facebook Pixel - na marketingové účely",
          "YouTube - pre vložené videá",
          "Platobné brány - na spracovanie platieb"
        ]} />
      </LegalSection>

      <LegalSection title="4. Správa cookies">
        <LegalSubsection title="4.1 Nastavenie prehliadača">
          <LegalParagraph>
            Vo väčšine prehliadačov môžete cookies spravovať v nastaveniach. Môžete:
          </LegalParagraph>
          
          <LegalList items={[
            "Povoliť alebo zakázať všetky cookies",
            "Vymazať existujúce cookies",
            "Nastaviť upozornenia pri ukladaní cookies",
            "Blokovať cookies od konkrétnych stránok"
          ]} />
        </LegalSubsection>

        <LegalSubsection title="4.2 Náš cookie banner">
          <LegalParagraph>
            Pri prvej návšteve našej stránky môžete v cookie banneri nastaviť svoje preferencie 
            pre rôzne kategórie cookies. Vaše nastavenia si môžete kedykoľvek zmeniť.
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="5. Návody pre populárne prehliadače">
        <LegalSubsection title="5.1 Google Chrome">
          <LegalParagraph>
            Nastavenia → Ochrana súkromia a bezpečnosť → Cookies a ďalšie údaje stránok
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="5.2 Mozilla Firefox">
          <LegalParagraph>
            Nastavenia → Ochrana súkromia a bezpečnosť → Cookies a údaje stránok
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="5.3 Safari">
          <LegalParagraph>
            Safari → Preferencie → Ochrana súkromia → Cookies a údaje webových stránok
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="5.4 Microsoft Edge">
          <LegalParagraph>
            Nastavenia → Cookies a povolenia stránok → Cookies a uložené údaje
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="6. Dôsledky zakázania cookies">
        <LegalParagraph>
          Upozorňujeme, že zakázanie niektorých cookies môže ovplyvniť funkcionalitu našej stránky:
        </LegalParagraph>
        
        <LegalList items={[
          "Problémy s prihlásením a udržaním relácie",
          "Nefunkčný nákupný košík",
          "Strata jazykových preferencií",
          "Nevhodne zobrazené obsahy a reklamy",
          "Nemožnosť uložiť produkty do wishlist"
        ]} />
      </LegalSection>

      <LegalSection title="7. Kontakt">
        <LegalParagraph>
          Ak máte otázky týkajúce sa používania cookies, kontaktujte nás na e-mailovej adrese: 
          cookies@zrubko.sk alebo prostredníctvom kontaktného formulára na našej stránke.
        </LegalParagraph>
      </LegalSection>
    </LegalPageTemplate>
  )
} 