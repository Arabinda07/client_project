import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/layout/SEO';
import { buttonClassNames } from '../components/ui/Button';

export const NotFound = () => (
  <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
    <SEO title="Page Not Found" description="This goonjaa page could not be found." noIndex />
    <span className="mb-4 block text-terracotta-dark type-overline">Page Not Found</span>
    <h1 className="type-display mb-6 text-gray-900">This clay trail ends here.</h1>
    <p className="type-body-large mb-10 max-w-xl text-gray-600">
      The page may have moved, or the piece may no longer be in the catalogue. The shop still has plenty to browse.
    </p>
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link to="/shop" className={buttonClassNames({ className: 'px-8 py-3.5' })}>
        Browse the Shop
      </Link>
      <Link to="/contact" className={buttonClassNames({ variant: 'outline', className: 'px-8 py-3.5' })}>
        Contact the Studio
      </Link>
    </div>
  </div>
);
