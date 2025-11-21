'use client'

import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  category: string
  price: string
  image: string
  link: string
}

interface ProductGridProps {
  title?: string
  products: Product[]
  showButton?: boolean
  buttonText?: string
  buttonLink?: string
}

export default function ProductGrid({ 
  title = 'Odporúčané produkty', 
  products, 
  showButton = true,
  buttonText = 'Kúpiť teraz',
  buttonLink = '/store'
}: ProductGridProps) {
  return (
    <section className="pb-11 pb-lg-15">
      <div className="container">
        <h2 className="mb-8 text-center fs-30 fs-md-40">{title}</h2>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-sm-6 col-lg-3 mb-8" data-animate="fadeInUp">
              <div className="card border-0 hover-change-content product">
                <div className="card-img-top position-relative" style={{ height: '350px' }}>
                  <div 
                    className="card-img ratio bg-img-cover-center ratio-1-1"
                    style={{ 
                      backgroundImage: `url('${product.image}')`,
                      width: '100%',
                      height: '350px',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className="position-absolute pos-fixed-bottom px-4 px-sm-6 pb-5 d-flex w-100 justify-content-center content-change-horizontal">
                    <a href="#" data-toggle="tooltip" title="Add to cart" className="add-to-cart d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle mr-2 border">
                      <i className="far fa-shopping-basket"></i>
                    </a>
                    <a href="#" data-toggle="tooltip" title="Add to favourite" className="add-to-wishlist d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle mr-2 border">
                      <i className="far fa-heart"></i>
                    </a>
                    <a href="#" data-toggle="tooltip" title="Add to compare" className="add-to-compare d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle mr-2 border">
                      <i className="far fa-random"></i>
                    </a>
                    <a href="#" data-toggle="tooltip" title="Preview" className="preview d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle border">
                      <i className="far fa-eye"></i>
                    </a>
                  </div>
                </div>
                <div className="card-body px-0 pt-4 pb-0 d-flex align-items-end">
                  <div className="mr-auto">
                    <Link href={product.link} className="text-uppercase text-muted letter-spacing-05 fs-12 d-block font-weight-500">
                      {product.category}
                    </Link>
                    <Link href={product.link} className="font-weight-bold mt-1 d-block">
                      {product.name}
                    </Link>
                  </div>
                  <p className="text-primary mb-0 font-weight-500">{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showButton && (
          <div className="text-center">
            <Link href={buttonLink} className="btn btn-outline-primary text-uppercase letter-spacing-05">
              {buttonText}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

