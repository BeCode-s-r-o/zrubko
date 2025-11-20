# Furnitor Header & Footer Variants Guide

## Available Variants

### Headers (11 variants)
- `header-default` (default)
- `header-01`
- `header-02`
- `header-03`
- `header-04`
- `header-05`
- `header-06`
- `header-07`
- `header-08`
- `header-09`
- `header-10`
- `header-default-light`

### Footers (9 variants)
- `footer-default` (default)
- `footer-01`
- `footer-02`
- `footer-03`
- `footer-04`
- `footer-05`
- `footer-06`
- `footer-07`
- `footer-08`

## File Locations

### Source Files (Jekyll templates)
- **Headers**: `furnitor/site/_includes/header/`
- **Footers**: `furnitor/site/_includes/footer/`

### Compiled Examples (for reference)
- **Headers**: `furnitor/dist/docs/templates/headers/`
- **Footers**: `furnitor/dist/docs/templates/footers/`

## How to Use in Next.js/React

Since Furnitor uses Jekyll templates and you're using Next.js, you need to:

1. **Convert Jekyll syntax to React/JSX**
2. **Create React components for each variant**
3. **Create a system to switch between variants**

## Step-by-Step Implementation

### Step 1: Create Header Components Directory

Create a directory structure:
```
storefront/src/modules/layout/templates/headers/
  ├── HeaderDefault.tsx
  ├── Header01.tsx
  ├── Header02.tsx
  ├── Header03.tsx
  ├── ... (all variants)
  └── index.tsx (export all)
```

### Step 2: Convert Jekyll to React

**Jekyll syntax to convert:**
- `{% include navbar-main-left.html %}` → Import and use React component
- `{{ '/images/logo.png' | document_url }}` → `/furnitor/images/logo.png`
- `{{site.title}}` → Your site title or prop
- `class` → `className`
- `data-*` attributes → Keep as is (Bootstrap 4 uses them)

**Example conversion:**

**Jekyll (header-01.html):**
```html
<header class="main-header navbar-light header-sticky">
  <div class="container container-xxl">
    <nav class="navbar navbar-expand-xl">
      <a class="navbar-brand" href="{{ '/index.html' | document_url }}">
        <img src="{{ '/images/logo.png' | document_url }}" alt="{{site.title}}">
      </a>
    </nav>
  </div>
</header>
```

**React/JSX (Header01.tsx):**
```tsx
import Link from 'next/link'
import Image from 'next/image'

export default function Header01() {
  return (
    <header className="main-header navbar-light header-sticky">
      <div className="container container-xxl">
        <nav className="navbar navbar-expand-xl">
          <Link href="/" className="navbar-brand">
            <Image 
              src="/furnitor/images/logo.png" 
              alt="Your Site Title"
              width={150}
              height={50}
            />
          </Link>
        </nav>
      </div>
    </header>
  )
}
```

### Step 3: Create Variant Switcher

Create a component that switches between variants:

```tsx
// src/modules/layout/templates/nav/index.tsx
import Header01 from './headers/Header01'
import Header02 from './headers/Header02'
import Header03 from './headers/Header03'
// ... import all variants

type HeaderVariant = 
  | 'default' 
  | '01' | '02' | '03' | '04' | '05' 
  | '06' | '07' | '08' | '09' | '10' 
  | 'default-light'

interface NavProps {
  variant?: HeaderVariant
}

export default function Nav({ variant = '01' }: NavProps) {
  const headers = {
    'default': HeaderDefault,
    '01': Header01,
    '02': Header02,
    '03': Header03,
    '04': Header04,
    '05': Header05,
    '06': Header06,
    '07': Header07,
    '08': Header08,
    '09': Header09,
    '10': Header10,
    'default-light': HeaderDefaultLight,
  }

  const HeaderComponent = headers[variant] || Header01

  return <HeaderComponent />
}
```

### Step 4: Use in Layout

Update your layout to use the variant:

```tsx
// src/app/[countryCode]/(main)/layout.tsx
import Nav from "@modules/layout/templates/nav"

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Nav variant="01" /> {/* Change variant here */}
      {props.children}
      <Footer variant="01" /> {/* Change footer variant */}
    </>
  )
}
```

### Step 5: Environment-Based Variants

You can also make it configurable via environment variables:

```tsx
// src/modules/layout/templates/nav/index.tsx
const headerVariant = (process.env.NEXT_PUBLIC_HEADER_VARIANT || '01') as HeaderVariant

export default function Nav() {
  // ... use headerVariant
}
```

## Quick Reference: Converting Jekyll to React

