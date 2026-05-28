import React from 'react';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { MessageCircle, RefreshCw } from 'lucide-react';
import { buttonClassNames } from '../ui/Button';
import { fallbackBrandSettings, getWhatsappUrl } from '../../lib/brandSettings';

const getErrorSummary = (error: unknown) => {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'The page could not finish loading.';
};

const getErrorDetail = (error: unknown) => {
  if (isRouteErrorResponse(error)) {
    return typeof error.data === 'string' ? error.data : JSON.stringify(error.data);
  }

  if (error instanceof Error) {
    return error.stack ?? error.message;
  }

  return String(error);
};

export const RouteErrorPage = () => {
  const error = useRouteError();
  const whatsappUrl = getWhatsappUrl(
    fallbackBrandSettings,
    'Hi goonjaa, I ran into a loading issue on the website. Could you help me?'
  );

  return (
    <main className="min-h-[100dvh] bg-warm-ivory text-gray-900">
      <div className="mx-auto grid min-h-[100dvh] max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-10">
        <section className="lg:col-span-6">
          <p className="mb-5 text-terracotta-dark type-overline">Studio note</p>
          <h1 className="mb-7 max-w-2xl type-display display-normal">
            This page needs another moment.
          </h1>
          <p className="mb-10 max-w-xl text-gray-600 type-body-large">
            Something interrupted the page while it was loading. Try refreshing once, or return home and continue browsing the collection.
          </p>
          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className={buttonClassNames({ size: 'lg', className: 'gap-3' })}
            >
              <RefreshCw size={16} aria-hidden="true" />
              Try again
            </button>
            <Link
              to="/"
              className={buttonClassNames({ variant: 'outline', size: 'lg', className: 'w-full sm:w-auto' })}
            >
              Go home
            </Link>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClassNames({ variant: 'ghost', size: 'lg', className: 'gap-3 px-0 hover:bg-transparent' })}
              >
                <MessageCircle size={17} aria-hidden="true" />
                Message us
              </a>
            )}
          </div>
          {import.meta.env.DEV && (
            <details className="mt-10 max-w-2xl border-t border-border-soft pt-5 text-left">
              <summary className="cursor-pointer text-terracotta-dark type-overline">
                Developer details
              </summary>
              <pre className="mt-4 max-h-64 overflow-auto whitespace-pre-wrap bg-studio-wash p-4 text-xs leading-relaxed text-gray-700">
                {getErrorSummary(error)}
                {'\n\n'}
                {getErrorDetail(error)}
              </pre>
            </details>
          )}
        </section>

        <aside className="relative lg:col-span-5 lg:col-start-8">
          <div className="double-bezel-outer">
            <div className="double-bezel-inner aspect-[4/5] overflow-hidden bg-surface">
              <img
                src="/images/hero_clay_sculpting.svg"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
          <div className="mt-5 border-l border-terracotta/35 pl-5 text-sm leading-relaxed text-gray-600">
            If this keeps happening, a short message helps us fix it faster.
          </div>
        </aside>
      </div>
    </main>
  );
};
