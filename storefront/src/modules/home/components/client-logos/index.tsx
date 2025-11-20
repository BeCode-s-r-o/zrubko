'use client'

import Link from 'next/link'
import Image from 'next/image'

interface ClientLogo {
  image: string
  alt: string
  link: string
}

interface ClientLogosProps {
  logos: ClientLogo[]
}

export default function ClientLogos({ logos }: ClientLogosProps) {
  return (
    <section className="pt-8 pb-7 border-bottom">
      <div className="container container-xxl">
        <div 
          className="slick-slider"
          data-slick-options='{"slidesToShow": 7,"infinite":true,"autoplay":false,"dots":false,"arrows":false,"responsive":[{"breakpoint": 1367,"settings": {"slidesToShow":6}},{"breakpoint": 992,"settings": {"slidesToShow":5}},{"breakpoint": 768,"settings": {"slidesToShow": 4}},{"breakpoint": 576,"settings": {"slidesToShow": 2}}]}'
        >
          {logos.map((logo, index) => (
            <div key={index} className="box">
              <Link href={logo.link} className="d-block px-3 px-xl-7">
                <Image 
                  src={logo.image} 
                  alt={logo.alt}
                  className="opacity-5 opacity-hover-10"
                  width={150}
                  height={60}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

