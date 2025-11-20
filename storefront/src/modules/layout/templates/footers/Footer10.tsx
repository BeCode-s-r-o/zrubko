'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer10() {
  return (
    <footer className="pt-10 pb-9 footer">
      <div className="container container-xxl">
        <div className="row">
          <div className="col-lg mb-6 mb-lg-0">
            <Link href="/" className="footer-logo d-block">
              <Image src="/furnitor/images/logo.png" alt="Furnitor" width={150} height={50} />
            </Link>
          </div>
          <div className="col-sm-6 col-lg mb-6 mb-lg-0">
            <ul className="list-unstyled mb-0">
              <li className="py-0">
                <Link href="/contact" className="lh-213 font-weight-500">Contact</Link>
              </li>
              <li className="py-0">
                <Link href="/returns" className="lh-213 font-weight-500">Returns</Link>
              </li>
              <li className="py-0">
                <Link href="/returns/submit" className="lh-213 font-weight-500">Submit a Returns</Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-6 col-lg mb-6 mb-lg-0">
            <ul className="list-unstyled mb-0">
              <li className="py-0">
                <Link href="/careers" className="lh-213 font-weight-500">Careers</Link>
              </li>
              <li className="py-0">
                <Link href="/privacy" className="lh-213 font-weight-500">Privacy Policy</Link>
              </li>
              <li className="py-0">
                <Link href="/terms" className="lh-213 font-weight-500">Term & Conditions</Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-6 col-lg mb-6 mb-lg-0">
            <ul className="list-unstyled mb-0">
              <li className="py-0">
                <Link href="/gift-voucher" className="lh-213 font-weight-500">Gift Voucher</Link>
              </li>
              <li className="py-0">
                <Link href="/discount" className="lh-213 font-weight-500">Discount</Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-6 col-lg">
            <ul className="list-inline text-lg-right">
              <li className="list-inline-item mr-4">
                <Link href="#" className="fs-20">
                  <i className="fab fa-pinterest-p"></i>
                </Link>
              </li>
              <li className="list-inline-item mr-4">
                <Link href="#" className="fs-20">
                  <i className="fab fa-facebook-f"></i>
                </Link>
              </li>
              <li className="list-inline-item mr-4">
                <Link href="#" className="fs-20">
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="#" className="fs-20">
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>
            </ul>
            <p className="mb-0 text-gray text-lg-right font-weight-500">
              © {new Date().getFullYear()} Furnitor.<br />
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

