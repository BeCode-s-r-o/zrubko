'use client'

import HeroSlider from '../hero-slider'
import CategorySlider from '../category-slider'
import ProductGrid from '../product-grid'
import BannerSection from '../banner-section'
import CountdownSection from '../countdown-section'
import ClientLogos from '../client-logos'
import RoomInspiration from '../room-inspiration'

// Sample data - will be replaced with Medusa data later
const essentialProducts = [
  {
    id: '1',
    name: 'Bow Chair',
    category: 'Table',
    price: '$1390.00',
    image: '/furnitor/images/product-19.jpg',
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

const featuredProducts = [
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
    title: 'Osmo pre exteriér',
    subtitle: '',
    image: '/furnitor/images/c_01.jpg',
    link: '/store',
    buttonText: 'Kúpiť teraz',
    className: 'col-lg-8 mb-6 mb-lg-0'
  },
  {
    title: 'Osmo pre interiér',
    image: '/furnitor/images/c_16.jpg',
    link: '/store',
    buttonText: 'Kúpiť teraz',
    className: 'col-lg-4'
  }
]

const clientLogos = [
  { image: '/furnitor/images/client_logo_01.png', alt: 'Client Logo 01', link: '#' },
  { image: '/furnitor/images/client_logo_02.png', alt: 'Client Logo 02', link: '#' },
  { image: '/furnitor/images/client_logo_03.png', alt: 'Client Logo 03', link: '#' },
  { image: '/furnitor/images/client_logo_04.png', alt: 'Client Logo 04', link: '#' },
  { image: '/furnitor/images/client_logo_05.png', alt: 'Client Logo 05', link: '#' },
  { image: '/furnitor/images/client_logo_06.png', alt: 'Client Logo 06', link: '#' },
  { image: '/furnitor/images/client_logo_07.png', alt: 'Client Logo 07', link: '#' },
  { image: '/furnitor/images/client_logo_08.png', alt: 'Client Logo 08', link: '#' },
  { image: '/furnitor/images/client_logo_09.png', alt: 'Client Logo 09', link: '#' },
  { image: '/furnitor/images/client_logo_10.png', alt: 'Client Logo 10', link: '#' }
]

export default function Home10() {
  return (
    <main id="content">
      <HeroSlider />
      <CategorySlider />
      <ProductGrid 
        title="Odporúčané produkty"
        products={essentialProducts}
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
        title="Featured Items"
        products={featuredProducts}
        showButton={false}
      />
      <RoomInspiration
        title="Room Inspiration"
        description="We believe in crafting pieces where sustainability and style go hand in hand. Made from materials like recycled cashmere and sustainable."
        image="/furnitor/images/b-05.jpg"
        buttonText="our journal"
        buttonLink="/store"
      />
    </main>
  )
}

