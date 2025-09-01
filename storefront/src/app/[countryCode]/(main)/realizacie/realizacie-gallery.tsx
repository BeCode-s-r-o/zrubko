"use client"

import Image from 'next/image'
import { Calendar, MapPin, Star, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState, useEffect, useRef } from 'react'

// Sample data - in real app this would come from API/CMS
const realizacie = [
  {
    id: 1,
    title: "Luxusná drevená fasáda rodinného domu",
    description: "Komplexná realizácia dreveného obkladu pre moderný rodinný dom v bratislavskom okrese. Použili sme termodrevo s povrchovou úpravou, ktorá zabezpečuje dlhú životnosť a prirodzený vzhľad.",
    location: "Bratislava, Slovensko",
    date: "December 2024",
    mainImage: "https://console-production-f027.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=realizacie%2Ffasada1.webp&version_id=null",
    gallery: [
      "https://console-production-f027.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=realizacie%2Ffasada1.webp&version_id=null",
      "https://console-production-f027.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=realizacie%2Ffasada2.webp&version_id=null",
      "https://console-production-f027.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=realizacie%2Ffasada3.webp&version_id=null"
    ],
    features: ["Thermodrevo", "Povrchová úprava", "Komplexná realizácia", "Moderný dizajn"],
    rating: 5
  },
  {
    id: 2,
    title: "Drevená terasa s pergolou",
    description: "Terasová doska z tvrdého dreva s vlastnou pergolou. Projekt zahŕňal kompletnú prípravu terénu, položenie základov a montáž drevených konštrukcií.",
    location: "Žilina, Slovensko",
    date: "November 2024",
    mainImage: "https://console-production-f027.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=realizacie%2Fterasa1.webp&version_id=null",
    gallery: [
      "https://console-production-f027.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=realizacie%2Fterasa1.webp&version_id=null",
      "https://console-production-f027.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=realizacie%2Fterasa2.webp&version_id=null"
    ],
    features: ["Terasa", "Pergola", "Tvrdé drevo", "Komplexná realizácia"],
    rating: 5
  },
  {
    id: 3,
    title: "Interiérové drevené obklady",
    description: "Luxusné drevené obklady pre obývaciu izbu a jedáleň. Použitie prírodného dreva s jemnou povrchovou úpravou vytvorilo teplú a príjemnú atmosféru.",
    location: "Košice, Slovensko",
    date: "Október 2024",
    mainImage: "https://console-production-f027.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=realizacie%2Finterier1.webp&version_id=null",
    gallery: [
      "https://console-production-f027.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=realizacie%2Finterier1.webp&version_id=null",
      "https://console-production-f027.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=realizacie%2Finterier2.webp&version_id=null",
      "https://console-production-f027.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=realizacie%2Finterier3.webp&version_id=null"
    ],
    features: ["Interiérové obklady", "Prírodné drevo", "Luxusný dizajn", "Teplá atmosféra"],
    rating: 5
  }
]

// Hook for scroll-triggered animations
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return { ref, isVisible }
}

export default function RealizacieGallery() {
  const t = useTranslations('realizacie')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const headerAnimation = useScrollAnimation()
  const ctaAnimation = useScrollAnimation()

  return (
    <>
      {/* Main Content Container */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        {/* Section Header with Animation */}
        <div
          ref={headerAnimation.ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerAnimation.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('ourWork')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Projects List with Staggered Animation */}
        <div className="space-y-16">
          {realizacie.map((project, index) => {
            const projectAnimation = useScrollAnimation()

            return (
              <div
                key={project.id}
                ref={projectAnimation.ref}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-1000 hover:shadow-2xl ${
                  projectAnimation.isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-95'
                }`}
                style={{
                  transitionDelay: projectAnimation.isVisible ? `${index * 200}ms` : '0ms'
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Image Section */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="relative h-[400px] lg:h-[500px] bg-gray-100 overflow-hidden">
                      <Image
                        src={project.mainImage}
                        alt={project.title}
                        fill
                        className={`object-cover transition-all duration-700 ${
                          hoveredProject === project.id ? 'scale-110' : 'scale-100'
                        }`}
                        priority={index === 0}
                      />



                      {/* Hover Overlay */}
                      <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${
                        hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                      }`}></div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    {/* Project Info */}
                    <div className="mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(project.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{t('clientSatisfied')}</span>
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                        {project.title}
                      </h3>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{project.date}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">{t('whatWeRealized')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.features.map((feature, featureIndex) => (
                            <span
                              key={featureIndex}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Gallery Thumbnails */}
                      <div className="grid grid-cols-4 gap-2">
                        {project.gallery.slice(0, 4).map((image, imageIndex) => (
                          <div
                            key={imageIndex}
                            className="relative h-16 rounded-lg overflow-hidden border-2 border-gray-200"
                          >
                            <Image
                              src={image}
                              alt={`${project.title} - ${imageIndex + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Full Width Call to Action */}
      <div
        ref={ctaAnimation.ref}
        className={`relative overflow-hidden shadow-xl min-h-[400px] lg:min-h-[500px] transition-all duration-1000 ${
          ctaAnimation.isVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-12 scale-95'
        }`}
        style={{
          transitionDelay: '500ms'
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/inspiration.jpg"
            alt="Inšpirácia pre váš projekt"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-[400px] lg:min-h-[500px] px-4 lg:px-12">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              {t('haveProjectIdea')}
            </h3>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {t('contactUsDesc')}
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
            >
              {t('contactUs')}
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
