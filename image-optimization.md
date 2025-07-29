# Image Optimization Guide

## Current State
- Total images: ~35MB (4.7MB missives + 31MB artwork)
- Some images are very large (214K for EmpressSisi.png)
- No image compression or WebP format usage

## Recommendations

### 1. Convert to WebP format
- Reduces file sizes by 25-35% with same quality
- Modern browsers support WebP
- Use tools like: imagemin, squoosh.app, or cwebp

### 2. Optimize existing images
- Compress PNG/JPEG files
- Target sizes:
  - Missive thumbnails: 50-100KB max
  - Artwork images: 200-500KB max
  - Book covers: 100-200KB max

### 3. Implement lazy loading (already done with loading="lazy")
- ✅ Already implemented in artwork component

### 4. Add responsive images
- Use srcset for different screen sizes
- Serve smaller images on mobile

## Tools
- Online: squoosh.app, tinypng.com
- CLI: imagemin, sharp
- Build process: vite-plugin-imagemin
