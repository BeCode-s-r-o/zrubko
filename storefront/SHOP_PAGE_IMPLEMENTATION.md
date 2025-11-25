# Shop Page Implementation - Furnitor Style

Tento dokument popisuje implementáciu shop stránky v štýle Furnitor témy (shop-page-09.html) s prepojením na Medusa backend.

## 📁 Štruktúra komponentov

### Vytvorené komponenty

```
src/modules/shop/
├── components/
│   ├── category-slider/
│   │   └── index.tsx          # Slider s kategóriami (navrchu stránky)
│   ├── shop-sidebar/
│   │   └── index.tsx          # Bočný panel s filtrami
│   └── product-card-furnitor/
│       └── index.tsx          # Produktová karta v Furnitor štýle
└── templates/
    └── shop-template/
        └── index.tsx          # Hlavný shop template
```

### Route

```
src/app/[countryCode]/(main)/shop/
├── page.tsx                   # Shop page route
└── loading.tsx                # Loading skeleton
```

---

## 🎨 Komponenty - Detailný popis

### 1. CategorySlider

**Súbor:** `src/modules/shop/components/category-slider/index.tsx`

**Účel:** Zobrazuje top-level kategórie v carousel slideri navrchu stránky.

**Funkcie:**
- Používa Slick slider s responsive nastaveniami
- Zobrazuje až 8 top-level kategórií
- Automatické prehrávanie (autoplay)
- Dots navigation
- Responsive breakpoints (4→3→2→1 slides)

**Props:**
```typescript
interface CategorySliderProps {
  categories: HttpTypes.StoreProductCategory[]
  countryCode: string
}
```

**Použitie:**
```tsx
<CategorySlider 
  categories={categories} 
  countryCode={countryCode} 
/>
```

---

### 2. ShopSidebar

**Súbor:** `src/modules/shop/components/shop-sidebar/index.tsx`

**Účel:** Zobrazuje filtre v ľavom paneli.

**Obsahuje:**
- **Categories** - Zoznam top-level kategórií
- **Price** - Cenové rozsahy (All, $10-$100, $100-$200, atď.)
- **Material** - Materiály (Laminate, Acrylic, Aluminium, atď.)
- **Colors** - Farebné filtre s vizuálnymi boxy
- **Tags** - Tagy produktov (Vintage, Awesome, atď.)

**Props:**
```typescript
interface ShopSidebarProps {
  categories: HttpTypes.StoreProductCategory[]
  countryCode: string
}
```

**Poznámka:** Filtre sú zatiaľ vizuálne, funkčnosť filtrovania bude pridaná neskôr.

---

### 3. ProductCardFurnitor

**Súbor:** `src/modules/shop/components/product-card-furnitor/index.tsx`

**Účel:** Produktová karta s Furnitor dizajnom a hover efektmi.

**Funkcie:**
- Hover efekt - akčné tlačidlá sa zobrazia pri hover
- **Add to Cart** - Funkčné pridanie do košíka (prepojené s Medusa)
- **Add to Wishlist** - Placeholder
- **Add to Compare** - Placeholder
- **Preview** - Link na detail produktu
- Zobrazenie ceny s formátovaním podľa regiónu
- Zobrazenie kategórie a názvu produktu

**Props:**
```typescript
interface ProductCardFurnitorProps {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}
```

**Používa:**
- `addToCart` funkciu z `@lib/data/cart`
- Next.js Image pre obrázky
- Bootstrap 4 triedy pre styling

---

### 4. ShopTemplate

**Súbor:** `src/modules/shop/templates/shop-template/index.tsx`

**Účel:** Hlavný template kombinujúci všetky shop komponenty.

