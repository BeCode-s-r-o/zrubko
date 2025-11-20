# Bootstrap 4 Setup Guide - Furnitor Theme

## ✅ Setup Complete

The Furnitor theme with Bootstrap 4 has been successfully integrated into your Next.js storefront.

## What Was Done

### 1. Files Copied
All Furnitor assets have been copied from `furnitor/dist/` to `public/furnitor/`:
- ✅ CSS files → `public/furnitor/css/`
- ✅ JavaScript files → `public/furnitor/js/`
- ✅ Images → `public/furnitor/images/`
- ✅ Vendor libraries → `public/furnitor/vendors/`

### 2. Layout Updated
The `src/app/layout.tsx` has been updated to:
- ✅ Load Bootstrap 4 CSS (via Furnitor vendors)
- ✅ Load all Furnitor vendor CSS (FontAwesome, Slick, Magnific Popup, etc.)
- ✅ Load Furnitor theme CSS (`themes.css`)
- ✅ Load all required JavaScript libraries
- ✅ Load Furnitor theme JavaScript (`theme.js`)

### 3. Tailwind Disabled
The `src/styles/globals.css` has been updated to:
- ✅ Comment out Tailwind directives
- ✅ Keep custom utility classes that don't conflict

## File Structure

```
storefront/
├── public/
│   └── furnitor/              ← Furnitor assets
│       ├── css/
│       │   └── themes.css     ← Main theme CSS
│       ├── js/
│       │   └── theme.js       ← Main theme JS
│       ├── images/            ← All images
│       └── vendors/           ← Vendor libraries
│           ├── bootstrap/     ← Bootstrap 4
│           ├── fontawesome-pro-5/
│           ├── slick/
│           ├── magnific-popup/
│           └── ... (other vendors)
├── src/
│   ├── app/
│   │   └── layout.tsx         ← Updated with Bootstrap 4
│   └── styles/
│       └── globals.css        ← Tailwind disabled
```

## Using Bootstrap 4 Classes

Now you can use Bootstrap 4 classes throughout your React components:

```tsx
// Example: Bootstrap 4 button
<button className="btn btn-primary">Click me</button>

// Example: Bootstrap 4 grid
<div className="container">
  <div className="row">
    <div className="col-md-6">Column 1</div>
    <div className="col-md-6">Column 2</div>
  </div>
</div>

// Example: Bootstrap 4 navbar
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Brand</a>
  <button className="navbar-toggler" type="button">
    <span className="navbar-toggler-icon"></span>
  </button>
</nav>
```

## Converting Furnitor HTML to React

When converting Furnitor HTML templates to React components:

### 1. HTML to JSX Changes
- `class` → `className`
- `for` → `htmlFor`
- Inline styles: `style="color: red"` → `style={{ color: 'red' }}`
- Self-closing tags: `<img>` → `<img />`

### 2. Image Paths
- Change from: `images/logo.png`
- Change to: `/furnitor/images/logo.png`
- Or use Next.js Image: `<Image src="/furnitor/images/logo.png" ... />`

### 3. Bootstrap 4 Components
All Bootstrap 4 components are available:
- Buttons, Cards, Forms, Modals, Navbars, etc.
- Use Bootstrap 4 classes directly

## Available Furnitor Features

### CSS Classes
Furnitor includes custom CSS classes beyond Bootstrap 4. Check the HTML templates for examples:
- Custom header/footer styles
- Product grid layouts
- Shop page layouts
- Blog layouts

### JavaScript Plugins
All Furnitor JavaScript plugins are loaded:
- Slick carousel
- Magnific Popup (lightbox)
- Bootstrap Select
- Counter animations
- Sticky headers
- Parallax effects

## Next Steps

1. **Convert Navigation Component**
   - Update `src/modules/layout/templates/nav/index.tsx`
   - Use Furnitor header templates as reference
   - Located in: `furnitor/dist/home-01.html` (check header section)

2. **Convert Footer Component**
   - Update `src/modules/layout/templates/footer/index.tsx`
   - Use Furnitor footer templates as reference

3. **Update Home Page**
   - Convert Furnitor home page layouts to React
   - Reference: `furnitor/dist/home-01.html` through `home-12.html`

4. **Update Product Pages**
   - Convert Furnitor product page layouts
   - Reference: `furnitor/dist/product-page-01.html` through `product-page-09.html`

5. **Update Shop Pages**
   - Convert Furnitor shop page layouts
   - Reference: `furnitor/dist/shop-page-01.html` through `shop-page-10.html`

## Important Notes

### ⚠️ Tailwind is Disabled
- Tailwind CSS directives are commented out
- You should use Bootstrap 4 classes instead
- If you need Tailwind back, uncomment the directives in `globals.css`

### ⚠️ Medusa.js Functionality
- Keep all Medusa.js e-commerce features working
- Don't break cart, checkout, or account functionality
- Integrate Furnitor design with existing Medusa components

### ⚠️ Next.js Image Component
- Use Next.js `<Image>` component for optimized images
- Import: `import Image from 'next/image'`
- Example: `<Image src="/furnitor/images/logo.png" width={100} height={50} alt="Logo" />`

## Testing

After setup, test:
1. ✅ Page loads without errors
2. ✅ Bootstrap 4 styles are applied
3. ✅ JavaScript plugins work (carousels, modals, etc.)
4. ✅ Images load correctly
5. ✅ Responsive design works on mobile/desktop

## Troubleshooting

### CSS Not Loading
- Check browser console for 404 errors
- Verify files exist in `public/furnitor/`
- Check that paths in `layout.tsx` are correct

### JavaScript Errors
- Check browser console for errors
- Ensure jQuery loads before other plugins
- Verify all vendor scripts are in `public/furnitor/vendors/`

### Bootstrap Classes Not Working
- Verify Bootstrap CSS is loaded (check Network tab)
- Check for CSS conflicts
- Ensure you're using Bootstrap 4 classes (not Bootstrap 5)

## Reference Files

- **Furnitor HTML Templates**: `storefront/furnitor/dist/`
- **Layout Configuration**: `storefront/src/app/layout.tsx`
- **Global Styles**: `storefront/src/styles/globals.css`
- **Bootstrap 4 Docs**: https://getbootstrap.com/docs/4.6/

