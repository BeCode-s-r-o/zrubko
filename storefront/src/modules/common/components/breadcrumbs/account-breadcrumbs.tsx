"use client"

import Link from "next/link"

interface AccountBreadcrumbsProps {
  currentPage: string
  className?: string
}

const AccountBreadcrumbs: React.FC<AccountBreadcrumbsProps> = ({ 
  currentPage,
  className = "" 
}) => {
  return (
    <nav className={`flex items-center py-4 space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      {/* Domov */}
      <Link 
        href="/"
        className="transition-colors text-gray-500 hover:text-[#1a2e1a] text-sm"
      >
        Domov
      </Link>

      {/* Separator */}
      <span className="text-gray-400">/</span>

      {/* Account */}
      <Link 
        href="/account"
        className="transition-colors text-gray-500 hover:text-[#1a2e1a] text-sm"
      >
        Účet
      </Link>

      {/* Current page */}
      {currentPage !== "Účet" && (
        <>
          <span className="text-gray-400">/</span>
          <span className="font-medium text-[#1a2e1a] text-sm">
            {currentPage}
          </span>
        </>
      )}
    </nav>
  )
}

export default AccountBreadcrumbs 