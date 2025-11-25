# Prepojenie Kategórií s Shop Page - Furnitor

## 📋 Prehľad

Kategórie sú teraz plne prepojené s Furnitor shop dizajnom. Všetky kategórie stránky používajú rovnaký layout a dizajn ako hlavná shop page.

## 🔗 Ako to funguje

### 1. **Category Slider**
- Zobrazuje top-level kategórie v carousel slideri
- Každá kategória je klikateľná
- Po kliknutí sa zobrazí stránka s produktmi danej kategórie

### 2. **Sidebar Kategórie**
- Ľavý sidebar obsahuje zoznam všetkých hlavných kategórií
- Kliknutím na kategóriu sa prejde na stránku s produktmi tej kategórie
- Kategórie sú zoradené podľa `rank` (poradie)

### 3. **Breadcrumbs (Drobčeková navigácia)**
- Zobrazuje sa na vrchu stránky
- Umožňuje návrat na vyššie úrovne (Domov → Kategória → Podkategória)

### 4. **Podkategórie**
- Ak kategória má podkategórie, zobrazujú sa ako tlačidlá nad produktmi
- Kliknutím na podkategóriu sa zobrazí jej obsah

## 📁 URL Štruktúra

### Shop (Všetky produkty)
```
/sk/shop
/sk/shop?sortBy=price_asc
/sk/shop?sortBy=price_desc&page=2
```

### Kategórie
```
/sk/categories/nabytok
/sk/categories/nabytok?sortBy=price_asc
/sk/categories/nabytok/stoly
/sk/categories/nabytok/stoly?sortBy=price_desc&page=2
```

## 🎨 Design Features

### Všetky stránky majú:
- ✅ Category slider navrchu
- ✅ Sidebar s kategóriami a filtrami
- ✅ Product grid (3 stĺpce na desktop)
- ✅ Sorting dropdown (Cena, Predvolené)
- ✅ Pagination
- ✅ Breadcrumbs navigácia
- ✅ Add to Cart funkčnosť
- ✅ Responsive dizajn

## 🚀 Testovanie

### 1. **Otvorenie Shop Page**
```
http://localhost:8000/sk/shop
```

### 2. **Kliknutie na kategóriu v slideri**
- Klikni na ktorúkoľvek kategóriu v carousel slideri
- Zobrazí sa stránka s produktmi tej kategórie

### 3. **Kliknutie na kategóriu v sidebari**
- V ľavom sidebari klikni na kategóriu
- Otvorí sa stránka s produktmi tej kategórie

### 4. **Navigácia cez breadcrumbs**
- Klikni na "Domov" alebo názov nadradenej kategórie
- Vrátiš sa na vyššiu úroveň

### 5. **Testovanie sortingu**
- Vyber "Cena: Od najvyššej" alebo "Cena: Od najnižšej"
- Produkty sa zotriedili podľa ceny

### 6. **Testovanie pagination**
- Ak je viac ako 12 produktov, zobrazí sa pagination
- Klikni na číslo stránky alebo šípky

## 📊 Príklady Kategórií (z backendu)

Ak máš tieto kategórie v backende:
```
- Nábytok (hlavná kategória)
  - Stoly (podkategória)
  - Stoličky (podkategória)
  - Postele (podkategória)
- Dekorácie (hlavná kategória)
  - Lampy (podkategória)
  - Vankúše (podkategória)
```

URL budú:
```
/sk/categories/nabytok          → Všetok nábytok
/sk/categories/nabytok/stoly    → Len stoly
/sk/categories/dekoracie        → Všetky dekorácie
/sk/categories/dekoracie/lampy  → Len lampy
```

## 🔧 Technické Detaily

### Komponenty použité:
- `CategorySlider` - Carousel s kategóriami
- `ShopSidebar` - Bočný panel s filtrami a kategóriami
- `ProductCardFurnitor` - Produktová karta
- `CategoryTemplate` - Template pre kategórie stránky

### Data Loading:
```typescript
// Načítanie produktov podľa kategórie
const productsData = await getProductsListWithSort({
  page,
  sortBy,
  countryCode,
  queryParams: {
    limit: 12,
    category_id: [category.id], // ← Filtrovanie podľa kategórie
  },
})
```

### Sorting Options:
- `created_at` - Predvolené (najnovšie prvé)
- `price_asc` - Cena od najnižšej
- `price_desc` - Cena od najvyššej

### Features:
- **Loading states** - Skeleton pri načítavaní
- **Empty states** - Správa keď kategória nemá produkty
- **Breadcrumbs** - Navigácia cez nadradené kategórie
- **Sub-categories** - Zobrazenie podkategórií
- **Count** - Zobrazenie počtu produktov

