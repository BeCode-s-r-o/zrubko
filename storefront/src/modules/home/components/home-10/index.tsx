import { randomUUID } from 'crypto'
import { unstable_noStore as noStore } from 'next/cache'
import HeroSlider from '../hero-slider'
import CategorySlider from '../category-slider'
import ProductGrid, { ProductGridItem } from '../product-grid'
import BannerSection from '../banner-section'
import CountdownSection from '../countdown-section'
import ClientLogos from '../client-logos'
import RoomInspiration from '../room-inspiration'
import { getProductsByCategoryHandle } from '@lib/data/products'
import { HOMEPAGE_OSMO_CATEGORY_HANDLE } from '@lib/constants'
import { getProductPrice } from '@lib/util/get-product-price'
import { HttpTypes } from '@medusajs/types'

const FALLBACK_IMAGE = '/furnitor/images/product-14.jpg'
const FALLBACK_CATEGORY = 'Najpredávanejšie'

// Sample data - zostáva ako fallback keď nie sú dostupné dáta z Medusy
const essentialProductsSeed = [
  {
    id: '1',
    name: 'Bow Chair',
    category: 'Table',
    price: '$1390.00',
    image: 'https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_products%2Fwooden-spatula-is-laying-floor-fireplace.jpg&version_id=null',
    link: '/products/bow-chair'
  },
  {
    id: '2',
    name: 'Potato Chair',
    category: 'chair',
    price: '$1390.00',
    image: '/furnitor/images/product-02.jpg',
    link: '/products/potato-chair'
  },
  {
    id: '3',
    name: 'Golden Clock',
    category: 'decor',
    price: '$1390.00',
    image: '/furnitor/images/product-10.jpg',
    link: '/products/golden-clock'
  },
  {
    id: '4',
    name: 'Piper Bar',
    category: 'Table',
    price: '$1390.00',
    image: '/furnitor/images/product-04.jpg',
    link: '/products/piper-bar'
  },
  {
    id: '5',
    name: 'Bow Chair',
    category: 'table',
    price: '$1390.00',
    image: '/furnitor/images/product-16.jpg',
    link: '/products/bow-chair-2'
  },
  {
    id: '6',
    name: 'Bow Chair',
    category: 'table',
    price: '$1000.00',
    image: '/furnitor/images/product-04.jpg',
    link: '/products/bow-chair-3'
  },
  {
    id: '7',
    name: 'Golden Clock',
    category: 'decor',
    price: '$1390.00',
    image: '/furnitor/images/product-06.jpg',
    link: '/products/golden-clock-2'
  },
  {
    id: '8',
    name: 'Golden Clock',
    category: 'decor',
    price: '$1390.00',
    image: '/furnitor/images/product-05.jpg',
    link: '/products/golden-clock-3'
  }
]

const featuredProductsSeed = [
  {
    id: '9',
    name: 'Bow Chair',
    category: 'Table',
    price: '$1390.00',
    image: '/furnitor/images/product-14.jpg',
    link: '/products/bow-chair-4'
  },
  {
    id: '10',
    name: 'Potato Chair',
    category: 'chair',
    price: '$1390.00',
    image: '/furnitor/images/product-16.jpg',
    link: '/products/potato-chair-2'
  },
  {
    id: '11',
    name: 'Golden Clock',
    category: 'decor',
    price: '$1390.00',
    image: '/furnitor/images/product-17.jpg',
    link: '/products/golden-clock-4'
  }
]

const banners = [
  {
    title: (
      <>
        <span className="osmo-brand-text">OSMO</span> pre exteriér
      </>
    ),
    subtitle: '',
    image: 'https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_products%2Fcloseup.jpg&version_id=null',
    link: '/store',
    buttonText: 'Kúpiť teraz',
    className: 'col-lg-8 mb-6 mb-lg-0'
  },
  {
    title: (
      <>
        <span className="osmo-brand-text">OSMO</span> pre interiér
      </>
    ),
    image: 'https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_products%2Fwooden-spatula-is-laying-floor-fireplace.jpg&version_id=null',
    link: '/store',
    buttonText: 'Kúpiť teraz',
    className: 'col-lg-4'
  }
]

