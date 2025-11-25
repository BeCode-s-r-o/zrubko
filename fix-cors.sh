#!/bin/bash

# Skript na opravu CORS nastavení

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🔧 Oprava CORS nastavení"
echo "========================"
echo ""

BACKEND_ENV="backend/.env"
STORE_CORS_PORTS="http://localhost:3000,http://localhost:8000"

if [ ! -f "$BACKEND_ENV" ]; then
    echo "❌ Súbor $BACKEND_ENV neexistuje!"
    exit 1
fi

# Získame aktuálny STORE_CORS
CURRENT_CORS=$(grep "^STORE_CORS=" "$BACKEND_ENV" | cut -d'=' -f2-)

if [ -z "$CURRENT_CORS" ]; then
    echo "⚠️  STORE_CORS nie je nastavený. Pridávam..."
    echo "STORE_CORS=$STORE_CORS_PORTS" >> "$BACKEND_ENV"
    echo -e "${GREEN}✅ STORE_CORS pridaný${NC}"
else
    # Kontrola, či už obsahuje localhost:3000
    if echo "$CURRENT_CORS" | grep -q "localhost:3000"; then
        echo -e "${YELLOW}⚠️  STORE_CORS už obsahuje localhost:3000${NC}"
        echo "   Aktuálny STORE_CORS: $CURRENT_CORS"
    else
        # Pridáme localhost:3000 ak tam nie je
        NEW_CORS="$CURRENT_CORS,http://localhost:3000"
        sed -i.bak "s|^STORE_CORS=.*|STORE_CORS=$NEW_CORS|" "$BACKEND_ENV"
        echo -e "${GREEN}✅ localhost:3000 pridaný do STORE_CORS${NC}"
        echo "   Nový STORE_CORS: $NEW_CORS"
    fi
fi

echo ""
echo "📋 Aktuálne CORS nastavenia:"
grep "^STORE_CORS=" "$BACKEND_ENV" || echo "   (nie je nastavený)"

echo ""
echo "⚠️  DÔLEŽITÉ: Po zmene .env súboru reštartujte backend!"
echo "   cd backend && npm run dev"

