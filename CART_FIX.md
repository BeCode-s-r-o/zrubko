# ✅ Oprava zobrazenia košíka v headeri

## 🔧 Čo bolo opravené

### Problém
Košík v headeri zobrazoval vždy "0", aj keď boli produkty pridané do košíka.

### Riešenie

1. **Vytvorený nový komponent `CartCount`**
   - Načítava skutočný počet položiek v košíku
   - Automaticky sa aktualizuje každé 2 sekundy
   - Reaguje na custom event `cart:updated`

2. **Vytvorená API route `/api/cart`**
   - Poskytuje endpoint pre získanie počtu položiek v košíku
   - Používa sa z client komponentu

3. **Aktualizácia po pridaní do košíka**
   - Po úspešnom pridaní produktu sa dispatchuje event `cart:updated`
   - Košík v headeri sa okamžite aktualizuje

## 📝 Zmeny v súboroch

### Nové súbory
- `storefront/src/modules/layout/components/cart-count/index.tsx` - Komponent pre zobrazenie počtu položiek
- `storefront/src/app/api/cart/route.ts` - API endpoint pre získanie košíka

### Upravené súbory
- `storefront/src/modules/layout/templates/headers/Header08.tsx` - Používa `CartCount` namiesto statického "0"
- `storefront/src/modules/home/components/product-grid/index.tsx` - Dispatchuje event po pridaní do košíka
- `storefront/src/modules/products/components/product-actions/index.tsx` - Dispatchuje event po pridaní do košíka

## 🧪 Testovanie

1. Spustite storefront:
   ```bash
   cd storefront
   npm run dev
   ```

2. Otvorte http://localhost:3000

3. Kliknite na "Add to cart" na produkte

4. Skontrolujte:
   - ✅ Počet v headeri sa zmení z "0" na "1" (alebo vyššie)
   - ✅ Počet sa aktualizuje okamžite po pridaní
   - ✅ Počet sa aktualizuje aj pri obnovení stránky

## 🔍 Ako to funguje

1. **Načítanie košíka:**
   - `CartCount` komponent volá `/api/cart` endpoint
   - Endpoint načíta košík pomocou `retrieveCart()`
   - Vráti počet položiek

2. **Aktualizácia po pridaní:**
   - Po úspešnom pridaní produktu sa dispatchuje `cart:updated` event
   - `CartCount` počúva na tento event a aktualizuje počet
   - Automatická aktualizácia každé 2 sekundy (fallback)

3. **Real-time updates:**
   - Interval každé 2 sekundy pre automatickú aktualizáciu
   - Custom event pre okamžitú aktualizáciu po pridaní

## 🐛 Riešenie problémov

### Košík sa stále zobrazuje ako "0"

1. Skontrolujte, či backend beží
2. Skontrolujte konzolu prehliadača (F12) - hľadajte chyby
3. Skontrolujte, či sa vytvára košík:
   ```bash
   # V konzole prehliadača
   fetch('/api/cart').then(r => r.json()).then(console.log)
   ```

### Počet sa neaktualizuje po pridaní

1. Skontrolujte, či sa dispatchuje event:
   ```javascript
   // V konzole prehliadača
   window.addEventListener('cart:updated', () => console.log('Cart updated!'))
   ```

2. Skontrolujte Network tab - či sa volá `/api/cart` endpoint

## ✅ Status

**Všetko by teraz malo fungovať správne!**

Košík v headeri sa automaticky aktualizuje:
- ✅ Po pridaní produktu
- ✅ Každé 2 sekundy (automatická aktualizácia)
- ✅ Po obnovení stránky

---

**Posledná aktualizácia:** 2025-01-27

