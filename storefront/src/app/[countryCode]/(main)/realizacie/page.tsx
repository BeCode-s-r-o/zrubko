import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import PageBreadcrumbs from "@modules/common/components/breadcrumbs/page-breadcrumbs"
import LandingBanner from "@modules/common/components/landing-banner"
import RealizacieGallery from "./realizacie-gallery"

interface RealizaciePageProps {
  params: { countryCode: string }
}

export async function generateMetadata({ params }: RealizaciePageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.countryCode })

  return {
    title: `${t('realizacie.title')} | Zrubko`,
    description: t('realizacie.subtitle'),
  }
}

export default async function RealizaciePage({ params }: RealizaciePageProps) {
  const t = await getTranslations({ locale: params.countryCode })

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section - using reusable component */}
      <LandingBanner
        title={t('realizacie.title')}
        subtitle={t('realizacie.subtitle')}
        backgroundImage="https://console-production-f027.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=realizacie%2Frealizacie_banner.webp&version_id=null"
        backgroundColor="from-primary/70 via-transparent to-primary/80"
        textColor="text-white"
        overlay="dark"
      />

      {/* Breadcrumbs */}
      <PageBreadcrumbs className='max-w-7xl mx-auto'
        items={[
          { label: t('navigation.realizacie'), isActive: true }
        ]}
      />

      {/* Gallery Section */}
      <RealizacieGallery />

    </div>
  )
}
