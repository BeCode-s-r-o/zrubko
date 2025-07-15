alo# Breadcrumbs Implementácia

Breadcrumbs (drobčekové navigácie) boli implementované pre váš e-shop s podporou slovenského jazyka.

## Komponenty

### 1. Breadcrumbs komponent
**Súbor:** `src/modules/common/components/breadcrumbs/index.tsx`

Hlavný komponent pre zobrazenie breadcrumbs navigácie.

### 2. useBreadcrumbs hook  
**Súbor:** `src/lib/hooks/use-breadcrumbs.tsx`

Hook pre generovanie breadcrumbs na základe URL a poskytnutých dát.

### 3. ChevronRight ikon
**Súbor:** `src/modules/common/icons/chevron-right.tsx` 

Ikon pre oddelenie jednotlivých častí breadcrumbs.

## Použitie

### Základné použitie (automatické)
```tsx
import Breadcrumbs from "@modules/common/components/breadcrumbs"

// Automaticky vygeneruje breadcrumbs na základe URL
<Breadcrumbs />
```

### Produkt s kategóriami
```tsx
import Breadcrumbs from "@modules/common/components/breadcrumbs"

const categoryPath = [
  { name: "Elektronika", handle: "elektronika" },
  { name: "Telefóny", handle: "telefony" }
]

<Breadcrumbs 
  productTitle="iPhone 15"
  categoryPath={categoryPath}
/>
```

### Kolekcie
```tsx
<Breadcrumbs 
  collectionName="Letná kolekcia 2024" 
/>
```

### Vlastné breadcrumbs
```tsx
const customBreadcrumbs = [
  { label: "Domov", href: "/", isActive: false },
  { label: "Môj účet", href: "/account", isActive: false },
  { label: "Objednávky", href: "/account/orders", isActive: true }
]

<Breadcrumbs customBreadcrumbs={customBreadcrumbs} />
```

## Slovenské preklady

Komponent automaticky prekladá tieto základné segmenty:

- `home` → "Domov"
- `products` → "Produkty"
- `categories` → "Kategórie"
- `collections` → "Kolekcie"
- `store` → "Obchod"
- `search` → "Vyhľadávanie"
- `cart` → "Košík"
- `account` → "Účet"
- `contact` → "Kontakt"
- `checkout` → "Pokladňa"
- `orders` → "Objednávky"
- `addresses` → "Adresy"
- `profile` → "Profil"
- `results` → "Výsledky"

## Integrácia do šablón

### Produktová stránka
Breadcrumbs sú automaticky pridané do `ProductTemplate` s podporou kategórií.

### Kategórie
Breadcrumbs sú pridané do `CategoryTemplate` s hierarchiou kategórií.

### Obchod
Breadcrumbs sú pridané do `StoreTemplate` pre základnú navigáciu.

## Styling

Komponent používa design systém z Medusa UI:
- `text-ui-fg-subtle` - farba pre odkazy
- `text-ui-fg-base` - farba pre aktívny prvok  
- `text-ui-fg-muted` - farba pre ikony
- `text-small-regular` - veľkosť textu
- `relative` - pozícia, aby sa nezakryl navbar
- `py-2 mb-2` - padding a margin pre správne umiestnenie

## Prispôsobenie

### Pridanie nových prekladov
Upravte objekt `translations` v súbore `use-breadcrumbs.tsx`:

```tsx
const translations = {
  // existujúce preklady...
  "novy-segment": "Nový prieklad"
}
```

### Zmena štýlov
Upravte CSS triedy v komponente `Breadcrumbs`:

```tsx
<nav className="flex items-center space-x-2 text-sm mb-4 py-4">
  {/* obsah */}
</nav>
```

## Príklady výstupu

### Produktová stránka s kategóriami:
```
Domov > Elektronika > Telefóny > iPhone 15
```

### Kategória:
```
Domov > Elektronika > Telefóny
```

### Obchod:
```
Domov > Obchod
```

### Účet:
```
Domov > Účet > Objednávky
```

Breadcrumbs automaticky detekujú jazyk (sk/en) z URL a nezobrazujú sa na domovskej stránke.

## Riešenie problémov

### Breadcrumbs zakrývajú navbar
Ak breadcrumbs zakrývajú navbar, skontrolujte:

1. **Pozícia breadcrumbs**: Majú `relative` pozíciu
2. **Responsive margin-top**: Container má `mt-4 md:mt-8 lg:mt-12` pre optimálny odstup na všetkých zariadeniach
3. **Z-index**: Navbar má `z-50`, breadcrumbs nemajú z-index
4. **Umiestnenie**: Breadcrumbs sú pod navbar-om v DOM štruktúre

```tsx
<div className="content-container mt-4 md:mt-12 lg:mt-20">
  <Breadcrumbs />
</div>
```

**Aktuálne riešenie**: Všetky templates používajú responsive spacing:
- **Mobile**: `mt-4` (16px)
- **Tablet**: `mt-12` (48px) 
- **Desktop**: `mt-20` (80px) 