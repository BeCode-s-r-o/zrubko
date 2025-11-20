'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function CategorySlider() {
  const categories = [
    { name: 'Chairs', image: '/furnitor/images/c_07.jpg', link: '/store' },
    { name: 'Accessories', image: '/furnitor/images/c_08.jpg', link: '/store' },
    { name: 'Tables', image: '/furnitor/images/c_09.jpg', link: '/store' },
    { name: 'Sofa', image: '/furnitor/images/c_10.jpg', link: '/store' },
    { name: 'Chairs', image: '/furnitor/images/c_07.jpg', link: '/store' }
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
              <div className="card border-0">
                <Image src={category.image} alt={category.name} className="card-img" width={300} height={300} />
                <div className="card-img-overlay d-inline-flex flex-column px-6 pt-4 pb-6">
                  <h3 className="card-title fs-30">{category.name}</h3>
                  <div className="mt-auto">
                    <Link href={category.link} className="text-uppercase fs-14 letter-spacing-05 border-bottom border-light-dark border-hover-primary font-weight-bold">
                      Shop Now
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

