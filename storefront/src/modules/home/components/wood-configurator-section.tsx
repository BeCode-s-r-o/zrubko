"use client"

import { Home, Trees, Waves, Flame, Grid3X3, ChevronRight } from "lucide-react"
import { useState } from "react"

const WoodConfiguratorSection = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedType, setSelectedType] = useState<'interior' | 'exterior' | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = {
    interior: [
      { id: 'wall-panels', name: 'Obklady stien', icon: Grid3X3 },
      { id: 'floor', name: 'Podlahy', icon: Home },
      { id: 'sauna', name: 'Sauna', icon: Flame },
    ],
    exterior: [
      { id: 'terrace', name: 'Terasy', icon: Waves },
      { id: 'facade', name: 'Fasády', icon: Home },
      { id: 'garden', name: 'Záhrada', icon: Trees },
    ]
  }

  const products = {
    'wall-panels': [
      { id: 1, name: 'Dubové obklady', price: '€89/m²', image: '🌰' },
      { id: 2, name: 'Borovicové panely', price: '€45/m²', image: '🌲' },
    ],
    'floor': [
      { id: 1, name: 'Dubová podlaha', price: '€120/m²', image: '🪵' },
      { id: 2, name: 'Javorová podlaha', price: '€95/m²', image: '🍂' },
    ],
    'sauna': [
      { id: 1, name: 'Cédrové dosky', price: '€150/m²', image: '🔥' },
      { id: 2, name: 'Smrekové dosky', price: '€85/m²', image: '🌿' },
    ],
    'terrace': [
      { id: 1, name: 'Teak terasy', price: '€180/m²', image: '🌊' },
      { id: 2, name: 'Bangkirai dosky', price: '€95/m²', image: '🏖️' },
    ],
    'facade': [
      { id: 1, name: 'Cédrové fasády', price: '€110/m²', image: '🏡' },
      { id: 2, name: 'Smrekové dosky', price: '€65/m²', image: '🌲' },
    ],
    'garden': [
      { id: 1, name: 'Akáciové dosky', price: '€75/m²', image: '🌳' },
      { id: 2, name: 'Borovicové hranoly', price: '€35/m²', image: '🌲' },
    ],
  }

  const handleTypeSelect = (type: 'interior' | 'exterior') => {
    setSelectedType(type)
    setSelectedCategory(null)
    setCurrentStep(2)
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentStep(3)
  }

  const resetWizard = () => {
    setCurrentStep(1)
    setSelectedType(null)
    setSelectedCategory(null)
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-ebony/5 via-champagne to-gold/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Cpath d='M30 0l30 30-30 30L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-ebony leading-tight mb-6">
            Nájdite správne drevo 
            <span className="text-gold"> pre váš projekt</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Postupujte cez náš jednoduchý 3-krokový proces a objavte perfektné drevené materiály pre váš projekt.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep >= step 
                    ? 'bg-gold text-white shadow-lg' 
                    : 'bg-champagne text-gray-700'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                    currentStep > step ? 'bg-gold' : 'bg-champagne'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          
          {/* Step 1: Interior/Exterior Selection */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-ebony mb-4">Vyberte typ projektu</h3>
                <p className="text-gray-700">Kde plánujete použiť drevené materiály?</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <button
                  onClick={() => handleTypeSelect('interior')}
                  className="group relative overflow-hidden rounded-3xl border-2 border-ebony/20 hover:border-gold hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 min-h-[300px]"
                >
                  {/* Tmavý background obrázok */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='wood' patternUnits='userSpaceOnUse' width='20' height='20'%3E%3Crect width='20' height='20' fill='%23402D1C'/%3E%3Cpath d='M0 0h20v2H0zM0 6h20v2H0zM0 12h20v2H0zM0 18h20v2H0z' fill='%232C1F15' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23wood)'/%3E%3C/svg%3E")`
                    }}
                  />
                  
                  {/* Tmavý gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-ebony/80 via-ebony/70 to-ebony/60 group-hover:from-ebony/70 group-hover:via-ebony/60 group-hover:to-ebony/50 transition-all duration-500" />
                  
                  {/* Obsah */}
                  <div className="relative z-10 p-12 text-left h-full flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 bg-gold/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold/40 transition-all duration-300 backdrop-blur-sm border border-gold/20">
                        <Home className="w-8 h-8 text-gold" />
                      </div>
                      <h4 className="text-3xl font-bold text-white mb-4 group-hover:text-champagne transition-colors">
                        Interiér
                      </h4>
                      <p className="text-champagne/90 text-lg leading-relaxed mb-6">
                        Vytvorte jedinečný interiér s prémiovými drevenými obkladmi, podlahami a saunovými materiálmi
                      </p>
                    </div>
                    
                    <div className="flex items-center text-gold group-hover:text-white transition-colors">
                      <span className="font-semibold mr-2">Objaviť produkty</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  
                  {/* Dekoratívny prvok */}
                  <div className="absolute top-6 right-6 w-20 h-20 border border-gold/30 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                </button>

                <button
                  onClick={() => handleTypeSelect('exterior')}
                  className="group relative overflow-hidden rounded-3xl border-2 border-ebony/20 hover:border-mahogany hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 min-h-[300px]"
                >
                  {/* Tmavý background obrázok */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='exterior' patternUnits='userSpaceOnUse' width='25' height='25'%3E%3Crect width='25' height='25' fill='%231A2E1A'/%3E%3Cpath d='M12.5 0L25 12.5L12.5 25L0 12.5z' fill='%230F1F0F' opacity='0.4'/%3E%3Ccircle cx='12.5' cy='12.5' r='3' fill='%232D4A2D' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23exterior)'/%3E%3C/svg%3E")`
                    }}
                  />
                  
                  {/* Tmavý gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-ebony-dark/80 via-mahogany-dark/70 to-ebony/60 group-hover:from-ebony-dark/70 group-hover:via-mahogany-dark/60 group-hover:to-ebony/50 transition-all duration-500" />
                  
                  {/* Obsah */}
                  <div className="relative z-10 p-12 text-left h-full flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 bg-mahogany/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-mahogany/40 transition-all duration-300 backdrop-blur-sm border border-mahogany/20">
                        <Trees className="w-8 h-8 text-mahogany" />
                      </div>
                      <h4 className="text-3xl font-bold text-white mb-4 group-hover:text-champagne transition-colors">
                        Exteriér
                      </h4>
                      <p className="text-champagne/90 text-lg leading-relaxed mb-6">
                        Ochráňte a skrášlite svoj domov s odolnými terasami, fasádami a záhradnými riešeniami
                      </p>
                    </div>
                    
                    <div className="flex items-center text-mahogany group-hover:text-white transition-colors">
                      <span className="font-semibold mr-2">Objaviť produkty</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  
                  {/* Dekoratívny prvok */}
                  <div className="absolute top-6 right-6 w-20 h-20 border border-mahogany/30 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Category Selection */}
          {currentStep === 2 && selectedType && (
            <div className="space-y-8">
              <div className="text-center">
                <button 
                  onClick={resetWizard}
                  className="text-gold hover:text-gold-dark text-sm font-medium mb-4"
                >
                  ← Späť na výber typu
                </button>
                <h3 className="text-2xl font-bold text-ebony mb-4">
                  Vyberte kategóriu ({selectedType === 'interior' ? 'Interiér' : 'Exteriér'})
                </h3>
                <p className="text-gray-700">Pre aký účel potrebujete drevo?</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories[selectedType].map((category) => {
                  const IconComponent = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className="group p-6 bg-white rounded-2xl border-2 border-gold/30 hover:border-gold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-champagne rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                          <IconComponent className="w-8 h-8 text-gold" />
                        </div>
                        <h4 className="text-lg font-bold text-ebony">{category.name}</h4>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 3: Product Preview */}
          {currentStep === 3 && selectedCategory && (
            <div className="space-y-8">
              <div className="text-center">
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="text-gold hover:text-gold-dark text-sm font-medium mb-4"
                >
                  ← Späť na kategórie
                </button>
                <h3 className="text-2xl font-bold text-ebony mb-4">Odporúčané produkty</h3>
                <p className="text-gray-700">Vyberte si z našich najlepších produktov pre vašu kategóriu</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {products[selectedCategory as keyof typeof products]?.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gold/30 hover:shadow-xl transition-all duration-300">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{product.image}</div>
                      <h4 className="text-lg font-bold text-ebony mb-2">{product.name}</h4>
                      <p className="text-2xl font-bold text-gold mb-4">{product.price}</p>
                      <button className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                        Zobraziť detail
                        <ChevronRight className="w-4 h-4 inline ml-2" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-8">
                <button 
                  onClick={resetWizard}
                  className="bg-champagne hover:bg-gold text-gray-700 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Začať znovu
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}

export default WoodConfiguratorSection 