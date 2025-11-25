'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function CategorySlider() {
  const categories = [
    { name: 'Drevené obklady', image: 'https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_products%2Fdrevene-obklady.webp&version_id=null', link: '/store' },
    { name: 'Drevené podlahy', image: 'https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_products%2Fuvod-drevene-parkety.jpg&version_id=null', link: '/store' },
    { name: 'Obklady Termodrevo', image: 'https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_products%2FThermory-Benchmark-.jpg&version_id=null', link: '/store' },
    { name: 'Podlahy Termodrevo', image: 'https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_products%2FMEDIS-NAMUI-P.jpg&version_id=null', link: '/store' },
    { name: 'Terasové dosky', image: 'https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_products%2Ftphc7501.jpg&version_id=null', link: '/store' },
    { name: 'Drevo do sauny', image: 'https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_products%2Fsauna.jpg&version_id=null', link: '/store' },
    { name: 'Drevené hranoly a Lišty', image: 'https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_products%2Fnew-modern.jpg&version_id=null', link: '/store' },
    { name: 'KVH Hranoly', image: 'https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_products%2Fkvh.jpg&version_id=null', link: '/store' }
  ]

  return (
    <section className="pt-6 pb-lg-15 pb-11">
      <div className="container-fluid">
        <div 
          className="slick-slider"
          data-slick-options='{"slidesToShow": 4, "autoplay":true,"dots":true,"arrows":false,"responsive":[{"breakpoint": 1200,"settings": {"slidesToShow":4}},{"breakpoint": 992,"settings": {"slidesToShow":3}},{"breakpoint": 768,"settings": {"slidesToShow": 2}},{"breakpoint": 576,"settings": {"slidesToShow": 1}}]}'
        >
          {categories.map((category, index) => (
            <div key={index} className="box" data-animate="fadeInUp">
              <div className="card border-0" style={{ height: '400px', position: 'relative' }}>
                <Image 
                  src={category.image} 
                  alt={category.name} 
                  className="card-img" 
                  width={400} 
                  height={400}
                  style={{ 
                    objectFit: 'cover', 
                    width: '100%', 
                    height: '100%' 
                  }}
                />
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    zIndex: 1
                  }}
                ></div>
                <div className="card-img-overlay d-inline-flex flex-column px-6 pt-4 pb-6" style={{ zIndex: 2 }}>
                  <h3 className="card-title fs-30 furnitor-category-title">{category.name}</h3>
                  <div className="mt-auto">
                    <Link href={category.link} className="text-white text-uppercase fs-14 letter-spacing-05 border-bottom border-white border-hover-primary font-weight-bold">
                      Kúpiť teraz
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

