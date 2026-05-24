/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AdminGuard } from './components/admin/AdminGuard';
import { AdminLayout } from './components/admin/AdminLayout';

const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
const Shop = lazy(() => import('./pages/Shop').then((module) => ({ default: module.Shop })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then((module) => ({ default: module.ProductDetail })));
const Cart = lazy(() => import('./pages/Cart').then((module) => ({ default: module.Cart })));
const Checkout = lazy(() => import('./pages/Checkout').then((module) => ({ default: module.Checkout })));
const About = lazy(() => import('./pages/About').then((module) => ({ default: module.About })));
const BulkOrders = lazy(() => import('./pages/BulkOrders').then((module) => ({ default: module.BulkOrders })));
const Testimonials = lazy(() => import('./pages/Testimonials').then((module) => ({ default: module.Testimonials })));
const Contact = lazy(() => import('./pages/Contact').then((module) => ({ default: module.Contact })));
const Policy = lazy(() => import('./pages/Policy').then((module) => ({ default: module.Policy })));
const NotFound = lazy(() => import('./pages/NotFound').then((module) => ({ default: module.NotFound })));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then((module) => ({ default: module.AdminLogin })));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts').then((module) => ({ default: module.AdminProducts })));
const AdminProductEditor = lazy(() => import('./pages/admin/AdminProductEditor').then((module) => ({ default: module.AdminProductEditor })));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings').then((module) => ({ default: module.AdminSettings })));

const routeElement = (element: React.ReactNode) => (
  <Suspense
    fallback={
      <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center px-4 py-20 text-terracotta-dark type-overline sm:px-6 lg:px-10">
        Preparing the studio
      </div>
    }
  >
    {element}
  </Suspense>
);

const router = createBrowserRouter([
  { path: '/admin/login', element: routeElement(<AdminLogin />) },
  {
    path: '/admin',
    element: routeElement(<AdminGuard />),
    children: [
      {
        element: routeElement(<AdminLayout />),
        children: [
          { index: true, element: routeElement(<AdminProducts />) },
          { path: 'products', element: routeElement(<AdminProducts />) },
          { path: 'products/new', element: routeElement(<AdminProductEditor />) },
          { path: 'products/:productId', element: routeElement(<AdminProductEditor />) },
          { path: 'settings', element: routeElement(<AdminSettings />) },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: routeElement(<Home />) },
      { path: 'shop', element: routeElement(<Shop />) },
      { path: 'category/:categoryName', element: routeElement(<Shop />) },
      { path: 'product/:slug', element: routeElement(<ProductDetail />) },
      { path: 'cart', element: routeElement(<Cart />) },
      { path: 'checkout', element: routeElement(<Checkout />) },
      { path: 'about', element: routeElement(<About />) },
      { path: 'bulk-orders', element: routeElement(<BulkOrders />) },
      { path: 'testimonials', element: routeElement(<Testimonials />) },
      { path: 'contact', element: routeElement(<Contact />) },
      { path: 'policies/:policyName', element: routeElement(<Policy />) },
      { path: '*', element: routeElement(<NotFound />) },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
