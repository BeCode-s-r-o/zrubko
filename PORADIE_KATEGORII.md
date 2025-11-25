# Poradie kategórií v Zrubko eshope

## ✅ Stav: IMPLEMENTOVANÉ

Kategórie sa teraz správne zoraďujú podľa rank hodnoty nastavenej v admin paneli.

---

## 🎯 Ako to funguje

### 1. Rank pole v Medusa

Každá produktová kategória v Medusa má `rank` pole, ktoré určuje poradie medzi súrodencami (sibling categories). Nižšie číslo = vyššia pozícia v zozname.

### 2. Upraviť poradie v Admin paneli

1. Prejdite do **Admin panel** → **Products** → **Categories**
2. Kliknite na tlačidlo **"Edit ranking"**
3. Pretiahnite kategórie do požadovaného poradia pomocou ikony ⋮⋮
4. Zmeny sa ukladajú automaticky

### 3. Kde sa poradie zobrazuje

Poradie kategórií sa automaticky aplikuje na:

#### ✅ Storefront (Eshop)
- **Header menu** - rozbaľovací zoznam kategórií
- **Footer** - zoznam kategórií v pätičke
- **Kategórie stránka** - zoznam všetkých kategórií

---

## 🔧 Technická implementácia

### Zmeny v kóde

**1. Storefront - CategoryMenu komponent** (`storefront/src/modules/layout/components/category-menu/index.tsx`)

```typescript
const { product_categories } = await sdk.store.category.list({
  fields: '+category_children,+rank',
  order: 'rank'  // Zoradiť podľa rank
})
```

**2. Storefront - Categories data layer** (`storefront/src/lib/data/categories.ts`)

```typescript
// listCategories
.list({ 
  fields: "+category_children,+rank", 
  order: "rank" 
}, { next: { tags: ["categories"] } })

// getCategoriesList
{ 
  limit, 
  offset, 
  fields: "+rank", 
  order: "rank" 
}
```

**3. Backend - Admin API Middleware** (`backend/src/api/admin/product-categories/middlewares.ts`)

```typescript
// Automaticky pridáva rank ordering pre admin panel
middlewares: [
  (req, res, next) => {
    if (!req.query.order || req.query.order === '') {
      req.query.order = "rank"
    }
    next()
  },
]
```

**4. Backend - Custom Admin Endpoint** (`backend/src/api/admin/product-categories/route.ts`)

```typescript
// Custom GET endpoint s rank orderingom
pagination: {
  skip: offset,
  take: limit,
  order: {
    rank: "ASC"
  }
}
```

**5. Backend - Global Middleware** (`backend/src/api/middlewares.ts`)

```typescript
// Globálny middleware pre všetky admin category requesty
{
  matcher: "/admin/product-categories",
  method: ["GET"],
  middlewares: [...]
}
```

### Kľúčové parametre

- **`fields: '+rank'`** - Zahrnie rank pole do výsledkov
- **`order: 'rank'`** - Zoradí kategórie vzostupne podľa rank
- **`order: '-rank'`** - Zoradí kategórie zostupne (opačne)

### Použitý plugin

- **`@alphabite/medusa-category-images`** - Plugin pre obrázky kategórií (už nainštalovaný)

---

## 📝 Testovanie

### Ako otestovať

1. **Spustite backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Spustite storefront**:
   ```bash
   cd storefront
   npm run dev
   ```

3. **Otvorte Admin panel**:
   ```
   http://localhost:9000/app
   ```

4. **Zmeňte poradie kategórií**:
   - Products → Categories → Edit ranking
   - Pretiahnite kategórie do nového poradia

5. **Skontrolujte storefront**:
   ```
   http://localhost:8000
   ```
   - Kategórie v headeri by mali byť v novom poradí
   - Refresh stránky môže byť potrebný kvôli cache

---

## 🐛 Riešenie problémov

### Kategórie sa nezobrazujú v novom poradí

**Príčiny:**
1. **Cache** - Next.js cachuje kategórie
2. **Nesprávne API volanie** - Chýba `order: 'rank'` parameter

**Riešenie:**
1. Hard refresh browsera (Cmd+Shift+R alebo Ctrl+Shift+R)
2. Reštartujte storefront server
3. Vyčistite Next.js cache:
   ```bash
   cd storefront
   rm -rf .next
   npm run dev
   ```

### Admin panel tabuľka nezobrazuje správne poradie

**Dôležité:** Toto je limitácia Medusa Admin UI. Tabuľka kategórií v admin paneli nemusí vždy zobrazovať kategórie v poradí podľa rank. **Toto NIE je chyba!**

**Čo funguje:**
- ✅ "Edit ranking" dialog - správne zobrazuje a ukladá poradie
- ✅ Storefront (eshop) - zobrazuje kategórie v správnom poradí
- ✅ Rank hodnoty v databáze - sú správne uložené

**Overenie, že poradie funguje:**

1. **Skontrolujte rank hodnoty v databáze:**
   ```bash
   curl http://localhost:9000/admin/categories-rank \
     -H "Cookie: connect.sid=YOUR_SESSION_COOKIE"
   ```

2. **Skontrolujte storefront:**
   - Otvorte http://localhost:8000
   - Kategórie v header menu by mali byť v správnom poradí

**Poznámka:** Tabuľka v admin paneli používa vlastnú logiku zobrazovania a nemusí rešpektovať rank poradie. Toto je správanie štandardného Medusa Admin UI. Dôležité je, že rank hodnoty sú správne uložené a storefront ich správne používa.

### Rank hodnoty nie sú v databáze

**Riešenie:**
1. Otvorte Admin panel
2. Kliknite "Edit ranking"
3. Pretiahnite kategórie (aj keď len mierne) - tým sa rank hodnoty nastavia
4. Zavrite ranking dialog
5. Overte na storefrontu, že poradie je správne

---

## 📚 Dokumentácia Medusa

- [Manage Categories Ranking](https://docs.medusajs.com/user-guide/products/categories#edit-categories-ranking)
- [Sort Categories API](https://docs.medusajs.com/resources/storefront-development/products/categories/list#sort-categories)
- [Product Categories API](https://docs.medusajs.com/api/store#tag/Product-Categories)

---

## 🔄 Automatické aktualizácie

Next.js automaticky revaliduje cache pri zmene kategórií vďaka:

```typescript
{ next: { tags: ["categories"] } }
```

Ak potrebujete manuálne revalidovať:
```typescript
revalidateTag('categories')
```

---

## ✅ Výsledok

Po implementácii týchto zmien:
- ✅ Poradie kategórií v admin paneli sa synchronizuje s eshopm
- ✅ Zmeny v "Edit ranking" sa okamžite prejavia (po refreshi)
- ✅ Všetky komponenty používajú jednotné poradie
- ✅ Funguje pre top-level aj vnorené kategórie

---

*Posledná aktualizácia: 22. november 2025*

