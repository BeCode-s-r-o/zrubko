# Category API System

Kompletná implementácia pre správu vlastných kategórií v Medusa.js backend s in-memory storage.

## Štruktúra súborov

```
backend/src/
├── services/
│   └── category.ts              # CategoryService - hlavná business logika
└── api/
    └── category/
        └── route.ts             # REST API endpoints
```

## API Endpoints

### Base URL: `http://localhost:9000/category`

### 1. GET - Získanie kategórií
```bash
# Všetky kategórie
GET /category

# Filtrovanie podľa slug
GET /category?slug=shou-sugi-ban

# Iba featured kategórie
GET /category?featured=true

# Kombinácia filtrov
GET /category?featured=false&slug=my-category
```

**Odpoveď:**
```json
{
  "success": true,
  "categories": [
    {
      "id": "cat_01",
      "name": "SHOU SUGI BAN",
      "slug": "shou-sugi-ban",
      "description": "Tradičná japonská technika...",
      "banner_image": "/images/banner.jpg",
      "banner_title": "SHOU SUGI BAN",
      "banner_subtitle": "Tradičná japonská technika",
      "custom_buttons": [
        {
          "text": "Viac o technike",
          "url": "/technika",
          "style": "primary"
        }
      ],
      "gallery_images": ["/img1.jpg", "/img2.jpg"],
      "is_featured": true,
      "sort_order": 1,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

### 2. POST - Vytvorenie kategórie
```bash
POST /category
Content-Type: application/json

{
  "name": "Nová kategória",
  "slug": "nova-kategoria", // Voliteľné - ak nie je zadané, vygeneruje sa automaticky
  "description": "Popis kategórie",
  "banner_title": "Banner titulok",
  "banner_subtitle": "Banner podtitulok",
  "banner_image": "/images/banner.jpg",
  "custom_buttons": [
    {
      "text": "Viac info",
      "url": "/info",
      "style": "primary"
    },
    {
      "text": "Kontakt",
      "url": "/contact",
      "style": "secondary"
    }
  ],
  "gallery_images": ["/img1.jpg", "/img2.jpg"],
  "is_featured": true,
  "sort_order": 2
}
```

**Odpoveď úspešná (201):**
```json
{
  "success": true,
  "category": { /* kategória objekty */ },
  "message": "Category created successfully"
}
```

**Odpoveď chyba (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": [
    "Názov kategórie je povinný",
    "Button 1: Text je povinný"
  ]
}
```

### 3. PUT - Úprava kategórie
```bash
PUT /category?id=cat_01
Content-Type: application/json

{
  "name": "Upravený názov",
  "description": "Nový popis",
  "is_featured": false
}
```

**Odpoveď:**
```json
{
  "success": true,
  "category": { /* aktualizovaná kategória */ },
  "message": "Category updated successfully"
}
```

### 4. DELETE - Zmazanie kategórie
```bash
DELETE /category?id=cat_01
```

**Odpoveď:**
```json
{
  "success": true,
  "category": { /* zmazaná kategória */ },
  "message": "Category deleted successfully"
}
```

## CategoryService metódy

### Hlavné metódy
- `getAllCategories(filterBySlug?, featuredOnly?)` - Získanie kategórií s filtrami
- `getCategoryBySlug(slug)` - Nájdenie kategórie podľa slug
- `getCategoryById(id)` - Nájdenie kategórie podľa ID
- `createCategory(data)` - Vytvorenie novej kategórie
- `updateCategory(id, partialData)` - Úprava existujúcej kategórie
- `deleteCategory(id)` - Zmazanie kategórie
- `reorderCategories(categoryIds[])` - Preusporiadanie kategórií
- `getFeaturedCategories()` - Získanie featured kategórií

### Utility metódy
- `validateCategoryData(data)` - Validácia dát kategórie
- `generateSlug(name)` - Generovanie URL slug z názvu
- `getStatistics()` - Štatistiky o kategóriách

## Dátová štruktúra

