import React from 'react';

export const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 sm:py-32">
      <div className="text-center mb-20">
        <span className="text-terracotta type-overline mb-6 block">Our Story</span>
        <h1 className="type-display text-gray-900 mb-8 italic">The Hands Behind the Clay</h1>
      </div>
      
      <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-20">
         <img src="https://placehold.co/1200x500/E5E1D8/7D2E24?text=Artisan+Workspace" alt="Artisan working with clay" className="w-full h-full object-cover mix-blend-multiply opacity-90" />
      </div>

      <div className="prose prose-lg mx-auto text-gray-600 space-y-16">
        {/* About the Artist / How It Started */}
        <section className="space-y-4">
          <h2 className="type-h1 text-gray-900 mb-6 italic">How It Started</h2>
          <p>
            "I have been learning song since I was two and a half years old. In fact, it is better to say I have been listening to music since I was in my mother's womb. My mother sang classical music, and my grand-uncle taught classical music right in our home. I am currently completing my second Master's degree in Khayal (Classical Vocal)."
          </p>
          <p>
            But beyond singing, I always loved writing poetry, drawing, and making things with my own hands. I was always an introverted child—I preferred sitting quietly in a room designing frocks in my notebooks during school off-periods. Once the drawing was done, I'd throw the paper in the dustbin. I didn't know then that this was a serious pursuit.
          </p>
          <p>
            When the quiet of the Covid lockdown hit, I felt a strong urge to create something tangible. I was inspired by other artisans, but I realized that Terracotta is the absolute core of our Indian heritage. I knew I had to make something of my own with it—not an exact replica of what existed, but my own designs, my own expressions.
          </p>
        </section>

        {/* The Handmade Process */}
        <section className="bg-warm-ivory p-8 md:p-12 rounded-2xl mt-12 mb-12 border border-gray-100 shadow-sm space-y-4">
          <h2 className="type-h1 text-gray-900 mb-6 italic">How Each Piece Comes to Life</h2>
          <p>
            I technically had no background in color theory. I learned slowly, through trial and error, exploring which shapes could be born from the clay. Everything you see here is made by a single person in a small home studio.
          </p>
          <p>
            There is no factory line. Our pieces are unrepeatable. Once I finish a design, I rarely recreate it exactly. Even if I try to mix the same colors, the earth and the paint create something new every time. It is full of risks—pieces crack while drying, or break in the firing process—but that unpredictability is the beauty of exploring this medium. 
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-12">
            <div className="w-full md:w-2/3 aspect-[4/3] bg-gray-200 overflow-hidden shrink-0">
               <img src="https://placehold.co/800x600/D9D1C1/7D2E24?text=Patiently+Molding+Clay" alt="Molding clay" className="w-full h-full object-cover mix-blend-multiply opacity-90" />
            </div>
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <div className="w-full aspect-[4/5] bg-gray-200 overflow-hidden flex-grow">
                 <img src="https://placehold.co/400x500/E5E1D8/7D2E24?text=Sun-Drying+and+Baking" alt="Baking clay" className="w-full h-full object-cover mix-blend-multiply opacity-90" />
              </div>
              <div className="w-full aspect-square bg-gray-200 overflow-hidden shrink-0">
                 <img src="https://placehold.co/400x400/F5F2ED/5C554E?text=Hand-Painting+Details" alt="Painting details" className="w-full h-full object-cover mix-blend-multiply opacity-90" />
              </div>
            </div>
          </div>
        </section>

        {/* Traditional Material, Modern Expression */}
        <section className="space-y-4">
          <h2 className="type-h1 text-gray-900 mb-6 italic">Traditional Material, Modern Expression</h2>
          <p>
            I am personally very traditional. I wear sarees, and my profession is rooted in classical art forms. Yet, I refuse to believe that terracotta is restricted to the past.
          </p>
          <p>
            My absolute motto is to design pieces that present traditional Indian clay in a way that resonates with today's generation. Whether you wear modern, abstract dresses or a handloom saree, I want these pieces to bridge that gap. Traditional clay, designed for every mood in between.
          </p>
        </section>

        {/* Why Terracotta */}
        <section className="border-t border-gray-100 pt-12 mt-12 text-center space-y-4 flex flex-col items-center">
          <span className="text-terracotta type-overline mb-4 block">Why Terracotta?</span>
          <h2 className="type-h1 text-gray-900 mb-6 italic">Rooted in Indian craft.</h2>
          <p>
            Terracotta is an eco-conscious, skin-friendly, and surprisingly lightweight art form. By choosing it, you are supporting slow fashion and wearing a piece of earth that will eventually return to nature. No molds, no mass production—just soulful clay, sculpted by hand.
          </p>
        </section>

      </div>
    </div>
  );
};
