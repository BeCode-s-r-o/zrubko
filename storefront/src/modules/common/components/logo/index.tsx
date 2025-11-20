'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LOGO_URL, LOGO_URL_HOVER } from '@lib/constants'

interface LogoProps {
  width?: number
  height?: number
  className?: string
  alt?: string
}

export default function Logo({ 
  width = 150, 
  height = 50, 
  className = '',
  alt = 'Logo'
}: LogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link 
      href="/" 
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'inline-block', textDecoration: 'none' }}
    >
      <div 
        className="position-relative d-inline-block" 
        style={{ 
          width, 
          height,
          overflow: 'hidden'
        }}
      >
        <Image
          src={LOGO_URL}
          alt={alt}
          width={width}
          height={height}
          className="logo-default"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: isHovered ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            pointerEvents: 'none',
          }}
        />
        <Image
          src={LOGO_URL_HOVER}
          alt={alt}
          width={width}
          height={height}
          className="logo-hover"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            pointerEvents: 'none',
          }}
        />
      </div>
    </Link>
  )
}