## 🎯 Navigácia v Header

V hlavnom menu (Header08):
- **Všetky produkty** → `/sk/shop` - Všetky produkty
- **OSMO Menu** → Dropdown s OSMO produktmi
- **Best Selling** → Dropdown s najpredávanejšími produktmi
- **Blogy** → Blog stránka

## 📱 Responsive Breakpoints

| Zariadenie | Kategórie v slideri | Produkty v riadku |
|------------|---------------------|-------------------|
| Mobile (<576px) | 1 | 1 |
| Tablet (576-768px) | 2 | 2 |
| Desktop (768-992px) | 3 | 2 |
| Large (992-1200px) | 3 | 3 |
| XL (>1200px) | 4 | 3 |

## ✅ Checklist - Čo Funguje

- ✅ Zobrazenie kategórií v slideri
- ✅ Kliknutie na kategóriu v slideri → prejde na kategóriu
- ✅ Kliknutie na kategóriu v sidebari → prejde na kategóriu
- ✅ Breadcrumbs navigácia
- ✅ Zobrazenie podkategórií
- ✅ Filtrovanie produktov podľa kategórie
- ✅ Sorting (cena, predvolené)
- ✅ Pagination
- ✅ Add to Cart
- ✅ Responsive dizajn
- ✅ Empty state (žiadne produkty)
- ✅ Počet produktov ("Zobrazujem 1-12 z 45 produktov")

## 🔄 Ako Pridať Novú Kategóriu

### 1. V Medusa Backendu
- Otvor Medusa Admin (`http://localhost:9000/app`)
- Choď do **Products** → **Categories**
- Klikni **Add Category**
- Vyplň názov, handle, a rank (poradie)
- (Voliteľne) Pridaj obrázok do metadata: `{ "image": "/furnitor/images/c_07.jpg" }`

### 2. Automatické Zobrazenie
- Kategória sa automaticky zobrazí v category slideri
- Kategória sa automaticky zobrazí v sidebari
- URL bude: `/sk/categories/{handle}`

### 3. Pridanie Obrázku do Kategórie

V Medusa Admin pri editácii kategórie, pridaj do **Metadata**:
```json
{
  "image": "/furnitor/images/category-image.jpg"
}
```

Alebo cez API:
```typescript
// V backend/src/admin/widgets/product-widget.tsx
metadata: {
  image: "/furnitor/images/nabytok.jpg"
}
```

## 🎨 Customizácia

### Zmena počtu kategórií v slideri
```typescript
// src/modules/shop/components/category-slider/index.tsx
const displayCategories = categories
  .filter(cat => !cat.parent_category_id)
  .sort((a, b) => (a.rank || 0) - (b.rank || 0))
  .slice(0, 8) // ← Zmeň na 10, 12, atď.
```

### Zmena počtu produktov na stránku
```typescript
// src/app/[countryCode]/(main)/shop/page.tsx
queryParams: {
  limit: 12, // ← Zmeň na 16, 24, atď.
}
```

### Zmena počtu kategórií v sidebari
```typescript
// src/modules/shop/components/shop-sidebar/index.tsx
.slice(0, 10) // ← Zmeň na viac/menej
```

## 🐛 Troubleshooting

### Kategórie sa nezobrazujú
1. Skontroluj či backend beží (`http://localhost:9000`)
2. Skontroluj konzolu - hľadaj chyby API
3. Overiť či kategórie existujú v Medusa Admin

### Produkty sa nezobrazujú v kategórii
1. Skontroluj či produkty sú priradené ku kategórii
2. V Medusa Admin → Products → Edit Product → Category
3. Skontroluj či produkty majú cenu pre daný región

### Slider nefunguje
1. Skontroluj či jQuery je načítané
2. Otvor Developer Console a hľadaj chyby
3. Skontroluj či Slick CSS a JS sú načítané

### Odkazy nefungujú
1. Skontroluj či `LocalizedClientLink` je použitý
2. Overiť URL štruktúru v DevTools
3. Skontroluj `countryCode` parameter

## 📝 Poznámky

- Všetky kategórie stránky používajú rovnaký Furnitor dizajn
- Sidebar je sticky (drží sa pri scrollovaní)
- Category slider má autoplay
- Podkategórie sa zobrazujú len ak existujú
- Empty state sa zobrazí keď kategória nemá produkty

---

**Vytvorené:** November 2025  
**Verzia:** 1.0  
**Status:** ✅ Funguje a testované


