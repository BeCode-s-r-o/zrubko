export interface CategoryButton {
  text: string
  url: string
  style: 'primary' | 'secondary'
}

export interface CategoryData {
  id: string
  name: string
  slug: string
  description?: string
  banner_image?: string
  banner_title?: string
  banner_subtitle?: string
  custom_buttons?: CategoryButton[]
  gallery_images?: string[]
  is_featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

// In-memory storage for categories
let categoriesStore: CategoryData[] = [
  {
    id: 'cat_01',
    name: 'SHOU SUGI BAN',
    slug: 'shou-sugi-ban',
    description: 'Tradičná japonská technika spracovania dreva. Kvalitné drevené materiály pre stavbu, obklady a interiér.',
    banner_image: '/images/shou-sugi-ban-banner.jpg',
    banner_title: 'SHOU SUGI BAN',
    banner_subtitle: 'Tradičná japonská technika spracovania dreva',
    custom_buttons: [
      {
        text: 'Viac o technike',
        url: '/technika',
        style: 'primary'
      },
      {
        text: 'Chat',
        url: '/chat',
        style: 'secondary'
      }
    ],
    gallery_images: [
      '/images/shou-sugi-ban-1.jpg',
      '/images/shou-sugi-ban-2.jpg',
      '/images/shou-sugi-ban-3.jpg'
    ],
    is_featured: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export default class CategoryService {
  constructor() {}

  async getAllCategories(filterBySlug?: string, featuredOnly?: boolean): Promise<{ categories: CategoryData[], count: number }> {
    let filteredCategories = [...categoriesStore]

    // Apply filters
    if (filterBySlug) {
      filteredCategories = filteredCategories.filter(cat => cat.slug === filterBySlug)
    }

    if (featuredOnly !== undefined) {
      filteredCategories = filteredCategories.filter(cat => cat.is_featured === featuredOnly)
    }

    // Sort by sort_order
    filteredCategories.sort((a, b) => a.sort_order - b.sort_order)

    return {
      categories: filteredCategories,
      count: filteredCategories.length
    }
  }

  async getCategoryBySlug(slug: string): Promise<CategoryData | null> {
    return categoriesStore.find(cat => cat.slug === slug) || null
  }

  async getCategoryById(id: string): Promise<CategoryData | null> {
    return categoriesStore.find(cat => cat.id === id) || null
  }

  async createCategory(data: Omit<CategoryData, 'id' | 'created_at' | 'updated_at'>): Promise<CategoryData> {
    const now = new Date().toISOString()
    const newCategory: CategoryData = {
      id: this.generateId(),
      ...data,
      slug: data.slug || this.generateSlug(data.name),
      created_at: now,
      updated_at: now
    }

    // Check for duplicate slug
    const existingCategory = await this.getCategoryBySlug(newCategory.slug)
    if (existingCategory) {
      throw new Error(`Category with slug "${newCategory.slug}" already exists`)
    }

    categoriesStore.push(newCategory)
    return newCategory
  }

  async updateCategory(id: string, partialData: Partial<Omit<CategoryData, 'id' | 'created_at'>>): Promise<CategoryData | null> {
    const categoryIndex = categoriesStore.findIndex(cat => cat.id === id)
    if (categoryIndex === -1) return null

    // Check for duplicate slug if updating slug
    if (partialData.slug) {
      const existingCategory = await this.getCategoryBySlug(partialData.slug)
      if (existingCategory && existingCategory.id !== id) {
        throw new Error(`Category with slug "${partialData.slug}" already exists`)
      }
    }

    const updatedCategory = {
      ...categoriesStore[categoryIndex],
      ...partialData,
      updated_at: new Date().toISOString()
    }

    categoriesStore[categoryIndex] = updatedCategory
    return updatedCategory
  }

  async deleteCategory(id: string): Promise<CategoryData | null> {
    const categoryIndex = categoriesStore.findIndex(cat => cat.id === id)
    if (categoryIndex === -1) return null

    const deletedCategory = categoriesStore.splice(categoryIndex, 1)[0]
    return deletedCategory
  }

  async reorderCategories(categoryIds: string[]): Promise<CategoryData[]> {
    const reorderedCategories: CategoryData[] = []
    
    categoryIds.forEach((id, index) => {
      const category = categoriesStore.find(cat => cat.id === id)
      if (category) {
        category.sort_order = index + 1
        category.updated_at = new Date().toISOString()
        reorderedCategories.push(category)
      }
    })

    return reorderedCategories
  }

  async getFeaturedCategories(): Promise<CategoryData[]> {
    const { categories } = await this.getAllCategories(undefined, true)
    return categories
  }

  private generateId(): string {
    return `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[áäâàã]/g, 'a')
      .replace(/[éêëè]/g, 'e')
      .replace(/[íîïì]/g, 'i')
      .replace(/[óôöòõ]/g, 'o')
      .replace(/[úûüù]/g, 'u')
      .replace(/[ý]/g, 'y')
      .replace(/[ñ]/g, 'n')
      .replace(/[ç]/g, 'c')
      .replace(/[ľĺ]/g, 'l')
      .replace(/[š]/g, 's')
      .replace(/[č]/g, 'c')
      .replace(/[ť]/g, 't')
      .replace(/[ž]/g, 'z')
      .replace(/[ň]/g, 'n')
      .replace(/[ď]/g, 'd')
      .replace(/[ŕ]/g, 'r')
      .replace(/[ô]/g, 'o')
      .replace(/[ä]/g, 'a')
      .replace(/[ú]/g, 'u')
      .replace(/[ý]/g, 'y')
      .replace(/[í]/g, 'i')
      .replace(/[é]/g, 'e')
      .replace(/[ô]/g, 'o')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  validateCategoryData(data: Partial<CategoryData>): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!data.name || data.name.trim().length === 0) {
      errors.push('Názov kategórie je povinný')
    }

    if (data.name && data.name.length > 255) {
      errors.push('Názov kategórie môže mať maximálne 255 znakov')
    }

    if (data.custom_buttons) {
      data.custom_buttons.forEach((button, index) => {
        if (!button.text || button.text.trim().length === 0) {
          errors.push(`Button ${index + 1}: Text je povinný`)
        }
        if (!button.url || button.url.trim().length === 0) {
          errors.push(`Button ${index + 1}: URL je povinné`)
        }
        if (button.url && !this.isValidUrl(button.url)) {
          errors.push(`Button ${index + 1}: Neplatný URL`)
        }
      })
    }

    if (data.banner_image && !this.isValidUrl(data.banner_image)) {
      errors.push('Neplatný URL pre banner obrázok')
    }

    if (data.gallery_images) {
      data.gallery_images.forEach((imageUrl, index) => {
        if (!this.isValidUrl(imageUrl)) {
          errors.push(`Galéria obrázok ${index + 1}: Neplatný URL`)
        }
      })
    }

    return {
      valid: errors.length === 0,
      errors
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      // Check for relative URLs
      return url.startsWith('/') || url.startsWith('./') || url.startsWith('../')
    }
  }

  getStatistics() {
    const totalCategories = categoriesStore.length
    const featuredCategories = categoriesStore.filter(cat => cat.is_featured).length
    const categoriesWithBanners = categoriesStore.filter(cat => cat.banner_image).length
    const categoriesWithButtons = categoriesStore.filter(cat => 
      cat.custom_buttons && cat.custom_buttons.length > 0
    ).length

    return {
      total: totalCategories,
      featured: featuredCategories,
      withBanners: categoriesWithBanners,
      withButtons: categoriesWithButtons,
      averageButtonsPerCategory: totalCategories > 0 
        ? categoriesStore.reduce((sum, cat) => sum + (cat.custom_buttons?.length || 0), 0) / totalCategories 
        : 0
    }
  }
} 