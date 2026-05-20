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
        <div className="z-10 flex w-full flex-col justify-center p-6 sm:p-12 lg:w-5/12 lg:p-16 xl:p-24">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-7 block text-terracotta-dark type-overline font-semibold tracking-widest"
          >
            Artisan Handcrafted Jewellery
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-gray-900 type-display display-normal sm:mb-10"
          >
            Soulful clay,<br/>
            <span className="display-accent text-terracotta font-serif font-bold">sculpted<br className="sm:hidden"/> by hand.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-10 max-w-md text-gray-600 type-body-large sm:mb-12"
          >
            Lightweight terracotta jewellery, sculpted and painted by hand for sarees, dresses, and every mood in between. A solo woman-led studio celebrating the raw rhythm of earth.
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
              <Button variant="ghost" size="lg" className="w-full px-0 hover:bg-transparent hover:text-terracotta sm:w-auto font-semibold">Our Story</Button>
            </Link>
          </motion.div>
        </div>

        {/* Asymmetrical Split Screen Hero Images */}
        <div className="relative mt-10 min-h-[60vh] w-full lg:mt-0 lg:min-h-[calc(100dvh-6rem)] lg:w-7/12 flex items-center justify-center p-6 sm:p-12 lg:p-16">
          <div className="relative w-full h-full max-w-2xl aspect-[4/3] lg:aspect-auto lg:h-[80%] flex items-center justify-center">
            {/* Background clay sculpting frame */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="absolute left-4 top-4 w-[60%] aspect-[4/5] z-10 double-bezel-outer"
            >
              <div className="double-bezel-inner overflow-hidden bg-studio-wash/30 border border-dashed border-border-soft">
                {/* Image container kept empty for actual artisan sculpting image */}
              </div>
            </motion.div>
            
            {/* Foreground model frame */}
            <motion.div
              initial={{ opacity: 0, x: -40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute right-4 bottom-4 w-[55%] aspect-[3/4] z-20 double-bezel-outer shadow-[0_30px_60px_rgba(49,39,31,0.12)]"
            >
              <div className="double-bezel-inner overflow-hidden bg-studio-wash/30 border border-dashed border-border-soft">
                {/* Image container kept empty for actual model styling image */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-10 lg:py-28">
        <div className="mb-16 flex flex-col items-center text-center lg:mb-20">
          <span className="mb-5 block text-terracotta-dark type-overline">Curated Selections</span>
          <h2 className="type-display text-gray-900">Signature Styles</h2>
        </div>
        
        <div className="grid h-auto grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-2 lg:gap-8">
          {[
            { title: 'Necklace Sets', link: '/category/Terracotta Set', gridClass: 'md:col-span-6 md:row-span-2' },
            { title: 'Statement Earrings', link: '/category/Earring', gridClass: 'md:col-span-6 md:row-span-1' },
            { title: 'Rings & Bangles', link: '/category/Bangles', gridClass: 'md:col-span-3 md:row-span-1' },
            { title: 'Hair Accessories', link: '/category/Hair Pin', gridClass: 'md:col-span-3 md:row-span-1' }
          ].map((cat, i) => (
            <Link 
              key={i} 
              to={cat.link} 
              className={`group flex flex-col double-bezel-outer transition-spring hover:-translate-y-1 h-[260px] md:h-auto ${cat.gridClass}`}
            >
              <div className="double-bezel-inner p-8 flex flex-col justify-between items-start">
                <span className="font-semibold uppercase tracking-[0.14em] text-terracotta/90 type-caption">Explore</span>
                <div>
                  <h3 className="text-gray-900 type-h2 mb-3 font-serif display-logo leading-tight">{cat.title}</h3>
                  <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-[0.12em] text-gray-500 type-caption transition-colors group-hover:text-terracotta">
                    Discover <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Slow Craft Process Timeline Strip */}
      <section className="bg-studio-wash/40 border-t border-b border-border-soft py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-14 flex flex-col items-center text-center">
            <span className="mb-4 block text-terracotta-dark type-overline font-semibold tracking-widest">Slow Clay Craft</span>
            <h2 className="type-display text-gray-900">How goonjaa is Shaped</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 relative">
            {[
              { num: '01', title: 'Shaping', desc: 'Raw clay is kneaded & sculpted, bead by bead, with water and patience.' },
              { num: '02', title: 'Sun-Drying', desc: 'Every piece dries slowly in the sun for 2–3 days to cure naturally.' },
              { num: '03', title: 'Baking', desc: 'Fired at 900°C in the kiln, transforming clay into solid terracotta.' },
              { num: '04', title: 'Painting', desc: 'Delicately detailed with fine brushes, acrylics, and brass findings.' }
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-start p-6 bg-studio-paper rounded-xl border border-border-soft/60 shadow-xs">
                <span className="font-serif text-3xl display-logo text-terracotta/30 mb-4 block font-bold">{step.num}</span>
                <h3 className="type-h3 text-gray-900 mb-2 font-serif font-bold">{step.title}</h3>
                <p className="type-body text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-px bg-border-soft/85 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-10 lg:py-28">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="mb-5 block text-terracotta-dark type-overline font-semibold">Fresh from the kiln</span>
            <h2 className="type-display text-gray-900">New Arrivals</h2>
          </div>
          <Link to="/shop" className="hidden items-center border-b border-terracotta pb-1 font-bold uppercase tracking-[0.12em] text-terracotta transition-colors hover:border-gray-900 hover:text-gray-900 type-caption sm:inline-flex">
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
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-24">
          <div className="w-full lg:w-5/12 flex flex-col">
            <span className="mb-7 block text-terracotta-dark type-overline font-semibold">Meet the Artist Behind the Jewellery</span>
            <h2 className="type-h1 text-gray-900 mb-8">A lifelong symphony of music and clay.</h2>
            <p className="type-body-large text-gray-600 mb-8 leading-relaxed">
              "I have been learning classical music since I was two and a half years old. For me, shaping clay is no different from singing a Raag. Both require patience, devotion, and a deep respect for roots."
            </p>
            <p className="type-body text-gray-600 mb-12 leading-relaxed">
              During the stillness of the pandemic, a lifelong love for drawing and design found its way into terracotta. Today, every piece of {brand.name} is a single artisan's exploration of traditional shapes crafted for modern wardrobes. No two pieces are ever exactly the same.
            </p>
            <div>
              <Link to="/about">
                <Button variant="outline" className="flex w-max items-center gap-3 px-10 py-4 font-semibold">
                  Read the Full Story <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="w-full lg:w-6/12 flex flex-col double-bezel-outer max-w-lg lg:ml-auto">
            <div className="double-bezel-inner overflow-hidden aspect-[4/5] bg-studio-wash/30 border border-dashed border-border-soft">
              {/* Image container kept empty for actual founder studio image */}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values Section */}
      <section className="bg-gray-900 py-24 text-warm-ivory lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <span className="mb-8 block text-antique-gold type-overline font-semibold tracking-widest">Our Philosophy</span>
          <div className="grid grid-cols-1 gap-16 border-t border-warm-ivory/12 pt-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
               <h2 className="type-h2 mb-12 display-normal leading-relaxed text-warm-ivory">
                 Each piece is a <span className="display-accent display-italic text-antique-gold font-bold">labor of love</span>, carefully molded, sun-dried, baked, and painted by a single woman artisan preserving the heritage of Indian terracotta art.
               </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-12">
               <div className="flex flex-col">
                  <span className="type-h2 mb-2 text-antique-gold">01</span>
                  <span className="type-h3 mb-2 text-warm-ivory font-serif">Hand Molded</span>
                  <span className="type-body text-warm-ivory/70 text-sm">No molds are ever used. Every shape is sculpted from raw earth.</span>
               </div>
               <div className="flex flex-col">
                  <span className="type-h2 mb-2 text-antique-gold">02</span>
                  <span className="type-h3 mb-2 text-warm-ivory font-serif">Earth Friendly</span>
                  <span className="type-body text-warm-ivory/70 text-sm">Organic materials that eventually return to nature.</span>
               </div>
               <div className="flex flex-col">
                  <span className="type-h2 mb-2 text-antique-gold">03</span>
                  <span className="type-h3 mb-2 text-warm-ivory font-serif">Skin Safe</span>
                  <span className="type-body text-warm-ivory/70 text-sm">Naturally hypoallergenic, ultra-lightweight, and comfortable all day.</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Highlight */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10 lg:py-28">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-24">
          <div className="w-full lg:w-5/12 flex flex-col double-bezel-outer max-w-lg">
            <div className="double-bezel-inner overflow-hidden aspect-[4/5] bg-studio-wash/30 border border-dashed border-border-soft">
              {/* Image container kept empty for actual featured highlight image */}
            </div>
          </div>
          <div className="w-full lg:w-6/12 flex flex-col lg:pl-12">
            <span className="mb-7 block text-terracotta-dark type-overline font-semibold">Bulk Orders</span>
            <h2 className="type-h1 text-gray-900 mb-8">Repeat an existing design for your gathering.</h2>
            <p className="type-body-large text-gray-600 mb-12 leading-relaxed">
              Planning return gifts or a small batch for an event? Choose a catalogue piece, select one of its available colours, and book at least two months ahead so the studio has time to shape, dry, bake, and paint every piece by hand.
            </p>
            <div>
              <Link to="/bulk-orders">
                <Button variant="outline" className="w-max px-12 py-4 font-semibold">Plan a Bulk Order</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed / Community */}
      <section className="border-t border-border-soft bg-studio-wash/45 py-24 lg:py-28">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <span className="mb-5 block text-terracotta-dark type-overline font-semibold">Join the community</span>
            <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-block group mb-16">
              <h2 className="type-display text-gray-900 group-hover:text-terracotta transition-colors">{brand.instagramHandle}</h2>
            </a>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {[
                { label: 'Fresh kiln notes', img: '/images/hero_clay_sculpting.png' },
                { label: 'Painted clay details', img: '/images/mridula_set.png' },
                { label: 'Earth-toned pairings', img: '/images/hero_model_jewellery.png' },
                { label: 'Studio shelf finds', img: '/images/founder_studio.png' }
              ].map((item, i) => (
                <div key={i} className={`group relative flex aspect-[4/5] flex-col overflow-hidden double-bezel-outer ${i % 2 === 0 ? 'mt-0 md:mt-10' : 'mt-0'}`}>
                  <div className="double-bezel-inner overflow-hidden relative bg-studio-wash/30 border border-dashed border-border-soft">
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-gray-950/70 to-transparent text-left">
                      <span className="type-caption text-[0.625rem] font-bold text-warm-ivory uppercase tracking-widest">{item.label}</span>
                    </div>
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
            <p className="type-caption text-terracotta-dark font-semibold" role="status">
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
            <Button type="submit" className="w-full px-8 sm:w-auto font-semibold">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
};
