import { marked } from 'marked'

// Configure marked with better defaults for blog content
marked.setOptions({
  breaks: true, // Convert line breaks to <br>
  gfm: true, // Enable GitHub Flavored Markdown
  headerIds: true, // Add IDs to headers for anchor links
  mangle: false, // Don't mangle email addresses
})

/**
 * Converts markdown string to HTML optimized for Tailwind Typography
 * @param markdown - The markdown string to convert
 * @returns HTML string
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown || typeof markdown !== 'string') return ''

  try {
    // Parse markdown to HTML
    const html = marked(markdown)

    // Clean up any potential issues with the HTML
    return html.trim()
  } catch (error) {
    console.error('Error converting markdown to HTML:', error)
    return markdown // Return original markdown if conversion fails
  }
}

/**
 * Safely renders markdown content as HTML for dangerouslySetInnerHTML
 * @param markdown - The markdown string to convert and render
 * @returns Object with __html property for dangerouslySetInnerHTML
 */
export function renderMarkdown(markdown: string) {
  return {
    __html: markdownToHtml(markdown)
  }
}
