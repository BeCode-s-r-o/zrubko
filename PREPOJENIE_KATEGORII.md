# Prepojenie kategórií v Storefront s Backendom

## ✅ Stav: DOKONČENÉ

Kategórie sú úspešne prepojené medzi backendom a storefrontom. Všetky kategórie z databázy sa dynamicky zobrazujú v navigačnom menu.

---

## 📊 Kategórie v systéme

### Backend (Databáza)
```sql
SELECT id, name, handle, is_active FROM product_category;
```

**Výsledok** (4 kategórie):
| ID | Názov | Handle | Aktívna |
|---|---|---|---|
| pcat_01KA9GE4HZ9JXTHZZG4H68ACGA | Merch | merch | ✅ |
| pcat_01KA9GE4HYHZ8EQSP1NPQB4P0G | Pants | pants | ✅ |
| pcat_01KA9GE4HXDGBTC1GK0PWEKRC4 | Shirts | shirts | ✅ |
| pcat_01KA9GE4HYV3RAHTVFGB4Y9BK1 | Sweatshirts | sweatshirts | ✅ |

### Prepojenie produktov s kategóriami

```sql
SELECT p.title, pc.name as category 
FROM product p 
LEFT JOIN product_category_product pcp ON p.id = pcp.product_id 
LEFT JOIN product_category pc ON pcp.product_category_id = pc.id;
```

**Výsledok**:
| Produkt | Kategória |
|---|---|
| Medusa T-Shirt | Shirts |
| Medusa Sweatshirt | Sweatshirts |
| Medusa Sweatpants | Pants |
| Medusa Shorts | Merch |

---

## 🔧 Implementácia

### 1. CategoryMenu Komponent
**Súbor**: `/storefront/src/modules/layout/components/category-menu/index.tsx`

**Funkcie**:
- ✅ Client-side komponent
- ✅ Dynamicky načítava kategórie z backendu pomocou SDK
- ✅ Filtruje len top-level kategórie
- ✅ Zobrazuje loading stav počas načítavania
- ✅ Mapovanie kategórií na ikony

**Kľúčové funkcie**:
```typescript
// Načítanie kategórií z API s zoradením podľa rank
useEffect(() => {
  async function loadCategories() {
    const { product_categories } = await sdk.store.category.list({
      fields: '+category_children,+rank',
      order: 'rank'  // Zoradenie podľa rank pola
    })
    setCategories(product_categories || [])
  }
  loadCategories()
}, [])

// Filtrovanie top-level kategórií
const topLevelCategories = categories.filter(cat => !cat.parent_category_id)
```

**Poradie kategórií**:
- Kategórie sa automaticky zoraďujú podľa `rank` pola
- Poradie môžete meniť v Admin paneli cez "Edit ranking"
- Zmeny sa okamžite prejavia v eshope (po refreshi stránky)
- Viac info: [PORADIE_KATEGORII.md](./PORADIE_KATEGORII.md)

### 2. Integrácia do Header08
**Súbor**: `/storefront/src/modules/layout/templates/headers/Header08.tsx`

**Zmeny**:
```tsx
// PRED (hardkódované kategórie):
<Link href="/categories/chairs">Drevené obklady</Link>
<Link href="/categories/tables">Drevené podlahy</Link>
// ... ďalšie hardkódované kategórie

// PO (dynamické kategórie):
<CategoryMenu />
```

---

## 📡 API Endpointy

### Store API - Zoznam kategórií
```bash
GET http://localhost:9000/store/product-categories
Header: x-publishable-api-key: pk_6d37f128135e067a9c9fc0b63831fb19383cd4195666e500631f540c54ec8333
```

**Odpoveď**:
```json
{
  "product_categories": [
    {
      "id": "pcat_01KA9GE4HXDGBTC1GK0PWEKRC4",
      "name": "Shirts",
      "handle": "shirts",
      "is_active": true,
      "parent_category_id": null
    },
    // ... ďalšie kategórie
  ]
}
```

### Store API - Produkty v kategórii
```bash
GET http://localhost:9000/store/products?category_id[]=pcat_01KA9GE4HXDGBTC1GK0PWEKRC4
Header: x-publishable-api-key: pk_...
```

---

## 🎯 Funkcie systému

### ✅ Čo funguje

1. **Dynamické načítanie kategórií**
   - Kategórie sa načítavajú z backendu pri každom zobrazení
   - Automatická aktualizácia pri pridaní novej kategórie v admin paneli

2. **Category Pages**
   - URL: `/sk/categories/{handle}`
   - Príklad: `/sk/categories/shirts`
   - Zobrazuje produkty z danej kategórie

