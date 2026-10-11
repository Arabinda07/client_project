---
type: Catalog Operations
title: goonjaa Product Onboarding & Catalog Ingestion Guide
description: Guidelines, template specifications, image standards, and instructions for artisan catalog handover.
lifecycle: active
verified:
  by: human:founder
  at: 2026-10-11T00:00:00Z
sources:
  - id: catalog-template
    resource: docs/goonjaa_catalog_template.csv
    title: goonjaa Product Catalog CSV Template
  - id: product-foundation
    resource: docs/PRODUCT.md
    title: goonjaa Product & Brand Foundation
---

# goonjaa Product Onboarding Guide

This guide describes the catalog structure and handover procedure for Srijita's handcrafted terracotta jewellery pieces.

---

## 1. Catalog Input Options

Srijita can supply her catalog in whichever format feels easiest:
1. **Google Sheets / Excel Template:** A simple spreadsheet using the columns documented below.
2. **Direct CSV:** The ready-made [`goonjaa_catalog_template.csv`](./goonjaa_catalog_template.csv).
3. **Direct Admin Portal Entry:** Adding items one-by-one via the live admin interface at `/admin/products/new`.

---

## 2. Field Specifications

| Column Header | Required? | Description & Allowed Values | Real Example |
| :--- | :--- | :--- | :--- |
| **Product SKU** | Recommended | Short studio identifier (e.g., `ts-001`, `er-005`). If blank, we generate one automatically. | `ts-001` |
| **Product Name** | **Yes** | Descriptive, artistic name (avoiding ALL CAPS). | `Mridula Painted Terracotta Set` |
| **Category** | **Yes** | Main category. Must be one of: `Terracotta Set`, `Earring`, `Finger Ring`, `Bangles`, `Back Clip`, `Brooch`, `Hair Pin`, `Hair Stick`. | `Terracotta Set` |
| **Subcategory** | Optional | Style classification (e.g., `Regular Set`, `Abstract Set`, `Beaded`, `Choker`, `Hansuli`, `Chandrakala`, `3D-Art`, `Painted Set`, `Traditional Jhumka`). | `Painted Set` |
| **Collections** | Optional | Curated groupings: `New Arrivals`, `Festive Wear`, `Everyday Lightweight`, `Statement Pieces`, `Return Gifts`, `Bestsellers`, `Sale`. | `Festive Wear, Statement Pieces` |
| **Selling Price INR** | **Yes** | The final price in rupees (without currency symbols). | `1850` |
| **Original Price INR** | Optional | Regular MRP if the item is on discount or introductory offer. | `2100` |
| **Stock Quantity** | **Yes** | Current ready-to-ship stock count. Put `0` for made-to-order pieces. | `5` |
| **Stock Status** | **Yes** | `in_stock`, `out_of_stock`, or `made_to_order`. | `in_stock` |
| **Color Family** | **Yes** | Primary and secondary colors: `Terracotta`, `Maroon`, `Gold`, `Blue`, `Green`, `Red`, `Pink`, `Yellow`, `Black`, `Earth Neutrals`, `Multicolor`. | `Maroon, Terracotta, Gold` |
| **Materials Used** | Recommended | Natural components used. | `Baked Earthen Clay, Acrylics, Cotton Dori` |
| **Dimensions** | Recommended | Length, pendant height, or bangle diameter. | `Necklace length: Adjustable up to 24 inches` |
| **Weight** | Recommended | Approximate weight (important so buyers know it is comfortable to wear). | `85g` |
| **Short Description** | **Yes** | 1-line summary displayed on cards and search. | `Hand-painted terracotta necklace with matching jhumkas.` |
| **Story / Long Description** | Recommended | 2–3 sentences about the design, motif inspiration, and pairing ideas. | `Delicate brushstrokes outlining traditional motifs on earthen clay. Pairs beautifully with handloom sarees.` |
| **Image File Names** | **Yes** | Comma-separated names of image files shared in the photo drive. | `mridula-01.jpg, mridula-02.jpg` |
| **Estimated Making Cost INR** | Optional | Studio internal material + crafting cost estimate (never visible to customers). | `450` |
| **Estimated Packaging Cost INR** | Optional | Box and wrapping cost estimate (never visible to customers). | `80` |

---

## 3. Product Photography Standards

Terracotta has natural texture, warmth, and subtle earth variations that customers love. To showcase the pieces best:

1. **Lighting:** Natural daylight near a window is ideal. Avoid harsh direct phone flash which washes out terracotta paint tones.
2. **Background:** Clean, neutral background (cream fabric, textured paper, raw wood, or linen).
3. **Recommended 3-Photo Shot List per Piece:**
   - **Photo 1 (Hero):** Flat lay of the complete piece on a neutral background.
   - **Photo 2 (Detail):** Close-up of brushwork, clay texture, or pendant sculpting.
   - **Photo 3 (Scale / Styled):** Either draped over fabric, held in hand, or worn to show proportion.
4. **File Naming:** Keep filenames matching the SKU or product name (e.g., `mridula-01.jpg`, `mridula-02.jpg`).
