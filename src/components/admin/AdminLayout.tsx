import React from 'react';
import { Link, NavLink, Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { Boxes, LogOut, Settings, ShoppingBag, Store } from 'lucide-react';
import { buttonClassNames } from '../ui/Button';
import { cn } from '../../lib/utils';
import { supabase } from '../../lib/supabaseClient';
import type { AdminProfile } from '../../lib/adminData';

const navItems = [
  { label: 'Products', to: '/admin/products', icon: Boxes },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
];

export const useAdminContext = () => useOutletContext<{ profile: AdminProfile }>();

export const AdminLayout = () => {
  const navigate = useNavigate();
  const { profile } = useAdminContext();

  const signOut = async () => {
    await supabase?.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-studio-wash text-gray-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-border-soft bg-studio-paper px-4 py-4 lg:w-72 lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
          <div className="flex items-center justify-between gap-4 lg:block">
            <Link to="/admin/products" className="flex min-h-11 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-studio-paper">
              <span className="flex h-10 w-10 items-center justify-center rounded-[2px] bg-terracotta text-warm-ivory">
                <Store size={18} />
              </span>
              <span>
                <span className="block type-overline text-terracotta-dark">Monleaf</span>
                <span className="block font-serif text-xl font-bold leading-none">Admin</span>
              </span>
            </Link>
            <Link to="/" className="hidden text-gray-500 transition-colors hover:text-terracotta type-caption lg:mt-8 lg:inline-flex">
              View storefront
            </Link>
          </div>

          <nav className="mt-5 flex gap-2 overflow-x-auto lg:mt-10 lg:flex-col lg:overflow-visible">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-11 shrink-0 items-center gap-3 rounded-[2px] px-4 py-3 font-semibold transition-colors type-caption focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-studio-paper',
                      isActive ? 'bg-terracotta text-warm-ivory' : 'text-gray-600 hover:bg-warm-ivory hover:text-gray-900'
                    )
                  }
                >
                  <Icon size={16} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex min-h-16 items-center justify-between border-b border-border-soft bg-warm-ivory px-4 py-3 sm:px-6 lg:px-8">
            <div>
              <p className="type-overline text-terracotta-dark">{profile.role}</p>
              <p className="text-sm font-semibold text-gray-800">{profile.full_name || 'Store staff'}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/cart" className="hidden min-h-11 items-center gap-2 text-gray-500 transition-colors hover:text-terracotta type-caption sm:inline-flex">
                <ShoppingBag size={15} />
                Cart
              </Link>
              <button
                type="button"
                onClick={signOut}
                className={buttonClassNames({ variant: 'outline', size: 'sm', className: 'gap-2 bg-transparent' })}
              >
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          </header>

          <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
            <Outlet context={{ profile }} />
          </main>
        </div>
      </div>
    </div>
  );
};
