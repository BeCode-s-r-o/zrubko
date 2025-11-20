'use client'

import Link from 'next/link'
import Image from 'next/image'

interface RoomInspirationProps {
  title: string
  description: string
  image: string
  buttonText: string
  buttonLink: string
}

export default function RoomInspiration({ 
  title, 
  description, 
  image, 
  buttonText, 
  buttonLink 
}: RoomInspirationProps) {
  return (
    <section style={{ backgroundColor: '#f7f7f7' }}>
      <div className="row align-items-center no-gutters room-inspiration">
        <div className="col-lg-6 order-1 order-lg-first">
          <Image src={image} alt={title} width={800} height={600} />
        </div>
        <div className="col-lg-6 mb-6 mb-lg-0 order-first order-lg-1 ml-auto py-8 py-lg-0 content" data-animate="fadeInRight">
          <h2 className="fs-30 fs-md-56 mb-3">{title}</h2>
          <p className="mb-7 font-weight-500">{description}</p>
          <Link href={buttonLink} className="btn btn-outline-primary text-uppercase letter-spacing-05">
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  )
}

