import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import BlogPageClient from './blog-page-client'

interface BlogPageProps {
  params: { countryCode: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.countryCode })

  return {
    title: `${t('blog.title') || 'Blog'} | Zrubko`,
    description: t('blog.subtitle') || 'Read our latest blog posts',
  }
}

export default function BlogPage({ params, searchParams }: BlogPageProps) {
  return <BlogPageClient params={params} searchParams={searchParams} />
}