### CategoryData
```typescript
interface CategoryData {
  id: string                     // Automaticky generované ID
  name: string                   // Názov kategórie (povinný)
  slug: string                   // URL slug (auto-generuje sa z name)
  description?: string           // Popis kategórie
  banner_image?: string          // URL banner obrázka
  banner_title?: string          // Banner titulok
  banner_subtitle?: string       // Banner podtitulok
  custom_buttons?: CategoryButton[] // Vlastné buttony
  gallery_images?: string[]      // Galéria obrázkov (URLs)
  is_featured: boolean           // Je featured kategória
  sort_order: number            // Poradie zobrazovania
  created_at: string            // Dátum vytvorenia
  updated_at: string            // Dátum úpravy
}
```

### CategoryButton
```typescript
interface CategoryButton {
  text: string                   // Text buttonu
  url: string                    // URL linku
  style: 'primary' | 'secondary' // Štýl buttonu
}
```

## Validácia

### Povinné polia
- `name` - Názov kategórie

### Automatické polia
- `id` - Generuje sa automaticky s prefixom `cat_`
- `slug` - Ak nie je zadané, generuje sa z `name`
- `created_at` / `updated_at` - Nastavujú sa automaticky

### Validačné pravidlá
- `name`: Maximálne 255 znakov
- `slug`: Musí byť jedinečný
- `custom_buttons`: Text a URL sú povinné pre každý button
- `banner_image`: Musí byť platný URL alebo relatívna cesta
- `gallery_images`: Každý obrázok musí byť platný URL

### Chybové správy v slovenčine
- "Názov kategórie je povinný"
- "Button 1: Text je povinný"
- "Neplatný URL pre banner obrázok"
- 'Category with slug "existing-slug" already exists'

## Použitie v storefront

### Načítanie kategórií
```typescript
// lib/categories.ts
export async function getCategories(featured?: boolean) {
  const params = featured ? '?featured=true' : ''
  const response = await fetch(`${BACKEND_URL}/category${params}`)
  const data = await response.json()
  return data
}

export async function getCategoryBySlug(slug: string) {
  const response = await fetch(`${BACKEND_URL}/category?slug=${slug}`)
  const data = await response.json()
  return data.categories[0] || null
}
```

### Zobrazenie kategórie v komponente
```tsx
// components/CategoryBanner.tsx
import { CategoryData } from '../types/category'

interface Props {
  category: CategoryData
}

export default function CategoryBanner({ category }: Props) {
  return (
    <div className="relative h-96">
      {category.banner_image && (
        <img src={category.banner_image} alt={category.name} />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1>{category.banner_title || category.name}</h1>
          <p>{category.banner_subtitle}</p>
          {category.custom_buttons && (
            <div className="flex gap-4 mt-4">
              {category.custom_buttons.map((button, index) => (
                <a
                  key={index}
                  href={button.url}
                  className={button.style === 'primary' ? 'btn-primary' : 'btn-secondary'}
                >
                  {button.text}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

## Testovanie API

### 1. Testovanie cez curl
```bash
# Získať všetky kategórie
curl http://localhost:9000/category

# Vytvoriť novú kategóriu
curl -X POST http://localhost:9000/category \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test kategória",
    "description": "Test popis",
    "is_featured": true
  }'

# Upraviť kategóriu
curl -X PUT "http://localhost:9000/category?id=cat_01" \
  -H "Content-Type: application/json" \
  -d '{"name": "Upravený názov"}'

# Zmazať kategóriu
curl -X DELETE "http://localhost:9000/category?id=cat_01"
```

### 2. Testovanie cez Postman/Insomnia
Importujte endpoints a testujte všetky CRUD operácie.

## Rozšírenia

### Pridanie databázového uloženia
1. Vytvorte TypeORM/MikroORM entitu
2. Nahraďte in-memory storage v CategoryService
3. Pridajte migrácie

### Pridanie upload súborov
1. Integrácia s MinIO/S3
2. Upload endpointy pre obrázky
3. Automatické resize obrázkov

### Admin UI
1. Pridajte React komponenty pre admin
2. Integrácia s Medusa admin dashboardom
3. Drag & drop interface

## Bezpečnosť
- ⚠️ Aktuálne bez autentifikácie (iba development)
- 🔒 Pre produkciu pridajte auth middleware
- ✅ Vstupné dáta sú validované

---

*Vytvorené pre Zrubko.sk - Medusa.js Category API* 