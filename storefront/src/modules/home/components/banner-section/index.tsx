'use client'

import Link from 'next/link'

interface Banner {
  title: string
  subtitle?: string
  image: string
  link: string
  buttonText: string
  className?: string
}

interface BannerSectionProps {
  banners: Banner[]
}

export default function BannerSection({ banners }: BannerSectionProps) {
  return (
    <section className="pb-10 pb-lg-15">
      <div className="container">
        <div className="row">
          {banners.map((banner, index) => (
            <div key={index} className={banner.className || (index === 0 ? 'col-lg-8 mb-6 mb-lg-0' : 'col-lg-4')}>
              <div className="card border-0 banner banner-07">
                <div 
                  className="card-img bg-img-cover-center" 
                  style={{ backgroundImage: `url('${banner.image}')` }}
                ></div>
                <div className={`card-img-overlay d-inline-flex flex-column ${index === 0 ? 'p-4 px-sm-7 py-sm-8' : 'p-4 px-sm-7 py-sm-8'}`}>
                  <h3 className={`card-title ${index === 0 ? 'fs-30 fs-md-40' : 'fs-30 fs-md-40'}`}>
                    {banner.title}
                    {banner.subtitle && <><br />{banner.subtitle}</>}
                  </h3>
                  <div className="mt-auto">
                    <Link href={banner.link} className="text-uppercase fs-14 letter-spacing-05 border-bottom border-light-dark border-hover-primary font-weight-bold">
                      {banner.buttonText}
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

