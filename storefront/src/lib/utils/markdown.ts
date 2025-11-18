import { marked } from 'marked'

// Configure marked for basic HTML output
marked.setOptions({
  breaks: true, // Convert line breaks to <br>
  gfm: true, // Enable GitHub Flavored Markdown
})

// Markdown to HTML converter
export async function markdownToHtml(markdown: string): Promise<string> {
  if (typeof markdown !== 'string') {
    return String(markdown || '')
  }

  if (!markdown.trim()) {
    return ''
  }

  try {
    return await marked(markdown)
  } catch (error) {
    console.error('Error converting markdown:', error)
    return String(markdown || '')
  }
}

// Simple markdown to plain text converter for excerpts in cards
export function markdownToPlainText(markdown: string): string {
  if (typeof markdown !== 'string') {
    return String(markdown || '')
  }

  if (!markdown.trim()) {
    return ''
  }

  try {
    return markdown
      .replace(/^#+\s*/gm, '') // Remove headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to just text
      .replace(/^- /gm, '') // Remove bullet points
      .replace(/\n\n+/g, ' ') // Replace multiple line breaks with space
      .replace(/\n/g, ' ') // Replace single line breaks with space
      .trim()
  } catch (error) {
    console.error('Error converting markdown to plain text:', error)
    return String(markdown || '')
  }
}

