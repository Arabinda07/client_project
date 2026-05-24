import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { errorTextClassName, fieldGroupClassName, inputClassName, labelClassName } from '../../components/ui/formStyles';
import { getCurrentAdminProfile } from '../../lib/adminData';
import { supabase } from '../../lib/supabaseClient';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from?: { pathname?: string }; error?: string } | null;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [hasAdminSession, setHasAdminSession] = useState(false);
  const [error, setError] = useState(state?.error ?? '');

  useEffect(() => {
    let isMounted = true;

    getCurrentAdminProfile()
      .then((profile) => {
        if (isMounted) setHasAdminSession(Boolean(profile));
      })
      .catch(() => {
        if (isMounted) setHasAdminSession(false);
      })
      .finally(() => {
        if (isMounted) setIsCheckingSession(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!supabase) {
      setError('Supabase is not configured for this environment.');
      setIsSubmitting(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message);
      setIsSubmitting(false);
      return;
    }

    try {
      const profile = await getCurrentAdminProfile();
      if (!profile) {
        await supabase.auth.signOut();
        setError('This account does not have active admin access.');
        setIsSubmitting(false);
        return;
      }

      navigate(state?.from?.pathname || '/admin/products', { replace: true });
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to verify admin access.');
      setIsSubmitting(false);
    }
  };

  if (!isCheckingSession && hasAdminSession) {
    return <Navigate to="/admin/products" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-warm-ivory px-4 py-12">
      <div className="w-full max-w-md rounded-[2px] border border-border-soft bg-surface p-8 clay-shadow-soft">
        <div className="mb-8">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[2px] bg-terracotta text-warm-ivory">
            <Lock size={20} />
          </div>
          <p className="mb-2 text-terracotta-dark type-overline">Studio Admin</p>
          <h1 className="type-h1 text-gray-900">Sign in</h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className={fieldGroupClassName}>
            <label htmlFor="admin-email" className={labelClassName}>Email</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClassName()}
            />
          </div>

          <div className={fieldGroupClassName}>
            <label htmlFor="admin-password" className={labelClassName}>Password</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClassName()}
            />
          </div>

          {error && <p className={errorTextClassName} role="alert">{error}</p>}

          <Button type="submit" fullWidth disabled={isSubmitting || isCheckingSession}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
};