| Jekyll | React/Next.js |
|--------|---------------|
| `{% include component.html %}` | `<Component />` (import and use) |
| `{{ '/path' \| document_url }}` | `/furnitor/path` |
| `{{site.title}}` | `"Your Site Title"` or prop |
| `class="..."` | `className="..."` |
| `<a href="...">` | `<Link href="...">` (from next/link) |
| `<img src="...">` | `<Image src="..." />` (from next/image) |
| `data-*` attributes | Keep as is |

## Common Jekyll Includes to Convert

Check these files in `furnitor/site/_includes/`:
- `navbar-main.html` → Create `NavbarMain.tsx`
- `navbar-main-left.html` → Create `NavbarMainLeft.tsx`
- `navbar-main-right.html` → Create `NavbarMainRight.tsx`
- `navbar-right.html` → Create `NavbarRight.tsx`
- `search-popup.html` → Create `SearchPopup.tsx`
- `cart-canvas.html` → Create `CartCanvas.tsx`

## Example: Full Header-01 Conversion

Here's a more complete example structure:

```tsx
// src/modules/layout/templates/headers/Header01.tsx
'use client' // If using client-side features

import Link from 'next/link'
import Image from 'next/image'
import NavbarMainLeft from '../components/navbar-main-left'
import NavbarMainRight from '../components/navbar-main-right'
import NavbarRight from '../components/navbar-right'
import SearchPopup from '../components/search-popup'

export default function Header01() {
  return (
    <header className="main-header navbar-light header-sticky header-sticky-smart position-absolute fixed-top">
      <div className="sticky-area">
        <div className="container container-xxl">
          <nav className="navbar navbar-expand-xl px-0 py-2 py-xl-0 d-block">
            {/* Desktop */}
            <div className="d-none d-xl-block">
              <div className="row align-items-center">
                <div className="col-2">
                  <div className="position-relative">
                    <a 
                      href="#search-popup" 
                      data-gtf-mfp="true"
                      data-mfp-options='{"type":"inline","focus": "#keyword","mainClass": "mfp-search-form mfp-move-from-top mfp-align-top"}'
                      className="nav-search d-flex align-items-center"
                    >
                      <i className="far fa-search"></i>
                      <span className="d-none d-xl-inline-block ml-2 font-weight-500">Search</span>
                    </a>
                  </div>
                </div>
                <div className="col-xl-8 mx-auto position-static">
                  <div className="d-flex mt-3 mt-xl-0 align-items-center w-100 justify-content-center">
                    <NavbarMainLeft />
                    <Link href="/" className="navbar-brand mx-8 mr-0 d-inline-block py-0">
                      <Image 
                        src="/furnitor/images/logo.png" 
                        alt="Your Site"
                        width={150}
                        height={50}
                      />
                    </Link>
                    <NavbarMainRight />
                  </div>
                </div>
                <div className="col-2">
                  <NavbarRight />
                </div>
              </div>
            </div>
            
            {/* Mobile */}
            <div className="d-flex align-items-center d-xl-none">
              {/* Mobile menu toggle */}
              <button 
                className="navbar-toggler border-0 px-0 canvas-toggle" 
                type="button"
                data-canvas="true"
                data-canvas-options='{"width":"250px","container":".sidenav"}'
              >
                <span className="fs-24 toggle-icon"></span>
              </button>
              <div className="mx-auto">
                <Link href="/" className="navbar-brand d-inline-block mr-0">
                  <Image 
                    src="/furnitor/images/logo.png" 
                    alt="Your Site"
                    width={120}
                    height={40}
                  />
                </Link>
              </div>
              <a 
                href="#search-popup" 
                data-gtf-mfp="true"
                className="nav-search d-flex align-items-center"
              >
                <i className="far fa-search"></i>
              </a>
            </div>
          </nav>
        </div>
      </div>
      <SearchPopup />
    </header>
  )
}
```

## Next Steps

1. **Start with one variant** (e.g., Header-01)
2. **Convert it to React** following the examples above
3. **Test it works** with Bootstrap 4 and Furnitor JS
4. **Create other variants** as needed
5. **Create the switcher** to easily change variants

## Tips

- ✅ Keep Bootstrap 4 classes as-is
- ✅ Preserve `data-*` attributes (needed for JS plugins)
- ✅ Use Next.js `Link` and `Image` components
- ✅ Convert Jekyll includes to React components
- ✅ Test each variant individually before creating the switcher

## Reference Files

- **Source templates**: `furnitor/site/_includes/header/` and `footer/`
- **Compiled examples**: `furnitor/dist/docs/templates/headers/` and `footers/`
- **Current Nav component**: `src/modules/layout/templates/nav/index.tsx`
- **Current Footer component**: `src/modules/layout/templates/footer/index.tsx`

