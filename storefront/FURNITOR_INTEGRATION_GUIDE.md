# Furnitor Theme Integration Guide

## Overview
This guide explains how to integrate the Furnitor HTML theme into your Next.js storefront.

## Directory Structure for Furnitor Files

### 1. Static Assets (Images, Fonts, etc.)
Place all static assets from Furnitor in:
```
storefront/public/furnitor/
  ├── images/
  ├── fonts/
  ├── js/
  └── css/ (if you want to keep original CSS files)
```

### 2. CSS Files
Furnitor uses Bootstrap 4 and custom CSS. You have two options:

**Option A: Use Furnitor CSS alongside Tailwind**
- Copy CSS files to: `storefront/public/furnitor/css/`
- Import in `src/app/layout.tsx` or create a separate CSS file

**Option B: Convert to Tailwind (Recommended)**
- Extract design tokens (colors, spacing, typography) from Furnitor
- Add them to `tailwind.config.js`
- Rebuild components using Tailwind classes

### 3. JavaScript Files
Place Furnitor's JavaScript files in:
```
storefront/public/furnitor/js/
```

Then import them in your layout or specific pages.

## Step-by-Step Integration

### Step 1: Extract Furnitor Files
1. Unzip your Furnitor theme
2. Locate the `dist` folder (or `assets` folder) in the Furnitor package
3. Copy the following:
   - All images → `storefront/public/furnitor/images/`
   - All fonts → `storefront/public/furnitor/fonts/`
   - CSS files → `storefront/public/furnitor/css/`
   - JS files → `storefront/public/furnitor/js/`

### Step 2: Add CSS to Your Application

#### Option A: Import Furnitor CSS directly
Edit `storefront/src/styles/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import Furnitor CSS */
@import url('/furnitor/css/bootstrap.min.css');
@import url('/furnitor/css/furnitor-style.css');
/* Add other Furnitor CSS files as needed */
```

#### Option B: Add to layout.tsx
Edit `storefront/src/app/layout.tsx` and add in the `<head>`:
```tsx
<link rel="stylesheet" href="/furnitor/css/bootstrap.min.css" />
<link rel="stylesheet" href="/furnitor/css/furnitor-style.css" />
```

### Step 3: Add JavaScript Files
Edit `storefront/src/app/layout.tsx` and add before closing `</body>`:
```tsx
<script src="/furnitor/js/bootstrap.bundle.min.js"></script>
<script src="/furnitor/js/furnitor-script.js"></script>
```

Or use Next.js Script component:
```tsx
import Script from 'next/script'

// In your component:
<Script src="/furnitor/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
<Script src="/furnitor/js/furnitor-script.js" strategy="afterInteractive" />
```

### Step 4: Convert HTML Components to React
Since Furnitor is HTML and your storefront is React/Next.js, you'll need to:

1. **Convert HTML to JSX:**
   - Change `class` to `className`
   - Change inline styles to objects or Tailwind classes
   - Convert self-closing tags properly

2. **Update Navigation:**
   - Replace Furnitor's navigation with your existing Nav component
   - Or modify `src/modules/layout/templates/nav/index.tsx` to match Furnitor's design

3. **Update Footer:**
   - Replace Furnitor's footer with your existing Footer component
   - Or modify `src/modules/layout/templates/footer/index.tsx` to match Furnitor's design

### Step 5: Integrate Design Tokens
Extract colors, fonts, and spacing from Furnitor and add to `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add Furnitor colors here
        furnitor: {
          primary: '#your-color',
          secondary: '#your-color',
        }
      },
      fontFamily: {
        // Add Furnitor fonts here
        furnitor: ['FontName', 'sans-serif'],
      }
    }
  }
}
```

## Important Notes

1. **Bootstrap vs Tailwind Conflict:**
   - Furnitor uses Bootstrap 4, your storefront uses Tailwind
   - You may need to use CSS prefixes or isolate Bootstrap styles
   - Consider using `@layer` in Tailwind to override Bootstrap styles

2. **Component Conversion:**
   - Furnitor components are static HTML
   - You'll need to convert them to React components
   - Keep Medusa.js functionality (cart, checkout, etc.) intact

3. **Responsive Design:**
   - Furnitor has its own responsive breakpoints
   - Tailwind uses different breakpoints
   - You may need to adjust or create custom breakpoints

## Recommended Approach

1. **Start Small:**
   - First, integrate Furnitor's CSS and JS
   - Test that nothing breaks

2. **Component by Component:**
   - Convert Furnitor's header/nav to React
   - Convert Furnitor's footer to React
   - Then work on page layouts

3. **Maintain Functionality:**
   - Keep all Medusa.js e-commerce features working
   - Don't break existing cart, checkout, or account pages

4. **Testing:**
   - Test on mobile and desktop
   - Ensure all links work
   - Verify cart and checkout flows

## File Locations Summary

```
storefront/
├── public/
│   └── furnitor/          ← Place Furnitor static assets here
│       ├── css/
│       ├── js/
│       ├── images/
│       └── fonts/
├── src/
│   ├── app/
│   │   └── layout.tsx     ← Add CSS/JS imports here
│   ├── styles/
│   │   └── globals.css    ← Or import CSS here
│   └── modules/
│       └── layout/        ← Update Nav/Footer components here
└── tailwind.config.js     ← Add Furnitor design tokens here
```

## Next Steps

1. Extract and place Furnitor files in the directories above
2. Import CSS and JS files
3. Start converting HTML components to React
4. Test thoroughly before deploying