const clientLogos = [
  { image: 'https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_brands%2Fbrown_logo_transparent.png&version_id=null', alt: 'Client Logo 01', link: '#' },
  { image: 'https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_brands%2Fblack_black.png&version_id=null', alt: 'FLOYD', link: '#' },
  { image: 'https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_brands%2Fblack_logo_transparent.png&version_id=null', alt: 'Client Logo 03', link: '#' },
  { image: 'https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_brands%2Fosmo-logo-.png&version_id=null', alt: 'Client Logo 04', link: '#' },
  { image: 'https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_brands%2Fbrown_logo_transparent.png&version_id=null', alt: 'Client Logo 01', link: '#' },
  { image: 'https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_brands%2Fblack_black.png&version_id=null', alt: 'FLOYD', link: '#' },
  { image: 'https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_brands%2Fblack_logo_transparent.png&version_id=null', alt: 'Client Logo 03', link: '#' },
 // { image: '/furnitor/images/client_logo_08.png', alt: 'Client Logo 08', link: '#' },
 // { image: '/furnitor/images/client_logo_09.png', alt: 'Client Logo 09', link: '#' },
 // { image: '/furnitor/images/client_logo_10.png', alt: 'Client Logo 10', link: '#' }
]

const localizeStaticProducts = (products: ProductGridItem[], countryCode: string): ProductGridItem[] =>
  products.map((product) => ({
    ...product,
    link: `/${countryCode}${product.link}`,
  }))

const mapMedusaProductsToGridItems = (
  products: HttpTypes.StoreProduct[],
  countryCode: string
): ProductGridItem[] =>
  products.map((product) => {
    const { cheapestPrice } = getProductPrice({ product })
    const productHandle = product.handle || product.id || ''

    return {
      id: product.id || product.handle || randomUUID(),
      name: product.title || 'Produkt',
      category: product.categories?.[0]?.name || FALLBACK_CATEGORY,
      price: cheapestPrice?.calculated_price || '',
      image: product.thumbnail || product.images?.[0]?.url || FALLBACK_IMAGE,
      link: productHandle ? `/${countryCode}/products/${productHandle}` : `/${countryCode}/store`,
    }
  })

export default async function Home10({ countryCode }: { countryCode: string }) {
  noStore()
  const localizedEssentialProducts = localizeStaticProducts(essentialProductsSeed, countryCode)

  const osmoProducts = await getProductsByCategoryHandle({
    countryCode,
    categoryHandle: HOMEPAGE_OSMO_CATEGORY_HANDLE,
    limit: 4,
  })

  const osmoProductGridItems =
    osmoProducts.length > 0
      ? mapMedusaProductsToGridItems(osmoProducts, countryCode)
      : localizeStaticProducts(featuredProductsSeed, countryCode)

  return (
    <main id="content">
      <HeroSlider />
      <CategorySlider />
      <ProductGrid 
        title="Odporúčané produkty"
        products={localizedEssentialProducts}
        showButton={true}
        buttonText="Kúpiť teraz"
        buttonLink="/store"
      />
      <BannerSection banners={banners} />
      <CountdownSection
        title="Bobby Stool"
        endDate="Jan 27, 2025 18:24:25"
        buttonText="get only $1000"
        buttonLink="/store"
        backgroundImage="/furnitor/images/bg-countdown.jpg"
      />
      <ClientLogos logos={clientLogos} />
      <ProductGrid
        title={
          <>
            Najpredávanejšie <span className="osmo-brand-text">OSMO</span> produkty
          </>
        }
        products={osmoProductGridItems}
        showButton={false}
      />
      <RoomInspiration
        title="Zrubko – Drevo pre Váš projekt"
        description="Pozrite si realizácie, kde kvalitné drevo a remeselná práca vytvárajú jedinečnú atmosféru. Inšpirujte sa štýlom, ktorý obstojí v čase."
        image="https://console-production-e2699.up.railway.app/api/v1/buckets/medusa-media/objects/download?preview=true&prefix=homepage_products%2FNa-vrchy-print-size-46.jpg&version_id=null"
        buttonText="Inšpirovať sa"
        buttonLink="/store"
      />
    </main>
  )
}

