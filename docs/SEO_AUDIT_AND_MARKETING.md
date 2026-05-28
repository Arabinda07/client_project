# goonjaa SEO Audit And Local Growth Plan

Last updated: 2026-05-28

Canonical production domain: `https://goonjaa.vercel.app`

## Search Console Setup

The homepage must include this verification tag in the document head:

```html
<meta name="google-site-verification" content="fveZCgknZzwBAwwK1uwqRI0HGyM6Qb35SYhO-SP9BxU" />
```

After deployment, verify the `https://goonjaa.vercel.app` URL-prefix property in Google Search Console and submit:

```text
https://goonjaa.vercel.app/sitemap.xml
```

Keep the verification tag in place after verification succeeds.

## Technical SEO Audit

| Area | Status | Action |
| --- | --- | --- |
| Canonical domain | Fixed in source | Use `https://goonjaa.vercel.app` across canonical tags, Open Graph URLs, sitemap, robots, schema, `llms.txt`, and `catalog.md`. |
| Search Console verification | Fixed in source | Static homepage and generated route HTML preserve the Google verification tag. |
| Crawlability | Good | `robots.txt` allows Google and major AI/search crawlers and references the canonical sitemap. |
| Sitemap | Good baseline | Static generator writes sitemap entries for homepage, shop, categories, products, and indexable content routes. |
| SPA route handling | Good | Vercel rewrites serve React routes while excluding static crawler assets, including `catalog.md`. |
| Noindex handling | Good | Cart, checkout, and unknown routes are excluded from sitemap and receive `noindex,follow`. |
| Structured data | Good baseline | Organization, WebSite, BreadcrumbList, FAQPage, and Product schema are generated. Validate deployed pages with Google Rich Results Test. |
| AI SEO files | Good baseline | `llms.txt` and generated `catalog.md` give AI assistants parseable brand, page, and product context. |

## On-Page SEO Priorities

Primary keyword themes:

- handmade terracotta jewellery
- terracotta jewellery Kolkata
- terracotta jewellery West Bengal
- handmade jewellery Kolkata
- terracotta necklace set
- lightweight terracotta earrings
- bulk terracotta jewellery gifts

Priority improvements:

- Homepage: keep the first paragraph explicit about handmade terracotta jewellery, Kolkata/West Bengal relevance, solo woman artisan work, and modern wearable styling.
- Shop and category pages: add short answer-style intro copy that names the category, material, use case, and delivery/made-to-order expectation.
- Product pages: keep product names, price, stock state, materials, care guidance, dispatch timing, and image alt text specific and visible.
- Contact and bulk order pages: reinforce WhatsApp support, dispatch expectations, handmade variation, and the two-month bulk order lead time.
- Image SEO: replace placeholder product images with real product photos using descriptive filenames and alt text.

## AI SEO Priorities

Add or expand self-contained answer blocks for:

- What is terracotta jewellery?
- Is terracotta jewellery lightweight?
- How do you care for terracotta jewellery?
- How long does handmade terracotta jewellery take to make?
- Can terracotta jewellery be ordered in bulk for events?

Recommended extractable answer format:

```text
Terracotta jewellery is jewellery shaped from earthen clay, dried, fired, and painted by hand. goonjaa pieces are made without molds, so small differences in shape, brushwork, and colour are part of the handmade character.
```

Keep `llms.txt` and `catalog.md` updated whenever core routes, dispatch timelines, contact details, or catalogue products change.

## Competitor Profile Matrix

| Competitor | Positioning | SEO / Content Signals | Product / Offer Signals | Trust / Community Signals | goonjaa Opportunity |
| --- | --- | --- | --- | --- | --- |
| Seraphaire | Kolkata-based terracotta jewellery and home decor brand. | Targets terracotta jewellery, necklace, earrings, hair accessories, gifts, and new arrivals. | Free shipping across India, WhatsApp contact, bestsellers, new arrivals, category-led shop. | Facebook, Instagram, customer-love section, email/phone capture. | Own a more personal solo-artisan story, no-mold process, music-and-clay founder narrative, and deeper care/craft education. |
| Decoryle | North Dumdum ethnic craft and home decor store featured by local media. | Benefits from WhatsHot Kolkata local discovery and terracotta/Bishnupur craft context. | Jewellery plus home decor, dokra, wall decor, sculptures, jhumkas, chokers, pendants. | Local address, media article, interested-user count. | Stay focused on handmade terracotta jewellery rather than broad handicrafts; create stronger product-specific SEO and modern styling content. |
| NextBuye | Kolkata handmade jewellery and handicrafts ecommerce store. | Broad handmade jewellery, handicrafts, blog, FAQs, store categories. | Low-price offers, sale framing, free shipping threshold, returns, secure payments. | Account/orders flow, support promise, broad catalogue. | Differentiate away from discount-led fashion by emphasizing slow craft, small batches, quality, and story-led gifting. |
| India InCH craft reference | Traditional craft directory and authority source. | Describes terracotta jewellery materials and Kolkata/West Bengal craft presence. | Not a direct ecommerce competitor. | Cultural authority and craft context. | Use craft education pages that cite credible craft context and explain goonjaa's process in accessible language. |

## Community Marketing Strategy

Primary platform: Instagram.

Community identity:

People who wear Bengal craft in everyday and occasion outfits, and who care about slow handmade work.

Recurring rituals:

- Kiln notes: weekly process posts showing shaping, drying, firing, painting, or packaging.
- Workbench Wednesday: short reels or carousels from the studio table.
- Customer styling: repost buyers wearing goonjaa with sarees, kurtas, dresses, and casual outfits.
- Care notes: simple posts on storing, cleaning, and handling terracotta jewellery.
- Festive drops: small-batch announcements for Durga Puja, weddings, haldi, Saraswati Puja, Poila Boishakh, and gifting seasons.
- Studio circle: invite early buyers, friends, local craft supporters, and repeat customers to a close-friends or broadcast-channel list for first looks.

Metrics to track monthly:

- Instagram profile visits
- Website clicks from Instagram
- WhatsApp inquiries
- Newsletter signups
- Product saves/shares
- Customer photo submissions
- Organic queries and pages in Google Search Console

## Marketing Psychology Notes

- Social proof: feature customer photos, testimonials, and repeat-order notes close to product and homepage CTAs.
- Ethical scarcity: present one-of-a-kind and small-batch limits honestly; avoid false urgency.
- Regret reduction: make care instructions, handmade variation, delivery timing, and WhatsApp support easy to find.
- Identity framing: speak to buyers who want Bengal craft that works with both sarees and modern wardrobes.
- Commitment ladder: Instagram follow -> studio list -> WhatsApp inquiry -> first purchase -> customer styling share -> repeat/bulk order.

## Content Ideas

Publish these as future educational pages or blog-style guides:

- What is terracotta jewellery?
- How to care for terracotta jewellery
- Terracotta jewellery for sarees, kurtas, and dresses
- Handmade terracotta jewellery in Kolkata and West Bengal
- Bulk terracotta jewellery gifts for events
- Why handmade terracotta jewellery has small variations
- Lightweight terracotta earrings for daily wear
- Terracotta jewellery for Durga Puja styling

## Post-Deployment Checklist

- Open `https://goonjaa.vercel.app/` and confirm the verification tag exists in page source.
- Verify the property in Google Search Console.
- Submit `https://goonjaa.vercel.app/sitemap.xml`.
- Inspect homepage, shop, category, product, and contact URLs in Search Console.
- Run Google Rich Results Test for homepage, contact page, and one product page.
- Review Search Console performance weekly for the first month after indexing.
