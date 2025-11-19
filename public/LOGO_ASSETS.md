# WorldSummits - Logo Assets Guide

## 📁 Logo Files

### Main Logos
- **logo-full.svg** - Complete logo with text (240x60px) - Used in header
- **logo.svg** - Icon + "WS" text (120x40px) - Compact version
- **icon.svg** - Icon only (512x512px) - For favicons and app icons

## 🎨 Color Palette

- **Primary Orange**: #F97316 (RGB: 249, 115, 22)
- **Black Background**: #000000
- **White Text**: #FFFFFF

## 📱 Required Icon Sizes

To generate all required icons for SEO and PWA, you need to create these files:

### Favicon
```
favicon.ico - 16x16, 32x32, 48x48 (multi-size ICO file)
```

### Apple Touch Icons
```
apple-touch-icon.png - 180x180px
```

### PWA Icons
```
icon-192x192.png - 192x192px
icon-384x384.png - 384x384px
icon-512x512.png - 512x512px
```

### Open Graph / Social Media
```
og-image.jpg - 1200x630px (for Facebook, LinkedIn, Twitter)
```

## 🔧 How to Generate Icons

### Option 1: Using Online Tools

1. **Favicon Generator**
   - Visit: https://realfavicongenerator.net/
   - Upload `icon.svg`
   - Generate all sizes
   - Download and place in `/public` folder

2. **PWA Icon Generator**
   - Visit: https://www.pwabuilder.com/imageGenerator
   - Upload `icon.svg`
   - Download all sizes

### Option 2: Using ImageMagick (Command Line)

```bash
# Install ImageMagick first
# Then run these commands:

# Convert SVG to PNG
magick icon.svg -resize 512x512 icon-512x512.png
magick icon.svg -resize 384x384 icon-384x384.png
magick icon.svg -resize 192x192 icon-192x192.png
magick icon.svg -resize 180x180 apple-touch-icon.png

# Create favicon.ico (multiple sizes in one file)
magick icon.svg -define icon:auto-resize=16,32,48 favicon.ico
```

### Option 3: Using Online SVG to PNG Converter

1. Visit: https://svgtopng.com/
2. Upload `icon.svg`
3. Download at required sizes

## 📋 Checklist

After generating all icons, make sure you have:

- [ ] `favicon.ico` (16x16, 32x32, 48x48)
- [ ] `apple-touch-icon.png` (180x180)
- [ ] `icon-192x192.png` (192x192)
- [ ] `icon-384x384.png` (384x384)
- [ ] `icon-512x512.png` (512x512)
- [ ] `og-image.jpg` (1200x630)
- [ ] All files in `/public` folder

## 🎨 Creating OG Image

For the Open Graph image (og-image.jpg), create a 1200x630px image with:

1. **Background**: Black gradient or mountain photo
2. **Logo**: WorldSummits logo (centered or left-aligned)
3. **Tagline**: "Explore the Highest Peaks on Earth"
4. **Visual**: Mountain silhouettes or peaks

You can use:
- Canva (https://www.canva.com/)
- Figma (https://www.figma.com/)
- Photoshop
- GIMP (free)

Template dimensions:
- Width: 1200px
- Height: 630px
- Format: JPG
- Quality: 80-90%
- File size: < 1MB

## 🔍 Verification

After adding all files, verify they're working:

1. **Favicon**: Check browser tab icon
2. **Apple Touch Icon**: Add to iOS home screen
3. **PWA Icons**: Install PWA on Android
4. **OG Image**: Use Facebook Sharing Debugger

## 📦 Current Status

| File | Status | Size |
|------|--------|------|
| logo-full.svg | ✅ Created | 240x60 |
| logo.svg | ✅ Created | 120x40 |
| icon.svg | ✅ Created | 512x512 |
| favicon.ico | ⏳ To Generate | 16/32/48 |
| apple-touch-icon.png | ⏳ To Generate | 180x180 |
| icon-192x192.png | ⏳ To Generate | 192x192 |
| icon-384x384.png | ⏳ To Generate | 384x384 |
| icon-512x512.png | ⏳ To Generate | 512x512 |
| og-image.jpg | ⏳ To Create | 1200x630 |

## 🚀 Quick Start

1. Go to https://realfavicongenerator.net/
2. Upload `/public/icon.svg`
3. Customize if needed
4. Generate and download
5. Extract all files to `/public` folder
6. Done! ✅

---

**Note**: The SVG files are already optimized and ready to use. You only need to generate the PNG/ICO versions for browser compatibility.
