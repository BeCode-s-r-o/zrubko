'use client'

import Link from 'next/link'
import { HttpTypes } from '@medusajs/types'
import CategorySlider from '@modules/shop/components/category-slider'

interface ShopTemplateStaticProps {
  categories: HttpTypes.StoreProductCategory[]
  countryCode: string
}

export default function ShopTemplateStatic({ categories, countryCode }: ShopTemplateStaticProps) {

  // Filter top-level categories for sidebar
  // Vylúčime "odporúčané produkty" zo sidebaru
  const sidebarCategories = categories
    .filter(cat => {
      if (!cat.parent_category_id) {
        // Vylúčime odporúčané produkty
        const excludedHandles = ['odporucane-produkty', 'odporucane-produkty-homepage', 'najpredavanejsie-produkty']
        return !excludedHandles.includes(cat.handle || '')
      }
      return false
    })
    .sort((a, b) => (a.rank || 0) - (b.rank || 0))
    .slice(0, 10)

  // Price ranges
  const priceRanges = [
    { label: 'All' },
    { label: '$10 - $100' },
    { label: '$100 - $200' },
    { label: '$200 - $300' },
    { label: '$300 - $400' },
  ]

  // Materials
  const materials = [
    'Laminate',
    'Acrylic',
    'Aluminium',
    'Cotton',
    'Leather',
    'Metal',
  ]

  // Colors
  const colors = [
    { value: '#d0a272' },
    { value: '#68412d' },
    { value: '#000000' },
    { value: '#aa5959' },
    { value: '#8db4d2' },
    { value: '#c2c3a0' },
    { value: '#c7857d' },
    { value: '#e3e1e7' },
    { value: '#b490b0' },
  ]

  // Tags
  const tags = [
    'Vintage',
    'Awesome',
    'Summer',
    'Beachwear',
    'Sunglasses',
    'Winter',
    'Shorts',
    'Cool',
    'Nice',
  ]

  // Sample products
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
    category: 'Furniture',
    price: `$${(i + 1) * 50}`,
    image: `/furnitor/images/c_0${(i % 4) + 7}.jpg`,
  }))

  return (
    <main id="content">
      {/* Page Title */}
      <section className="py-8 page-title border-top">
        <div className="container">
          <h1 className="fs-40 my-1 text-capitalize text-center">Shop All</h1>
        </div>
      </section>

      {/* Category Slider */}
      <CategorySlider categories={categories} countryCode={countryCode} />

      {/* Main Shop Section */}
      <section className="pt-13 pb-11 pb-lg-14">
        <div className="container">
          <div className="row overflow-hidden">
            {/* Sidebar */}
            <div className="col-md-3 mb-10 mb-md-0 primary-sidebar sidebar-sticky" id="sidebar">
              <div className="primary-sidebar-inner">
                {/* Categories */}
                <div className="card border-0 mb-7">
                  <div className="card-header bg-transparent border-0 p-0">
                    <h3 className="card-title fs-20 mb-0">
                      Categories
                    </h3>
                  </div>
                  <div className="card-body px-0 pt-4 pb-0">
                    <ul className="list-unstyled mb-0">
                      {sidebarCategories.length > 0 ? (
                        sidebarCategories.map((category) => (
                          <li key={category.id} className="mb-1">
                            <LocalizedClientLink 
                              href={`/categories/${category.handle}`}
                              className="text-secondary hover-primary border-bottom border-white border-hover-primary d-inline-block lh-12"
                            >
                              {category.name}
                            </LocalizedClientLink>
                          </li>
                        ))
                      ) : (
                        // Fallback categories if no categories from backend
                        [
                          'Accessories',
                          'Chairs',
                          'Clock',
                          'Dining Tables',
                          'Lighting',
                          'Lounges & Sofa',
                          'Stool',
                        ].map((category, index) => (
                          <li key={index} className="mb-1">
                            <a 
                              href="#"
                              className="text-secondary hover-primary border-bottom border-white border-hover-primary d-inline-block lh-12"
                            >
                              {category}
                            </a>
                          </li>
                        ))
                      )}
                      {sidebarCategories.length > 0 && (
                        <li className="mb-1">
                          <a 
                            href="#"
                            className="text-secondary hover-primary border-bottom border-white border-hover-primary d-inline-block lh-12"
                          >
                            ...
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Price */}
                <div className="card border-0 mb-7">
                  <div className="card-header bg-transparent border-0 p-0">
                    <h3 className="card-title fs-20 mb-0">
                      Price
                    </h3>
                  </div>
                  <div className="card-body px-0 pt-4 pb-0">
                    <ul className="list-unstyled mb-0">
                      {priceRanges.map((range, index) => (
                        <li key={index} className="mb-1">
                          <a 
                            href="#"
                            className="text-secondary hover-primary border-bottom border-white border-hover-primary d-inline-block lh-12"
                          >
                            {range.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Material */}
                <div className="card border-0 mb-7">
                  <div className="card-header bg-transparent border-0 p-0">
                    <h3 className="card-title fs-20 mb-0">
                      Material
                    </h3>
                  </div>
                  <div className="card-body px-0 pt-4 pb-0">
                    <ul className="list-unstyled mb-0">
                      {materials.map((material, index) => (
                        <li key={index} className="mb-1">
                          <a 
                            href="#"
                            className="text-secondary hover-primary border-bottom border-white border-hover-primary d-inline-block lh-12"
                          >
                            {material}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Colors */}
                <div className="card border-0 widget-color mb-7">
                  <div className="card-header bg-transparent border-0 p-0">
                    <h3 className="card-title fs-20 mb-0">
                      Colors
                    </h3>
                  </div>
                  <div className="card-body px-0 pt-4 pb-0">
                    <ul className="list-inline mb-0">
                      {colors.map((color, index) => (
                        <li key={index} className="list-inline-item">
                          <a 
                            href="#"
                            className="d-block item" 
                            style={{ backgroundColor: color.value }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tags */}
                <div className="card border-0">
                  <div className="card-header bg-transparent border-0 p-0">
                    <h3 className="card-title fs-20 mb-0">
                      Tags
                    </h3>
                  </div>
                  <div className="card-body px-0 pt-6 pb-0">
                    <ul className="list-inline mb-0">
                      {tags.map((tag, index) => (
                        <li key={index} className="list-inline-item mr-2 py-1">
                          <a 
                            href="#"
                            className="text-secondary hover-primary border-bottom border-white border-hover-primary d-inline-block lh-12"
                          >
                            {tag}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="col-md-9">
              {/* Sorting and Count */}
              <div className="d-flex mb-6">
                <div className="d-flex align-items-center text-primary">
                  Showing 1-15 of 90 results
                </div>
                <div className="ml-auto">
                  <div className="dropdown">
                    <a 
                      href="#" 
                      className="dropdown-toggle fs-14" 
                      id="dropdownMenuButton" 
                      data-toggle="dropdown"
                      aria-haspopup="true" 
                      aria-expanded="false"
                    >
                      Default Sorting
                    </a>
                    <div 
                      className="dropdown-menu dropdown-menu-right" 
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a className="dropdown-item text-primary fs-14" href="#">
                        Price high to low
                      </a>
                      <a className="dropdown-item text-primary fs-14" href="#">
                        Price low to high
                      </a>
                      <a className="dropdown-item text-primary fs-14" href="#">
                        Random
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="row">
                {products.map((product) => (
                  <div key={product.id} className="col-sm-6 col-lg-4 mb-8" data-animate="fadeInUp">
                    <div className="card border-0 hover-change-content product">
                      <div className="card-img-top position-relative">
                        <div 
                          style={{ backgroundImage: `url('${product.image}')` }}
                          className="card-img ratio bg-img-cover-center ratio-1-1"
                        />
                        <div className="position-absolute pos-fixed-bottom px-4 px-sm-6 pb-5 d-flex w-100 justify-content-center content-change-horizontal">
                          <a 
                            href="#" 
                            data-toggle="tooltip" 
                            title="Add to cart"
                            className="add-to-cart d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle mr-2 border"
                          >
                            <i className="far fa-shopping-basket"></i>
                          </a>
                          <a 
                            href="#" 
                            data-toggle="tooltip" 
                            title="Add to favourite"
                            className="add-to-wishlist d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle mr-2 border"
                          >
                            <i className="far fa-heart"></i>
                          </a>
                          <a 
                            href="#" 
                            data-toggle="tooltip" 
                            title="Add to compare"
                            className="add-to-compare d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle mr-2 border"
                          >
                            <i className="far fa-random"></i>
                          </a>
                          <a 
                            href="#" 
                            data-toggle="tooltip" 
                            title="Preview"
                            className="preview d-flex align-items-center justify-content-center text-primary bg-white hover-white bg-hover-primary w-45px h-45px rounded-circle border"
                          >
                            <i className="far fa-eye"></i>
                          </a>
                        </div>
                      </div>
                      <div className="card-body px-0 pt-4 pb-0 d-flex align-items-end">
                        <div className="mr-auto">
                          <a href="#" className="text-uppercase text-muted letter-spacing-05 fs-12 d-block font-weight-500">
                            {product.category}
                          </a>
                          <a href="#" className="font-weight-bold mt-1 d-block">
                            {product.title}
                          </a>
                        </div>
                        <p className="text-primary mb-0 font-weight-500">{product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <nav className="pt-4 overflow-hidden">
                <ul className="pagination justify-content-center align-items-center mb-0">
                  <li className="page-item fs-12 d-none d-sm-block">
                    <a className="page-link" href="#" tabIndex={-1}>
                      <i className="far fa-angle-double-left"></i>
                    </a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#">2</a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><a className="page-link" href="#">...</a></li>
                  <li className="page-item"><a className="page-link" href="#">6</a></li>
                  <li className="page-item fs-12 d-none d-sm-block">
                    <a className="page-link" href="#">
                      <i className="far fa-angle-double-right"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

