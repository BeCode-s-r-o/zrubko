import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductsListWithSort } from '@lib/data/products'
import { listCategories } from '@lib/data/categories'
import { getRegion } from '@lib/data/regions'
import ShopTemplate from '@modules/shop/templates/shop-template'
import { SortOptions } from '@modules/store/components/refinement-list/sort-products'

export const metadata: Metadata = {
  title: 'Shop All Products | Furnitor Store',
  description: 'Browse all our furniture products',
}

type Props = {
  params: { countryCode: string }
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
}

export default async function ShopPage({ params, searchParams }: Props) {
  const { sortBy = 'created_at', page: pageStr } = searchParams
  const page = pageStr ? parseInt(pageStr) : 1

  // Fetch data in parallel
  const [productsData, categories, region] = await Promise.all([
    getProductsListWithSort({
      page,
      sortBy,
      countryCode: params.countryCode,
      queryParams: {
        limit: 12,
      },
    }),
    listCategories(),
    getRegion(params.countryCode),
  ])

  if (!region) {
    notFound()
  }

  const { response } = productsData

  return (
    <ShopTemplate
      products={response.products}
      categories={categories || []}
      region={region}
      countryCode={params.countryCode}
      sortBy={sortBy}
      page={page}
      totalCount={response.count}
    />
  )
}


