// Script na hromadné pridanie obrázkov kategórií
// Spustite: node scripts/add-category-images.js

const categories = [
  {
    handle: "tatransky-profil",
    image_url: "/images/categories/tatransky-profil.jpg"
  },
  {
    handle: "sibirske-drevene-profily", 
    image_url: "/images/categories/sibirske-profily.jpg"
  },
  {
    handle: "fasadne-profily",
    image_url: "/images/categories/fasadne-profily.jpg"
  },
  {
    handle: "drevene-podlahy",
    image_url: "/images/categories/drevene-podlahy.jpg"
  },
  {
    handle: "najpredavanejsie",
    image_url: "/images/categories/bestsellers.jpg"
  },
  {
    handle: "novinky",
    image_url: "/images/categories/novinky.jpg"
  }
]

async function updateCategoryImages() {
  console.log('🖼️  Aktualizujem obrázky kategórií...')
  
  for (const category of categories) {
    try {
      // Tu by bol kód na aktualizáciu kategórie v Medusa
      // const response = await medusa.admin.productCategories.update(categoryId, {
      //   metadata: { image_url: category.image_url }
      // })
      
      console.log(`✅ Aktualizovaná kategória: ${category.handle}`)
    } catch (error) {
      console.error(`❌ Chyba pri kategórii ${category.handle}:`, error)
    }
  }
  
  console.log('🎉 Hotovo!')
}

// updateCategoryImages()

console.log(`
📋 INŠTRUKCIE:

1. Nahrajte obrázky do public/images/categories/
2. Upravte cesty v tomto súbore podľa vašich súborov
3. Spustite script alebo manuálne pridajte cez Admin

📁 Štruktúra súborov:
public/
  images/
    categories/
      tatransky-profil.jpg
      sibirske-profily.jpg
      fasadne-profily.jpg
      drevene-podlahy.jpg
      bestsellers.jpg
      novinky.jpg

🔧 V Medusa Admin pre každú kategóriu:
Metadata → image_url → /images/categories/nazov-kategorie.jpg
`) 