**Layout štruktúra:**
```
┌────────────────────────────────────────┐
│         Page Title - "Shop All"        │
├────────────────────────────────────────┤
│          Category Slider               │
├─────────────┬──────────────────────────┤
│   Sidebar   │   Products Grid          │
│             │   ┌──────┬──────┬──────┐ │
│ Categories  │   │ Prod │ Prod │ Prod │ │
│ Price       │   │  1   │  2   │  3   │ │
│ Material    │   └──────┴──────┴──────┘ │
│ Colors      │   ┌──────┬──────┬──────┐ │
│ Tags        │   │ Prod │ Prod │ Prod │ │
│             │   │  4   │  5   │  6   │ │
│             │   └──────┴──────┴──────┘ │
│             │        Pagination        │
└─────────────┴──────────────────────────┘
```

**Props:**
```typescript
interface ShopTemplateProps {
  products: HttpTypes.StoreProduct[]
  categories: HttpTypes.StoreProductCategory[]
  region: HttpTypes.StoreRegion
  countryCode: string
  sortBy?: SortOptions
  page?: number
  totalCount?: number
}
```

**Funkcie:**
- Zobrazenie počtu produktov ("Showing 1-12 of 90 results")
- Sorting dropdown (Price High to Low, Price Low to High, Default)
- Product grid (3 columns na desktop)
- Pagination s numerickými stránkami

---

## 🔧 Shop Page Route

**Súbor:** `src/app/[countryCode]/(main)/shop/page.tsx`

**Funkcie:**
- Načítanie produktov z Medusa backendu
- Načítanie kategórií
- Načítanie regiónu podľa country code
- Podpora sortingu cez URL parameter `?sortBy=`
- Podpora pagination cez URL parameter `?page=`

**URL príklady:**
- `/sk/shop` - Všetky produkty
- `/sk/shop?sortBy=price_asc` - Sortované od najlacnejších
- `/sk/shop?sortBy=price_desc&page=2` - Sortované od najdrahších, strana 2

**Metadata:**
```typescript
export const metadata: Metadata = {
  title: 'Shop All Products | Furnitor Store',
  description: 'Browse all our furniture products',
}
```

---

## 🎨 CSS Štýly

**Súbor:** `src/styles/globals.css`

Pridané štýly:

### Product Card Hover Effects
```css
.product.hover-change-content .content-change-horizontal {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.product.hover-change-content:hover .content-change-horizontal {
  opacity: 1;
  transform: translateY(0);
}
```

### Color Widget
```css
.widget-color .item {
  width: 35px;
  height: 35px;
  border-radius: 3px;
  transition: transform 0.2s ease;
}
```

### Ratio Helpers
```css
.ratio-1-1::before {
  padding-top: 100%; /* Štvorcový pomer */
}
```

### Background Image
```css
.bg-img-cover-center {
  background-size: cover;
  background-position: center;
}
```

### Utility Classes
- `.w-45px`, `.h-45px` - Šírka/výška tlačidiel
- `.letter-spacing-05` - Letter spacing
- `.lh-12` - Line height
- `.pos-fixed-bottom` - Pozícia na spodku
- `.hover-white`, `.bg-hover-primary`, `.border-hover-primary` - Hover efekty

---

## 🔗 Prepojenie s backendom

### Produkty
```typescript
// Načítanie produktov so sortingom
const productsData = await getProductsListWithSort({
  page,
  sortBy,
  countryCode: params.countryCode,
  queryParams: {
    limit: 12,
  },
})
```

### Kategórie
```typescript
// Načítanie všetkých kategórií
const categories = await listCategories()
```

### Región
```typescript
// Získanie regiónu pre cenové formátovanie
const region = await getRegion(params.countryCode)
```

### Add to Cart
```typescript
// Pridanie produktu do košíka
await addToCart({
  variantId: variant.id,
  quantity: 1,
  countryCode
})
```

---

## 📱 Responsive Design

### Breakpoints (Bootstrap 4)

| Breakpoint | Grid Columns | Slider Items |
|------------|--------------|--------------|
| < 576px (xs) | 1 column | 1 slide |
| ≥ 576px (sm) | 2 columns | 2 slides |
| ≥ 768px (md) | 2 columns | 2 slides |
| ≥ 992px (lg) | 3 columns | 3 slides |
| ≥ 1200px (xl) | 3 columns | 4 slides |

