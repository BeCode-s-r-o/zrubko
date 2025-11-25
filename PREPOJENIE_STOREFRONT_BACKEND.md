# Prepojenie Storefront ↔ Backend (bez tajomstiev)

Tento dokument sumarizuje kroky potrebné na spojazdnenie Furnitor storefrontu
s Medusa backendom **bez** zverejňovania citlivých údajov. Všetky tajné kľúče
a prístupové údaje si nechajte len v lokálnych `.env` súboroch alebo v trezore
(1Password, Doppler, Vault...).

---

## Architektúra

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ Storefront   │ ───▶ │   Backend    │ ───▶ │  PostgreSQL  │
│ Next.js 14   │      │ Medusa 2.0   │      │ Railway      │
└──────────────┘      └──────────────┘      └──────────────┘
```

---

## Konfigurácia prostredí

### Backend (`backend/.env`)

```bash
NODE_ENV=development
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
ADMIN_CORS=http://localhost:9000,<production-admin-url>
STORE_CORS=http://localhost:8000,<production-storefront-url>
AUTH_CORS=http://localhost:9000,<production-backend-url>

JWT_SECRET=<random-32-characters>
COOKIE_SECRET=<random-32-characters>

MEDUSA_ADMIN_EMAIL=<admin-email>
MEDUSA_ADMIN_PASSWORD=<strong-password>

STRIPE_API_KEY=sk_test_xxx    # nájdete v Stripe dashboarde
STRIPE_WEBHOOK_SECRET=whsec_xxx

MINIO_ENDPOINT=<minio-host>
MINIO_ACCESS_KEY=<minio-access>
MINIO_SECRET_KEY=<minio-secret>
MINIO_BUCKET=<bucket-name>
```

> 💡 Odporúčame mať `.env` len lokálne a nikdy ho necommittovať. Na zdieľanie
> hodnôt používajte správcu tajomstiev.

### Storefront (`storefront/.env.local`)

```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_DEFAULT_REGION=us
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_test_xxx
NEXT_PUBLIC_SEARCH_ENDPOINT=http://localhost:7700
NEXT_PUBLIC_SEARCH_API_KEY=<search-key>
NEXT_PUBLIC_INDEX_NAME=products
```

---

## Postup spustenia

1. **Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   - API: http://localhost:9000
   - Admin: http://localhost:9000/app

2. **Storefront**
   ```bash
   cd storefront
   npm install
   npm run dev
   ```
   - UI: http://localhost:8000

---

## Kontrolný zoznam

- [ ] `.env` súbory obsahujú len lokálne tajomstvá
- [ ] Publishable key je nastavený v storefronte
- [ ] Backend vráti `status: ok` na `/health`
- [ ] Produkty sú publikované a priradené k Default Sales Channel
- [ ] Frontend zobrazuje produkty po načítaní publishable key

---

## Bezpečnostné odporúčania

- Tajomstvá nikdy nedržte v markdownoch ani v záložných súboroch.
- Citlivé hodnoty rotujte vždy, keď sa náhodne zverejnia.
- Zapnite GitHub Secret Scanning & Push Protection pre všetky vetvy.
- Používajte samostatné kľúče pre vývoj, staging a produkciu.

---

**Posledná aktualizácia:** 25. 11. 2025 (tajomstvá odstránené z histórie)

