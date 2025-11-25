#!/bin/bash

# Setup skript pre prepojenie Storefront ↔ Backend
# Tento skript automaticky nastaví všetky potrebné konfigurácie

set -e

echo "🔧 Nastavovanie prepojenia Storefront ↔ Backend"
echo "================================================"
echo ""

# Farba pre výstup
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Funkcia na generovanie náhodného stringu
generate_secret() {
    openssl rand -hex 32
}

# Kontrola, či existuje .env súbor
check_env_file() {
    if [ -f "$1" ]; then
        echo -e "${YELLOW}⚠️  Súbor $1 už existuje. Preskakujem...${NC}"
        return 1
    fi
    return 0
}

# Backend .env
echo "📝 Nastavovanie backend/.env..."
if check_env_file "backend/.env"; then
    cat > backend/.env << EOF
# Medusa Backend Configuration
NODE_ENV=development

# Database (nastavte podľa vašej databázy)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/medusa_db

# CORS Configuration
ADMIN_CORS=http://localhost:9000
STORE_CORS=http://localhost:3000,http://localhost:8000
AUTH_CORS=http://localhost:9000

# Secrets (automaticky vygenerované)
JWT_SECRET=$(generate_secret)
COOKIE_SECRET=$(generate_secret)

# Admin Credentials
MEDUSA_ADMIN_EMAIL=admin@medusa.test
MEDUSA_ADMIN_PASSWORD=supersecret

# Optional: Stripe (nastavte ak používate)
# STRIPE_API_KEY=sk_test_xxx
# STRIPE_WEBHOOK_SECRET=whsec_xxx

# Optional: MinIO (nastavte ak používate)
# MINIO_ENDPOINT=localhost
# MINIO_ACCESS_KEY=minioadmin
# MINIO_SECRET_KEY=minioadmin
# MINIO_BUCKET=medusa-media
EOF
    echo -e "${GREEN}✅ backend/.env vytvorený${NC}"
else
    echo -e "${YELLOW}⚠️  backend/.env už existuje - skontrolujte STORE_CORS${NC}"
    # Skontrolujte, či STORE_CORS obsahuje správne URL
    if grep -q "STORE_CORS" backend/.env; then
        echo "   Aktuálny STORE_CORS:"
        grep "STORE_CORS" backend/.env | head -1
    fi
fi

echo ""

# Storefront .env.local
echo "📝 Nastavovanie storefront/.env.local..."
if check_env_file "storefront/.env.local"; then
    cat > storefront/.env.local << EOF
# Medusa Storefront Configuration
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_REGION=us

# Publishable Key (získate z Medusa Admin po prvom spustení)
# Otvorte http://localhost:9000/app → Settings → Store
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=

# Optional: Search (nastavte ak používate Meilisearch)
# NEXT_PUBLIC_SEARCH_ENDPOINT=http://localhost:7700
# NEXT_PUBLIC_SEARCH_API_KEY=
# NEXT_PUBLIC_INDEX_NAME=products
EOF
    echo -e "${GREEN}✅ storefront/.env.local vytvorený${NC}"
    echo -e "${YELLOW}⚠️  DÔLEŽITÉ: Po spustení backendu nastavte NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY${NC}"
else
    echo -e "${YELLOW}⚠️  storefront/.env.local už existuje${NC}"
fi

echo ""
echo "================================================"
echo -e "${GREEN}✅ Základná konfigurácia dokončená${NC}"
echo ""
echo "📋 Ďalšie kroky:"
echo ""
echo "1. Nastavte DATABASE_URL v backend/.env (ak používate inú databázu)"
echo "2. Spustite backend:"
echo "   cd backend && npm run dev"
echo ""
echo "3. Po spustení backendu:"
echo "   - Otvorte http://localhost:9000/app"
echo "   - Prejdite na Settings → Store"
echo "   - Skopírujte Publishable Key"
echo "   - Pridajte ho do storefront/.env.local ako NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY"
echo ""
echo "4. Spustite storefront:"
echo "   cd storefront && npm run dev"
echo ""
echo "5. Skontrolujte prepojenie:"
echo "   cd storefront && node check-backend-connection.js"
echo ""

