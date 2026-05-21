import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollRestoration } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen relative bg-warm-ivory">
      <div className="grain-overlay" aria-hidden="true" />
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[60] rounded-[2px] bg-studio-paper px-4 py-3 text-sm font-semibold text-gray-900 clay-shadow-soft focus:not-sr-only focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-grow" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};
