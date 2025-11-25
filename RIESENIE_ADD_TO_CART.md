# Riešenie problému: Produkt sa nepridáva do košíka

Tento dokument popisuje kroky na diagnostiku a riešenie problému, keď sa produkt nepridáva do košíka.

## 🔍 Diagnostika

### 1. Spustite diagnostický skript

```bash
cd storefront
node check-backend-connection.js
```

Tento skript skontroluje:
- ✓ Či je backend dostupný
- ✓ Či fungujú API endpointy
- ✓ Či sa dá vytvoriť košík
- ✓ Či je správne nastavený CORS

### 2. Skontrolujte konzolu v prehliadači

Otvorte Developer Tools (F12) a pozrite sa na:
- **Console** - hľadajte chybové správy začínajúce `[addToCart]`, `[getOrSetCart]`, `[ProductGrid]`
- **Network** - skontrolujte, či sa volajú správne API endpointy a aké sú odpovede

### 3. Skontrolujte environment premenné

#### Storefront (`storefront/.env.local`)

```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_test_xxx
```

**Dôležité:**
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` musí ukazovať na správny backend URL
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` musí byť nastavený (získate ho z Medusa Admin)

#### Backend (`backend/.env`)

```bash
STORE_CORS=http://localhost:8000,http://localhost:3000
```

**Dôležité:**
- `STORE_CORS` musí obsahovať URL vášho storefrontu
- Ak používate iný port, pridajte ho do zoznamu

## 🛠️ Riešenie bežných problémov

### Problém 1: Backend nie je dostupný

**Príznaky:**
- V konzole vidíte: `No response received` alebo `ECONNREFUSED`
- Diagnostický skript hlási: `Backend nie je dostupný`

**Riešenie:**
1. Skontrolujte, či beží backend:
   ```bash
   cd backend
   npm run dev
   ```
2. Skontrolujte, či backend beží na správnom porte (predvolený je 9000)
3. Skontrolujte `NEXT_PUBLIC_MEDUSA_BACKEND_URL` v `storefront/.env.local`

### Problém 2: CORS chyba

**Príznaky:**
- V konzole vidíte: `CORS policy: No 'Access-Control-Allow-Origin' header`
- Network tab ukazuje `CORS error`

**Riešenie:**
1. Skontrolujte `STORE_CORS` v `backend/.env`:
   ```bash
   STORE_CORS=http://localhost:8000,http://localhost:3000
   ```
2. Reštartujte backend po zmene `.env` súboru
3. Uistite sa, že URL v `STORE_CORS` presne zodpovedá URL vášho storefrontu

### Problém 3: Chýbajúci Publishable Key

**Príznaky:**
- V konzole vidíte: `Publishable key is missing`
- Produkty sa nenačítavajú

**Riešenie:**
1. Otvorte Medusa Admin: `http://localhost:9000/app`
2. Prejdite na **Settings** → **Store**
3. Skopírujte **Publishable Key**
4. Pridajte ho do `storefront/.env.local`:
   ```bash
   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_test_xxx
   ```
5. Reštartujte storefront

### Problém 4: Region nie je nájdený

**Príznaky:**
- V konzole vidíte: `Region not found for country code: sk`
- `getOrSetCart` zlyháva

**Riešenie:**
1. Skontrolujte, či existujú regiony v backend:
   ```bash
   curl http://localhost:9000/store/regions
   ```
2. Ak nie sú regiony, vytvorte ich v Medusa Admin alebo pomocou seed skriptu
3. Skontrolujte `NEXT_PUBLIC_DEFAULT_REGION` v `storefront/.env.local`

### Problém 5: Variant ID nie je správne

**Príznaky:**
- V konzole vidíte: `Missing variant ID when adding to cart`
- Produkty nemajú `variantId` v `ProductGridItem`

**Riešenie:**
1. Skontrolujte, či produkty majú varianty v Medusa Admin
2. Skontrolujte, či sa varianty správne načítavajú (pozrite sa na logy `[getQuickAddVariantId]`)
3. Skontrolujte, či varianty majú správne nastavený inventár

### Problém 6: Košík sa nevytvára

**Príznaky:**
- V konzole vidíte: `Error retrieving or creating cart`
- `getOrSetCart` zlyháva

**Riešenie:**
1. Skontrolujte, či backend API správne odpovedá na `/store/carts` endpoint
2. Skontrolujte cookies v prehliadači - mali by ste vidieť `_medusa_cart_id`
3. Skontrolujte, či nie je problém s `sameSite` nastavením cookies

## 📝 Kontrolný zoznam

Pred nahlásením problému skontrolujte:

- [ ] Backend beží a je dostupný na `http://localhost:9000`
- [ ] Storefront beží a je dostupný na `http://localhost:8000` (alebo iný port)
- [ ] `NEXT_PUBLIC_MEDUSA_BACKEND_URL` je správne nastavený
- [ ] `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` je nastavený
- [ ] `STORE_CORS` v backend obsahuje URL storefrontu
- [ ] Regiony sú vytvorené v backend
- [ ] Produkty majú varianty
- [ ] Varianty majú nastavený inventár alebo `manage_inventory: false`
- [ ] Cookies nie sú blokované v prehliadači
- [ ] V konzole nie sú CORS chyby

## 🐛 Debugging

### Zapnite detailné logy

V `storefront/src/lib/config.ts` je už zapnutý debug mode v development:

```typescript
debug: process.env.NODE_ENV === "development"
```

Všetky API volania by mali byť logované v konzole.

### Skontrolujte Network tab

1. Otvorte Developer Tools (F12)
2. Prejdite na **Network** tab
3. Kliknite na "Add to cart"
4. Pozrite sa na:
   - `POST /store/carts` - vytvorenie košíka
   - `POST /store/carts/:id/line-items` - pridanie položky
   - Status kódy (mali by byť 200 alebo 201)
   - Response body (mali by obsahovať cart data)

### Skontrolujte cookies

1. Otvorte Developer Tools (F12)
2. Prejdite na **Application** → **Cookies**
3. Skontrolujte, či existujú:
   - `_medusa_cart_id` - ID košíka
   - `_medusa_jwt` - JWT token (ak ste prihlásení)

## 📞 Ďalšia pomoc

Ak problém pretrváva:

1. Spustite diagnostický skript a pošlite výstup
2. Skopírujte chybové správy z konzoly
3. Skopírujte Network tab požiadavky a odpovede
4. Skontrolujte backend logy

## 🔄 Reštartovanie služieb

Ak nič nepomôže, skúste reštartovať:

```bash
# Backend
cd backend
npm run dev

# Storefront (v novom termináli)
cd storefront
npm run dev
```

**Dôležité:** Po zmene `.env` súborov vždy reštartujte služby!

