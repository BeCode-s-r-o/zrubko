"use client"

import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('blog')

  return (
    <div className="page-wrapper">
      <main className="main py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('postNotFound') || 'Blog Post Not Found'}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('postNotFoundDesc') || 'The blog post you\'re looking for doesn\'t exist or has been removed.'}
            </p>
            <LocalizedClientLink
              href="/blog"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('backToBlog') || 'Back to Blog'}
            </LocalizedClientLink>
          </div>
        </div>
      </main>
    </div>
  )
}

