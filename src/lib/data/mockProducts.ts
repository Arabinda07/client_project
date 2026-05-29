import type { Category, Collection, Testimonial, Product } from '../../types';

export const categories: Category[] = [
  { id: '1', name: 'Terracotta Set', slug: 'terracotta-set', subcategories: ['Regular Set', 'Abstract Set', 'Modern', 'Beaded', 'Gen-Z Set', 'Choker', 'Hansuli', 'Chandrakala', '3D-Art', 'Painted Set'] },
  { id: '2', name: 'Earring', slug: 'earring', subcategories: ['Traditional Jhumka', 'Cone Shaped Jhumka', 'Painted Earring', '3D-Art Earring', 'Textured Earring', 'Regular Earring'] },
  { id: '3', name: 'Finger Ring', slug: 'finger-ring' },
  { id: '4', name: 'Bangles', slug: 'bangles' },
  { id: '5', name: 'Back Clip', slug: 'back-clip' },
  { id: '6', name: 'Brooch', slug: 'brooch' },
  { id: '7', name: 'Hair Pin', slug: 'hair-pin' },
  { id: '8', name: 'Hair Stick', slug: 'hair-stick' }
];

export const collections: Collection[] = [
  { id: 'c1', name: 'New Arrivals', slug: 'new-arrivals' },
  { id: 'c2', name: 'Festive Wear', slug: 'festive-wear' },
  { id: 'c3', name: 'Everyday Lightweight', slug: 'everyday-lightweight' },
  { id: 'c4', name: 'Statement Pieces', slug: 'statement-pieces' },
  { id: 'c5', name: 'Return Gifts', slug: 'return-gifts' },
  { id: 'c7', name: 'Bestsellers', slug: 'bestsellers' },
  { id: 'c8', name: 'Sale', slug: 'sale' }
];

export const testimonials: Testimonial[] = [
  { id: 't1', name: "Aditi S.", location: "Mumbai", text: "The details on the Mridula set are absolutely breathtaking! I wore it to my cousin's haldi and received so many compliments.", rating: 5 },
  { id: 't2', name: "Priya M.", location: "Bangalore", text: "The painted set looked beautiful with my Kanjeevaram saree. Eco-conscious and beautifully finished.", rating: 5 },
  { id: 't3', name: "Neha R.", location: "Delhi", text: "These jhumkas are now my everyday go-to. I love that they are eco-friendly and skin-friendly.", rating: 5 },
  { id: 't4', name: "Revathi K.", location: "Chennai", text: "Packaging was beautiful and secure. The Chandrakala set is truly a statement piece that roots me to Indian craftsmanship.", rating: 5 }
];

const careInstructionsDefault = "Handle with care, as terracotta is porous and can break if dropped. Avoid contact with water, perfume, or harsh chemicals. Store separately in the provided fabric pouch.";

const colourSwatches: Record<string, string> = {
  Black: '#2D2926',
  Blue: '#315E8A',
  Bronze: '#9B6A3C',
  Brown: '#7A5230',
  'Earth Neutrals': '#A68A64',
  Gold: '#B8892E',
  Green: '#426B3F',
  Grey: '#77716B',
  Maroon: '#7D2E24',
  Multicolor: 'linear-gradient(135deg, #7D2E24 0 33%, #315E8A 33% 66%, #B8892E 66% 100%)',
  Pink: '#B96B77',
  Red: '#A83E32',
  Silver: '#A8A8A3',
  Terracotta: '#B35C38',
  White: '#FDFCF8',
  Yellow: '#D2A443',
};

const toColourId = (colour: string) => colour.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const withColourOptions = (products: Product[]): Product[] =>
  products.map((product) => ({
    ...product,
    colourOptions: product.colorFamily.map((colour) => ({
      id: toColourId(colour),
      name: colour,
      swatch: colourSwatches[colour] || '#B35C38',
      available: product.stockStatus !== 'out_of_stock',
    })),
  }));

