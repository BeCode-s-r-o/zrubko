'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Logo from '@modules/common/components/logo'

export default function Header08() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="main-header navbar-light header-sticky header-sticky-smart header-08">
      {/* Topbar */}
      <div className="topbar bg-accent py-2 d-none d-xl-block">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 mb-2 mb-xl-0">
              <div className="d-flex align-items-center h-100 justify-content-center justify-content-xl-start">
                <Link href="#" className="d-flex align-items-center text-primary fs-15 pr-3 border-right border-light-dark">
                  <span className="d-inline-block mr-2"><i className="fal fa-map-marker-alt"></i></span>
                  <span>Find a Store</span>
                </Link>
                <Link href="#" className="d-flex align-items-center text-primary fs-15 pl-3">
                  <span className="d-inline-block mr-2"><i className="fal fa-envelope"></i></span>
                  <span>Newsletter</span>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 mb-2 mb-xl-0">
              <p className="mb-0 fs-15 text-primary text-center">Free shipping for orders over $59 !</p>
            </div>
            <div className="col-xl-4">
              <div className="d-flex align-items-center justify-content-center justify-content-xl-end h-100">
                <div className="dropdown px-3 border-right border-light-dark">
                  <a href="#" className="dropdown-toggle font-weight-500 fs-15" id="dropdownMenuLanguage" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    English
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLanguage">
                    <a className="dropdown-item text-primary" href="#">English</a>
                    <a className="dropdown-item text-primary" href="#">Vietnamese</a>
                    <a className="dropdown-item text-primary" href="#">Chinese</a>
                  </div>
                </div>
                <div className="dropdown pl-3">
                  <a href="#" className="dropdown-toggle font-weight-500 fs-15" id="dropdownMenuCurrency1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    USD
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuCurrency1">
                    <a className="dropdown-item text-primary" href="#">USD</a>
                    <a className="dropdown-item text-primary" href="#">EURO</a>
                    <a className="dropdown-item text-primary" href="#">VND</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo and Search Bar */}
      <div className="d-none d-xl-block">
        <div className="pt-6 pb-7">
          <div className="container">
            <div className="row">
              <div className="col-6 col-xl-3">
                <Logo 
                  width={150} 
                  height={50}
                  className="navbar-brand mr-0 d-flex align-items-center h-100 py-0"
                />
              </div>
              <div className="col-xl-6">
                <form className="d-flex align-items-center h-100">
                  <div className="input-group position-relative">
                    <input type="text" className="form-control border-0 border-bottom pl-0 border-2x bg-transparent" placeholder="Search Something..." />
                    <div className="input-group-append position-absolute pos-fixed-right-center">
                      <button className="input-group-text bg-transparent border-0 text-primary fs-18 px-0" type="submit">
                        <i className="far fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-6 col-xl-3 ml-auto">
                <div className="d-flex align-items-center justify-content-end h-100">
                  <ul className="navbar-nav flex-row justify-content-xl-end d-flex flex-wrap text-body py-0 navbar-right">
                    <li className="nav-item">
                      <Link href="/account" className="nav-link pr-3 py-0">
                        <i className="far fa-user-alt"></i>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/wishlist" className="nav-link position-relative px-3 py-0">
                        <i className="far fa-heart"></i>
                        <span className="position-absolute number">0</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/cart" className="nav-link position-relative px-3 menu-cart py-0" data-canvas="true" data-canvas-options='{"container":".cart-canvas"}'>
                        <i className="far fa-shopping-basket"></i>
                        <span className="position-absolute number">0</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky-area bg-white">
        <div className="d-none d-xl-block">
          <div className="border-top-0 border-xl-top">
            <div className="container">
              <nav className="navbar navbar-expand-xl px-0 py-4 py-xl-0 row w-100 no-gutters">
                <div className="col-xl-3">
                  <div className="dropdown no-caret">
                    <a href="#" className="btn dropdown-toggle btn-primary d-flex w-100 text-left align-items-center px-0 px-xl-4 border-0 shadow-none" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <div className="toggle-bar"><span className="toggle-icon text-white"></span></div>
                      <div className="pl-5">Browse Categories</div>
                    </a>
                    <div className="dropdown-menu w-100 py-0" aria-labelledby="dropdownMenuButton1">
                      <Link href="/categories/chairs" className="dropdown-item media align-items-center border-bottom py-2">
                        <div className="w-28px mr-3">
                          <Image src="/furnitor/images/chair.png" alt="Chair" width={28} height={28} />
                        </div>
                        <div className="media-body">Chairs</div>
                      </Link>
                      <Link href="/categories/tables" className="dropdown-item media align-items-center border-bottom py-2">
                        <div className="w-28px mr-3">
                          <Image src="/furnitor/images/desk.png" alt="Table" width={28} height={28} />
                        </div>
                        <div className="media-body">Table</div>
                      </Link>
                      <Link href="/categories/accessories" className="dropdown-item media align-items-center border-bottom py-2">
                        <div className="w-28px mr-3">
                          <Image src="/furnitor/images/fish_bowl.png" alt="Accessories" width={28} height={28} />
                        </div>
                        <div className="media-body">Accessories</div>
                      </Link>
                      <Link href="/categories/sofa" className="dropdown-item media align-items-center border-bottom py-2">
                        <div className="w-28px mr-3">
                          <Image src="/furnitor/images/sofa.png" alt="Sofa" width={28} height={28} />
                        </div>
                        <div className="media-body">Sofa</div>
                      </Link>
                      <Link href="/categories/plants" className="dropdown-item media align-items-center border-bottom py-2">
                        <div className="w-28px mr-3">
                          <Image src="/furnitor/images/plant.png" alt="Plants" width={28} height={28} />
                        </div>
                        <div className="media-body">Plants</div>
                      </Link>
                      <Link href="/categories/stools" className="dropdown-item media align-items-center border-bottom py-2">
                        <div className="w-28px mr-3">
                          <Image src="/furnitor/images/stool.png" alt="Stool" width={28} height={28} />
                        </div>
                        <div className="media-body">Stool</div>
                      </Link>
                      <Link href="/categories/stands" className="dropdown-item media align-items-center border-bottom py-2">
                        <div className="w-28px mr-3">
                          <Image src="/furnitor/images/ladder.png" alt="Stands" width={28} height={28} />
                        </div>
                        <div className="media-body">Stands</div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 d-flex pl-xl-8 position-static">
                  <ul className="navbar-nav hover-menu main-menu px-0 mx-xl-n4">
                    <li className="nav-item dropdown-item-home dropdown py-2 py-xl-5 px-0 px-xl-4">
                      <Link href="/" className="nav-link dropdown-toggle p-0" data-toggle="dropdown">
                        Home <span className="caret"></span>
                      </Link>
                      <ul className="dropdown-menu pt-3 pb-0 pb-xl-3 x-animated x-fadeInUp">
                        <li className="dropdown-item active">
                          <Link href="/" className="dropdown-link">Home 10</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown-item-shop dropdown py-2 py-xl-5 px-0 px-xl-4">
                      <Link href="/store" className="nav-link dropdown-toggle p-0" data-toggle="dropdown">
                        Shop <span className="caret"></span>
                      </Link>
                    </li>
                    <li className="nav-item dropdown-item-pages dropdown py-2 py-xl-5 px-0 px-xl-4">
                      <Link href="#" className="nav-link dropdown-toggle p-0" data-toggle="dropdown">
                        Pages <span className="caret"></span>
                      </Link>
                    </li>
                    <li className="nav-item dropdown-item-blog dropdown py-2 py-xl-5 px-0 px-xl-4">
                      <Link href="/blog" className="nav-link dropdown-toggle p-0" data-toggle="dropdown">
                        Blog <span className="caret"></span>
                      </Link>
                    </li>
                  </ul>
                  <div className="pl-5 border-left-0 border-xl-left ml-auto d-none d-xl-block">
                    <Link href="tel:+18665403229" className="d-flex align-items-center justify-content-end h-100">
                      <span className="d-block mr-2"><i className="far fa-phone-alt"></i></span>
                      Call us (+1) 866 540 3229
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="d-block d-xl-none">
          <div className="container">
            <nav className="navbar navbar-expand-xl px-0 py-3 w-100 align-items-center">
              <button className="navbar-toggler border-0 px-0 canvas-toggle" type="button" data-canvas="true" data-canvas-options='{"width":"250px","container":".sidenav"}' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span className="fs-24 toggle-icon"></span>
              </button>
              <Logo 
                width={120} 
                height={40}
                className="navbar-brand d-inline-block mx-auto py-0"
              />
              <a href="#search-popup" data-gtf-mfp="true" data-mfp-options='{"type":"inline","focus": "#keyword","mainClass": "mfp-search-form mfp-move-from-top mfp-align-top"}' className="nav-search d-block py-0" title="Search">
                <i className="far fa-search"></i>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

