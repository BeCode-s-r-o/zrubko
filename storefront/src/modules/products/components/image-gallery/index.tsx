"use client"

import { Container } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
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
                ? 'ring-2 ring-ui-fg-interactive opacity-100' 
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
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-ui-bg-subtle rounded-lg">
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
        </div>
      </div>
    </div>
  )
}

export default ImageGallery
