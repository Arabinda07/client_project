import React from 'react';
import { SEO } from '../components/layout/SEO';
import { ProductImage } from '../components/ui/Media';
import { Reveal } from '../components/ui/Reveal';
import { getStudioPhotoUrl, useBrandSettings } from '../lib/brandSettings';

export const About = () => {
  const brandSettings = useBrandSettings();

  return (
    <>
      <SEO title="Our Story" description="Meet the artist behind goonjaa and the handmade terracotta jewellery shaped in her studio." />
      <div className="mx-auto max-w-4xl px-4 py-20 sm:py-24 lg:py-28">
        <Reveal className="text-center mb-16">
          <span className="mb-6 block text-terracotta-dark type-overline font-semibold tracking-widest">Our Story</span>
          <h1 className="type-display text-gray-900 mb-8">The Hands Behind the Clay</h1>
        </Reveal>
        
        <Reveal className="mb-16 double-bezel-outer aspect-[16/9] w-full overflow-hidden">
          <div className="double-bezel-inner relative h-full w-full overflow-hidden">
            <ProductImage
              src={getStudioPhotoUrl(brandSettings)}
              alt={brandSettings.studioPhotoAlt}
              tone="studio"
              loading="eager"
            />
          </div>
        </Reveal>

        <Reveal className="mx-auto mb-20 max-w-3xl border-y border-border-soft py-10 text-center">
          <p className="type-h2 display-italic text-terracotta-dark">
            "For me, shaping clay is no different from singing a Raag. Both ask for patience, devotion, and respect for roots."
          </p>
        </Reveal>

        <div className="prose prose-lg mx-auto text-gray-600 space-y-16">
          {/* About the Artist / How It Started */}
          <Reveal className="space-y-6">
            <h2 className="type-h1 text-gray-900 mb-6">How It Started</h2>
            <p className="leading-relaxed">
              "I have been learning song since I was two and a half years old. In fact, it is better to say I have been listening to music since I was in my mother's womb. My mother sang classical music, and my grand-uncle taught classical music right in our home. I am currently completing my second Master's degree in Khayal (Classical Vocal)."
            </p>
            <p className="leading-relaxed">
              Beyond singing, I always loved writing poetry, drawing, and making things with my own hands. I was an introverted child. I preferred sitting quietly in a room designing frocks in my notebooks during school off-periods. Once the drawing was done, I'd throw the paper in the dustbin. I didn't know then that this was a serious pursuit.
            </p>
            <p className="leading-relaxed">
              When the quiet of the Covid lockdown hit, I felt a strong urge to create something tangible. Other artisans inspired me, but terracotta felt closest to the core of Indian heritage. I wanted to make something of my own with it: not a replica of what already existed, but my own designs and expressions.
            </p>
          </Reveal>

          {/* The Handmade Process */}
          <Reveal className="mt-12 mb-12 space-y-10 border-y border-border-soft py-12">
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
              <div>
                <span className="mb-4 block text-terracotta-dark type-overline font-semibold">From earth to adornment</span>
                <h2 className="type-h1 text-gray-900 mb-6">How Each Piece Comes to Life</h2>
              </div>
              <div className="space-y-6">
                <p className="leading-relaxed">
                  I technically had no background in color theory. I learned slowly, through trial and error, exploring which shapes could be born from the clay. Everything you see here is made by a single person in a small home studio.
                </p>
                <p className="leading-relaxed">
                  There is no factory line. Our pieces are unrepeatable. Once I finish a design, I rarely recreate it exactly. Even if I try to mix the same colors, the earth and the paint create something new every time. Pieces may crack while drying or break in the firing process, but that unpredictability is part of this medium.
                </p>
              </div>
            </div>
            
            <div className="mt-12 flex flex-col gap-6 md:flex-row">
              <div className="w-full md:w-2/3 flex flex-col double-bezel-outer">
                <div className="double-bezel-inner relative aspect-[4/3] overflow-hidden">
                  <ProductImage
                    src="/images/hero_clay_sculpting.png"
                    alt="Clay being patiently molded before drying and firing"
                    tone="studio"
                  />
                  <div className="absolute bottom-4 left-4 rounded-[2px] border border-border-soft/60 bg-studio-paper/90 px-3 py-1">
                    <span className="type-caption text-[10px] font-bold text-terracotta-dark uppercase tracking-wider">Patiently Molding Clay</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 flex flex-col gap-6">
                <div className="flex flex-col double-bezel-outer">
                  <div className="double-bezel-inner relative aspect-[4/5] overflow-hidden">
                    <ProductImage
                      src="/images/sun_drying_firing.png"
                      alt="Terracotta pieces drying and preparing for firing"
                      tone="studio"
                    />
                    <div className="absolute bottom-4 left-4 rounded-[2px] border border-border-soft/60 bg-studio-paper/90 px-3 py-1">
                      <span className="type-caption text-[9px] font-bold text-terracotta-dark uppercase tracking-wider">Sun-Drying & Firing</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col double-bezel-outer">
                  <div className="double-bezel-inner relative aspect-square overflow-hidden">
                    <ProductImage
                      src="/images/hand_painting_details.png"
                      alt="Fine hand-painted details on a goonjaa terracotta piece"
                      tone="detail"
                    />
                    <div className="absolute bottom-4 left-4 rounded-[2px] border border-border-soft/60 bg-studio-paper/90 px-3 py-1">
                      <span className="type-caption text-[9px] font-bold text-terracotta-dark uppercase tracking-wider">Hand-Painting Details</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Traditional Material, Modern Expression */}
          <Reveal className="space-y-6">
            <h2 className="type-h1 text-gray-900 mb-6">Traditional Material, Modern Expression</h2>
            <p className="leading-relaxed">
              I am personally very traditional. I wear sarees, and my profession is rooted in classical art forms. Yet, I refuse to believe that terracotta is restricted to the past.
            </p>
            <p className="leading-relaxed">
              My absolute motto is to design pieces that present traditional Indian clay in a way that resonates with today's generation. Whether you wear modern, abstract dresses or a handloom saree, I want these pieces to bridge that gap. Traditional clay, designed for every mood in between.
            </p>
          </Reveal>

          {/* Why Terracotta */}
          <Reveal className="mt-12 flex flex-col items-center space-y-6 border-t border-border-soft pt-12 text-center">
            <span className="mb-4 block text-terracotta-dark type-overline font-semibold">Why Terracotta?</span>
            <h2 className="type-h1 text-gray-900 mb-6">Rooted in Indian craft.</h2>
            <p className="leading-relaxed max-w-2xl">
              Terracotta is an eco-conscious, skin-friendly, and surprisingly lightweight art form. By choosing it, you are supporting slow fashion and wearing a piece of earth that will eventually return to nature. No molds, no mass production, just soulful clay, sculpted by hand.
            </p>
          </Reveal>
        </div>
      </div>
    </>
  );
};
