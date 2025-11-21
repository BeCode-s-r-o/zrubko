    'use client'

import Link from 'next/link'

export default function HeroSlider() {
  const slides = [
    {
      subtitle: 'Modern Design',
      title: 'Sweet Home',
      buttonText: 'Kúpiť teraz',
      buttonLink: '/store',
      backgroundImage: '/furnitor/images/bg-home-10.jpg'
    },
    {
      subtitle: 'Modern Design',
      title: 'Sweet Home',
      buttonText: 'Kúpiť teraz',
      buttonLink: '/store',
      backgroundImage: '/furnitor/images/bg-home-10.jpg'
    },
    {
      subtitle: 'Modern Design',
      title: 'Sweet Home',
      buttonText: 'Kúpiť teraz',
      buttonLink: '/store',
      backgroundImage: '/furnitor/images/bg-home-10.jpg'
    }
  ]

  return (
    <section className="overflow-hidden">
      <div className="slick-slider slick-dots-light dots-inner-center" data-slick-options='{"slidesToShow": 1,"infinite":true,"autoplay":false,"dots":true,"arrows":false}'>
        {slides.map((slide, index) => (
          <div key={index} className="box">
            <div 
              className="d-flex flex-column justify-content-center bg-img-cover-center custom-vh-02 custom-height-sm"
              style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
            >
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="container container-xxl">
                  <p className="text-white font-weight-bold fs-20 mb-3 text-center" data-animate="fadeInUp">
                    {slide.subtitle}
                  </p>
                  <h1 className="mb-6 fs-60 fs-xxl-90 lh-1 text-white text-center" data-animate="fadeInUp">
                    {slide.title}
                  </h1>
                  <div className="text-center" data-animate="fadeInUp">
                    <Link href={slide.buttonLink} className="btn btn-white text-uppercase letter-spacing-05 text-center">
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

