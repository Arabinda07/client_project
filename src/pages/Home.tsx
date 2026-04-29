import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/product/ProductCard';
import { mockProducts } from '../lib/data/mockProducts';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../components/layout/SEO';

export const Home = () => {
  // TODO: Replace with Supabase fetch
  // const { data: featuredSets } = await supabase.from('products').select('*').eq('mainCategory', 'Terracotta Set').limit(4);
  const featuredSets = mockProducts.filter(p => p.mainCategory === 'Terracotta Set').slice(0, 4);
  const newArrivals = mockProducts.filter(p => p.collection?.includes('New Arrivals')).slice(0, 4);
  const bestsellers = mockProducts.filter(p => p.collection?.includes('Bestsellers')).slice(0, 4);

  return (
    <div className="flex flex-col">
      <SEO 
        title="Handcrafted Terracotta Jewellery"
        description="Discover our collection of premium, lightweight terracotta jewellery that bridges traditional Indian motifs with contemporary elegance."
        keywords="terracotta jewellery, handmade, indian artisan, goonjaa, terracotta necklace"
      />
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row min-h-[90vh] bg-warm-ivory w-full relative overflow-hidden">
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-16 h-[1px] bg-terracotta mb-6"
          />
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-terracotta type-overline mb-6 block"
          >
            Artisan Handcrafted Jewelry
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="type-display mb-8 text-gray-900"
          >
            Soulful clay,<br/>
            <span className="italic text-terracotta-dark">sculpted by hand.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-600 max-w-md mb-10 type-body-large"
          >
            Discover our collection of premium, lightweight terracotta jewellery that bridges traditional Indian motifs with contemporary elegance. A woman-led studio celebrating the raw beauty of earth.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link to="/shop">
              <Button size="lg" className="w-full sm:w-auto uppercase text-xs tracking-widest px-8">Explore Collection</Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto uppercase text-xs tracking-widest">Our Story</Button>
            </Link>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-full">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute inset-0"
          >
            <img 
              src="https://placehold.co/1200x1600/D9D1C1/7D2E24?text=Editorial+Shot" 
              alt="Editorial Terracotta Jewellery" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-warm-ivory via-transparent to-transparent lg:w-1/4"></div>
          </motion.div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-24 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-terracotta type-overline mb-4">Curated Selections</span>
          <h2 className="type-h1 text-gray-900 italic">Signature Styles</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 lg:gap-8 h-auto md:h-[600px] lg:h-[700px]">
          {[
            { title: 'Necklace Sets', img: 'https://placehold.co/800x1200/E5E1D8/7D2E24?text=Necklace+Sets', link: '/category/Terracotta Set', gridClass: 'md:col-span-6 md:row-span-2' },
            { title: 'Statement Earrings', img: 'https://placehold.co/800x1200/D9D1C1/2D2926?text=Earrings', link: '/category/Earring', gridClass: 'md:col-span-6 md:row-span-1' },
            { title: 'Rings & Bangles', img: 'https://placehold.co/800x1200/F5F2ED/5C554E?text=Rings+%26+Bangles', link: '/shop?collection=statement-pieces', gridClass: 'md:col-span-3 md:row-span-1' },
            { title: 'Hair Accessories', img: 'https://placehold.co/800x1200/FDFCF8/B35C38?text=Hair+Accessories', link: '/category/Hair Pin', gridClass: 'md:col-span-3 md:row-span-1' }
          ].map((cat, i) => (
            <Link key={i} to={cat.link} className={`group relative overflow-hidden block aspect-square md:aspect-auto ${cat.gridClass}`}>
              <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/10 to-transparent flex flex-col justify-end p-8">
                <span className="text-white type-h3 mb-2 group-hover:text-terracotta transition-colors">{cat.title}</span>
                <span className="text-white/80 type-caption uppercase tracking-widest font-bold">Discover</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full border-t border-gray-100">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-terracotta type-overline mb-4 block">Fresh from the kiln</span>
            <h2 className="type-h1 text-gray-900">New Arrivals</h2>
          </div>
          <Link to="/shop?sort=newest" className="hidden sm:inline-flex items-center type-caption uppercase tracking-widest font-bold text-terracotta hover:text-gray-900 transition-colors">
            View All Collection →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-12">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 text-center sm:hidden">
          <Link to="/shop?sort=newest">
            <Button variant="outline" fullWidth>View All</Button>
          </Link>
        </div>
      </section>

      {/* Meet the Artist Preview */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-1 flex flex-col">
            <span className="text-terracotta type-overline mb-6 block">Meet the Artist Behind the Jewellery</span>
            <h2 className="type-h1 text-gray-900 mb-6 italic">A lifelong symphony of music and clay.</h2>
            <p className="text-gray-600 mb-6">
              "I have been learning classical music since I was two and a half years old. For me, shaping clay is no different from singing a Raag. Both require patience, devotion, and a deep respect for roots."
            </p>
            <p className="text-gray-600 mb-10">
              During the stillness of the pandemic, a lifelong love for drawing and design found its way into terracotta. Today, every piece of Goonjaa is a single artisan's exploration of traditional shapes crafted for modern wardrobes. No two pieces are ever exactly the same.
            </p>
            <div>
              <Link to="/about">
                <Button variant="outline" className="text-xs tracking-widest uppercase px-8 flex gap-2 items-center">Read the Full Story <ArrowRight size={16} /></Button>
              </Link>
            </div>
          </div>
          <div className="order-2 relative aspect-[4/5] bg-gray-100 overflow-hidden group">
            <img src="https://placehold.co/1000x1200/E5E1D8/7D2E24?text=Founder+Portrait" alt="Goonjaa Founder" className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-1000 group-hover:scale-105" />
          </div>
        </div>
      </section>

      {/* Brand Values Section */}
      <section className="py-32 bg-gray-900 text-warm-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <span className="text-terracotta type-overline mb-8 block">Our Philosophy</span>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 border-t border-white/10 pt-16">
            <div className="lg:col-span-7">
               <h2 className="type-display mb-12 font-light">
                 Each piece is a <span className="italic text-terracotta">labor of love</span>, carefully molded, sun-dried, baked, and painted by a single woman artisan preserving the heritage of Indian terracotta art.
               </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-12">
               <div className="flex flex-col">
                  <span className="type-h2 mb-2 text-terracotta">01</span>
                  <span className="type-h3 mb-2 text-white">Hand Molded</span>
                  <span className="type-body text-white/70">No molds are ever used. Every shape is sculpted from raw earth.</span>
               </div>
               <div className="flex flex-col">
                  <span className="type-h2 mb-2 text-terracotta">02</span>
                  <span className="type-h3 mb-2 text-white">Earth Friendly</span>
                  <span className="type-body text-white/70">Organic materials that eventually return to nature.</span>
               </div>
               <div className="flex flex-col">
                  <span className="type-h2 mb-2 text-terracotta">03</span>
                  <span className="type-h3 mb-2 text-white">Skin Safe</span>
                  <span className="type-body text-white/70">Naturally hypoallergenic, ultra-lightweight, and comfortable all day.</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Highlight */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative aspect-[4/5] bg-gray-100 overflow-hidden">
            <img src="https://placehold.co/1000x1200/F5F2ED/5C554E?text=Bespoke+Orders" alt="Custom Terracotta Orders" className="w-full h-full object-cover mix-blend-multiply opacity-90" />
          </div>
          <div className="order-1 lg:order-2 flex flex-col lg:pl-12">
            <span className="text-terracotta type-overline mb-6 block">Bespoke Creations</span>
            <h2 className="type-h1 text-gray-900 mb-6 italic">Commission a one-of-a-kind masterpiece.</h2>
            <p className="text-gray-600 mb-10">
              Can't find exactly what you're looking for? We specialize in custom-made terracotta jewellery perfectly color-matched to your festive or bridal wear. From concept sketch to final painted details, experience a personalized artisan journey.
            </p>
            <div>
              <Link to="/custom-orders">
                <Button variant="outline" className="text-xs tracking-widest uppercase px-8">Inquire Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed / Community */}
      <section className="py-20 bg-warm-ivory/50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <span className="text-terracotta type-overline mb-4 block">Join the community</span>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-block group mb-12">
              <h2 className="type-h1 text-gray-900 group-hover:text-terracotta transition-colors">@goonjaa.srijita</h2>
            </a>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 relative overflow-hidden group border border-gray-100">
                  <img src={`https://placehold.co/400x400/D9D1C1/7D2E24?text=IG+Post+${i}`} alt="Instagram Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gray-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white type-overline border-b border-white pb-1">Shop Look</span>
                  </div>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Newsletter */}
      <section className="bg-warm-ivory py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-6 flex flex-col items-center">
          <h2 className="type-h1 text-gray-900">Join our Studio</h2>
          <p className="text-gray-600">Subscribe for early access to new collections, exclusive discounts, and peeks into our firing process.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              required
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta bg-white"
            />
            <Button type="submit" className="w-full sm:w-auto">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
};
