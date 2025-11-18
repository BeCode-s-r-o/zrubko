"use client"

import { Container } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState } from "react"

type ProductImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  product?: HttpTypes.StoreProduct
}

const ProductImageGallery = ({ images, product }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  
  if (!images || images.length === 0) {
    return (
      <div className="flex w-full">
        <div className="aspect-[29/34] w-full bg-ui-bg-subtle rounded-lg"></div>
      </div>
    )
  }

  const selectedImage = images[selectedImageIndex]

  return (
    <div className="flex flex-col md:flex-row w-full gap-4">
      {/* Mobile: Main image first, then thumbnails underneath */}
      {/* Desktop: Thumbnails on left, main image on right */}
      
      {/* Main Image - Always first on mobile, right side on desktop */}
      <div className="flex flex-col flex-1 order-1 md:order-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {selectedImage?.url && (
            <Image
              src={selectedImage.url}
              alt={`Product image ${selectedImageIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          )}
          
          {/* Product tags in top-left corner */}
          {product?.tags && product.tags.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
              {product.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium rounded shadow-sm"
                >
                  {tag.value}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails - Underneath on mobile, left side on desktop */}
      <div className="flex flex-row md:flex-col gap-3 w-full md:w-20 lg:w-24 order-2 md:order-1">
        {images.slice(0, 4).map((image, index) => (
          <Container
            key={image.id}
            className={`relative aspect-square w-1/4 md:w-full overflow-hidden bg-ui-bg-subtle cursor-pointer transition-opacity ${
              selectedImageIndex === index 
                ? 'ring-2 ring-primary opacity-100' 
                : 'opacity-70 hover:opacity-100'
            }`}
            onClick={() => setSelectedImageIndex(index)}
          >
            {image.url && (
              <Image
                src={image.url}
                alt={`Product thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 96px"
              />
            )}
          </Container>
        ))}
      </div>
    </div>
  )
}

export default ProductImageGallery 