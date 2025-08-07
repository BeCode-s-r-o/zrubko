import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav-hlavne-menu"
import FloatingChatButton from "@modules/common/components/floating-chat-button"
import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

interface PageLayoutProps {
  children: React.ReactNode
  params: {
    countryCode: string
  }
}

export default async function PageLayout({ children, params }: PageLayoutProps) {
  return (
    <>
      <Nav countryCode={params.countryCode} />
      <main className="min-h-[calc(100vh-64px)]">
        {children}
      </main>
      <Footer />
      <FloatingChatButton />
    </>
  )
}
