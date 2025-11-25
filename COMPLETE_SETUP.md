# Kompletný Setup - Storefront ↔ Backend Prepojenie

Tento dokument popisuje kompletné nastavenie prepojenia medzi storefrontom a backendom.

## 🚀 Rýchly Start

### 1. Automatické nastavenie

```bash
# Spustite setup skript
./setup-connection.sh
```

Tento skript automaticky:
- ✅ Vytvorí `backend/.env` s minimálnymi nastaveniami
- ✅ Vytvorí `storefront/.env.local` s minimálnymi nastaveniami
- ✅ Vygeneruje JWT_SECRET a COOKIE_SECRET
- ✅ Nastaví CORS správne

### 2. Nastavenie databázy

Upravte `DATABASE_URL` v `backend/.env`:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/medusa_db
```

### 3. Spustenie backendu

```bash
cd backend
npm install  # ak ešte nie sú nainštalované závislosti
npm run dev
```

Backend by mal bežať na: **http://localhost:9000**

### 4. Nastavenie Publishable Key

Po spustení backendu:

**Možnosť A: Automaticky (ak backend beží)**
```bash
cd storefront
node scripts/setup-publishable-key.js
```

**Možnosť B: Manuálne**
1. Otvorte **http://localhost:9000/app** (Medusa Admin)
2. Prejdite na **Settings → Store**
3. Skopírujte **Publishable Key**
4. Pridajte ho do `storefront/.env.local`:
   ```bash
   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_test_xxx
   ```

### 5. Kontrola regionov

```bash
cd storefront
node scripts/check-and-setup-regions.js
```

Ak nie sú regiony vytvorené:
1. Otvorte **http://localhost:9000/app**
2. Prejdite na **Settings → Regions**
3. Kliknite na **Create Region**
4. Vytvorte aspoň jeden region (napr. Slovakia s EUR)

### 6. Spustenie storefrontu

```bash
cd storefront
npm install  # ak ešte nie sú nainštalované závislosti
npm run dev
```

Storefront by mal bežať na: **http://localhost:3000** (alebo port uvedený v konzole)

### 7. Kontrola prepojenia

```bash
cd storefront
node check-backend-connection.js
```

Všetky kontroly by mali prejsť ✅

## 📋 Kontrolný zoznam

- [ ] `backend/.env` existuje a obsahuje správne nastavenia
- [ ] `storefront/.env.local` existuje a obsahuje správne nastavenia
- [ ] Backend beží na http://localhost:9000
- [ ] `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` je nastavený v `storefront/.env.local`
- [ ] Aspoň jeden region je vytvorený v Medusa Admin
- [ ] Storefront beží a zobrazuje produkty
- [ ] "Add to cart" funguje správne

## 🔧 Riešenie problémov

### Backend nebeží

```bash
cd backend
npm run dev
```

Skontrolujte:
- Či je databáza dostupná
- Či je `DATABASE_URL` správne nastavený
- Či nie sú porty obsadené

### CORS chyby

Skontrolujte `STORE_CORS` v `backend/.env`:

```bash
STORE_CORS=http://localhost:3000,http://localhost:8000
```

**Dôležité:** URL musí presne zodpovedať URL vášho storefrontu!

### Publishable Key chýba

1. Otvorte Medusa Admin: http://localhost:9000/app
2. Settings → Store
3. Skopírujte Publishable Key
4. Pridajte do `storefront/.env.local`

### Produkty sa nepridávajú do košíka

1. Skontrolujte konzolu v prehliadači (F12)
2. Pozrite sa na logy začínajúce `[addToCart]`
3. Skontrolujte, či backend beží
4. Skontrolujte, či sú regiony vytvorené
5. Skontrolujte, či produkty majú varianty

Pozri sa na `RIESENIE_ADD_TO_CART.md` pre detailné riešenie.

## 🔍 Diagnostika

### Skontrolujte backend health

```bash
curl http://localhost:9000/health
```

Očakávaná odpoveď:
```json
{
  "status": "ok"
}
```

### Skontrolujte regiony

```bash
curl http://localhost:9000/store/regions
```

### Skontrolujte produkty

```bash
curl http://localhost:9000/store/products
```

## 📝 Environment Premenné

### Backend (`backend/.env`)

**Povinné:**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret pre JWT tokeny
- `COOKIE_SECRET` - Secret pre cookies
- `STORE_CORS` - CORS origins pre storefront

**Odporúčané:**
- `ADMIN_CORS` - CORS origins pre admin
- `AUTH_CORS` - CORS origins pre auth
- `MEDUSA_ADMIN_EMAIL` - Admin email
- `MEDUSA_ADMIN_PASSWORD` - Admin heslo

### Storefront (`storefront/.env.local`)

**Povinné:**
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` - URL backendu
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` - Publishable key z Medusa Admin

**Odporúčané:**
- `NEXT_PUBLIC_BASE_URL` - URL storefrontu
- `NEXT_PUBLIC_DEFAULT_REGION` - Predvolený region (napr. `us`, `sk`)

## 🎯 Testovanie

Po dokončení setupu:

1. **Otvorte storefront:** http://localhost:3000
2. **Kliknite na produkt**
3. **Kliknite na "Add to cart"**
4. **Skontrolujte, či sa produkt pridal do košíka**

Ak všetko funguje, mali by ste vidieť:
- ✅ Produkt sa pridá do košíka
- ✅ Košík sa aktualizuje v headeri
- ✅ V konzole nie sú chyby

## 🆘 Potrebujete pomoc?

1. Spustite diagnostický skript: `node check-backend-connection.js`
2. Skontrolujte logy v konzole prehliadača
3. Skontrolujte backend logy
4. Pozrite sa na `RIESENIE_ADD_TO_CART.md`

---

**Posledná aktualizácia:** 2025-01-27

