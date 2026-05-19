import React from 'react';
import { SEO } from '../components/layout/SEO';

export const About = () => {
  return (
    <>
      <SEO title="Our Story" description="Meet the artist behind goonjaa and the handmade terracotta jewellery shaped in her studio." />
      <div className="mx-auto max-w-4xl px-4 py-20 sm:py-24 lg:py-28">
      <div className="text-center mb-20">
        <span className="mb-6 block text-terracotta-dark type-overline">Our Story</span>
        <h1 className="type-display text-gray-900 mb-8">The Hands Behind the Clay</h1>
      </div>
      
      <div className="mb-20 flex aspect-[16/9] w-full flex-col items-center justify-center overflow-hidden rounded-[2px] border border-border-soft bg-[radial-gradient(circle_at_50%_34%,rgba(179,92,56,0.13),transparent_34%),linear-gradient(135deg,#F8F1E8,#E9DED2)] p-8 text-center transition-colors md:aspect-[21/9]">
         <span className="font-serif text-3xl display-logo text-terracotta-dark/85">A quiet table, clay, and color</span>
      </div>

      <div className="prose prose-lg mx-auto text-gray-600 space-y-16">
        {/* About the Artist / How It Started */}
        <section className="space-y-4">
          <h2 className="type-h1 text-gray-900 mb-6">How It Started</h2>
          <p>
            "I have been learning song since I was two and a half years old. In fact, it is better to say I have been listening to music since I was in my mother's womb. My mother sang classical music, and my grand-uncle taught classical music right in our home. I am currently completing my second Master's degree in Khayal (Classical Vocal)."
          </p>
          <p>
            Beyond singing, I always loved writing poetry, drawing, and making things with my own hands. I was an introverted child. I preferred sitting quietly in a room designing frocks in my notebooks during school off-periods. Once the drawing was done, I'd throw the paper in the dustbin. I didn't know then that this was a serious pursuit.
          </p>
          <p>
            When the quiet of the Covid lockdown hit, I felt a strong urge to create something tangible. Other artisans inspired me, but terracotta felt closest to the core of Indian heritage. I wanted to make something of my own with it: not a replica of what already existed, but my own designs and expressions.
          </p>
        </section>

        {/* The Handmade Process */}
        <section className="mt-12 mb-12 space-y-4 rounded-[2px] border border-border-soft bg-surface p-8 shadow-[0_18px_48px_rgba(49,39,31,0.04)] md:p-12">
          <h2 className="type-h1 text-gray-900 mb-6">How Each Piece Comes to Life</h2>
          <p>
            I technically had no background in color theory. I learned slowly, through trial and error, exploring which shapes could be born from the clay. Everything you see here is made by a single person in a small home studio.
          </p>
          <p>
            There is no factory line. Our pieces are unrepeatable. Once I finish a design, I rarely recreate it exactly. Even if I try to mix the same colors, the earth and the paint create something new every time. Pieces may crack while drying or break in the firing process, but that unpredictability is part of the beauty of this medium.
          </p>
          <div className="mt-12 flex flex-col gap-4 md:flex-row">
            <div className="flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden border border-border-soft bg-studio-wash p-8 text-center md:w-2/3">
               <span className="type-h3 display-logo text-terracotta">Patiently Molding Clay</span>
            </div>
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <div className="flex aspect-[4/5] w-full flex-grow items-center justify-center overflow-hidden border border-border-soft bg-studio-wash p-8 text-center">
                 <span className="type-h3 display-logo text-terracotta">Sun-Drying & Baking</span>
              </div>
              <div className="flex aspect-square w-full shrink-0 items-center justify-center overflow-hidden border border-border-soft bg-studio-wash p-8 text-center">
                 <span className="type-h3 display-logo text-terracotta">Hand-Painting Details</span>
              </div>
            </div>
          </div>
        </section>

        {/* Traditional Material, Modern Expression */}
        <section className="space-y-4">
          <h2 className="type-h1 text-gray-900 mb-6">Traditional Material, Modern Expression</h2>
          <p>
            I am personally very traditional. I wear sarees, and my profession is rooted in classical art forms. Yet, I refuse to believe that terracotta is restricted to the past.
          </p>
          <p>
            My absolute motto is to design pieces that present traditional Indian clay in a way that resonates with today's generation. Whether you wear modern, abstract dresses or a handloom saree, I want these pieces to bridge that gap. Traditional clay, designed for every mood in between.
          </p>
        </section>

        {/* Why Terracotta */}
        <section className="mt-12 flex flex-col items-center space-y-4 border-t border-border-soft pt-12 text-center">
          <span className="mb-4 block text-terracotta-dark type-overline">Why Terracotta?</span>
          <h2 className="type-h1 text-gray-900 mb-6">Rooted in Indian craft.</h2>
          <p>
            Terracotta is an eco-conscious, skin-friendly, and surprisingly lightweight art form. By choosing it, you are supporting slow fashion and wearing a piece of earth that will eventually return to nature. No molds, no mass production, just soulful clay, sculpted by hand.
          </p>
        </section>

      </div>
      </div>
    </>
  );
};
