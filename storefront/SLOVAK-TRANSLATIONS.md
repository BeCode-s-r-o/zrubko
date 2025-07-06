# Slovenské preklady - Zrubko Project

## Prehľad zmien

Anglické texty v aplikácii boli nahradené slovenskými ekvivalentmi ako predvolené.

## Zmenené texty

### Produkty a sortovanie
- `"All products"` → `"Všetky produkty"`
- `"Latest Arrivals"` → `"Najnovšie príchody"`
- `"Price: Low -> High"` → `"Cena: Nízka → Vysoká"`
- `"Price: High -> Low"` → `"Cena: Vysoká → Nízka"`
- `"Sort by"` → `"Zoradiť podľa"`

### Platobné metódy
- `"Credit card"` → `"Kreditná karta"`
- `"Manual Payment"` → `"Manuálna platba"`
- `"iDeal"` → `"iDEAL"`
- `"PayPal"` → `"PayPal"`
- `"Bancontact"` → `"Bancontact"`

### Navigácia a košík
- `"Go to all products page"` → `"Ísť na stránku s produktmi"`
- `"Explore products"` → `"Preskúmať produkty"`

### Vyhľadávanie
- `"Search products..."` → `"Hľadať produkty..."`

### Produktové informácie
- `"Product Information"` → `"Informácie o produkte"`

## Zmenené súbory

1. **storefront/src/lib/constants.tsx**
   - Nahradené anglické názvy platobných metód slovenskými

2. **storefront/src/modules/store/components/refinement-list/sort-products/index.tsx**
   - Nahradené možnosti sortowania produktov

3. **storefront/src/modules/store/components/store-title/index.tsx**
   - Nahradený názov stránky "All products" → "Všetky produkty"

4. **storefront/src/modules/layout/components/cart-dropdown/index.tsx**
   - Nahradené tlačidlo "Explore products" → "Preskúmať produkty"

5. **storefront/src/modules/search/components/**.tsx**
   - Nahradené placeholdery pre vyhľadávanie

6. **storefront/src/modules/products/components/product-tabs/index.tsx**
   - Nahradený názov tabu "Product Information" → "Informácie o produkte"

## Spustenie aplikácie

```bash
cd storefront
npm run dev
```

## Poznámky

- Aplikácia teraz používa slovenčinu ako predvolený jazyk
- Všetky anglické texty v používateľskom rozhraní boli nahradené
- Zachovaná je existujúca funkcionalita aplikácie
- Komplexný i18n systém bol odstránený v prospech jednoduchšieho riešenia 