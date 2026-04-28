import React from 'react';

export const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <span className="text-terracotta uppercase tracking-[0.2em] text-[10px] font-bold mb-4 block">Our Story</span>
        <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6 italic">The Hands Behind the Clay</h1>
      </div>
      <div className="prose prose-lg mx-auto text-gray-600 space-y-6 flex flex-col items-center text-center">
        <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-12">
           <img src="https://placehold.co/1200x500/E5E1D8/7D2E24?text=Artisan+at+Work" alt="Artisan working with clay" className="w-full h-full object-cover mix-blend-multiply opacity-90" />
        </div>
        <p className="max-w-2xl text-sm leading-relaxed">
          Mitty & Co started as a passion project on Instagram, born from a love for traditional Indian aesthetics and the grounding feel of earthen clay. 
        </p>
        <p className="max-w-2xl">
          Every piece you see here is handcrafted by a single artisan. From wedging the clay to sculpting the intricate details, drying it in the sun, baking it in the kiln, and finally painting it with fine brushes—the journey of each necklace or earring is slow, deliberate, and full of love.
        </p>
        <p className="max-w-2xl">
          We believe jewellery is more than an accessory; it is wearable art that carries the vibrant soul of Indian heritage. By choosing terracotta, you are choosing an eco-conscious, skin-friendly, and lightweight art form that stands out in a world of factory-made alternatives.
        </p>
        <div className="mt-12 text-terracotta italic font-serif text-2xl">
          "Clay remembers the hands that shaped it."
        </div>
      </div>
    </div>
  );
};
