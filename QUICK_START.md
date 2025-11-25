# 🚀 Rýchly Start - Kompletné Prepojenie

## ✅ Čo bolo nastavené

1. **Backend konfigurácia** (`backend/.env`)
   - ✅ STORE_CORS obsahuje `http://localhost:3000` a `http://localhost:8000`
   - ✅ JWT_SECRET a COOKIE_SECRET (ak boli vygenerované)
   - ✅ Databáza konfigurácia

2. **Storefront konfigurácia** (`storefront/.env.local`)
   - ✅ NEXT_PUBLIC_MEDUSA_BACKEND_URL = `http://localhost:9000`
   - ✅ NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY je nastavený

3. **Diagnostické nástroje**
   - ✅ `check-backend-connection.js` - kontrola prepojenia
   - ✅ `scripts/setup-publishable-key.js` - automatické nastavenie publishable key
   - ✅ `scripts/check-and-setup-regions.js` - kontrola regionov

## 🎯 Spustenie (3 kroky)

### Krok 1: Spustite backend

```bash
cd backend
npm run dev
```

**Očakávaný výstup:**
- Backend beží na http://localhost:9000
- Admin panel: http://localhost:9000/app

### Krok 2: Spustite storefront

**V novom termináli:**

```bash
cd storefront
npm run dev
```

**Očakávaný výstup:**
- Storefront beží na http://localhost:3000 (alebo iný port)

### Krok 3: Skontrolujte prepojenie

**V novom termináli:**

```bash
cd storefront
node check-backend-connection.js
```

**Očakávaný výstup:**
```
✅ Všetky kontroly prešli! Backend je správne nakonfigurovaný.
```

## 🧪 Testovanie "Add to Cart"

1. Otvorte storefront: http://localhost:3000
2. Prejdite na homepage
3. Kliknite na "Add to cart" na ľubovoľnom produkte
4. Skontrolujte:
   - ✅ Produkt sa pridal do košíka
   - ✅ Košík sa aktualizoval v headeri
   - ✅ V konzole nie sú chyby

## 🔧 Riešenie problémov

### Backend nebeží

```bash
cd backend
npm run dev
```

**Skontrolujte:**
- Či je databáza dostupná
- Či je `DATABASE_URL` správne nastavený v `backend/.env`

### CORS chyby

```bash
./fix-cors.sh
```

Alebo manuálne upravte `backend/.env`:
```bash
STORE_CORS=http://localhost:3000,http://localhost:8000
```

**Dôležité:** Po zmene `.env` reštartujte backend!

### Produkty sa nepridávajú do košíka

1. Otvorte Developer Tools (F12)
2. Pozrite sa na **Console** tab
3. Hľadajte logy začínajúce `[addToCart]`, `[getOrSetCart]`
4. Skontrolujte **Network** tab - pozrite sa na API volania

**Bežné problémy:**
- Backend nie je spustený
- Regiony nie sú vytvorené
- Produkty nemajú varianty

**Riešenie:**
```bash
# Skontrolujte regiony
cd storefront
node scripts/check-and-setup-regions.js
```

## 📋 Kontrolný zoznam

Pred testovaním skontrolujte:

- [ ] Backend beží na http://localhost:9000
- [ ] Storefront beží (port zobrazí v konzole)
- [ ] `STORE_CORS` v `backend/.env` obsahuje URL storefrontu
- [ ] `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` je nastavený
- [ ] Aspoň jeden region je vytvorený v Medusa Admin
- [ ] Produkty majú varianty

## 🆘 Potrebujete pomoc?

1. **Spustite diagnostiku:**
   ```bash
   cd storefront
   node check-backend-connection.js
   ```

2. **Skontrolujte logy:**
   - Backend konzola
   - Storefront konzola
   - Browser konzola (F12)

3. **Pozrite sa na dokumentáciu:**
   - `COMPLETE_SETUP.md` - Kompletný setup návod
   - `RIESENIE_ADD_TO_CART.md` - Riešenie problémov s košíkom

---

**Všetko je pripravené! Spustite backend a storefront a môžete začať testovať.** 🎉

