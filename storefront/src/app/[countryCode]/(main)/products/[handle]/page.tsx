import { Metadata } from "next"
import ProductTemplateV5Static from "@modules/products/templates/product-template-v5-static"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Radial Clock | Furnitor Store`,
    description: `Minimal, yet bold - LYNEA Plug Lamp adds an architectural addition without the pain of a professional installation.`,
    openGraph: {
      title: `Radial Clock | Furnitor Store`,
      description: `Minimal, yet bold - LYNEA Plug Lamp adds an architectural addition without the pain of a professional installation.`,
      images: ['/furnitor/images/product-page-13.jpg'],
    },
  }
}

export default function ProductPage() {
  return <ProductTemplateV5Static />
}
