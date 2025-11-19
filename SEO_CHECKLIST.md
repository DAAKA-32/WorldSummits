# WorldSummits - SEO Verification Checklist

## 🎯 Quick SEO Check

### 1. Test Your SEO Score

Run these tools to verify your SEO optimization:

#### A. Google PageSpeed Insights
```bash
# Visit: https://pagespeed.web.dev/
# Enter your URL when deployed
```

#### B. Lighthouse (Chrome DevTools)
```bash
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Performance", "Accessibility", "Best Practices", "SEO"
4. Click "Generate report"
```

#### C. Local Lighthouse Test
```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

### 2. Verify Meta Tags

#### Check in Browser
```bash
# View page source (Ctrl+U or Cmd+U)
# Search for these tags:
```

- [ ] `<title>` - Present and unique
- [ ] `<meta name="description">` - Present (150-160 chars)
- [ ] `<meta property="og:title">` - Open Graph title
- [ ] `<meta property="og:description">` - OG description
- [ ] `<meta property="og:image">` - OG image (1200x630)
- [ ] `<meta name="twitter:card">` - Twitter card
- [ ] `<link rel="canonical">` - Canonical URL
- [ ] `<script type="application/ld+json">` - Structured data

### 3. Test Sitemap

```bash
# Visit: http://localhost:3000/sitemap.xml
# Should see XML with all pages listed
```

Check for:
- [ ] Homepage
- [ ] All mountain pages (39 total)
- [ ] All expedition pages (39 total)
- [ ] Comparator page
- [ ] About page

### 4. Test Robots.txt

```bash
# Visit: http://localhost:3000/robots.txt
```

Should contain:
- [ ] `User-agent: *`
- [ ] `Allow: /`
- [ ] `Sitemap:` URL
- [ ] `Disallow: /api/`

### 5. Mobile-Friendly Test

```bash
# Google Mobile-Friendly Test
# Visit: https://search.google.com/test/mobile-friendly
# Enter your URL
```

Check for:
- [ ] Responsive design
- [ ] Touch targets (44px min)
- [ ] Readable text size
- [ ] Viewport configuration

### 6. Performance Metrics

Target scores:
- [ ] Performance: 90+
- [ ] Accessibility: 100
- [ ] Best Practices: 100
- [ ] SEO: 100

Core Web Vitals:
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1

### 7. Structured Data Validation

```bash
# Google Rich Results Test
# Visit: https://search.google.com/test/rich-results
# Enter your URL
```

Check for:
- [ ] WebSite schema
- [ ] Organization schema
- [ ] SearchAction
- [ ] BreadcrumbList (on detail pages)

### 8. Security Headers

Use https://securityheaders.com/ to test:
- [ ] Strict-Transport-Security
- [ ] X-Frame-Options
- [ ] X-Content-Type-Options
- [ ] X-XSS-Protection
- [ ] Referrer-Policy

### 9. Image Optimization

Check:
- [ ] Images use Next.js Image component
- [ ] Images have alt text
- [ ] Images lazy load
- [ ] Images use modern formats (WebP, AVIF)
- [ ] Responsive images (srcset)

### 10. Accessibility

Test with:
- [ ] Screen reader (NVDA, JAWS)
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Color contrast (4.5:1 minimum)
- [ ] ARIA labels present
- [ ] Focus indicators visible

## 📊 SEO Score Breakdown

### Target Scores

| Category | Score | Status |
|----------|-------|--------|
| Performance | 90+ | ⏳ Pending |
| Accessibility | 100 | ⏳ Pending |
| Best Practices | 100 | ⏳ Pending |
| SEO | 100 | ⏳ Pending |

## 🚀 After Deployment

### 1. Submit to Search Consoles

#### Google Search Console
```bash
1. Visit: https://search.google.com/search-console
2. Add property (your domain)
3. Verify ownership (meta tag already in layout.tsx)
4. Submit sitemap: https://yourdomain.com/sitemap.xml
```

#### Bing Webmaster Tools
```bash
1. Visit: https://www.bing.com/webmasters
2. Add site
3. Verify ownership
4. Submit sitemap
```

### 2. Social Media Preview Test

#### Facebook
```bash
# Facebook Sharing Debugger
# Visit: https://developers.facebook.com/tools/debug/
# Enter your URL
# Click "Scrape Again" if needed
```

#### Twitter
```bash
# Twitter Card Validator
# Visit: https://cards-dev.twitter.com/validator
# Enter your URL
```

#### LinkedIn
```bash
# LinkedIn Post Inspector
# Visit: https://www.linkedin.com/post-inspector/
# Enter your URL
```

### 3. Speed Test Tools

Run these tests:
- [ ] GTmetrix (https://gtmetrix.com/)
- [ ] WebPageTest (https://www.webpagetest.org/)
- [ ] Pingdom (https://tools.pingdom.com/)

### 4. SEO Audit Tools

- [ ] Ahrefs Site Audit
- [ ] SEMrush Site Audit
- [ ] Screaming Frog SEO Spider
- [ ] Google Search Console

### 5. Monitor Rankings

Track these keywords:
- Mountain climbing
- Highest peaks
- Expedition planning
- Mount Everest information
- Mountain comparator
- World summits
- 8000m peaks

## 🔍 Common Issues & Fixes

### Issue: Low Performance Score

**Fix:**
- Enable Vercel Edge Network
- Optimize images further
- Remove unused CSS/JS
- Enable HTTP/2
- Use CDN for static assets

### Issue: Missing Open Graph Images

**Fix:**
- Add `og-image.jpg` to `/public` folder
- Ensure image is 1200x630px
- Optimize file size (< 1MB)

### Issue: Sitemap Not Indexed

**Fix:**
- Submit manually to Search Console
- Check robots.txt allows crawling
- Verify sitemap format
- Check server responds 200 OK

### Issue: Mobile Usability Errors

**Fix:**
- Test on real devices
- Check touch target sizes
- Verify responsive breakpoints
- Fix text readability

## 📈 Tracking & Analytics

### Google Analytics 4

```bash
# Add to .env.local:
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Google Tag Manager (Optional)

```bash
# Add GTM container ID
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

## ✅ Final Checklist

Before launch:
- [ ] All SEO meta tags present
- [ ] Sitemap submitted
- [ ] Robots.txt configured
- [ ] SSL certificate active
- [ ] Performance score 90+
- [ ] Mobile-friendly
- [ ] No broken links
- [ ] All images optimized
- [ ] Structured data valid
- [ ] Social previews working
- [ ] Analytics configured
- [ ] 404 page exists
- [ ] Loading states implemented
- [ ] Error boundaries in place

## 🎉 Success Metrics

Monitor these over time:
- Organic traffic growth
- Average position in SERP
- Click-through rate (CTR)
- Bounce rate
- Time on site
- Pages per session
- Core Web Vitals
- Mobile usability score

---

**Goal:** Achieve and maintain SEO score of 100/100

**Last Updated:** 2025-01-19
