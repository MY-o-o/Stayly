"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Icon } from "../components/Icon";
import { useAuth } from "../context/AuthContext";
import { getMyAccommodations, Accommodation } from "../lib/api";

export default function MyAccommodationsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    getMyAccommodations()
      .then((data) => {
        if (isMounted) {
          setAccommodations(data);
        }
      })
      .catch((err: Error) => {
        if (isMounted) {
          setError(err.message || "Failed to load your accommodations.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  const renderStatusBadge = (status: string) => {
    const normalized = status?.toLowerCase() || "";

    if (normalized === "approved") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/50 dark:text-emerald-300">
          <Icon name="check-circle" className="size-3.5" />
          Approved
        </span>
      );
    }

    if (normalized === "rejected") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 ring-1 ring-inset ring-rose-600/20 dark:bg-rose-950/50 dark:text-rose-300">
          <Icon name="alert-circle" className="size-3.5" />
          Rejected
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950/50 dark:text-amber-300">
        <Icon name="clock" className="size-3.5" />
        Pending
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 text-[#222] transition-colors dark:bg-[#0f0f0f] dark:text-stone-100 flex flex-col justify-between">
      <Header />

      <main className="mx-auto max-w-[1280px] px-5 py-10 flex-1 w-full">
        {/* Header Title Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 border-b border-stone-200 pb-6 dark:border-white/10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
              My Accommodations
            </h1>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              Manage your accommodation listings and check their moderation status.
            </p>
          </div>

          {isAuthenticated && (
            <Link
              href="/add-accommodation"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff385c] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#e00b41]"
            >
              <Icon name="plus" className="size-4" />
              Add Accommodation
            </Link>
          )}
        </div>

        {/* Loading / Unauthenticated / Empty / List content */}
        {authLoading || (loading && isAuthenticated) ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-stone-200 dark:bg-stone-800" />
            ))}
          </div>
        ) : !isAuthenticated ? (
          <div className="my-12 rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center shadow-sm dark:border-amber-900/50 dark:bg-amber-950/30">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300">
              <Icon name="lock" className="size-7" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-stone-900 dark:text-white">
              Sign In to View Your Listings
            </h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
              Please log in to your account to view your listed properties and their moderation status.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/login?returnUrl=/my-accommodations"
                className="rounded-xl bg-[#ff385c] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#e00b41]"
              >
                Log In
              </Link>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            <p className="font-semibold">Error loading accommodations:</p>
            <p className="text-sm">{error}</p>
          </div>
        ) : accommodations.length === 0 ? (
          <div className="my-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center dark:border-white/15 dark:bg-[#181818]">
            <div className="grid size-16 place-items-center rounded-full bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-500">
              <Icon name="home" className="size-8" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-stone-900 dark:text-white">
              No Accommodations Yet
            </h2>
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400 max-w-md">
              You haven&apos;t created any accommodation listings yet. Start hosting by adding your first property today!
            </p>
            <Link
              href="/add-accommodation"
              className="mt-6 rounded-xl bg-[#ff385c] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#e00b41]"
            >
              Add New Accommodation
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {accommodations.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-[#181818]"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-200 dark:bg-stone-800">
                  <img
                    src={item.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"}
                    alt={item.title}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    {renderStatusBadge(item.status)}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="font-bold text-stone-900 line-clamp-1 dark:text-white text-base">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1">
                      <Icon name="map-pin" className="size-3.5 text-[#ff385c]" />
                      {item.location}
                    </p>
                    <p className="mt-2 text-xs text-stone-600 line-clamp-2 dark:text-stone-300">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-stone-100 pt-4 dark:border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-extrabold text-stone-900 dark:text-white">
                        €{item.price}
                      </span>
                      <span className="text-xs text-stone-500 dark:text-stone-400"> / night</span>
                    </div>

                    <Link
                      href={`/accommodations/${item.id}`}
                      className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-100 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/10"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
