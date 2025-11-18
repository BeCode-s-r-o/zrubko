import LocalizedClientLink from '@/modules/common/components/localized-client-link'

interface BlogPostNavigationProps {
  previousPost: {
    title: string
    slug: string
  } | null
  nextPost: {
    title: string
    slug: string
  } | null
  countryCode: string
  translations: any
}

export function BlogPostNavigation({
  previousPost,
  nextPost,
  countryCode,
  translations
}: BlogPostNavigationProps) {
  if (!previousPost && !nextPost) {
    return null
  }

  return (
    <nav className="mt-16 pt-8 border-t border-gray-200">
      <div className="flex justify-between items-center gap-2 max-w-4xl mx-auto">
        {/* Previous Post Button */}
        <div className="flex-1">
          {previousPost ? (
            <LocalizedClientLink
              href={`/blog/${previousPost.slug}`}
              className="group flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg active:scale-95"
            >
              <div className="flex-shrink-0">
                <svg
                  className="w-4 h-4 text-white/80 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-white/70 mb-0.5">
                  {translations?.previousPost || 'Predchádzajúci článok'}
                </p>
                <p className="text-sm font-medium text-white group-hover:text-white transition-colors line-clamp-2">
                  {previousPost.title}
                </p>
              </div>
            </LocalizedClientLink>
          ) : (
            <div className="px-4 py-2 opacity-50">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">
                    {translations?.previousPost || 'Predchádzajúci článok'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {translations?.noPreviousPost || 'Žiadny predchádzajúci článok'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Next Post Button */}
        <div className="flex-1">
          {nextPost ? (
            <LocalizedClientLink
              href={`/blog/${nextPost.slug}`}
              className="group flex items-center justify-end gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg active:scale-95"
            >
              <div className="text-right">
                <p className="text-xs text-white/70 mb-0.5">
                  {translations?.nextPost || 'Nasledujúci článok'}
                </p>
                <p className="text-sm font-medium text-white group-hover:text-white transition-colors line-clamp-2">
                  {nextPost.title}
                </p>
              </div>
              <div className="flex-shrink-0">
                <svg
                  className="w-4 h-4 text-white/80 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </LocalizedClientLink>
          ) : (
            <div className="px-4 py-2 opacity-50">
              <div className="flex items-center justify-end gap-2">
                <div>
                  <p className="text-xs text-gray-400">
                    {translations?.nextPost || 'Nasledujúci článok'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {translations?.noNextPost || 'Žiadny nasledujúci článok'}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
