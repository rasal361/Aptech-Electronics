# Aptech Electronics — Landing Page

A clean, professional React landing page for Aptech Electronics, Sayh Mudayrah, Ajman, UAE.

## Features
- Fixed navbar with dark/light mode toggle
- Hero section with animated entrance + stats row
- About section with floating badge card
- Products grid (6 categories)
- Gallery carousel (4 slides, dot navigation)
- Contact section with address, hours, phone + map link
- Footer
- Sticky Call & WhatsApp buttons (bottom-right)
- Full dark mode via CSS variables

## How to Run

### Prerequisites
- **Node.js** v18 or higher — download from https://nodejs.org

### Steps

```bash
# 1. Open terminal and go into this folder
cd aptech-electronics

# 2. Install dependencies (only needed once)
npm install

# 3. Start the dev server
npm run dev
```

Then open your browser at: **http://localhost:5173**

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder you can deploy to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Customisation Tips

| What to change | Where |
|---|---|
| Phone numbers | `ApTechElectronics.jsx` → contact section & sticky CTAs |
| WhatsApp number | `href="https://wa.me/971XXXXXXXXX"` in sticky CTA |
| Address / hours | Contact section info array |
| Stats (years, customers…) | Hero stats row array |
| Product descriptions | `PRODUCTS` constant at top of file |
| Store photos | Replace emoji placeholders with `<img src="..." />` tags |
| Google Maps link | `href` in the map placeholder card |
