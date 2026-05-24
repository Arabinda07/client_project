import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getCurrentAdminProfile, type AdminProfile } from '../../lib/adminData';
import { supabase } from '../../lib/supabaseClient';

export const AdminGuard = () => {
  const location = useLocation();
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    getCurrentAdminProfile()
      .then((nextProfile) => {
        if (isMounted) setProfile(nextProfile);
      })
      .catch((caughtError) => {
        if (isMounted) setError(caughtError instanceof Error ? caughtError.message : 'Unable to verify admin access.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    const { data } =
      supabase?.auth.onAuthStateChange(() => {
        getCurrentAdminProfile()
          .then((nextProfile) => {
            if (isMounted) setProfile(nextProfile);
          })
          .catch(() => {
            if (isMounted) setProfile(null);
          });
      }) ?? { data: { subscription: null } };

    return () => {
      isMounted = false;
      data.subscription?.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-warm-ivory px-4 text-terracotta-dark type-overline">
        Verifying studio access
      </div>
    );
  }

  if (!profile) {
    return <Navigate to="/admin/login" replace state={{ from: location, error }} />;
  }

  return <Outlet context={{ profile }} />;
};
