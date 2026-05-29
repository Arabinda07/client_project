import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, buttonClassNames } from '../components/ui/Button';
import { ProductCard } from '../components/product/ProductCard';
import { mockProducts } from '../lib/data/mockProducts';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../components/layout/SEO';
import { brand } from '../lib/brand';
import { getOwnerPhotoUrl, getStudioPhotoUrl, useBrandSettings } from '../lib/brandSettings';
import { FounderName } from '../components/ui/FounderName';
import { ProductImage } from '../components/ui/Media';
import { Reveal } from '../components/ui/Reveal';
import { inputClassName } from '../components/ui/formStyles';

export const Home = () => {
  const catalogProducts = mockProducts;
  const brandSettings = useBrandSettings();
  const newArrivals = catalogProducts.filter(p => p.collection?.includes('New Arrivals')).slice(0, 4);
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
          <span className="mb-7 block text-terracotta-dark type-overline font-semibold tracking-widest">
            Artisan Handcrafted Jewellery
          </span>
          <h1 className="mb-8 text-gray-900 type-display display-normal sm:mb-10">
            Soulful clay,<br/>
            <span className="display-accent text-terracotta font-serif font-bold">sculpted<br className="sm:hidden"/> by hand.</span>
          </h1>
          <p className="mb-10 max-w-md text-gray-600 type-body-large sm:mb-12">
            Lightweight terracotta jewellery, sculpted and painted by hand for sarees, dresses, and every mood in between. A solo woman-led studio celebrating the raw rhythm of earth.
          </p>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
            <Link to="/shop" className={buttonClassNames({ size: 'lg', className: 'w-full sm:w-auto' })}>
              Explore Collection
            </Link>
            <Link to="/about" className={buttonClassNames({ variant: 'ghost', size: 'lg', className: 'w-full px-0 font-semibold hover:bg-transparent hover:text-terracotta sm:w-auto' })}>
              Our Story
            </Link>
          </div>
        </div>

        {/* Asymmetrical Split Screen Hero Images */}
        <div className="relative mt-10 min-h-[60vh] w-full lg:mt-0 lg:min-h-[calc(100dvh-6rem)] lg:w-7/12 flex items-center justify-center p-6 sm:p-12 lg:p-16">
          <div className="relative w-full h-full max-w-2xl aspect-[4/3] lg:aspect-auto lg:h-[80%] flex items-center justify-center">
            {/* Background clay sculpting frame */}
            <div className="absolute left-4 top-4 z-10 aspect-[4/5] w-[60%] double-bezel-outer">
              <div className="double-bezel-inner overflow-hidden">
                <ProductImage
                  src="/images/hero_clay_sculpting.svg"
                  alt="Clay being shaped by hand in the goonjaa studio"
                  loading="eager"
                  fetchPriority="high"
                  width={900}
                  height={1125}
                  tone="studio"
                  sizes="(min-width: 1024px) 34vw, 60vw"
                />
              </div>
            </div>
            
            {/* Foreground model frame */}
            <div className="absolute bottom-4 right-4 z-20 aspect-[3/4] w-[55%] double-bezel-outer clay-shadow-lift">
              <div className="double-bezel-inner overflow-hidden">
                <ProductImage
                  src="/images/hero_model_jewellery.svg"
                  alt="A goonjaa terracotta jewellery piece styled with a modern outfit"
                  loading="eager"
                  width={900}
                  height={1200}
                  tone="detail"
                  sizes="(min-width: 1024px) 30vw, 55vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-10 lg:py-28">
        <Reveal className="mb-16 flex flex-col items-center text-center lg:mb-20">
          <span className="mb-5 block text-terracotta-dark type-overline">Curated Selections</span>
          <h2 className="type-display text-gray-900">Signature Styles</h2>
        </Reveal>
        
        <div className="grid h-auto grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-12 lg:grid-rows-2 lg:gap-8">
          {[
            { title: 'Necklace Sets', link: '/category/Terracotta Set', gridClass: 'md:col-span-1 md:row-span-2 lg:col-span-6 lg:row-span-2' },
            { title: 'Statement Earrings', link: '/category/Earring', gridClass: 'md:col-span-1 md:row-span-1 lg:col-span-6 lg:row-span-1' },
            { title: 'Rings & Bangles', link: '/category/Bangles', gridClass: 'md:col-span-1 md:row-span-1 lg:col-span-3 lg:row-span-1' },
            { title: 'Hair Accessories', link: '/category/Hair Pin', gridClass: 'md:col-span-1 md:row-span-1 lg:col-span-3 lg:row-span-1' }
          ].map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.06} className={cat.gridClass}>
              <Link
                to={cat.link}
                className="group flex h-[260px] flex-col rounded-[2px] border border-border-soft bg-surface p-8 transition-colors hover:border-terracotta/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory md:h-full md:min-h-[260px]"
              >
                <div className="flex h-full flex-col items-start justify-between">
                  <span className="font-semibold uppercase tracking-[0.14em] text-terracotta/90 type-caption">Explore</span>
                  <div>
                    <h3 className="text-gray-900 type-h2 mb-3 font-serif display-logo leading-tight">{cat.title}</h3>
                    <span className="inline-flex min-h-11 items-center gap-1.5 font-bold uppercase tracking-[0.12em] text-gray-500 type-caption transition-colors group-hover:text-terracotta">
                      Discover <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Slow Craft Process Timeline Strip */}
      <section className="bg-studio-wash/40 border-t border-b border-border-soft py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <Reveal className="mb-14 flex flex-col items-center text-center">
            <span className="mb-4 block text-terracotta-dark type-overline font-semibold tracking-widest">Slow Clay Craft</span>
            <h2 className="type-display text-gray-900">How goonjaa is Shaped</h2>
          </Reveal>
          
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
            {[
              { num: '01', title: 'Shaping', desc: 'Raw clay is kneaded & sculpted, bead by bead, with water and patience.' },
              { num: '02', title: 'Sun-Drying', desc: 'Every piece dries slowly in the sun for 2–3 days to cure naturally.' },
              { num: '03', title: 'Baking', desc: 'Fired at 900°C in the kiln, transforming clay into solid terracotta.' },
              { num: '04', title: 'Painting', desc: 'Delicately detailed with fine brushes, acrylics, and brass findings.' }
            ].map((step, idx) => (
              <Reveal key={step.num} delay={idx * 0.08} className="relative flex flex-col items-start border-t border-border-soft/80 pt-6">
                <span className="font-serif text-3xl display-logo text-terracotta/35 mb-4 block font-bold">{step.num}</span>
                <h3 className="type-h3 text-gray-900 mb-2 font-serif font-bold">{step.title}</h3>
                <p className="type-body text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                {idx < 3 && (
                  <div className="absolute right-0 top-0 hidden h-px w-12 translate-x-1/2 bg-terracotta/30 md:block" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-10 lg:py-28">
        <Reveal className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="mb-5 block text-terracotta-dark type-overline font-semibold">Fresh from the kiln</span>
            <h2 className="type-display text-gray-900">New Arrivals</h2>
          </div>
          <Link to="/shop" className="hidden items-center border-b border-terracotta pb-1 font-bold uppercase tracking-[0.12em] text-terracotta transition-colors hover:border-gray-900 hover:text-gray-900 type-caption sm:inline-flex">
            View Collection
          </Link>
        </Reveal>
        <div className="grid grid-cols-1 gap-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 text-center sm:hidden">
          <Link to="/shop" className={buttonClassNames({ variant: 'outline', fullWidth: true })}>
            View All
          </Link>
        </div>
      </section>

      {/* Meet the Artist Preview */}
      <section className="mx-auto max-w-7xl border-t border-border-soft px-4 py-24 sm:px-6 lg:px-10 lg:py-30">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-24">
          <Reveal direction="right" className="w-full lg:w-5/12 flex flex-col">
            <span className="mb-7 block text-terracotta-dark type-overline font-semibold">Meet the Artist Behind the Jewellery</span>
            <h2 className="type-h1 text-gray-900 mb-8">A lifelong symphony of music and clay.</h2>
            <p className="type-body-large text-gray-600 mb-8 leading-relaxed">
              "I have been learning classical music since I was two and a half years old. For me, shaping clay is no different from singing a Raag. Both require patience, devotion, and a deep respect for roots."
            </p>
            <p className="type-body text-gray-600 mb-12 leading-relaxed">
              During the stillness of the pandemic, <FounderName />'s lifelong love for drawing and design found its way into terracotta. Today, every piece of {brandSettings.name || brand.name} is a single artisan's exploration of traditional shapes crafted for modern wardrobes. No two pieces are ever exactly the same.
            </p>
            <div>
              <Link to="/about" className={buttonClassNames({ variant: 'outline', className: 'w-max gap-3 px-10 py-4 font-semibold' })}>
                Read the Full Story <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
          
          <Reveal direction="left" delay={0.1} className="w-full lg:w-6/12 flex flex-col double-bezel-outer max-w-lg lg:ml-auto">
            <div className="double-bezel-inner aspect-[3/4] overflow-hidden">
              <ProductImage
                src={getOwnerPhotoUrl(brandSettings)}
                alt={brandSettings.ownerPhotoAlt}
                tone="studio"
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="object-cover object-[50%_28%]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brand Values Section */}
      <section className="bg-deep-maroon py-24 text-warm-ivory lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <Reveal>
          <span className="mb-8 block text-antique-gold-light type-overline font-semibold tracking-widest">Our Philosophy</span>
          <div className="grid grid-cols-1 gap-16 border-t border-warm-ivory/16 pt-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
               <h2 className="type-h2 mb-12 display-normal leading-relaxed text-warm-ivory">
                 Each piece is a <span className="display-accent display-italic text-antique-gold-light font-bold">labor of love</span>, carefully molded, sun-dried, baked, and painted by a single woman artisan preserving the heritage of Indian terracotta art.
               </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-12">
               <div className="flex flex-col">
                  <span className="type-h2 mb-2 text-antique-gold-light">01</span>
                  <span className="type-h3 mb-2 text-warm-ivory font-serif">Hand Molded</span>
                  <span className="type-body text-warm-ivory/78 text-sm">No molds are ever used. Every shape is sculpted from raw earth.</span>
               </div>
               <div className="flex flex-col">
                  <span className="type-h2 mb-2 text-antique-gold-light">02</span>
                  <span className="type-h3 mb-2 text-warm-ivory font-serif">Earth Friendly</span>
                  <span className="type-body text-warm-ivory/78 text-sm">Organic materials that eventually return to nature.</span>
               </div>
               <div className="flex flex-col">
                  <span className="type-h2 mb-2 text-antique-gold-light">03</span>
                  <span className="type-h3 mb-2 text-warm-ivory font-serif">Skin Safe</span>
                  <span className="type-body text-warm-ivory/78 text-sm">Naturally hypoallergenic, ultra-lightweight, and comfortable all day.</span>
               </div>
            </div>
          </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Highlight */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10 lg:py-28">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-24">
          <Reveal direction="right" className="w-full lg:w-5/12 flex flex-col double-bezel-outer max-w-lg">
            <div className="double-bezel-inner aspect-[4/5] overflow-hidden">
              <ProductImage
                src="/images/mridula_set.svg"
                alt="A featured goonjaa terracotta jewellery set"
                tone="detail"
              />
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.1} className="w-full lg:w-6/12 flex flex-col lg:pl-12">
            <span className="mb-7 block text-terracotta-dark type-overline font-semibold">Bulk Orders</span>
            <h2 className="type-h1 text-gray-900 mb-8">Repeat an existing design for your gathering.</h2>
            <p className="type-body-large text-gray-600 mb-12 leading-relaxed">
              Planning return gifts or a small batch for an event? Choose a catalogue piece, select one of its available colours, and book at least two months ahead so the studio has time to shape, dry, bake, and paint every piece by hand.
            </p>
            <div>
              <Link to="/bulk-orders" className={buttonClassNames({ variant: 'outline', className: 'w-max px-12 py-4 font-semibold' })}>
                Plan a Bulk Order
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Instagram Feed / Community */}
      <section className="border-t border-border-soft bg-studio-wash/45 py-24 lg:py-28">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <Reveal>
            <span className="mb-5 block text-terracotta-dark type-overline font-semibold">Join the community</span>
            <a href={brandSettings.instagramUrl || brand.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-block group mb-16">
              <h2 className="type-display text-gray-900 group-hover:text-terracotta transition-colors">{brandSettings.instagramUrl ? brandSettings.instagramUrl.replace(/^https?:\/\/(www\.)?instagram\.com\//, '@').replace(/\/$/, '') : brand.instagramHandle}</h2>
            </a>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {[
                { label: 'Fresh kiln notes', img: '/images/hero_clay_sculpting.svg' },
                { label: 'Painted clay details', img: '/images/mridula_set.svg' },
                { label: 'Earth-toned pairings', img: '/images/hero_model_jewellery.svg' },
                { label: 'Studio shelf finds', img: getStudioPhotoUrl(brandSettings) }
              ].map((item, i) => (
                <div key={i} className={`group relative flex aspect-[4/5] flex-col overflow-hidden double-bezel-outer ${i % 2 === 0 ? 'mt-0 md:mt-10' : 'mt-0'}`}>
                  <div className="double-bezel-inner relative overflow-hidden">
                    <ProductImage
                      src={item.img}
                      alt={item.label}
                      tone="studio"
                      sizes="(min-width: 768px) 25vw, 50vw"
                    />
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
          <p className="type-body-large text-gray-600 max-w-lg">Subscribe for early access to new collections and quiet peeks into the studio. One useful note at a time.</p>
          {newsletterSuccess && (
            <p className="type-caption text-terracotta-dark font-semibold" role="status" aria-live="polite">
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
              placeholder="you@example.com" 
              required
              value={newsletterEmail}
              onChange={(event) => {
                setNewsletterEmail(event.target.value);
                setNewsletterSuccess(false);
              }}
              className={inputClassName('min-h-14 flex-1 bg-transparent px-6 py-4')}
            />
            <Button type="submit" className="w-full px-8 sm:w-auto font-semibold">Join the List</Button>
          </form>
          <p className="type-caption text-gray-500">No spam. We will use this email only for studio updates.</p>
        </div>
      </section>
    </div>
  );
};
