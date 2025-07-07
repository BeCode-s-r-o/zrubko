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
    <section className="py-16 lg:py-24 bg-gradient-to-br from-stone-50/80 via-amber-25/60 to-orange-50/40 relative overflow-hidden">
      {/* Background Pine Texture */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Cpath d='M30 0l30 30-30 30L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Nájdite správne drevo 
            <span className="text-amber-700"> pre váš projekt</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
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
                    ? 'bg-amber-600 text-white shadow-lg' 
                    : 'bg-stone-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                    currentStep > step ? 'bg-amber-600' : 'bg-stone-200'
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
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vyberte typ projektu</h3>
                <p className="text-gray-600">Kde plánujete použiť drevené materiály?</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <button
                  onClick={() => handleTypeSelect('interior')}
                  className="group p-8 bg-white rounded-2xl border-2 border-stone-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                      <Home className="w-10 h-10 text-amber-700" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Interiér</h4>
                    <p className="text-gray-600 text-sm">Podlahy, obklady, sauna</p>
                  </div>
                </button>

                <button
                  onClick={() => handleTypeSelect('exterior')}
                  className="group p-8 bg-white rounded-2xl border-2 border-stone-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                      <Trees className="w-10 h-10 text-green-700" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Exteriér</h4>
                    <p className="text-gray-600 text-sm">Terasy, fasády, záhrada</p>
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
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium mb-4"
                >
                  ← Späť na výber typu
                </button>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Vyberte kategóriu ({selectedType === 'interior' ? 'Interiér' : 'Exteriér'})
                </h3>
                <p className="text-gray-600">Pre aký účel potrebujete drevo?</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories[selectedType].map((category) => {
                  const IconComponent = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className="group p-6 bg-white rounded-2xl border-2 border-stone-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-stone-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-100 transition-colors">
                          <IconComponent className="w-8 h-8 text-gray-700 group-hover:text-amber-700" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">{category.name}</h4>
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
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium mb-4"
                >
                  ← Späť na kategórie
                </button>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Odporúčané produkty</h3>
                <p className="text-gray-600">Vyberte si z našich najlepších produktov pre vašu kategóriu</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {products[selectedCategory as keyof typeof products]?.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6 border border-stone-200 hover:shadow-xl transition-all duration-300">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{product.image}</div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h4>
                      <p className="text-2xl font-bold text-amber-600 mb-4">{product.price}</p>
                      <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
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
                  className="bg-stone-200 hover:bg-stone-300 text-gray-700 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
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