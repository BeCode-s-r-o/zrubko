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
    <section id="category-metadata" className="py-16 bg-gradient-to-br from-white via-stone-50/30 to-amber-50/20 lg:py-24">
      <div className="px-4 mx-auto max-w-4xl sm:px-6 lg:px-8">
        {/* Hlavný nadpis sekcie */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Viac o kategórii{' '}
            <span className="text-primary">{category.name}</span>
          </h2>
        </div>

        <div className="max-w-none leading-relaxed text-gray-700 prose prose-lg">
          {/* Bottom description ako úvodný text */}
          {bottomDescription && (
            <div className="mb-8">
              <p className="text-lg leading-relaxed">
                {bottomDescription}
              </p>
            </div>
          )}

          {/* Dynamické bloky ako súvislý text */}
          {contentBlocks.map((block, index) => {
            const isExpanded = expandedBlocks.has(block.id)
            const shortContent = block.content.length > 250 
              ? block.content.substring(0, 250) + "..."
              : block.content
            
            return (
              <div key={block.id} className="mb-8">
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  {block.title}
                </h3>
                
                <div className="leading-relaxed text-gray-700">
                  {isExpanded ? (
                    <div className="whitespace-pre-line">{block.content}</div>
                  ) : (
                    <div>{shortContent}</div>
                  )}
                </div>
                
                {block.content.length > 250 && (
                  <div className="mt-4">
                    <button
                      onClick={() => toggleBlock(block.id)}
                      className="inline-flex gap-2 items-center font-medium text-amber-600 transition-colors duration-200 hover:text-amber-700"
                    >
                      {isExpanded ? "Zobraziť menej" : "Čítať viac"}
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
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
            )
          })}
        </div>
      </div>
    </section>
  )
} 