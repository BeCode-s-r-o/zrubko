"use client"

import { Container } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  product?: HttpTypes.StoreProduct
}

const ImageGallery = ({ images, product }: ImageGalleryProps) => {
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
    <div className="flex w-full gap-4">
      {/* Vľavo - malé náhľady */}
      <div className="flex flex-col gap-3 w-20 md:w-24">
        {images.slice(0, 4).map((image, index) => (
          <Container
            key={image.id}
            className={`relative aspect-square w-full overflow-hidden bg-ui-bg-subtle cursor-pointer transition-opacity ${
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
                sizes="(max-width: 768px) 80px, 96px"
              />
            )}
          </Container>
        ))}
      </div>

      {/* Vpravo - hlavný obrázok */}
      <div className="flex flex-col flex-1">
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
    </div>
  )
}

export default ImageGallery
