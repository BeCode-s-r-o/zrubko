'use client'

import Link from 'next/link'

export default function ProductBreadcrumbV5Static() {
  return (
    <section className="bg-color-3">
      <div className="container">
        <nav
          aria-label="breadcrumb"
          className="d-flex align-items-center justify-content-between"
        >
          <ol className="breadcrumb py-3 mr-6">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/store"> Shop </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Radial Clock
            </li>
          </ol>

          <div className="navigation d-flex align-items-center">
            {/* Previous Product */}
            <div className="dropdown no-caret product-dropdown">
              <a
                className="fs-14 pr-3 py-3 d-block dropdown-toggle"
                href="#"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                rel="prev"
              >
                <i className="far fa-arrow-left"></i>
              </a>
              <div className="dropdown-menu w-215px p-2 border-0 dropdown-menu-right rounded-0">
                <Link href="#" className="media align-items-center">
                  <div className="w-60px mr-2">
                    <img
                      src="/furnitor/images/product-08.jpg"
                      alt="Bow Chair"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="media-body">
                    <p className="font-weight-bold text-primary mb-0 lh-11 mb-1">Bow Chair</p>
                    <p className="text-primary mb-0 lh-1 fs-14">$1390.00</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Next Product */}
            <div className="dropdown no-caret product-dropdown">
              <a
                className="fs-14 py-3 d-block dropdown-toggle"
                href="#"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                rel="next"
              >
                <i className="far fa-arrow-right"></i>
              </a>
              <div className="dropdown-menu w-215px p-2 border-0 dropdown-menu-right rounded-0">
                <Link href="#" className="media align-items-center">
                  <div className="w-60px mr-2">
                    <img
                      src="/furnitor/images/product-08.jpg"
                      alt="Next Product"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="media-body">
                    <p className="font-weight-bold text-primary mb-0 lh-11 mb-1">Next Product</p>
                    <p className="text-primary mb-0 lh-1 fs-14">$1390.00</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>
  )
}

