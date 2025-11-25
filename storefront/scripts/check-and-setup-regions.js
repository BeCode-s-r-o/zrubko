#!/usr/bin/env node

/**
 * Skript na kontrolu a vytvorenie regionov v Medusa backendu
 * 
 * Spustenie:
 *   node scripts/check-and-setup-regions.js
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'

const DEFAULT_REGIONS = [
  {
    name: 'Slovakia',
    currency_code: 'EUR',
    countries: ['SK'],
  },
  {
    name: 'Czech Republic',
    currency_code: 'CZK',
    countries: ['CZ'],
  },
  {
    name: 'United States',
    currency_code: 'USD',
    countries: ['US'],
  },
]

async function checkBackend() {
  try {
    const response = await fetch(`${BACKEND_URL}/health`)
    if (!response.ok) {
      throw new Error(`Backend neodpovedá: ${response.status}`)
    }
    return true
  } catch (error) {
    console.error('❌ Backend nie je dostupný:', error.message)
    console.error(`   Uistite sa, že backend beží na ${BACKEND_URL}`)
    return false
  }
}

async function getRegions() {
  try {
    const response = await fetch(`${BACKEND_URL}/store/regions`)
    if (!response.ok) {
      throw new Error(`Chyba pri získavaní regionov: ${response.status}`)
    }
    const data = await response.json()
    return data.regions || []
  } catch (error) {
    console.error('❌ Chyba pri získavaní regionov:', error.message)
    return []
  }
}

async function createRegion(region) {
  try {
    // Poznámka: Toto vyžaduje admin API, ktoré nie je verejne dostupné
    // Tento skript len kontroluje existenciu regionov
    console.log(`   ⚠️  Region "${region.name}" musí byť vytvorený manuálne v Medusa Admin`)
    return false
  } catch (error) {
    console.error(`   ❌ Chyba pri vytváraní regionu "${region.name}":`, error.message)
    return false
  }
}

async function main() {
  console.log('🌍 Kontrola regionov v Medusa backendu')
  console.log('======================================\n')

  // Kontrola backendu
  if (!(await checkBackend())) {
    process.exit(1)
  }

  // Získanie existujúcich regionov
  console.log('🔍 Kontrola existujúcich regionov...')
  const existingRegions = await getRegions()

  if (existingRegions.length === 0) {
    console.log('⚠️  Žiadne regiony nie sú vytvorené!')
    console.log('\n📋 Vytvorte regiony v Medusa Admin:')
    console.log('   1. Otvorte http://localhost:9000/app')
    console.log('   2. Prejdite na Settings → Regions')
    console.log('   3. Kliknite na "Create Region"')
    console.log('   4. Vytvorte aspoň jeden region (napr. Slovakia s EUR)')
    console.log('\n💡 Odporúčané regiony:')
    DEFAULT_REGIONS.forEach((region) => {
      console.log(`   - ${region.name} (${region.currency_code})`)
    })
  } else {
    console.log(`✅ Nájdených ${existingRegions.length} regionov:`)
    existingRegions.forEach((region) => {
      const countries = region.countries?.map((c) => c.iso_2).join(', ') || 'N/A'
      console.log(`   - ${region.name} (${region.currency_code}) - ${countries}`)
    })

    // Kontrola, či existuje region pre SK
    const skRegion = existingRegions.find((r) =>
      r.countries?.some((c) => c.iso_2 === 'SK')
    )

    if (!skRegion) {
      console.log('\n⚠️  Region pre Slovensko (SK) nie je vytvorený!')
      console.log('   Vytvorte ho v Medusa Admin.')
    }
  }

  console.log('\n✅ Kontrola dokončená')
}

main().catch((error) => {
  console.error('💥 Neočakávaná chyba:', error)
  process.exit(1)
})

