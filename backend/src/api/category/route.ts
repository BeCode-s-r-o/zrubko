import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import CategoryService, { CategoryData } from "../../services/category"

interface CreateCategoryRequest {
  name: string
  slug?: string
  description?: string
  banner_image?: string
  banner_title?: string
  banner_subtitle?: string
  custom_buttons?: Array<{
    text: string
    url: string
    style: 'primary' | 'secondary'
  }>
  gallery_images?: string[]
  is_featured?: boolean
  sort_order?: number
}

interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {}

// GET - Get all categories or filter by slug/featured
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const categoryService = new CategoryService()
    const { slug, featured } = req.query

    const featuredBool = featured === 'true' ? true : featured === 'false' ? false : undefined

    const result = await categoryService.getAllCategories(
      slug as string,
      featuredBool
    )

    res.json({
      success: true,
      ...result
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

// POST - Create new category
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const categoryService = new CategoryService()
    const categoryData = req.body as CreateCategoryRequest

    // Validate required fields
    if (!categoryData.name) {
      res.status(400).json({
        success: false,
        error: 'Name is required'
      })
      return
    }

    // Validate data
    const validation = categoryService.validateCategoryData(categoryData)
    if (!validation.valid) {
      res.status(400).json({
        success: false,
        error: 'Validation failed',
        errors: validation.errors
      })
      return
    }

    // Set defaults and ensure slug is present
    const categoryWithDefaults = {
      ...categoryData,
      slug: categoryData.slug || new CategoryService().generateSlug(categoryData.name),
      is_featured: categoryData.is_featured || false,
      sort_order: categoryData.sort_order || 0,
      custom_buttons: categoryData.custom_buttons || [],
      gallery_images: categoryData.gallery_images || []
    }

    const newCategory = await categoryService.createCategory(categoryWithDefaults)

    res.status(201).json({
      success: true,
      category: newCategory,
      message: 'Category created successfully'
    })
  } catch (error) {
    console.error('Error creating category:', error)
    
    if (error instanceof Error && error.message.includes('already exists')) {
      res.status(409).json({
        success: false,
        error: error.message
      })
      return
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create category',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

// PUT - Update category
export async function PUT(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const categoryService = new CategoryService()
    const { id } = req.query
    const updateData = req.body as UpdateCategoryRequest

    if (!id) {
      res.status(400).json({
        success: false,
        error: 'Category ID is required'
      })
      return
    }

    // Check if category exists
    const existingCategory = await categoryService.getCategoryById(id as string)
    if (!existingCategory) {
      res.status(404).json({
        success: false,
        error: 'Category not found'
      })
      return
    }

    // Validate data if provided
    if (Object.keys(updateData).length > 0) {
      const validation = categoryService.validateCategoryData(updateData)
      if (!validation.valid) {
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          errors: validation.errors
        })
        return
      }
    }

    const updatedCategory = await categoryService.updateCategory(id as string, updateData)

    res.json({
      success: true,
      category: updatedCategory,
      message: 'Category updated successfully'
    })
  } catch (error) {
    console.error('Error updating category:', error)
    
    if (error instanceof Error && error.message.includes('already exists')) {
      res.status(409).json({
        success: false,
        error: error.message
      })
      return
    }

    res.status(500).json({
      success: false,
      error: 'Failed to update category',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

// DELETE - Delete category
export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse
) {
  try {
    const categoryService = new CategoryService()
    const { id } = req.query

    if (!id) {
      res.status(400).json({
        success: false,
        error: 'Category ID is required'
      })
      return
    }

    const deletedCategory = await categoryService.deleteCategory(id as string)

    if (!deletedCategory) {
      res.status(404).json({
        success: false,
        error: 'Category not found'
      })
      return
    }

    res.json({
      success: true,
      category: deletedCategory,
      message: 'Category deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting category:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to delete category',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 