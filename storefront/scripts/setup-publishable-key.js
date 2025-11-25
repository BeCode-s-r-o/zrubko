#!/usr/bin/env node

/**
 * Skript na automatické získanie a nastavenie Publishable Key
 * 
 * Spustenie:
 *   node scripts/setup-publishable-key.js
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
const ENV_FILE = path.join(__dirname, '..', '.env.local')

async function fetchPublishableKey() {
  try {
    console.log(` Kontrola backendu na ${BACKEND_URL}...`)
    
    // Skúsime získať publishable key z API
    const response = await fetch(`${BACKEND_URL}/store/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@medusa.test',
        password: 'supersecret',
      }),
    })

    if (!response.ok) {
      throw new Error(`Backend neodpovedá správne: ${response.status}`)
    }

    // Alternatívne: skúsime získať z store settings
    const storeResponse = await fetch(`${BACKEND_URL}/store`)
    
    if (storeResponse.ok) {
      const storeData = await storeResponse.json()
      if (storeData.store?.publishable_key) {
        return storeData.store.publishable_key
      }
    }

    return null
  } catch (error) {
    console.error('❌ Chyba pri získavaní publishable key:', error.message)
    return null
  }
}

function updateEnvFile(publishableKey) {
  let envContent = ''
  
  if (fs.existsSync(ENV_FILE)) {
    envContent = fs.readFileSync(ENV_FILE, 'utf8')
  }

  // Kontrola, či už existuje NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
  if (envContent.includes('NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=')) {
    // Aktualizujeme existujúci
    envContent = envContent.replace(
      /NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=.*/,
      `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${publishableKey}`
    )
  } else {
    // Pridáme nový
    if (envContent && !envContent.endsWith('\n')) {
      envContent += '\n'
    }
    envContent += `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${publishableKey}\n`
  }

  fs.writeFileSync(ENV_FILE, envContent, 'utf8')
  console.log(` Publishable key pridaný do ${ENV_FILE}`)
}

async function main() {
  console.log('🔑 Nastavovanie Publishable Key')
  console.log('================================\n')

  // Skúsime automaticky získať
  const autoKey = await fetchPublishableKey()
  
  if (autoKey) {
    console.log(` Automaticky získaný publishable key: ${autoKey.substring(0, 20)}...`)
    updateEnvFile(autoKey)
    return
  }

  // Ak sa nepodarilo automaticky, požiadame používateľa
  console.log('⚠️  Nepodarilo sa automaticky získať publishable key.')
  console.log('\n📋 Manuálne nastavenie:')
  console.log('1. Otvorte Medusa Admin: http://localhost:9000/app')
  console.log('2. Prejdite na Settings → Store')
  console.log('3. Skopírujte Publishable Key')
  console.log('')

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question('Zadajte Publishable Key (alebo stlačte Enter pre preskočenie): ', (answer) => {
    if (answer.trim()) {
      updateEnvFile(answer.trim())
      console.log('✅ Publishable key nastavený!')
    } else {
      console.log('⚠️  Publishable key nebol nastavený. Nastavte ho manuálne v .env.local')
    }
    rl.close()
  })
}

main().catch((error) => {
  console.error(' Chyba:', error)
  process.exit(1)
})

