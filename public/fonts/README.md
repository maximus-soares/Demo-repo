# NextWork Brand Typography Setup

## Font Organization

Place your brand font files in the following structure:

```
public/fonts/
├── suisse-neue/
│   ├── SuisseNeue-Regular.woff2
│   ├── SuisseNeue-Regular.woff
│   ├── SuisseNeue-Regular.ttf
│   ├── SuisseNeue-Medium.woff2
│   ├── SuisseNeue-Medium.woff
│   ├── SuisseNeue-Medium.ttf
│   ├── SuisseNeue-SemiBold.woff2
│   ├── SuisseNeue-SemiBold.woff
│   ├── SuisseNeue-SemiBold.ttf
│   ├── SuisseNeue-Bold.woff2
│   ├── SuisseNeue-Bold.woff
│   └── SuisseNeue-Bold.ttf
└── fk-grotesk-neue/
    ├── FKGroteskNeue-Regular.woff2
    ├── FKGroteskNeue-Regular.woff
    ├── FKGroteskNeue-Regular.ttf
    ├── FKGroteskNeue-Medium.woff2
    ├── FKGroteskNeue-Medium.woff
    ├── FKGroteskNeue-Medium.ttf
    ├── FKGroteskNeue-SemiBold.woff2
    ├── FKGroteskNeue-SemiBold.woff
    ├── FKGroteskNeue-SemiBold.ttf
    ├── FKGroteskNeue-Bold.woff2
    ├── FKGroteskNeue-Bold.woff
    └── FKGroteskNeue-Bold.ttf
```

## Font Usage

### Tailwind Classes

**Headings (Suisse Neue):**
- `font-heading` - Default heading font
- `font-display` - Display font alias  
- `text-hero` - Hero text with optimized spacing
- `text-display` - Display text with optimized spacing

**Body Text (FK Grotesk Neue):**
- `font-body` - Default body font
- `font-sans` - Sans-serif alias
- `text-body-large` - Large body text
- `text-body` - Regular body text
- `text-caption` - Caption text

### HTML Examples

```html
<!-- Hero heading -->
<h1 class="text-hero text-6xl">Your Hero Headline</h1>

<!-- Section heading -->
<h2 class="font-heading text-4xl font-semibold">Section Title</h2>

<!-- Body content -->
<p class="text-body text-lg">Your body content using FK Grotesk Neue</p>

<!-- Caption -->
<span class="text-caption text-gray-600">Small caption text</span>
```

## Performance Optimization

- **WOFF2**: Primary format for modern browsers (best compression)
- **WOFF**: Fallback for older browsers
- **TTF**: Final fallback for maximum compatibility
- **Preloading**: Critical fonts are preloaded in BaseLayout.astro
- **Font Display**: Uses `swap` for optimal loading performance

## Notes

- Font files should be optimized and compressed
- Consider subset fonts for specific character sets if needed
- Monitor Core Web Vitals impact when adding fonts
- Use `font-display: swap` for better loading experience