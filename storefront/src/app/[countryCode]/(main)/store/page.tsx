import { Metadata } from 'next'
import { listCategories } from '@lib/data/categories'
import ShopTemplateStatic from '@modules/shop/templates/shop-template-static'

export const metadata: Metadata = {
  title: 'Shop All Products | Furnitor Store',
  description: 'Browse all our furniture products',
}

type Props = {
  params: { countryCode: string }
}

export default async function StorePage({ params }: Props) {
  const categories = await listCategories()
  
  return <ShopTemplateStatic categories={categories || []} countryCode={params.countryCode} />
}
