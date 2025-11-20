# Furnitor Theme - Quick Start Checklist

## ✅ Step 1: Extract Furnitor Files
- [ ] Unzip your Furnitor theme package
- [ ] Copy CSS files to: `public/furnitor/css/`
- [ ] Copy JS files to: `public/furnitor/js/`
- [ ] Copy images to: `public/furnitor/images/`
- [ ] Copy fonts to: `public/furnitor/fonts/`

## ✅ Step 2: Add CSS to Your App

### Option A: Add to globals.css (Recommended)
Edit `src/styles/globals.css` and add after Tailwind imports:
```css
/* Furnitor CSS */
@import url('/furnitor/css/bootstrap.min.css');
@import url('/furnitor/css/furnitor-style.css');
```

### Option B: Add to layout.tsx
Edit `src/app/layout.tsx` and add in `<head>` section:
```tsx
<link rel="stylesheet" href="/furnitor/css/bootstrap.min.css" />
<link rel="stylesheet" href="/furnitor/css/furnitor-style.css" />
```

## ✅ Step 3: Add JavaScript Files
Edit `src/app/layout.tsx` and add before closing `</body>`:
```tsx
import Script from 'next/script'

// In the return statement:
<Script src="/furnitor/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
<Script src="/furnitor/js/furnitor-script.js" strategy="afterInteractive" />
```

## ✅ Step 4: Update Image References
When converting Furnitor HTML to React:
- Change image paths from `images/logo.png` to `/furnitor/images/logo.png`
- Use Next.js Image component: `<Image src="/furnitor/images/logo.png" ... />`

## ✅ Step 5: Convert Components
- [ ] Convert Furnitor header/nav to React (update `src/modules/layout/templates/nav/index.tsx`)
- [ ] Convert Furnitor footer to React (update `src/modules/layout/templates/footer/index.tsx`)
- [ ] Update home page layout (update `src/app/[countryCode]/(main)/page.tsx`)

## ⚠️ Important Notes

1. **Bootstrap vs Tailwind**: Your storefront uses Tailwind, Furnitor uses Bootstrap 4. You may need to:
   - Use CSS prefixes to avoid conflicts
   - Or convert Bootstrap classes to Tailwind equivalents

2. **HTML to JSX Conversion**:
   - `class` → `className`
   - `for` → `htmlFor`
   - Inline styles need to be objects: `style={{ color: 'red' }}`
   - Self-closing tags: `<img />` not `<img>`

3. **Keep E-commerce Features**:
   - Don't break cart functionality
   - Keep checkout flow working
   - Maintain account pages

## 📁 File Locations Reference

```
storefront/
├── public/furnitor/          ← Your Furnitor files go here
│   ├── css/
│   ├── js/
│   ├── images/
│   └── fonts/
├── src/
│   ├── app/
│   │   └── layout.tsx       ← Add CSS/JS imports
│   ├── styles/
│   │   └── globals.css      ← Or add CSS imports here
│   └── modules/
│       └── layout/          ← Update Nav/Footer here
└── tailwind.config.js       ← Add Furnitor colors/fonts
```

## 🚀 Testing Checklist

After integration:
- [ ] Test homepage loads correctly
- [ ] Test navigation works
- [ ] Test cart functionality
- [ ] Test checkout process
- [ ] Test on mobile devices
- [ ] Test on desktop
- [ ] Verify all images load
- [ ] Check console for JavaScript errors

## 📚 Need More Help?

See `FURNITOR_INTEGRATION_GUIDE.md` for detailed instructions.

