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
      <section className="flex flex-col lg:flex-row min-h-screen bg-warm-ivory w-full relative overflow-hidden pt-24 lg:pt-0">
        <div className="w-full lg:w-5/12 p-6 sm:p-12 lg:p-20 xl:p-32 flex flex-col justify-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-12 h-[2px] bg-terracotta mb-10"
          />
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-terracotta type-overline mb-8 block"
          >
            Artisan Handcrafted Jewelry
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="type-display mb-10 text-gray-900"
          >
            Soulful clay,<br/>
            <span className="italic text-terracotta">sculpted by hand.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-600 max-w-md mb-12 type-body-large"
          >
            Discover our collection of premium, lightweight terracotta jewellery that bridges traditional Indian motifs with contemporary elegance. A woman-led studio celebrating the raw beauty of earth.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-8 items-start sm:items-center"
          >
            <Link to="/shop">
              <Button size="lg" className="w-full sm:w-auto uppercase type-caption tracking-widest px-10 py-5 h-auto">Explore Collection</Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto uppercase type-caption tracking-widest px-0 hover:bg-transparent hover:text-terracotta">Our Story</Button>
            </Link>
          </motion.div>
        </div>

        <div className="w-full lg:w-7/12 relative min-h-[60vh] lg:min-h-screen mt-12 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="absolute inset-y-12 lg:inset-y-24 right-4 lg:right-12 left-4 lg:left-0 overflow-hidden bg-gray-200 border border-gray-300 flex items-center justify-center p-8 text-center"
          >
             <span className="type-h3 italic text-terracotta">Editorial Hero Showcase</span>
          </motion.div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-32 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center mb-20 lg:mb-24">
          <span className="text-terracotta type-overline mb-6 block">Curated Selections</span>
          <h2 className="type-display text-gray-900 italic">Signature Styles</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 lg:gap-8 h-auto md:h-[600px] lg:h-[800px]">
          {[
            { title: 'Necklace Sets', link: '/category/Terracotta Set', gridClass: 'md:col-span-6 md:row-span-2' },
            { title: 'Statement Earrings', link: '/category/Earring', gridClass: 'md:col-span-5 md:col-start-8 md:row-span-1 mt-0 md:mt-12' },
            { title: 'Rings & Bangles', link: '/shop?collection=statement-pieces', gridClass: 'md:col-span-3 md:col-start-7 md:row-span-1 mb-0 md:mb-12' },
            { title: 'Hair Accessories', link: '/category/Hair Pin', gridClass: 'md:col-span-3 md:col-start-10 md:row-span-1 mt-0 md:mt-16' }
          ].map((cat, i) => (
            <Link key={i} to={cat.link} className={`group relative overflow-hidden block aspect-[4/5] md:aspect-auto bg-gray-200 border border-gray-100 flex flex-col items-center justify-center p-8 lg:p-10 text-center hover:bg-gray-300 transition-colors ${cat.gridClass}`}>
              <span className="text-gray-900 type-h2 mb-4 font-serif italic group-hover:text-terracotta transition-colors">{cat.title}</span>
              <span className="text-gray-600 type-caption uppercase tracking-widest font-bold">Discover</span>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-32 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto w-full border-t border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
          <div>
            <span className="text-terracotta type-overline mb-6 block">Fresh from the kiln</span>
            <h2 className="type-display text-gray-900">New Arrivals</h2>
          </div>
          <Link to="/shop?sort=newest" className="hidden sm:inline-flex items-center type-caption uppercase tracking-widest font-bold text-terracotta hover:text-gray-900 transition-colors border-b border-terracotta pb-1 hover:border-gray-900">
            View All Collection →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 gap-y-16">
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
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 border-t border-gray-100">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center">
          <div className="order-1 lg:order-1 w-full lg:w-5/12 flex flex-col">
            <span className="text-terracotta type-overline mb-8 block">Meet the Artist Behind the Jewellery</span>
            <h2 className="type-h1 text-gray-900 mb-8 italic">A lifelong symphony of music and clay.</h2>
            <p className="type-body-large text-gray-600 mb-8">
              "I have been learning classical music since I was two and a half years old. For me, shaping clay is no different from singing a Raag. Both require patience, devotion, and a deep respect for roots."
            </p>
            <p className="type-body text-gray-600 mb-12">
              During the stillness of the pandemic, a lifelong love for drawing and design found its way into terracotta. Today, every piece of Goonjaa is a single artisan's exploration of traditional shapes crafted for modern wardrobes. No two pieces are ever exactly the same.
            </p>
            <div>
              <Link to="/about">
                <Button variant="outline" className="type-caption tracking-widest uppercase px-10 py-4 h-auto flex gap-3 items-center w-max hover:bg-gray-50">
                  Read the Full Story <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
          <div className="order-2 lg:order-2 w-full lg:w-6/12 lg:ml-auto relative aspect-[4/5] bg-warm-ivory border border-gray-200 overflow-hidden flex flex-col items-center justify-center p-8 text-center">
            <span className="type-h3 italic text-terracotta">Portrait of the Founder</span>
          </div>
        </div>
      </section>

      {/* Brand Values Section */}
      <section className="py-32 bg-gray-900 text-warm-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <span className="text-terracotta type-overline mb-8 block">Our Philosophy</span>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 border-t border-white/10 pt-16">
            <div className="lg:col-span-7">
               <h2 className="type-h2 mb-12 font-light leading-relaxed">
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
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 w-full lg:w-5/12 relative aspect-[4/5] bg-warm-ivory border border-gray-200 overflow-hidden flex flex-col items-center justify-center p-8 text-center text-terracotta">
             <span className="type-h3 italic">Bespoke Ordering Process</span>
          </div>
          <div className="order-1 lg:order-2 w-full lg:w-6/12 flex flex-col lg:pl-12">
            <span className="text-terracotta type-overline mb-8 block">Bespoke Creations</span>
            <h2 className="type-h1 text-gray-900 mb-8 italic">Commission a one-of-a-kind masterpiece.</h2>
            <p className="type-body-large text-gray-600 mb-12">
              Can't find exactly what you're looking for? We specialize in custom-made terracotta jewellery perfectly color-matched to your festive or bridal wear. From concept sketches to final painted details, we create every piece specifically for you.
            </p>
            <div>
              <Link to="/custom-orders">
                <Button variant="outline" className="type-caption tracking-widest uppercase px-12 py-4 h-auto w-max hover:bg-gray-50">Inquire Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed / Community */}
      <section className="py-32 bg-warm-ivory/50 border-t border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <span className="text-terracotta type-overline mb-6 block">Join the community</span>
            <a href="https://instagram.com/goonjaa.srijita" target="_blank" rel="noopener noreferrer" className="inline-block group mb-16">
              <h2 className="type-display text-gray-900 group-hover:text-terracotta transition-colors">@goonjaa.srijita</h2>
            </a>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`aspect-[4/5] bg-warm-ivory relative overflow-hidden group border border-gray-200 flex flex-col items-center justify-center p-6 text-center ${i % 2 === 0 ? 'mt-0 md:mt-12' : 'mt-0'}`}>
                  <span className="type-body text-terracotta italic mb-4">Instagram Post {i}</span>
                  <div className="absolute inset-0 bg-gray-950/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span className="text-gray-900 type-caption tracking-widest uppercase border-b border-gray-900 pb-1">Shop Look</span>
                  </div>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Newsletter */}
      <section className="bg-warm-ivory py-32 px-4 text-center border-t border-gray-200">
        <div className="max-w-2xl mx-auto space-y-8 flex flex-col items-center">
          <h2 className="type-display text-gray-900 italic">Join our Studio</h2>
          <p className="type-body-large text-gray-600 max-w-lg">Subscribe for early access to new collections, exclusive discounts, and peeks into our firing process.</p>
          <form className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto pt-6" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              className="flex-1 px-6 py-4 border-b-2 border-gray-300 focus:outline-none focus:border-terracotta bg-transparent transition-colors type-body"
            />
            <Button type="submit" className="w-full sm:w-auto type-caption uppercase tracking-widest px-8">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
};
