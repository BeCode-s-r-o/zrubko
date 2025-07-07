import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface LegalPageTemplateProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  lastUpdated?: string
  backLink?: {
    href: string
    text: string
  }
}

const LegalPageTemplate = ({ 
  title, 
  subtitle, 
  children, 
  lastUpdated,
  backLink = { href: "/", text: "Späť na domovskú stránku" }
}: LegalPageTemplateProps) => {
  return (
    <div className="min-h-screen bg-stone-25">
      {/* Header with breadcrumb */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <Link 
            href={backLink.href}
            className="inline-flex items-center text-stone-600 hover:text-amber-600 transition-colors duration-200 text-sm font-medium"
          >
            <ArrowLeft size={16} className="mr-2" />
            {backLink.text}
          </Link>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-3xl mx-auto py-16 px-4">
        {/* Page header */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          {lastUpdated && (
            <p className="text-sm text-stone-500 mt-6 font-medium">
              Posledná aktualizácia: {lastUpdated}
            </p>
          )}
        </header>

        {/* Content area */}
        <div className="prose prose-stone max-w-none">
          <div className="space-y-8 text-stone-800">
            {children}
          </div>
        </div>

        {/* Footer with back link */}
        <footer className="mt-16 pt-12 border-t border-stone-200">
          <div className="text-center">
            <Link 
              href={backLink.href}
              className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <ArrowLeft size={18} className="mr-2" />
              {backLink.text}
            </Link>
          </div>
        </footer>
      </main>
    </div>
  )
}

// Helper components for consistent styling
export const LegalSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-xl font-bold text-stone-800 mb-4 leading-tight">
      {title}
    </h2>
    <div className="space-y-4">
      {children}
    </div>
  </section>
)

export const LegalParagraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base leading-7 text-stone-700">
    {children}
  </p>
)

export const LegalList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 text-base leading-7 text-stone-700 ml-6">
    {items.map((item, index) => (
      <li key={index} className="list-disc">
        {item}
      </li>
    ))}
  </ul>
)

export const LegalSubsection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="ml-4 border-l-2 border-amber-200 pl-6 py-2">
    <h3 className="text-lg font-semibold text-stone-800 mb-3">
      {title}
    </h3>
    <div className="space-y-3">
      {children}
    </div>
  </div>
)

export default LegalPageTemplate 