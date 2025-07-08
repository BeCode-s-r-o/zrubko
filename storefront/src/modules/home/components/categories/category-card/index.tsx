import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CategoryCard({
  category,
}: {
  category: any
}) {
  // Use category image if available, otherwise fallback to default
  const imageUrl = category.image || "https://cdn.sellio.net/vendors/phpThumb/phpThumb.php?w=350&h=240&far=0&src=/uploads/96/categories/_kg12836.jpg"

  return (
    <div className="overflow-hidden relative bg-white rounded-lg border border-gray-200 transition-all duration-300 group hover:border-gray-300 hover:shadow-lg">
      <LocalizedClientLink href={`/categories/${category.handle}`}>
        <div className="aspect-[4/3] relative overflow-hidden">
          {/* Category image */}
          <img 
            src={imageUrl}
            alt={category.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay effect on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-20" />
        </div>
        
        <div className="p-4">
          <div className="mb-2">
            <Text className="transition-colors duration-200 text-large-semi group-hover:text-amber-600">
              {category.name}
            </Text>
          </div>
          
          {category.description && (
            <Text className="text-sm text-gray-600 line-clamp-2">
              {category.description}
            </Text>
          )}
          
          {category.category_children && category.category_children.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {category.category_children.slice(0, 3).map((child: any) => (
                <span 
                  key={child.id}
                  className="inline-block px-2 py-1 text-xs text-amber-700 bg-amber-50 rounded-full"
                >
                  {child.name}
                </span>
              ))}
              {category.category_children.length > 3 && (
                <span className="inline-block px-2 py-1 text-xs text-gray-600 bg-gray-50 rounded-full">
                  +{category.category_children.length - 3} viac
                </span>
              )}
            </div>
          )}
        </div>
      </LocalizedClientLink>
    </div>
  )
} 