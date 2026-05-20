import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollRestoration } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen relative bg-warm-ivory">
      <div className="grain-overlay" aria-hidden="true" />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};
