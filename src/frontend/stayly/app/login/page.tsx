"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../context/AuthContext";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams?.get("returnUrl") || "/";

  const { login, isAuthenticated, error: authError, clearError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push(returnUrl);
    }
  }, [isAuthenticated, router, returnUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setFormError(null);

    if (!email || !password) {
      setFormError("Please enter both email and password.");
      return;
    }

    try {
      setSubmitting(true);
      await login({ email, password });
      router.push(returnUrl);
    } catch {
      // Error handled by AuthContext and displayed via authError
    } finally {
      setSubmitting(false);
    }
  };

  const displayedError = formError || authError;

  return (
    <div className="flex min-h-screen flex-col justify-center bg-stone-50 px-6 py-12 transition-colors dark:bg-[#0f0f0f] sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="group mx-auto flex items-center justify-center gap-2 text-3xl font-extrabold tracking-[-1.2px] text-[#ff385c]">
          <span className="grid size-10 place-items-center rounded-xl bg-[#ff385c] text-lg text-white transition-transform group-hover:rotate-6">
            S
          </span>
          Stayly
        </Link>
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
          Welcome back to Stayly
        </h2>
        <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
          Sign in to manage your bookings and explore unique stays
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-stone-200 bg-white px-6 py-8 shadow-sm transition-colors dark:border-white/10 dark:bg-[#181818] sm:px-10">
          {displayedError && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
              <span className="font-semibold">Error:</span>
              <span className="flex-1">{displayedError}</span>
              <button
                type="button"
                onClick={() => {
                  setFormError(null);
                  clearError();
                }}
                className="text-xs font-semibold hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300"
              >
                Email address
              </label>
              <div className="mt-1.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="block w-full rounded-xl border border-stone-300 bg-transparent px-4 py-3 text-stone-900 placeholder-stone-400 transition focus:border-[#ff385c] focus:outline-none focus:ring-2 focus:ring-[#ff385c]/20 dark:border-white/15 dark:text-white dark:placeholder-stone-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300"
                >
                  Password
                </label>
              </div>
              <div className="mt-1.5">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full rounded-xl border border-stone-300 bg-transparent px-4 py-3 text-stone-900 placeholder-stone-400 transition focus:border-[#ff385c] focus:outline-none focus:ring-2 focus:ring-[#ff385c]/20 dark:border-white/15 dark:text-white dark:placeholder-stone-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center rounded-xl bg-[#ff385c] py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#e00b41] hover:shadow-lg disabled:opacity-60"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Signing in...
                  </span>
                ) : (
                  "Log in"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 border-t border-stone-100 pt-6 text-center text-sm text-stone-500 dark:border-white/10 dark:text-stone-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#ff385c] transition hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-stone-500 dark:text-stone-500">
          <Link href="/" className="hover:underline">
            ← Return to home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50 dark:bg-[#0f0f0f]" />}>
      <LoginForm />
    </Suspense>
  );
}

