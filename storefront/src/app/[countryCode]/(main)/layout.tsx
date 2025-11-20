import { Metadata } from "next"

import Footer10 from "@modules/layout/templates/footers/Footer10"
import Header08 from "@modules/layout/templates/headers/Header08"
import { getBaseURL } from "@lib/util/env"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Header08 />
      {props.children}
      <Footer10 />
    </>
  )
}
