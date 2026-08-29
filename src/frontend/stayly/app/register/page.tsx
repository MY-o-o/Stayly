"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated, error: authError, clearError } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setFormError(null);

    if (!name || !email || !password) {
      setFormError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);
      await register({ name, email, password });
      router.push("/");
    } catch {
      // Error handled by AuthContext
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
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
          Join Stayly to book unique homes and memorable experiences
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
                htmlFor="name"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300"
              >
                Full Name
              </label>
              <div className="mt-1.5">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="block w-full rounded-xl border border-stone-300 bg-transparent px-4 py-3 text-stone-900 placeholder-stone-400 transition focus:border-[#ff385c] focus:outline-none focus:ring-2 focus:ring-[#ff385c]/20 dark:border-white/15 dark:text-white dark:placeholder-stone-500"
                />
              </div>
            </div>

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
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300"
              >
                Password
              </label>
              <div className="mt-1.5">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="block w-full rounded-xl border border-stone-300 bg-transparent px-4 py-3 text-stone-900 placeholder-stone-400 transition focus:border-[#ff385c] focus:outline-none focus:ring-2 focus:ring-[#ff385c]/20 dark:border-white/15 dark:text-white dark:placeholder-stone-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300"
              >
                Confirm Password
              </label>
              <div className="mt-1.5">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
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
                    Creating account...
                  </span>
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 border-t border-stone-100 pt-6 text-center text-sm text-stone-500 dark:border-white/10 dark:text-stone-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#ff385c] transition hover:underline"
            >
              Log in
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
