import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <h1 className="fs-40 mb-4">Page not found</h1>
      <p className="fs-16 mb-4 text-muted">
        The page you tried to access does not exist.
      </p>
      <Link
        className="d-flex align-items-center text-primary font-weight-500"
        href="/"
      >
        <span className="mr-2">Go to frontpage</span>
        <i className="far fa-arrow-right"></i>
      </Link>
    </div>
  )
}
