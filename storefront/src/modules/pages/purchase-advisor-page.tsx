"use client"

import { useState } from "react"
import { ChevronRight, Home, Trees, Grid3X3, Waves, Flame, Truck, Package, Clock, ArrowLeft, Phone, MessageCircle } from "lucide-react"

interface Product {
  id: number
  title: string
  description: string
  thickness: string
  class: string
  deliveryTime: string
  image: string
}

const PurchaseAdvisorPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedEnvironment, setSelectedEnvironment] = useState<'interior' | 'exterior' | null>(null)
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null)

  const useCases = {
    interior: [
      { id: 'wall-cladding', name: 'Obklad stien', icon: Grid3X3, image: '/images/wood-wall-cladding.jpg' },
      { id: 'ceiling-cladding', name: 'Podbitie stropov', icon: Home, image: '/images/wood-ceiling.jpg' },
      { id: 'flooring', name: 'Podlaha', icon: Package, image: '/images/wood-flooring.jpg' },
      { id: 'sauna', name: 'Sauna', icon: Flame, image: '/images/wood-sauna.jpg' },
    ],
    exterior: [
      { id: 'terrace', name: 'Terasa', icon: Waves, image: '/images/wood-terrace.jpg' },
      { id: 'roof-cladding', name: 'Podbitie strechy', icon: Home, image: '/images/wood-roof-cladding.jpg' },
      { id: 'facade', name: 'Fasáda', icon: Grid3X3, image: '/images/wood-facade.jpg' },
      { id: 'pergola', name: 'Prístrešok', icon: Trees, image: '/images/wood-pergola.jpg' },
      { id: 'fence', name: 'Plot', icon: Package, image: '/images/wood-fence.jpg' },
    ]
  }

  const products: Record<string, Product[]> = {
    'wall-cladding': [
      { id: 1, title: 'Smrekové lambrie A/B', description: 'Ideálne pre obklady stien v interiéri', thickness: '12-19mm', class: 'A/B', deliveryTime: '2-3 dni', image: '/images/products/spruce-cladding.jpg' },
      { id: 2, title: 'Dubové obkladové dosky', description: 'Luxusné dubové obklady', thickness: '15-20mm', class: 'A', deliveryTime: '5-7 dní', image: '/images/products/oak-cladding.jpg' },
    ],
    'ceiling-cladding': [
      { id: 1, title: 'Smrekové podbitie', description: 'Klasické podbitie stropov', thickness: '12-15mm', class: 'A/B', deliveryTime: '2-3 dni', image: '/images/products/spruce-ceiling.jpg' },
      { id: 2, title: 'Borovicové lambrie', description: 'Prírodné borovicové podbitie', thickness: '12-19mm', class: 'A', deliveryTime: '3-5 dní', image: '/images/products/pine-ceiling.jpg' },
    ],
    'flooring': [
      { id: 1, title: 'Dubová masívna podlaha', description: 'Luxusná dubová podlaha', thickness: '18-22mm', class: 'A', deliveryTime: '7-10 dní', image: '/images/products/oak-flooring.jpg' },
      { id: 2, title: 'Javorová podlaha', description: 'Svetlá javorová podlaha', thickness: '15-20mm', class: 'A/B', deliveryTime: '5-7 dní', image: '/images/products/maple-flooring.jpg' },
    ],
    'sauna': [
      { id: 1, title: 'Cédrové sauna dosky', description: 'Prémiové cédrové dosky pre saunu', thickness: '15-20mm', class: 'A', deliveryTime: '7-14 dní', image: '/images/products/cedar-sauna.jpg' },
      { id: 2, title: 'Smrekové sauna dosky', description: 'Klasické smrekové dosky', thickness: '15-18mm', class: 'A/B', deliveryTime: '3-5 dní', image: '/images/products/spruce-sauna.jpg' },
    ],
    'terrace': [
      { id: 1, title: 'Bangkirai terasy', description: 'Tropické drevo pre terasy', thickness: '25-38mm', class: 'A', deliveryTime: '10-14 dní', image: '/images/products/bangkirai-terrace.jpg' },
      { id: 2, title: 'Smrekové terasy', description: 'Impregnované smrekové dosky', thickness: '28-32mm', class: 'A/B', deliveryTime: '5-7 dní', image: '/images/products/spruce-terrace.jpg' },
    ],
    'roof-cladding': [
      { id: 1, title: 'Smrekové podbitie strechy', description: 'Vonkajšie podbitie', thickness: '15-20mm', class: 'A/B', deliveryTime: '3-5 dní', image: '/images/products/spruce-roof.jpg' },
      { id: 2, title: 'Cédrové podbitie', description: 'Prémiové cédrové podbitie', thickness: '15-18mm', class: 'A', deliveryTime: '7-10 dní', image: '/images/products/cedar-roof.jpg' },
    ],
    'facade': [
      { id: 1, title: 'Smrekové fasádne dosky', description: 'Impregnované fasádne dosky', thickness: '20-25mm', class: 'A/B', deliveryTime: '5-7 dní', image: '/images/products/spruce-facade.jpg' },
      { id: 2, title: 'Cédrové fasády', description: 'Luxusné cédrové fasády', thickness: '18-22mm', class: 'A', deliveryTime: '10-14 dní', image: '/images/products/cedar-facade.jpg' },
    ],
    'pergola': [
      { id: 1, title: 'Smrekové hranoly', description: 'Konštrukčné hranoly', thickness: '40-100mm', class: 'A/B', deliveryTime: '3-5 dní', image: '/images/products/spruce-beams.jpg' },
      { id: 2, title: 'Lepené lamelové nosníky', description: 'Pevné konštrukčné prvky', thickness: '60-200mm', class: 'GL24h', deliveryTime: '7-14 dní', image: '/images/products/glulam-beams.jpg' },
    ],
    'fence': [
      { id: 1, title: 'Smrekové plotovky', description: 'Klasické plotové dosky', thickness: '15-20mm', class: 'A/B', deliveryTime: '2-3 dni', image: '/images/products/spruce-fence.jpg' },
      { id: 2, title: 'Borovicové plotovky', description: 'Impregnované plotové dosky', thickness: '18-22mm', class: 'A', deliveryTime: '3-5 dní', image: '/images/products/pine-fence.jpg' },
    ],
  }

  const galleryImages = [
    { src: '/images/gallery/modern-interior.jpg', title: 'Moderný interiér s drevenými obkladmi' },
    { src: '/images/gallery/wooden-terrace.jpg', title: 'Prírodné drevené terasy' },
    { src: '/images/gallery/luxury-sauna.jpg', title: 'Luxusná domáca sauna' },
    { src: '/images/gallery/wooden-facade.jpg', title: 'Drevené fasády rodinných domov' },
    { src: '/images/gallery/elegant-flooring.jpg', title: 'Elegantné drevené podlahy' },
    { src: '/images/gallery/garden-pergola.jpg', title: 'Záhradné pergoly a prístrešky' },
  ]

  const handleEnvironmentSelect = (env: 'interior' | 'exterior') => {
    setSelectedEnvironment(env)
    setSelectedUseCase(null)
    setCurrentStep(2)
  }

  const handleUseCaseSelect = (useCase: string) => {
    setSelectedUseCase(useCase)
    setCurrentStep(3)
  }

  const resetWizard = () => {
    setCurrentStep(0)
    setSelectedEnvironment(null)
    setSelectedUseCase(null)
  }

  const goBack = () => {
    if (currentStep === 3) {
      setCurrentStep(2)
      setSelectedUseCase(null)
    } else if (currentStep === 2) {
      setCurrentStep(1)
      setSelectedEnvironment(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50/80 via-amber-25/60 to-orange-50/40">
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.1'%3E%3Cpath d='M30 0l30 30-30 30L0 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
              Neviete, ktorý produkt je 
              <span className="text-amber-700"> pre vás ten pravý?</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed">
              Využite nášho sprievodcu nákupom. Vyberte si použitie, a my vám ukážeme najvhodnejšie riešenia.
            </p>
            
            {currentStep === 0 && (
              <button
                onClick={() => setCurrentStep(1)}
                className="group bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                Spustiť výber
                <ChevronRight className="w-6 h-6 inline ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Step Wizard */}
      {currentStep > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            
            {/* Progress Steps */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      currentStep >= step 
                        ? 'bg-amber-600 text-white shadow-lg' 
                        : 'bg-stone-200 text-gray-500'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`w-20 h-1 mx-3 rounded-full transition-all duration-300 ${
                        currentStep > step ? 'bg-amber-600' : 'bg-stone-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Back Button */}
            {currentStep > 1 && (
              <div className="text-center mb-8">
                <button 
                  onClick={goBack}
                  className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Späť
                </button>
              </div>
            )}

            {/* Step 1: Environment Selection */}
            {currentStep === 1 && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Vyberte prostredie
                  </h2>
                  <p className="text-lg text-gray-600">Kde plánujete použiť drevené materiály?</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  <button
                    onClick={() => handleEnvironmentSelect('interior')}
                    className="group relative p-12 bg-white rounded-3xl border-2 border-stone-200 hover:border-amber-400 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  >
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:from-amber-200 group-hover:to-amber-300 transition-all duration-300">
                        <Home className="w-12 h-12 text-amber-700" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Interiér</h3>
                      <p className="text-gray-600">Obklady, podlahy, stropy, sauna</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-amber-100/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  <button
                    onClick={() => handleEnvironmentSelect('exterior')}
                    className="group relative p-12 bg-white rounded-3xl border-2 border-stone-200 hover:border-green-400 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  >
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
                        <Trees className="w-12 h-12 text-green-700" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Exteriér</h3>
                      <p className="text-gray-600">Terasy, fasády, strechy, ploty</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-green-100/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Use Case Selection */}
            {currentStep === 2 && selectedEnvironment && (
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Vyberte použitie
                    <span className="text-amber-700"> ({selectedEnvironment === 'interior' ? 'Interiér' : 'Exteriér'})</span>
                  </h2>
                  <p className="text-lg text-gray-600">Pre aký účel potrebujete drevo?</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {useCases[selectedEnvironment].map((useCase) => {
                    const IconComponent = useCase.icon
                    return (
                      <button
                        key={useCase.id}
                        onClick={() => handleUseCaseSelect(useCase.id)}
                        className="group relative overflow-hidden bg-white rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="relative p-8">
                          <div className="text-center">
                            <div className="w-full h-32 mb-4 rounded-xl overflow-hidden">
                              <img 
                                src={useCase.image} 
                                alt={useCase.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-100 transition-colors">
                              <IconComponent className="w-8 h-8 text-gray-700 group-hover:text-amber-700" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{useCase.name}</h3>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-amber-50/0 to-amber-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Recommended Products */}
            {currentStep === 3 && selectedUseCase && (
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Odporúčané produkty
                  </h2>
                  <p className="text-lg text-gray-600">Najlepšie riešenia pre vašu aplikáciu</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products[selectedUseCase]?.map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl shadow-lg border border-stone-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="w-full h-48 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                          <p className="text-gray-600 text-sm">{product.description}</p>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Hrúbka:</span>
                            <span className="font-medium text-gray-900">{product.thickness}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Trieda:</span>
                            <span className="font-medium text-gray-900">{product.class}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              Dodanie:
                            </span>
                            <span className="font-medium text-green-600">{product.deliveryTime}</span>
                          </div>
                        </div>
                        
                        <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                          Zobraziť viac
                          <ChevronRight className="w-4 h-4 inline ml-2" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
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
        </section>
      )}

      {/* Gallery Section */}
      <section className="py-16 lg:py-24 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Realizácie našich zákazníkov
            </h2>
            <p className="text-lg text-gray-600">Pozrite si, ako vyzerajú naše produkty v praxi</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="group relative aspect-square bg-white rounded-xl border border-stone-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-medium">{image.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-12 lg:p-16 text-center border border-amber-100">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Stále si nie ste istí? 
              <span className="text-amber-700"> Radi vám poradíme.</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Naši odborníci vám pomôžu vybrať najlepšie riešenie pre váš projekt. Kontaktujte nás a získajte profesionálne poradenstvo zdarma.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                <Phone className="w-5 h-5 mr-2" />
                Kontaktujte nás
              </button>
              <button className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-amber-300 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                <MessageCircle className="w-5 h-5 mr-2" />
                Nechať si poradiť
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default PurchaseAdvisorPage 