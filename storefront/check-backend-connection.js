#!/usr/bin/env node

/**
 * Diagnostický skript na kontrolu prepojenia medzi storefrontom a backendom
 * 
 * Spustenie:
 *   node check-backend-connection.js
 */

const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

console.log("🔍 Kontrola prepojenia Storefront ↔ Backend\n")
console.log("Konfigurácia:")
console.log(`  Backend URL: ${MEDUSA_BACKEND_URL}`)
console.log(`  Publishable Key: ${PUBLISHABLE_KEY ? "✓ Nastavený" : "✗ CHÝBA - musí byť nastavený!"}\n`)

async function checkBackendHealth() {
  try {
    console.log("1. Kontrola backend health endpoint...")
    const healthResponse = await fetch(`${MEDUSA_BACKEND_URL}/health`)
    
    if (!healthResponse.ok) {
      console.log(`   ✗ Backend neodpovedá správne (status: ${healthResponse.status})`)
      return false
    }
    
    const healthData = await healthResponse.json()
    console.log(`   ✓ Backend je dostupný: ${JSON.stringify(healthData)}`)
    return true
  } catch (error) {
    console.log(`   ✗ Backend nie je dostupný: ${error.message}`)
    console.log(`   Uistite sa, že backend beží na ${MEDUSA_BACKEND_URL}`)
    return false
  }
}

async function checkRegions() {
  try {
    console.log("\n2. Kontrola regions endpoint...")
    const regionsResponse = await fetch(`${MEDUSA_BACKEND_URL}/store/regions`)
    
    if (!regionsResponse.ok) {
      console.log(`   ✗ Regions endpoint neodpovedá (status: ${regionsResponse.status})`)
      return false
    }
    
    const regionsData = await regionsResponse.json()
    console.log(`   ✓ Regions endpoint funguje (nájdených ${regionsData.regions?.length || 0} regiónov)`)
    return true
  } catch (error) {
    console.log(`   ✗ Chyba pri volaní regions endpoint: ${error.message}`)
    return false
  }
}

async function checkCartCreation() {
  try {
    console.log("\n3. Kontrola vytvorenia košíka...")
    
    // Najprv získame region
    const regionsResponse = await fetch(`${MEDUSA_BACKEND_URL}/store/regions`)
    if (!regionsResponse.ok) {
      console.log(`   ✗ Nemôžem získať regiony`)
      return false
    }
    
    const regionsData = await regionsResponse.json()
    const firstRegion = regionsData.regions?.[0]
    
    if (!firstRegion) {
      console.log(`   ✗ Žiadne regiony nie sú dostupné`)
      return false
    }
    
    console.log(`   Používam region: ${firstRegion.name} (${firstRegion.id})`)
    
    // Vytvoríme košík
    const cartResponse = await fetch(`${MEDUSA_BACKEND_URL}/store/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        region_id: firstRegion.id,
      }),
    })
    
    if (!cartResponse.ok) {
      const errorData = await cartResponse.json()
      console.log(`   ✗ Nemôžem vytvoriť košík: ${JSON.stringify(errorData)}`)
      return false
    }
    
    const cartData = await cartResponse.json()
    console.log(`   ✓ Košík úspešne vytvorený: ${cartData.cart.id}`)
    return true
  } catch (error) {
    console.log(`   ✗ Chyba pri vytváraní košíka: ${error.message}`)
    return false
  }
}

async function checkCORS() {
  try {
    console.log("\n4. Kontrola CORS nastavení...")
    const testResponse = await fetch(`${MEDUSA_BACKEND_URL}/health`, {
      method: "OPTIONS",
    })
    
    const corsHeader = testResponse.headers.get("access-control-allow-origin")
    if (corsHeader) {
      console.log(`   ✓ CORS je nastavený: ${corsHeader}`)
      return true
    } else {
      console.log(`   ⚠ CORS header nie je nastavený (môže spôsobiť problémy v prehliadači)`)
      return false
    }
  } catch (error) {
    console.log(`   ✗ Chyba pri kontrole CORS: ${error.message}`)
    return false
  }
}

async function main() {
  const results = {
    health: await checkBackendHealth(),
    regions: await checkRegions(),
    cart: await checkCartCreation(),
    cors: await checkCORS(),
  }
  
  console.log("\n" + "=".repeat(50))
  console.log("📊 Súhrn:")
  console.log(`  Health check: ${results.health ? "✓" : "✗"}`)
  console.log(`  Regions: ${results.regions ? "✓" : "✗"}`)
  console.log(`  Cart creation: ${results.cart ? "✓" : "✗"}`)
  console.log(`  CORS: ${results.cors ? "✓" : "⚠"}`)
  
  const allPassed = Object.values(results).every(r => r === true)
  
  if (allPassed) {
    console.log("\n✅ Všetky kontroly prešli! Backend je správne nakonfigurovaný.")
  } else {
    console.log("\n❌ Niektoré kontroly zlyhali. Skontrolujte:")
    console.log("   1. Či beží backend na správnom porte")
    console.log("   2. Či je správne nastavený STORE_CORS v backend/.env")
    console.log("   3. Či sú regiony vytvorené v backend")
    console.log("   4. Či je publishable key nastavený v storefront/.env.local")
  }
  
  process.exit(allPassed ? 0 : 1)
}

main().catch((error) => {
  console.error("\n💥 Neočakávaná chyba:", error)
  process.exit(1)
})

