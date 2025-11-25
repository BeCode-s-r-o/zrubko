'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Logo from '@modules/common/components/logo'
import CategoryMenu from '@modules/layout/components/category-menu'
import OsmoMenu from '@modules/layout/components/osmo-menu'
import BestSellingMenu from '@modules/layout/components/best-selling-menu'
import CartCount from '@modules/layout/components/cart-count'

export default function Header08() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="main-header navbar-light header-sticky header-sticky-smart header-08">
      {/* Topbar */}
      <div className="topbar py-2 d-none d-xl-block" style={{ backgroundColor: 'rgb(27,46,25)' }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-4 mb-2 mb-xl-0">
              <div className="d-flex align-items-center h-100 justify-content-center justify-content-xl-start">
                <Link href="#" className="d-flex align-items-center text-white fs-15 pr-3 border-right border-white">
                  <span className="d-inline-block mr-2"><i className="fal fa-map-marker-alt"></i></span>
                  <span>Nájsť obchod</span>
                </Link>
                <Link href="#" className="d-flex align-items-center text-white fs-15 pl-3">
                  <span className="d-inline-block mr-2"><i className="fal fa-envelope"></i></span>
                  <span>Newsletter</span>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 mb-2 mb-xl-0">
              <p className="mb-0 fs-15 text-white text-center">Doprava zdarma pri objednávkach nad 59 € !</p>
            </div>
            <div className="col-xl-4">
              <div className="d-flex align-items-center justify-content-center justify-content-xl-end h-100">
                <div className="dropdown px-3 border-right border-white">
                  <a href="#" className="dropdown-toggle text-white font-weight-500 fs-15" id="dropdownMenuLanguage" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Slovenčina
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLanguage">
                    <a className="dropdown-item text-primary" href="#">Slovenčina</a>
                    <a className="dropdown-item text-primary" href="#">Čeština</a>
                    <a className="dropdown-item text-primary" href="#">Deutsch</a>
                    <a className="dropdown-item text-primary" href="#">English</a>
                  </div>
                </div>
                <div className="dropdown pl-3">
                  <a href="#" className="dropdown-toggle text-white font-weight-500 fs-15" id="dropdownMenuCurrency1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    EUR
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuCurrency1">
                    <a className="dropdown-item text-primary" href="#">EUR</a>
                    <a className="dropdown-item text-primary" href="#">USD</a>
                    <a className="dropdown-item text-primary" href="#">CZK</a>
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
                    <input type="text" className="form-control border-0 border-bottom pl-0 border-2x bg-transparent" placeholder="Hľadať..." />
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
                        <CartCount />
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
                  <CategoryMenu />
                </div>
                <div className="col-xl-9 d-flex pl-xl-8">
                  <ul className="navbar-nav hover-menu main-menu px-0 mx-xl-n4 position-static">
                    <OsmoMenu />
                    <BestSellingMenu />
                    <li className="nav-item dropdown-item-blog dropdown py-2 py-xl-5 px-0 px-xl-4">
                      <Link href="/blog" className="nav-link dropdown-toggle p-0" data-toggle="dropdown">
                        Blogy <span className="caret"></span>
                      </Link>
                    </li>
                  </ul>
                  <div className="pl-5 border-left-0 border-xl-left ml-auto d-none d-xl-block">
                    <Link href="tel:+421911869777" className="d-flex align-items-center justify-content-end h-100">
                      <span className="d-block mr-2"><i className="far fa-phone-alt"></i></span>
                      Zavolajte nám +421 911 869 777
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

