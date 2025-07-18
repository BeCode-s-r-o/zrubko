"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"

interface CategoryExpandableContentProps {
  category: HttpTypes.StoreProductCategory
}

export default function CategoryExpandableContent({ category }: CategoryExpandableContentProps) {
  const [expandedBlocks, setExpandedBlocks] = useState<Set<number>>(new Set())
  
  const metadata = category.metadata || {}
  
  const getMetadataString = (key: string): string | undefined => {
    const value = metadata[key]
    return typeof value === 'string' ? value : undefined
  }

  // Získaj bottom_description
  const bottomDescription = getMetadataString('bottom_description')

  // Nájdi všetky bloky (block_X_title a block_X_content)
  const contentBlocks: Array<{ id: number; title: string; content: string }> = []
  
  let blockIndex = 1
  while (true) {
    const title = getMetadataString(`block_${blockIndex}_title`)
    const content = getMetadataString(`block_${blockIndex}_content`)
    
    if (!title || !content) break
    
    contentBlocks.push({
      id: blockIndex,
      title,
      content
    })
    blockIndex++
  }

  // Ak nie sú žiadne metadata, nezobraziť komponent
  if (!bottomDescription && contentBlocks.length === 0) {
    return null
  }

  const toggleBlock = (blockId: number) => {
    const newExpanded = new Set(expandedBlocks)
    if (newExpanded.has(blockId)) {
      newExpanded.delete(blockId)
    } else {
      newExpanded.add(blockId)
    }
    setExpandedBlocks(newExpanded)
  }

  return (
    <section id="category-metadata" className="overflow-hidden relative py-16 bg-gradient-to-br from-white lg:py-24 via-stone-50/30 to-amber-50/20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(139,69,19,0.1)_1px,_transparent_0)] [background-size:40px_40px]"></div>
      </div>
      
      <div className="relative z-10 content-container">
        <div className="mx-auto max-w-5xl">
          {/* Hlavný nadpis sekcie */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Viac o kategórii{' '}
              <span className="text-primary">{category.name}</span>
            </h2>
          </div>

          <div className="space-y-4">
            {/* Bottom description ako úvodný text */}
            {bottomDescription && (
              <div className="">
                  <p className="text-lg leading-relaxed md:text-xl">
                      {bottomDescription}
                  </p>
              </div>
            )}

            {/* Dynamické bloky v lepšom dizajne */}
            {contentBlocks.map((block, index) => {
              const isExpanded = expandedBlocks.has(block.id)
              const shortContent = block.content.length > 250 
                ? block.content.substring(0, 250) + "..."
                : block.content
              
              return (
                <div key={block.id} className={``}>
                  
                  <div className="">
                    <div className="">

                      <h3 className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
                        {block.title}
                      </h3>
                    </div>
                    
                    <div className="leading-relaxed text-gray-700">
                      <div className="max-w-none prose prose-lg">
                        {isExpanded ? (
                          <div className="text-lg whitespace-pre-line">{block.content}</div>
                        ) : (
                          <div className="text-lg">{shortContent}</div>
                        )}
                      </div>
                    </div>
                    
                    {block.content.length > 250 && (
                      <div className="flex justify-center mt-6">
                        <button
                          onClick={() => toggleBlock(block.id)}
                          className="inline-flex gap-2 items-center px-6 py-3 font-semibold text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-lg transition-all duration-300 transform group hover:from-amber-600 hover:to-amber-700 hover:scale-105 hover:shadow-xl"
                        >
                          {isExpanded ? "Zobraziť menej" : "Čítať viac"}
                          <svg 
                            className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
} 