# Admin systém pre správu kategórií

Tento systém umožňuje správu kategórií s vlastnými banermi, opismi, buttonmi a fotkami cez admin rozhranie Medusa.js.

## Funkcie

### ✅ Kompletná správa kategórií
- Vytváranie nových kategórií
- Úprava existujúcich kategórií  
- Mazanie kategórií
- Zmena poradia kategórií

### ✅ Vlastné bannery
- Upload banner obrázkov
- Vlastné titulky a podtitulky
- Responsívne zobrazenie

### ✅ Custom buttony
- Pridávanie vlastných buttonov
- Primárny a sekundárny štýl
- Vlastné URL linky

### ✅ Galéria obrázkov
- Pridávanie multiple obrázkov
- Jednoduchá správa galérie

### ✅ Pokročilé funkcie
- Náhľad kategórie pred publikovaním
- Drag & drop preusporiadanie
- Featured kategórie
- Automatické generovanie URL slugov

## Použitie

### Prístup do admin rozhrania

1. **Spustenie backendu:**
```bash
cd backend
npm run dev
```

2. **Prístup cez browser:**
```
http://localhost:9000/app
```

3. **Admin rozhranie:**
   - Hlavný widget: Zobrazí sa automaticky na product.list.before
   - Plná stránka: Navigácia → Kategórie

### API endpoints

#### Získanie kategórií
```bash
GET http://localhost:9000/store/custom/categories
```

#### Filtrovanie kategórií  
```bash
GET http://localhost:9000/store/custom/categories?featured=true
GET http://localhost:9000/store/custom/categories?slug=shou-sugi-ban
```

#### Vytváranie kategórie
```bash
POST http://localhost:9000/store/custom/categories
Content-Type: application/json

{
  "name": "Nová kategória",
  "description": "Popis kategórie",
  "banner_title": "Banner titulok",
  "banner_subtitle": "Banner podtitulok",
  "custom_buttons": [
    {
      "text": "Viac info",
      "url": "/info",
      "style": "primary"
    }
  ],
  "is_featured": true
}
```

## Štruktúra súborov

```
backend/src/
├── admin/
│   ├── widgets/
│   │   └── category-management-widget.tsx    # Widget pre admin
│   └── routes/
│       └── categories/
│           └── page.tsx                       # Plná admin stránka
├── api/
│   └── store/
│       └── custom/
│           └── categories.ts                  # API endpoints
├── types/
│   └── categories.ts                         # TypeScript typy
└── utils/
    └── categories.ts                         # Utility funkcie
```

## Komponenty Admin rozhrania

### CategoryManagementWidget
- Jednoduchý widget pre rýchlu správu
- Zobrazuje sa na product stránkach
- Základné CRUD operácie

### CategoriesManagementPage  
- Plná admin stránka
- Pokročilé funkcie (náhľad, drag&drop)
- Tab rozhranie (zoznam, formulár, náhľad)

## Dátová štruktúra

```typescript
interface CategoryData {
  id: string
  name: string                    // Názov kategórie
  slug: string                   // URL slug
  description?: string           // Popis kategórie
  banner_image?: string         // URL banner obrázka
  banner_title?: string         // Banner titulok
  banner_subtitle?: string      // Banner podtitulok
  custom_buttons?: Array<{      // Custom buttony
    text: string
    url: string
    style: 'primary' | 'secondary'
  }>
  gallery_images?: string[]     // Galéria obrázkov
  is_featured: boolean          // Je vybraná kategória
  sort_order: number           // Poradie zobrazovania
  created_at?: string
  updated_at?: string
}
```

## Integrácia so storefrontom

### 1. Načítanie kategórií v Next.js

```typescript
// lib/categories.ts
export async function getCategories(featured?: boolean) {
  const params = featured ? '?featured=true' : ''
  const response = await fetch(`${BACKEND_URL}/store/custom/categories${params}`)
  return response.json()
}

export async function getCategoryBySlug(slug: string) {
  const response = await fetch(`${BACKEND_URL}/store/custom/categories?slug=${slug}`)
  const data = await response.json()
  return data.categories[0] || null
}
```

### 2. Zobrazenie kategórie

```tsx
// components/CategoryBanner.tsx
import { CategoryData } from '../types/categories'

interface Props {
  category: CategoryData
}

export default function CategoryBanner({ category }: Props) {
  return (
    <div className="relative h-96 overflow-hidden">
      {category.banner_image && (
        <img 
          src={category.banner_image} 
          alt={category.name}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-2">
            {category.banner_title || category.name}
          </h1>
          {category.banner_subtitle && (
            <p className="text-xl">{category.banner_subtitle}</p>
          )}
          {category.custom_buttons && (
            <div className="flex gap-4 mt-6 justify-center">
              {category.custom_buttons.map((button, index) => (
                <a
                  key={index}
                  href={button.url}
                  className={`px-6 py-3 rounded font-medium ${
                    button.style === 'primary' 
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'border border-white text-white hover:bg-white hover:text-black'
                  }`}
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

### 3. Stránka kategórie

```tsx
// pages/[categorySlug].tsx
import { GetStaticProps, GetStaticPaths } from 'next'
import { getCategoryBySlug, getCategories } from '../lib/categories'
import CategoryBanner from '../components/CategoryBanner'

export default function CategoryPage({ category }: { category: CategoryData }) {
  return (
    <div>
      <CategoryBanner category={category} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="prose max-w-none">
          <p>{category.description}</p>
        </div>

        {category.gallery_images && category.gallery_images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {category.gallery_images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${category.name} ${index + 1}`}
                className="w-full h-48 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = await getCategoryBySlug(params?.categorySlug as string)
  
  if (!category) {
    return { notFound: true }
  }

  return {
    props: { category },
    revalidate: 60 // ISR - regenerácia každú minútu
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { categories } = await getCategories()
  
  const paths = categories.map((cat: CategoryData) => ({
    params: { categorySlug: cat.slug }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}
```

## Bezpečnosť

- ⚠️ **Aktuálne**: Dáta sa ukladajú v localStorage (len pre development)
- 🔒 **Produkcia**: Implementujte databázové uloženie a autentifikáciu
- ✅ **Validácia**: Všetky dáta sú validované pred uložením

## Development vs Production

### Development (aktuálne)
- Dáta v localStorage
- Žiadna autentifikácia
- In-memory storage

### Production (odporúčané)
- PostgreSQL/MySQL databáza
- JWT autentifikácia
- File upload pre obrázky
- CDN pre statické súbory

## Tipsy a triky

### Automatické slug generovanie
Systém automaticky generuje URL slug z názvu kategórie s podporou slovenských znakov.

### Validácia
Všetky formuláre majú built-in validáciu a error handling.

### Náhľad
Môžete si pozrieť náhľad kategórie pred publikovaním.

### Drag & Drop
Jednoducho preusporiadajte kategórie ťahaním v zozname.

## Rozšírenia

### Pridanie nových polí
1. Aktualizujte `CategoryData` interface v `types/categories.ts`
2. Pridajte polia do formulára v admin komponente
3. Aktualizujte API endpoints a utility funkcie

### Integrácia s databázou
1. Nahraďte `CategoryService` implementáciu
2. Pridajte Medusa entity a repository
3. Implementujte migrácie

---

*Vytvorené pre Zrubko.sk admin systém* 