export const mockProducts: Product[] = withColourOptions([
  // Terracotta Sets (16)
  {
    id: 'ts-001', slug: 'mridula-painted-terracotta-set', name: 'Mridula Painted Terracotta Set', price: 1850, mainCategory: 'Terracotta Set', subCategory: 'Painted Set', collection: ['Festive Wear', 'Statement Pieces'],
    shortDescription: 'Hand-painted terracotta necklace featuring traditional Indian motifs.',
    longDescription: "The Mridula set features delicate brushstrokes outlining traditional motifs on earthen clay. The set includes a statement necklace and matching statement jhumkas. Perfect for festive occasions and pairs beautifully with handloom sarees.",
    images: ['/images/mridula_set.svg', '/images/mridula_set.svg'],
    materials: ['Baked Earthen Clay', 'Acrylic Paint', 'Cotton Thread', 'Brass Findings'],
    dimensions: 'Necklace length: Adjustable up to 24 inches', weight: '85g', careInstructions: careInstructionsDefault,
    stockStatus: 'in_stock', stockQuantity: 5, isNew: true, isBestseller: true, isSale: false,
    tags: ['festive', 'painted', 'traditional', 'hand-painted'], occasion: ['Festive', 'Traditional Function'], colorFamily: ['Maroon', 'Terracotta', 'Gold'], createdAt: '2023-11-01'
  },
  {
    id: 'ts-002', slug: 'chandrika-hansuli-set', name: 'Chandrika Hansuli Set', price: 2200, mainCategory: 'Terracotta Set', subCategory: 'Hansuli', collection: ['Statement Pieces', 'Festive Wear'],
    shortDescription: 'Bold, modern interpretation of the traditional Hansuli choker.',
    images: ['/images/mridula_set.svg'], materials: ['Raw Terracotta', 'Adjustable Cotton Dori'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 3, isNew: false, isBestseller: true, isSale: false,
    tags: ['choker', 'statement', 'modern', 'hansuli'], occasion: ['Festive', 'Wedding Guest'], colorFamily: ['Earth Neutrals', 'Terracotta'], createdAt: '2023-10-15'
  },
  {
    id: 'ts-003', slug: 'aarohi-beaded-set', name: 'Aarohi Beaded Set', price: 1450, originalPrice: 1650, mainCategory: 'Terracotta Set', subCategory: 'Beaded', collection: ['Everyday Lightweight', 'Sale'],
    shortDescription: 'Elegant set featuring hand-rolled terracotta beads with wooden accents.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta Beads', 'Wood', 'Cotton Thread'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 8, isNew: false, isBestseller: false, isSale: true,
    tags: ['everyday', 'beaded', 'earthy', 'boho'], occasion: ['Daily Wear', 'Office Wear'], colorFamily: ['Multicolor', 'Earth Neutrals'], createdAt: '2023-09-20'
  },
  {
    id: 'ts-004', slug: 'mira-gen-z-terracotta-set', name: 'Mira Gen-Z Terracotta Set', price: 1100, mainCategory: 'Terracotta Set', subCategory: 'Gen-Z Set', collection: ['Everyday Lightweight', 'New Arrivals'],
    shortDescription: 'Minimalist geometric terracotta form designed for contemporary wear.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Silver-plated chains'],
    careInstructions: careInstructionsDefault, stockStatus: 'made_to_order', stockQuantity: 0, isNew: true, isBestseller: false, isSale: false,
    tags: ['minimalist', 'everyday', 'gen-z'], occasion: ['College / Gen-Z', 'Daily Wear'], colorFamily: ['Silver', 'Black', 'Terracotta'], createdAt: '2023-12-05'
  },
  {
    id: 'ts-005', slug: 'pallavi-3d-art-set', name: 'Pallavi 3D-Art Set', price: 2800, mainCategory: 'Terracotta Set', subCategory: '3D-Art', collection: ['Statement Pieces', 'Festive Wear'],
    shortDescription: 'Intricate 3D floral sculpting on a grand terracotta canvas.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Natural Dyes', 'Golden Beads'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 2, isNew: false, isBestseller: true, isSale: false,
    tags: ['sculptural', 'bridal', 'floral', 'premium'], occasion: ['Wedding Guest', 'Festive'], colorFamily: ['Red', 'Green', 'Gold'], createdAt: '2023-08-10'
  },
  {
    id: 'ts-006', slug: 'devika-choker-set', name: 'Devika Choker Set', price: 1650, mainCategory: 'Terracotta Set', subCategory: 'Choker', collection: ['Festive Wear'],
    shortDescription: 'Snug terracotta choker with dangling brass ghungroos.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Brass Ghungroos'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 4, isNew: false, isBestseller: false, isSale: false,
    tags: ['traditional', 'choker', 'ghungroo'], occasion: ['Festive', 'Traditional Function'], colorFamily: ['Terracotta', 'Gold'], createdAt: '2023-07-22'
  },
  {
    id: 'ts-007', slug: 'nandini-abstract-set', name: 'Nandini Abstract Set', price: 1900, mainCategory: 'Terracotta Set', subCategory: 'Abstract Set', collection: ['New Arrivals', 'Statement Pieces'],
    shortDescription: 'Hand-painted abstract expressionist designs on flat terracotta slabs.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Acrylic Colors', 'Cotton Dori'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 5, isNew: true, isBestseller: false, isSale: false,
    tags: ['art', 'modern', 'abstract'], occasion: ['Office Wear', 'College / Gen-Z'], colorFamily: ['Blue', 'Yellow', 'Black', 'Multicolor'], createdAt: '2023-12-10'
  },
  {
    id: 'ts-008', slug: 'surya-chandrakala-set', name: 'Surya Chandrakala Set', price: 2400, mainCategory: 'Terracotta Set', subCategory: 'Chandrakala', collection: ['Statement Pieces'],
    shortDescription: 'Crescent moon inspired design representing lunar energy.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Gold Foil Details'],
    careInstructions: careInstructionsDefault, stockStatus: 'made_to_order', stockQuantity: 0, isNew: false, isBestseller: true, isSale: false,
    tags: ['statement', 'celestial', 'moon'], occasion: ['Festive', 'Wedding Guest'], colorFamily: ['Black', 'Gold'], createdAt: '2023-06-15'
  },
  {
    id: 'ts-009', slug: 'ananya-modern-set', name: 'Ananya Modern Set', price: 1350, mainCategory: 'Terracotta Set', subCategory: 'Modern', collection: ['Everyday Lightweight'],
    shortDescription: 'Sleek terracotta bars and circles for an office-ready look.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Wax Cord'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 6, isNew: false, isBestseller: true, isSale: false,
    tags: ['office', 'minimal', 'sleek'], occasion: ['Office Wear', 'Daily Wear'], colorFamily: ['Terracotta', 'Black'], createdAt: '2023-05-18'
  },
  {
    id: 'ts-010', slug: 'kalyani-regular-set', name: 'Kalyani Regular Set', price: 1200, mainCategory: 'Terracotta Set', subCategory: 'Regular Set', collection: ['Everyday Lightweight'],
    shortDescription: 'Classic terracotta pendant with matching stud earrings.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Cotton Thread'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 10, isNew: false, isBestseller: false, isSale: false,
    tags: ['classic', 'everyday', 'pendant'], occasion: ['Daily Wear'], colorFamily: ['Maroon', 'Green'], createdAt: '2023-04-10'
  },
  {
    id: 'ts-011', slug: 'kavya-painted-set', name: 'Kavya Painted Set', price: 1950, mainCategory: 'Terracotta Set', subCategory: 'Painted Set', collection: ['Festive Wear'],
    shortDescription: 'Vibrant hand-painted peacock motifs on a grand terracotta base.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Paints', 'Beads'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 4, isNew: true, isBestseller: false, isSale: false, tags: ['peacock', 'festive', 'art'], occasion: ['Traditional Function'], colorFamily: ['Blue', 'Green', 'Gold'], createdAt: '2023-11-20'
  },
  {
    id: 'ts-012', slug: 'raga-hansuli-set', name: 'Raga Hansuli Set', price: 2500, mainCategory: 'Terracotta Set', subCategory: 'Hansuli', collection: ['Statement Pieces'],
    shortDescription: 'Solid curved terracotta hansuli painted with tribal patterns.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta'],
    careInstructions: careInstructionsDefault, stockStatus: 'made_to_order', stockQuantity: 0, isNew: false, isBestseller: false, isSale: false, tags: ['tribal', 'hansuli', 'bold'], occasion: ['Festive', 'Gifting'], colorFamily: ['Black', 'White', 'Red'], createdAt: '2023-03-22'
  },
  {
    id: 'ts-013', slug: 'bindu-beaded-set', name: 'Bindu Beaded Set', price: 1600, mainCategory: 'Terracotta Set', subCategory: 'Beaded', collection: ['Everyday Lightweight'],
    shortDescription: 'Multiple layers of tiny terracotta beads in earthy shades.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta Beads', 'Thread'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 6, isNew: false, isBestseller: false, isSale: false, tags: ['beaded', 'boho', 'layers'], occasion: ['Office Wear', 'Daily Wear'], colorFamily: ['Brown', 'Terracotta'], createdAt: '2023-02-15'
  },
  {
    id: 'ts-014', slug: 'tushar-modern-set', name: 'Tushar Modern Set', price: 1250, originalPrice: 1500, mainCategory: 'Terracotta Set', subCategory: 'Modern', collection: ['Sale'],
    shortDescription: 'Square terracotta blocks joined with metallic rings.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Metal Rings'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 3, isNew: false, isBestseller: false, isSale: true, tags: ['modern', 'geometric'], occasion: ['College / Gen-Z'], colorFamily: ['Silver', 'Grey'], createdAt: '2023-01-10'
  },
  {
    id: 'ts-015', slug: 'lata-3d-art-set', name: 'Lata 3D-Art Set', price: 3000, mainCategory: 'Terracotta Set', subCategory: '3D-Art', collection: ['Statement Pieces'],
    shortDescription: 'Overlapping 3D lotus petals creating a rich cascading effect.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta'],
    careInstructions: careInstructionsDefault, stockStatus: 'made_to_order', stockQuantity: 0, isNew: false, isBestseller: false, isSale: false, tags: ['sculptural', 'lotus', 'heavy'], occasion: ['Wedding Guest'], colorFamily: ['Pink', 'Green', 'Gold'], createdAt: '2023-08-25'
  },
  {
    id: 'ts-016', slug: 'dhara-regular-set', name: 'Dhara Regular Set', price: 950, mainCategory: 'Terracotta Set', subCategory: 'Regular Set', collection: ['Return Gifts'],
    shortDescription: 'Simple everyday terracotta pendant in a teardrop shape.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Cotton'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 20, isNew: false, isBestseller: true, isSale: false, tags: ['simple', 'return-gift'], occasion: ['Gifting', 'Daily Wear'], colorFamily: ['Terracotta'], createdAt: '2023-09-01'
  },

  // Earrings (12)
  {
    id: 'er-001', slug: 'amra-traditional-jhumka', name: 'Amra Traditional Jhumka', price: 650, mainCategory: 'Earring', subCategory: 'Traditional Jhumka', collection: ['Bestsellers', 'Everyday Lightweight'],
    shortDescription: 'Classic large terracotta jhumkas with intricate dot work.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Brass Hooks'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 12, isNew: false, isBestseller: true, isSale: false,
    tags: ['jhumka', 'traditional', 'lightweight'], occasion: ['Daily Wear', 'Traditional Function'], colorFamily: ['Terracotta', 'Black'], createdAt: '2023-05-10'
  },
  {
    id: 'er-002', slug: 'neelika-painted-earrings', name: 'Neelika Painted Earrings', price: 550, originalPrice: 650, mainCategory: 'Earring', subCategory: 'Painted Earring', collection: ['Sale'],
    shortDescription: 'Teardrop earrings painted with miniature floral art.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Acrylic', 'Silver-plated Hooks'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 8, isNew: true, isBestseller: false, isSale: true,
    tags: ['floral', 'painted', 'miniature'], occasion: ['Office Wear', 'College / Gen-Z'], colorFamily: ['Blue', 'White'], createdAt: '2023-11-15'
  },
  {
    id: 'er-003', slug: 'tara-3d-art-earrings', name: 'Tara 3D-Art Earrings', price: 850, mainCategory: 'Earring', subCategory: '3D-Art Earring', collection: ['Statement Pieces'],
    shortDescription: 'Sculptural earrings mimicking lotus petals.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Gold polished hooks'],
    careInstructions: careInstructionsDefault, stockStatus: 'made_to_order', stockQuantity: 0, isNew: false, isBestseller: true, isSale: false,
    tags: ['sculptural', 'lotus', '3d'], occasion: ['Festive', 'Wedding Guest'], colorFamily: ['Pink', 'Gold'], createdAt: '2023-07-05'
  },
  {
    id: 'er-004', slug: 'mrinal-textured-earrings', name: 'Mrinal Textured Earrings', price: 450, mainCategory: 'Earring', subCategory: 'Textured Earring', collection: ['Everyday Lightweight'],
    shortDescription: 'Earthy, unpainted terracotta with a rustic scratched texture.',
    images: ['/images/mridula_set.svg'], materials: ['Raw Terracotta'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 15, isNew: false, isBestseller: false, isSale: false,
    tags: ['raw', 'earthy', 'textured'], occasion: ['Daily Wear'], colorFamily: ['Terracotta'], createdAt: '2023-04-20'
  },
  {
    id: 'er-005', slug: 'bindu-cone-shaped-jhumka', name: 'Bindu Cone Shaped Jhumka', price: 700, mainCategory: 'Earring', subCategory: 'Cone Shaped Jhumka', collection: ['New Arrivals'],
    shortDescription: 'Sleek, elongated cone jhumkas with oxidized silver look paint.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Metallic Paint'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 5, isNew: true, isBestseller: false, isSale: false,
    tags: ['modern', 'jhumka', 'oxidized-look'], occasion: ['College / Gen-Z', 'Daily Wear'], colorFamily: ['Silver', 'Black'], createdAt: '2023-12-01'
  },
  {
    id: 'er-006', slug: 'diya-regular-earring', name: 'Diya Regular Earring', price: 350, mainCategory: 'Earring', subCategory: 'Regular Earring', collection: ['Everyday Lightweight', 'Return Gifts'],
    shortDescription: 'Simple, highly polished terracotta studs for daily wear.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Steel Posts'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 20, isNew: false, isBestseller: true, isSale: false,
    tags: ['studs', 'everyday', 'minimal'], occasion: ['Daily Wear', 'Office Wear', 'Gifting'], colorFamily: ['Maroon'], createdAt: '2023-02-10'
  },
  {
    id: 'er-007', slug: 'sitara-painted-earring', name: 'Sitara Painted Earring', price: 450, mainCategory: 'Earring', subCategory: 'Painted Earring', collection: ['Everyday Lightweight'],
    shortDescription: 'Star-shaped earrings with metallic bronze highlights.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 6, isNew: false, isBestseller: false, isSale: false,
    tags: ['stars', 'bronze', 'celestial'], occasion: ['College / Gen-Z', 'Daily Wear'], colorFamily: ['Bronze', 'Black'], createdAt: '2023-06-25'
  },
  {
    id: 'er-008', slug: 'malathi-traditional-jhumka', name: 'Malathi Traditional Jhumka', price: 750, mainCategory: 'Earring', subCategory: 'Traditional Jhumka', collection: ['Festive Wear'],
    shortDescription: 'Double-tiered traditional jhumkas for special occasions.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Ghungroos'],
    careInstructions: careInstructionsDefault, stockStatus: 'out_of_stock', stockQuantity: 0, isNew: false, isBestseller: false, isSale: false,
    tags: ['bridal', 'heavy', 'tiered'], occasion: ['Festive', 'Wedding Guest'], colorFamily: ['Gold', 'Red'], createdAt: '2023-08-05'
  },
  {
    id: 'er-009', slug: 'bhavya-painted-earrings', name: 'Bhavya Painted Earrings', price: 600, mainCategory: 'Earring', subCategory: 'Painted Earring', collection: ['New Arrivals'],
    shortDescription: 'Square terracotta earrings with abstract tribal art.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Acrylic'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 8, isNew: true, isBestseller: false, isSale: false, tags: ['tribal', 'abstract'], occasion: ['Office Wear'], colorFamily: ['Multicolor', 'Black'], createdAt: '2023-11-25'
  },
  {
    id: 'er-010', slug: 'rati-3d-art-earrings', name: 'Rati 3D-Art Earrings', price: 900, mainCategory: 'Earring', subCategory: '3D-Art Earring', collection: ['Statement Pieces'],
    shortDescription: 'Elaborate rose flower sculpted entirely out of clay.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Paints'],
    careInstructions: careInstructionsDefault, stockStatus: 'made_to_order', stockQuantity: 0, isNew: false, isBestseller: false, isSale: false, tags: ['rose', 'sculptural', 'floral'], occasion: ['Festive'], colorFamily: ['Red', 'Green'], createdAt: '2023-09-15'
  },
  {
    id: 'er-011', slug: 'nisha-textured-earrings', name: 'Nisha Textured Earrings', price: 500, mainCategory: 'Earring', subCategory: 'Textured Earring', collection: ['Everyday Lightweight'],
    shortDescription: 'Round hoops with a hammered clay texture finish.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 10, isNew: false, isBestseller: false, isSale: false, tags: ['hoops', 'hammered', 'textured'], occasion: ['Daily Wear'], colorFamily: ['Terracotta', 'Brown'], createdAt: '2023-10-05'
  },
  {
    id: 'er-012', slug: 'gita-regular-earring', name: 'Gita Regular Earring', price: 400, originalPrice: 500, mainCategory: 'Earring', subCategory: 'Regular Earring', collection: ['Sale', 'Return Gifts'],
    shortDescription: 'Tiny elephant-shaped terracotta studs.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Steel Posts'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 15, isNew: false, isBestseller: true, isSale: true, tags: ['elephant', 'cute', 'studs'], occasion: ['Gifting', 'Daily Wear'], colorFamily: ['Grey', 'Black'], createdAt: '2023-03-12'
  },

  // Accessories (8)
  {
    id: 'acc-001', slug: 'kamala-finger-ring', name: 'Kamala Finger Ring', price: 350, mainCategory: 'Finger Ring', subCategory: 'Finger Ring', collection: ['Everyday Lightweight'],
    shortDescription: 'Adjustable brass ring featuring a sculpted terracotta lotus.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Adjustable Brass Base'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 10, isNew: true, isBestseller: false, isSale: false,
    tags: ['ring', 'floral', 'lotus'], occasion: ['Daily Wear', 'Festive'], colorFamily: ['Pink', 'Gold'], createdAt: '2023-10-20'
  },
  {
    id: 'acc-002', slug: 'navya-finger-ring', name: 'Navya Finger Ring', price: 250, mainCategory: 'Finger Ring', subCategory: 'Finger Ring', collection: ['Return Gifts'],
    shortDescription: 'Simple dome-shaped painted ring.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Adjustable Base'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 12, isNew: false, isBestseller: true, isSale: false,
    tags: ['ring', 'minimal', 'dome'], occasion: ['Gifting', 'Daily Wear'], colorFamily: ['Multicolor'], createdAt: '2023-04-15'
  },
  {
    id: 'acc-003', slug: 'ruchika-bangle', name: 'Ruchika Bangle', price: 950, mainCategory: 'Bangles', subCategory: 'Bangles', collection: ['Statement Pieces'],
    shortDescription: 'Chunky terracotta bangle with carved ethnic patterns.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta'],
    careInstructions: careInstructionsDefault, stockStatus: 'made_to_order', stockQuantity: 0, isNew: false, isBestseller: false, isSale: false,
    tags: ['bangle', 'chunky', 'ethnic'], occasion: ['Festive', 'Traditional Function'], colorFamily: ['Terracotta'], createdAt: '2023-07-28'
  },
  {
    id: 'acc-008', slug: 'pritha-bangle', name: 'Pritha Bangle Set', price: 1200, mainCategory: 'Bangles', subCategory: 'Bangles', collection: ['Festive Wear'],
    shortDescription: 'Set of two thin terracotta bangles with mirror work.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Mirrors'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 4, isNew: true, isBestseller: false, isSale: false, tags: ['bangle', 'mirrors', 'set'], occasion: ['Festive'], colorFamily: ['Red', 'Green', 'Silver'], createdAt: '2023-11-05'
  },
  {
    id: 'acc-004', slug: 'vasanti-back-clip', name: 'Vasanti Back Clip', price: 450, mainCategory: 'Back Clip', subCategory: 'Back Clip', collection: ['Everyday Lightweight'],
    shortDescription: 'Hair clip decorated with painted terracotta flowers.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Metal French Barrette'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 5, isNew: true, isBestseller: false, isSale: false,
    tags: ['hair', 'floral', 'clip'], occasion: ['Daily Wear', 'Festive'], colorFamily: ['Yellow', 'Green'], createdAt: '2023-12-08'
  },
  {
    id: 'acc-005', slug: 'mayur-brooch', name: 'Mayur Brooch', price: 500, mainCategory: 'Brooch', subCategory: 'Brooch', collection: ['Statement Pieces'],
    shortDescription: 'Peacock inspired terracotta brooch to pin on sarees.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Pin Back'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 8, isNew: false, isBestseller: true, isSale: false,
    tags: ['saree', 'peacock', 'brooch'], occasion: ['Festive', 'Traditional Function'], colorFamily: ['Blue', 'Green', 'Gold'], createdAt: '2023-01-25'
  },
  {
    id: 'acc-006', slug: 'lavanya-hair-pin', name: 'Lavanya Hair Pin', price: 250, mainCategory: 'Hair Pin', subCategory: 'Hair Pin', collection: ['Return Gifts'],
    shortDescription: 'U-shaped hair pin topped with a terracotta bead.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Brass Plated Steel'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 15, isNew: false, isBestseller: false, isSale: false,
    tags: ['hair', 'minimal', 'pin'], occasion: ['Gifting', 'Daily Wear'], colorFamily: ['Terracotta'], createdAt: '2023-05-30'
  },
  {
    id: 'acc-007', slug: 'shikha-hair-stick', name: 'Shikha Hair Stick', price: 650, mainCategory: 'Hair Stick', subCategory: 'Hair Stick', collection: ['Statement Pieces'],
    shortDescription: 'Wooden hair stick adorned with an intricately carved terracotta finial.',
    images: ['/images/mridula_set.svg'], materials: ['Terracotta', 'Sandalwood'],
    careInstructions: careInstructionsDefault, stockStatus: 'in_stock', stockQuantity: 4, isNew: true, isBestseller: false, isSale: false,
    tags: ['hair', 'wood', 'stick'], occasion: ['Festive'], colorFamily: ['Brown', 'Terracotta'], createdAt: '2023-11-10'
  }
]);