### Mobile Layout
- Sidebar sa zobrazuje pod produktmi na mobile
- Category slider sa prispôsobuje šírke obrazovky
- Produktové karty sa prispôsobujú (1-2-3 columns)

---

## 🔧 Konfigurácia

### Slick Slider Options
```javascript
{
  slidesToShow: 4,
  autoplay: true,
  dots: true,
  arrows: false,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 4 } },
    { breakpoint: 992, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 576, settings: { slidesToShow: 1 } }
  ]
}
```

### Products per Page
```typescript
const productsPerPage = 12
```

### Default Sort
```typescript
const sortBy = searchParams.sortBy || 'created_at'
```

---

## 🚀 Použitie

### Navigácia
Shop stránka je dostupná cez hlavné menu v headeri:
- Link: **"Všetky produkty"**
- URL: `/sk/shop`

### URL Parametre

**Sorting:**
- `?sortBy=created_at` - Predvolené (najnovšie)
- `?sortBy=price_asc` - Cena od najnižšej
- `?sortBy=price_desc` - Cena od najvyššej

**Pagination:**
- `?page=1` - Prvá strana
- `?page=2` - Druhá strana
- atď.

**Kombinácia:**
```
/sk/shop?sortBy=price_desc&page=2
```

---

## ✅ Bootstrap 4 Classes Použité

### Grid
- `container`, `row`, `col-md-3`, `col-md-9`
- `col-sm-6`, `col-lg-4`

### Cards
- `card`, `card-img`, `card-img-top`, `card-body`
- `card-header`, `card-title`

### Utilities
- `d-flex`, `d-none`, `d-block`
- `align-items-center`, `justify-content-center`
- `mb-8`, `pt-13`, `pb-11`
- `position-relative`, `position-absolute`
- `border-0`, `bg-transparent`

### Typography
- `fs-40`, `fs-20`, `fs-14`, `fs-12`
- `font-weight-bold`, `font-weight-500`
- `text-primary`, `text-secondary`, `text-muted`
- `text-uppercase`, `text-center`

### Buttons & Links
- `btn`, `dropdown-toggle`, `dropdown-menu`
- `hover-primary`, `hover-white`

---

## 🔄 Ďalšie vylepšenia (TODO)

### Filtrovanie
- [ ] Implementovať funkčné filtrovanie podľa kategórií
- [ ] Implementovať cenové filtre
- [ ] Implementovať materiálové filtre
- [ ] Implementovať farebné filtre
- [ ] Implementovať tagy filtre

### Wishlist & Compare
- [ ] Implementovať wishlist funkcionalitu
- [ ] Implementovať compare funkcionalitu

### Search
- [ ] Integrovať vyhľadávanie produktov
- [ ] Pridať search suggestions

### Performance
- [ ] Optimalizovať obrázky (Next.js Image optimization)
- [ ] Pridať infinite scroll (alternatíva k pagination)
- [ ] Implementovať lazy loading pre produkty

---

## 🐛 Známe problémy

Žiadne známe problémy v súčasnosti.

---

## 📝 Poznámky

1. **Slick Slider** - Inicializuje sa cez jQuery v `useEffect` hook
2. **Bootstrap Tooltips** - Automaticky inicializované cez Furnitor theme.js
3. **Sticky Sidebar** - Používa CSS `position: sticky`
4. **Add to Cart** - Plne funkčné s Medusa backendom
5. **Cenové formátovanie** - Automaticky podľa regiónu (EUR, USD, CZK)

---

## 🎯 Záver

Shop page je teraz plne funkčná s Furnitor dizajnom a prepojená s Medusa backendom. Všetky komponenty používajú Bootstrap 4 triedy a dodržiavajú Furnitor design patterns.

**URL na testovanie:**
```
http://localhost:8000/sk/shop
```

---

*Vytvorené: November 2025*  
*Verzia: 1.0*


