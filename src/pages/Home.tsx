import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/product/ProductCard';
import { mockProducts } from '../lib/data/mockProducts';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../components/layout/SEO';
import { brand } from '../lib/brand';

export const Home = () => {
  // TODO: Replace with Supabase fetch
  // const { data: featuredSets } = await supabase.from('products').select('*').eq('mainCategory', 'Terracotta Set').limit(4);
  const featuredSets = mockProducts.filter(p => p.mainCategory === 'Terracotta Set').slice(0, 4);
  const newArrivals = mockProducts.filter(p => p.collection?.includes('New Arrivals')).slice(0, 4);
  const bestsellers = mockProducts.filter(p => p.collection?.includes('Bestsellers')).slice(0, 4);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  return (
    <div className="flex flex-col">
      <SEO 
        title="Handcrafted Terracotta Jewellery"
        description="Discover lightweight terracotta jewellery that brings traditional Indian motifs into modern wardrobes."
        keywords="terracotta jewellery, handmade, indian artisan, goonjaa, terracotta necklace"
      />
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100dvh-7rem)] w-full flex-col overflow-hidden bg-warm-ivory pt-16 lg:min-h-[calc(100dvh-6rem)] lg:flex-row lg:pt-0">
        <div className="z-10 flex w-full flex-col justify-center p-6 sm:p-12 lg:w-5/12 lg:p-20 xl:p-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-9 h-[2px] w-12 bg-terracotta"
          />
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-7 block text-terracotta-dark type-overline"
          >
            Artisan Handcrafted Jewellery
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-gray-900 type-display display-airy sm:mb-10"
          >
            Soulful clay,<br/>
            <span className="display-accent display-italic text-terracotta">sculpted<br className="sm:hidden"/> by hand.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-10 max-w-md text-gray-600 type-body-large sm:mb-12"
          >
            Lightweight terracotta jewellery, sculpted and painted by hand for sarees, dresses, and every mood in between. A woman-led studio celebrating the raw beauty of earth.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8"
          >
            <Link to="/shop">
              <Button size="lg" className="w-full sm:w-auto">Explore Collection</Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" size="lg" className="w-full px-0 hover:bg-transparent hover:text-terracotta sm:w-auto">Our Story</Button>
            </Link>
          </motion.div>
        </div>

        <div className="relative mt-10 min-h-[54vh] w-full lg:mt-0 lg:min-h-[calc(100dvh-6rem)] lg:w-7/12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="absolute inset-x-4 inset-y-8 flex items-center justify-center overflow-hidden rounded-[2px] border border-border-soft bg-[radial-gradient(circle_at_48%_28%,rgba(179,92,56,0.13),transparent_34%),linear-gradient(135deg,#F7F0E7,#E4D8CA)] p-8 text-center lg:inset-y-20 lg:left-0 lg:right-12"
          >
             <span className="max-w-xs font-serif text-3xl display-logo display-italic leading-tight text-terracotta-dark/80">Clay, color, and quiet hands</span>
          </motion.div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-10 lg:py-28">
        <div className="mb-16 flex flex-col items-center text-center lg:mb-20">
          <span className="mb-5 block text-terracotta-dark type-overline">Curated Selections</span>
          <h2 className="type-display text-gray-900">Signature Styles</h2>
        </div>
        
        <div className="grid h-auto grid-cols-1 gap-5 md:h-[600px] md:grid-cols-12 md:grid-rows-2 lg:h-[760px] lg:gap-8">
          {[
            { title: 'Necklace Sets', link: '/category/Terracotta Set', gridClass: 'md:col-span-6 md:row-span-2' },
            { title: 'Statement Earrings', link: '/category/Earring', gridClass: 'md:col-span-5 md:col-start-8 md:row-span-1 mt-0 md:mt-12' },
            { title: 'Rings & Bangles', link: '/category/Bangles', gridClass: 'md:col-span-3 md:col-start-7 md:row-span-1 mb-0 md:mb-12' },
            { title: 'Hair Accessories', link: '/category/Hair Pin', gridClass: 'md:col-span-3 md:col-start-10 md:row-span-1 mt-0 md:mt-16' }
          ].map((cat, i) => (
            <Link key={i} to={cat.link} className={`group relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-[2px] border border-border-soft bg-[radial-gradient(circle_at_50%_28%,rgba(179,92,56,0.1),transparent_34%),linear-gradient(135deg,#F8F1E8,#E8DED4)] p-8 text-center transition-colors hover:border-terracotta/40 md:aspect-auto lg:p-10 ${cat.gridClass}`}>
              <span className="text-gray-900 type-h2 mb-4 font-serif display-logo group-hover:text-terracotta transition-colors">{cat.title}</span>
              <span className="font-semibold uppercase tracking-[0.12em] text-gray-600 type-caption">Discover</span>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mx-auto w-full max-w-7xl border-t border-border-soft px-4 py-24 sm:px-6 lg:px-10 lg:py-28">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="mb-5 block text-terracotta-dark type-overline">Fresh from the kiln</span>
            <h2 className="type-display text-gray-900">New Arrivals</h2>
          </div>
          <Link to="/shop" className="hidden items-center border-b border-terracotta pb-1 font-semibold uppercase tracking-[0.12em] text-terracotta transition-colors hover:border-gray-900 hover:text-gray-900 type-caption sm:inline-flex">
            View Collection
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 text-center sm:hidden">
          <Link to="/shop">
            <Button variant="outline" fullWidth>View All</Button>
          </Link>
        </div>
      </section>

      {/* Meet the Artist Preview */}
      <section className="mx-auto max-w-7xl border-t border-border-soft px-4 py-24 sm:px-6 lg:px-10 lg:py-30">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-28">
          <div className="order-1 lg:order-1 w-full lg:w-5/12 flex flex-col">
            <span className="mb-7 block text-terracotta-dark type-overline">Meet the Artist Behind the Jewellery</span>
            <h2 className="type-h1 text-gray-900 mb-8">A lifelong symphony of music and clay.</h2>
            <p className="type-body-large text-gray-600 mb-8">
              "I have been learning classical music since I was two and a half years old. For me, shaping clay is no different from singing a Raag. Both require patience, devotion, and a deep respect for roots."
            </p>
            <p className="type-body text-gray-600 mb-12">
              During the stillness of the pandemic, a lifelong love for drawing and design found its way into terracotta. Today, every piece of {brand.name} is a single artisan's exploration of traditional shapes crafted for modern wardrobes. No two pieces are ever exactly the same.
            </p>
            <div>
              <Link to="/about">
                <Button variant="outline" className="flex w-max items-center gap-3 px-10 py-4">
                  Read the Full Story <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative order-2 flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-[2px] border border-border-soft bg-[radial-gradient(circle_at_50%_28%,rgba(125,46,36,0.1),transparent_34%),linear-gradient(135deg,#F7F0E7,#E5D9CB)] p-8 text-center lg:order-2 lg:ml-auto lg:w-6/12">
            <span className="font-serif text-3xl display-logo display-italic text-terracotta-dark/85">The artist behind the clay</span>
          </div>
        </div>
      </section>

      {/* Brand Values Section */}
      <section className="bg-gray-900 py-24 text-warm-ivory lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <span className="mb-8 block text-antique-gold type-overline">Our Philosophy</span>
          <div className="grid grid-cols-1 gap-16 border-t border-warm-ivory/12 pt-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
               <h2 className="type-h2 mb-12 font-light leading-relaxed">
                 Each piece is a <span className="display-accent display-italic text-antique-gold">labor of love</span>, carefully molded, sun-dried, baked, and painted by a single woman artisan preserving the heritage of Indian terracotta art.
               </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-12">
               <div className="flex flex-col">
                  <span className="type-h2 mb-2 text-antique-gold">01</span>
                  <span className="type-h3 mb-2 text-warm-ivory">Hand Molded</span>
                  <span className="type-body text-warm-ivory/70">No molds are ever used. Every shape is sculpted from raw earth.</span>
               </div>
               <div className="flex flex-col">
                  <span className="type-h2 mb-2 text-antique-gold">02</span>
                  <span className="type-h3 mb-2 text-warm-ivory">Earth Friendly</span>
                  <span className="type-body text-warm-ivory/70">Organic materials that eventually return to nature.</span>
               </div>
               <div className="flex flex-col">
                  <span className="type-h2 mb-2 text-antique-gold">03</span>
                  <span className="type-h3 mb-2 text-warm-ivory">Skin Safe</span>
                  <span className="type-body text-warm-ivory/70">Naturally hypoallergenic, ultra-lightweight, and comfortable all day.</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Highlight */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10 lg:py-28">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-24">
          <div className="relative order-2 flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-[2px] border border-border-soft bg-[radial-gradient(circle_at_50%_30%,rgba(184,137,46,0.16),transparent_34%),linear-gradient(135deg,#F8F1E8,#E8DED4)] p-8 text-center text-terracotta lg:order-1 lg:w-5/12">
             <span className="font-serif text-3xl display-logo display-italic">Made slowly, repeated with care</span>
          </div>
          <div className="order-1 lg:order-2 w-full lg:w-6/12 flex flex-col lg:pl-12">
            <span className="mb-7 block text-terracotta-dark type-overline">Bulk Orders</span>
            <h2 className="type-h1 text-gray-900 mb-8">Repeat an existing design for your gathering.</h2>
            <p className="type-body-large text-gray-600 mb-12">
              Planning return gifts or a small batch for an event? Choose a catalogue piece, select one of its available colours, and book at least two months ahead so the studio has time to shape, dry, bake, and paint every piece by hand.
            </p>
            <div>
              <Link to="/bulk-orders">
                <Button variant="outline" className="w-max px-12 py-4">Plan a Bulk Order</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed / Community */}
      <section className="border-t border-border-soft bg-studio-wash/55 py-24 lg:py-28">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <span className="mb-5 block text-terracotta-dark type-overline">Join the community</span>
            <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-block group mb-16">
              <h2 className="type-display text-gray-900 group-hover:text-terracotta transition-colors">{brand.instagramHandle}</h2>
            </a>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {['Fresh kiln notes', 'Painted clay details', 'Earth-toned pairings', 'Studio shelf finds'].map((label, i) => (
                <div key={i} className={`group relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-[2px] border border-border-soft bg-surface p-6 text-center ${i % 2 === 0 ? 'mt-0 md:mt-12' : 'mt-0'}`}>
                  <span className="type-body font-medium text-terracotta mb-4">{label}</span>
                  <div className="absolute inset-0 flex items-center justify-center bg-warm-ivory/75 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="border-b border-gray-900 pb-1 font-semibold uppercase tracking-[0.12em] text-gray-900 type-caption">Shop Look</span>
                  </div>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border-soft bg-warm-ivory px-4 py-24 text-center lg:py-28">
        <div className="max-w-2xl mx-auto space-y-8 flex flex-col items-center">
          <h2 className="type-display text-gray-900">Join our Studio</h2>
          <p className="type-body-large text-gray-600 max-w-lg">Subscribe for early access to new collections, exclusive discounts, and peeks into our firing process.</p>
          {newsletterSuccess && (
            <p className="type-caption text-terracotta-dark" role="status">
              Thank you. You are on the studio list.
            </p>
          )}
          <form
            className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto pt-6"
            onSubmit={(e) => {
              e.preventDefault();
              setNewsletterSuccess(true);
              setNewsletterEmail('');
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input 
              id="newsletter-email"
              type="email" 
              placeholder="Enter your email address" 
              required
              value={newsletterEmail}
              onChange={(event) => {
                setNewsletterEmail(event.target.value);
                setNewsletterSuccess(false);
              }}
              className="min-h-14 flex-1 border-b-2 border-gray-300 bg-transparent px-6 py-4 transition-colors focus:border-terracotta focus:outline-none type-body"
            />
            <Button type="submit" className="w-full px-8 sm:w-auto">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
};
