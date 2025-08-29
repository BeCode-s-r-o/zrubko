"use client"

import { useTranslations } from 'next-intl'
import { BlogGridClient } from './blog-grid-client'

interface BlogPageClientProps {
  params: { countryCode: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function BlogPageClient({ params, searchParams }: BlogPageClientProps) {
  const t = useTranslations('blog')

  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>

      <main className="main py-12">
        <div className="container mx-auto px-4">
          <BlogGridClient searchParams={searchParams} countryCode={params.countryCode} />
        </div>
      </main>
    </div>
  )
}
