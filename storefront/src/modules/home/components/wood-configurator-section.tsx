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
    <section className="py-16 bg-slate-50">
      <div className="content-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-black mb-6 leading-tight">
            Nájdite správne drevo pre váš projekt
          </h2>
          <div className="w-24 h-px bg-black mx-auto mb-6"></div>
          <p className="text-xl text-black/60 max-w-2xl mx-auto leading-relaxed font-light">
            Postupujte cez náš jednoduchý 3-krokový proces a objavte perfektné drevené materiály pre váš projekt.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300 ${
                  currentStep >= step 
                    ? 'bg-black text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                    currentStep > step ? 'bg-black' : 'bg-gray-200'
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
                <h3 className="text-2xl font-medium text-black mb-4">Vyberte typ projektu</h3>
                <p className="text-black/60">Kde plánujete použiť drevené materiály?</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <button
                  onClick={() => handleTypeSelect('interior')}
                  className="group relative overflow-hidden rounded-lg border border-black/10 hover:border-[#1a2e1a] hover:shadow-md transition-all duration-300 min-h-[300px]"
                >
                  <div className="absolute inset-0 bg-[#1a2e1a]/5 group-hover:bg-[#1a2e1a]/10 transition-all duration-300" />
                  
                  <div className="relative z-10 p-12 text-left h-full flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 bg-[#1a2e1a]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#1a2e1a]/20 transition-all duration-300">
                        <Home className="w-8 h-8 text-[#1a2e1a]" />
                      </div>
                      <h4 className="text-3xl font-medium text-black mb-4 group-hover:text-[#1a2e1a] transition-colors">
                        Interiér
                      </h4>
                      <p className="text-black/60 text-lg leading-relaxed mb-6 font-light">
                        Vytvorte jedinečný interiér s prémiovými drevenými obkladmi, podlahami a saunovými materiálmi
                      </p>
                    </div>
                    
                    <div className="flex items-center text-[#1a2e1a] group-hover:text-[#2d4a2d] transition-colors">
                      <span className="font-medium mr-2">Objaviť produkty</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleTypeSelect('exterior')}
                  className="group relative overflow-hidden rounded-lg border border-black/10 hover:border-[#1a2e1a] hover:shadow-md transition-all duration-300 min-h-[300px]"
                >
                  <div className="absolute inset-0 bg-[#1a2e1a]/5 group-hover:bg-[#1a2e1a]/10 transition-all duration-300" />
                  
                  <div className="relative z-10 p-12 text-left h-full flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 bg-[#1a2e1a]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#1a2e1a]/20 transition-all duration-300">
                        <Trees className="w-8 h-8 text-[#1a2e1a]" />
                      </div>
                      <h4 className="text-3xl font-medium text-black mb-4 group-hover:text-[#1a2e1a] transition-colors">
                        Exteriér
                      </h4>
                      <p className="text-black/60 text-lg leading-relaxed mb-6 font-light">
                        Ochráňte a skrášlite svoj domov s odolnými terasami, fasádami a záhradnými riešeniami
                      </p>
                    </div>
                    
                    <div className="flex items-center text-[#1a2e1a] group-hover:text-[#2d4a2d] transition-colors">
                      <span className="font-medium mr-2">Objaviť produkty</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
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
                  className="text-black/60 hover:text-black text-sm font-medium mb-4"
                >
                  ← Späť na výber typu
                </button>
                <h3 className="text-2xl font-medium text-black mb-4">
                  Vyberte kategóriu ({selectedType === 'interior' ? 'Interiér' : 'Exteriér'})
                </h3>
                <p className="text-black/60">Pre aký účel potrebujete drevo?</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories[selectedType].map((category) => {
                  const IconComponent = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className="group p-6 bg-white rounded-lg border border-black/10 hover:border-[#1a2e1a] hover:shadow-md transition-all duration-300"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-[#1a2e1a]/5 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1a2e1a]/10 transition-colors">
                          <IconComponent className="w-8 h-8 text-[#1a2e1a]" />
                        </div>
                        <h4 className="text-lg font-medium text-black">{category.name}</h4>
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
                  className="text-black/60 hover:text-black text-sm font-medium mb-4"
                >
                  ← Späť na kategórie
                </button>
                <h3 className="text-2xl font-medium text-black mb-4">Odporúčané produkty</h3>
                <p className="text-black/60">Vyberte si z našich najlepších produktov pre vašu kategóriu</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {products[selectedCategory as keyof typeof products]?.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm p-6 border border-black/10 hover:shadow-md transition-all duration-300">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{product.image}</div>
                      <h4 className="text-lg font-medium text-black mb-2">{product.name}</h4>
                      <p className="text-2xl font-medium text-[#1a2e1a] mb-4">{product.price}</p>
                      <button className="w-full bg-[#1a2e1a] hover:bg-[#2d4a2d] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
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
                  className="bg-white hover:bg-black text-black hover:text-white px-8 py-3 rounded-lg font-medium border border-black/10 transition-all duration-300"
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