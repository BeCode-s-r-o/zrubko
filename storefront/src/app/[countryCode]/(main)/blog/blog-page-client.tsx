"use client"

import { useTranslations } from 'next-intl'
import { BlogGridClient } from './blog-grid-client'
import PageBreadcrumbs from "@modules/common/components/breadcrumbs/page-breadcrumbs"
import LandingBanner from "@modules/common/components/landing-banner"

interface BlogPageClientProps {
  params: { countryCode: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function BlogPageClient({ params, searchParams }: BlogPageClientProps) {
  const t = useTranslations('blog')

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section - using reusable component */}
      <LandingBanner
        title={t('title')}
        subtitle={t('subtitle')}
        backgroundImage="https://console-production-f027.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=blog%2Fblog_banner.webp&version_id=null"
        backgroundColor="from-primary/70 via-transparent to-primary/80"
        textColor="text-white"
        overlay="dark"
      />

      {/* Breadcrumbs */}
      <PageBreadcrumbs className='max-w-7xl mx-auto'
        items={[
          { label: "Blog", isActive: true }
        ]}
      />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl">
        <main className="py-12">
          <div className="px-4 lg:px-8">
            <BlogGridClient searchParams={searchParams} countryCode={params.countryCode} />
          </div>
        </main>
      </div>
    </div>
  )
}