3. **Filtrovanie produktov podľa kategórie**
   - Produkty sú správne prepojené s kategóriami
   - Každý produkt je v jednej alebo viacerých kategóriách

4. **Navigačné menu**
   - Dropdown menu v hlavnej navigácii
   - Zobrazuje všetky top-level kategórie
   - Kliknuteľné odkazy na category pages

### 🎨 Mapovanie ikon

Môžete prispôsobiť ikony pre kategórie v `CategoryMenu`:

```typescript
const categoryIcons: Record<string, string> = {
  'shirts': '/furnitor/images/chair.png',
  'pants': '/furnitor/images/desk.png',
  'sweatshirts': '/furnitor/images/ladder.png',
  'merch': '/furnitor/images/plant.png',
  // Pridajte ďalšie podľa potreby
}
```

---

## 📝 Použitie

### Pridanie novej kategórie

1. **V Admin paneli** (http://localhost:9000/app):
   - Prejdite na **Products → Categories**
   - Kliknite na **Create Category**
   - Vyplňte:
     - Name: Názov kategórie (napr. "Sweatshirts")
     - Handle: URL handle (napr. "sweatshirts")
     - Is Active: ✅ Aktivovať
   - Uložte

2. **Automatické zobrazenie**:
   - Nová kategória sa automaticky zobrazí v dropdown menu na storefrontu
   - Kategória bude dostupná na URL: `/sk/categories/{handle}`

### Pripojenie produktu ku kategórii

1. **V Admin paneli**:
   - Prejdite na **Products**
   - Vyberte produkt
   - V sekcii **Categories** vyberte kategóriu
   - Uložte

2. **Overenie**:
   - Produkt sa zobrazí na category page
   - URL: `/sk/categories/{handle}`

### 🏠 Homepage sekcia „Najpredávanejšie OSMO produkty“

- Parent kategória: `najpredavanejsie-produkty`
- Child kategória pre homepage: **Najpredávanejšie OSMO produkty** (`najpredavanejsie-osmo-produkty`)
- Produkty priradené do tejto child kategórie sa zobrazia na home page v sekcii „Najpredávanejšie OSMO produkty“

**Postup:**
1. V Admin paneli vytvorte (alebo skontrolujte existenciu) parent kategórie `najpredavanejsie-produkty`
2. Ako child kategóriu vytvorte `Najpredávanejšie OSMO produkty` s handle `najpredavanejsie-osmo-produkty`
3. Pri editácii produktu v sekcii **Categories** pridajte túto child kategóriu
4. Po uložení sa produkt objaví na homepage po refreshi (sekcia používa Medusa API a regionálnu cenu)

> 👷 Skript `backend/src/scripts/add-categories.ts` vie parent aj child kategórie vytvoriť automaticky. Spustíte ho príkazom `pnpm --filter backend run add-categories`.

---

## 🔍 Testovanie

### Test API kategórií
```bash
curl -s 'http://localhost:9000/store/product-categories' \
  -H 'x-publishable-api-key: pk_6d37f128135e067a9c9fc0b63831fb19383cd4195666e500631f540c54ec8333' \
  | jq '.product_categories[] | {name, handle, active: .is_active}'
```

**Očakávaný výstup**:
```json
{
  "name": "Shirts",
  "handle": "shirts",
  "active": true
}
{
  "name": "Pants",
  "handle": "pants",
  "active": true
}
...
```

### Test produktov v kategórii
```bash
curl -s 'http://localhost:9000/store/products?category_id[]=pcat_01KA9GE4HXDGBTC1GK0PWEKRC4' \
  -H 'x-publishable-api-key: pk_...' \
  | jq '.products[] | {title, id}'
```

### Test storefrontu
1. Otvorte: http://localhost:8000
2. V hlavnej navigácii by mal byť dropdown "Kategórie"
3. Po kliknutí by sa mali zobraziť všetky kategórie (4)
4. Po kliknutí na kategóriu by ste mali byť presmerovaní na category page

---

## 📂 Súborová štruktúra

```
storefront/src/
├── modules/
│   ├── layout/
│   │   ├── components/
│   │   │   └── category-menu/
│   │   │       └── index.tsx          ← Nový: CategoryMenu komponent
│   │   └── templates/
│   │       └── headers/
│   │           └── Header08.tsx       ← Upravené: Používa CategoryMenu
│   ├── categories/
│   │   └── templates/
│   │       └── index.tsx              ← Category page template
│   └── store/
│       └── templates/
│           └── paginated-products.tsx ← Filtrovanie produktov
├── lib/
│   └── data/
│       └── categories.ts              ← Helper funkcie pre kategórie
└── app/
    └── [countryCode]/
        └── (main)/
            └── categories/
                └── [...category]/
                    └── page.tsx       ← Category page route
```

---

## 🐛 Riešenie problémov

### Problem: Kategórie sa nezobrazujú v menu
**Riešenie**:
1. Skontrolujte, či backend beží: `curl http://localhost:9000/health`
2. Overte publishable key v `.env.local`
3. Skontrolujte konzolu prehliadača pre chyby
4. Overte, či kategórie sú aktívne v databáze:
   ```sql
   SELECT name, is_active FROM product_category;
   ```

### Problem: Category page zobrazuje 404
**Riešenie**:
1. Overte, či kategória existuje: `/sk/categories/{handle}`
2. Skontrolujte handle v databáze
3. Reštartujte storefront: `npm run dev`

### Problem: Produkty sa nezobrazujú v kategórii
**Riešenie**:
1. Overte prepojenie v databáze:
   ```sql
   SELECT p.title, pc.name 
   FROM product p 
   JOIN product_category_product pcp ON p.id = pcp.product_id 
   JOIN product_category pc ON pcp.product_category_id = pc.id;
   ```
2. V admin paneli skontrolujte, či je produkt priradený ku kategórii
3. Overte, či je produkt publikovaný (status = 'published')

---

## 🚀 Ďalšie možnosti rozšírenia

### 1. Hierarchické kategórie (Parent/Child)
Aktuálne riešenie podporuje parent/child kategórie:
```typescript
// V CategoryMenu už je implementované filtrovanie
const topLevelCategories = categories.filter(cat => !cat.parent_category_id)

// Pre zobrazenie child kategórií:
{category.category_children?.map((child) => (
  <Link href={`/categories/${child.handle}`}>
    {child.name}
  </Link>
))}
```

### 2. Mega Menu s obrázkami
Rozšírenie dropdown menu o obrázky kategórií:
```typescript
// Pridať thumbnail do kategórie
{category.image && (
  <Image src={category.image} alt={category.name} />
)}
```

### 3. Počet produktov v kategórii
Zobrazenie počtu produktov vedľa názvu kategórie:
```typescript
{category.name} ({category.product_count})
```

### 4. Filtre v kategóriách
- Cena
- Farba
- Veľkosť
- Dostupnosť

---

## ✅ Checklist

- [x] Backend má kategórie v databáze (4)
- [x] Produkty sú prepojené s kategóriami
- [x] Store API vracia kategórie správne
- [x] CategoryMenu komponent vytvorený
- [x] Header08 používa CategoryMenu
- [x] Category pages fungujú
- [x] URL routing funguje (`/sk/categories/{handle}`)
- [x] Produkty sa zobrazujú na category pages
- [x] Navigačné menu je dynamické
- [x] Poradie kategórií funguje (rank pole)
- [x] Edit ranking v admin paneli synchronizuje s eshopm

---

## 📚 Dokumentácia API

### Medusa Store API - Categories

**Endpoint**: `GET /store/product-categories`

**Headers**:
```
x-publishable-api-key: pk_6d37f128135e067a9c9fc0b63831fb19383cd4195666e500631f540c54ec8333
```

**Query Parameters**:
- `fields`: Dodatočné polia (napr. `+category_children`)
- `handle`: Filtrovanie podľa handle
- `parent_category_id`: Filtrovanie podľa parent kategórie

**Príklady použitia**:

1. Získať všetky kategórie s child kategóriami:
```typescript
sdk.store.category.list({ fields: '+category_children' })
```

2. Získať konkrétnu kategóriu podľa handle:
```typescript
sdk.store.category.list({ handle: ['shirts'] })
```

3. Získať produkty v kategórii:
```typescript
sdk.store.product.list({ category_id: ['pcat_...'] })
```

---

**Vytvorené**: 22. November 2025  
**Posledná aktualizácia**: 22. November 2025 (pridané poradie kategórií)
**Status**: ✅ Kompletné a funkčné  
**Backend**: Medusa 2.0  
**Frontend**: Next.js 14 + Furnitor Theme

---

## 📝 Súvisiace dokumenty

- [PORADIE_KATEGORII.md](./PORADIE_KATEGORII.md) - Ako funguje poradie kategórií
- [PREPOJENIE_STOREFRONT_BACKEND.md](./PREPOJENIE_STOREFRONT_BACKEND.md) - Všeobecné prepojenie

