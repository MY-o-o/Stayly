"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Icon } from "../../components/Icon";
import { getAccommodation, Accommodation } from "../../lib/api";

export default function AccommodationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const accommodationId = resolvedParams.id;

  const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getAccommodation(accommodationId)
      .then((data) => {
        if (isMounted) {
          setAccommodation(data);
        }
      })
      .catch((err: Error) => {
        if (isMounted) {
          setError(err.message || "Failed to load accommodation details.");
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
  }, [accommodationId]);

  return (
    <div className="min-h-screen bg-white text-[#222] transition-colors dark:bg-[#0f0f0f] dark:text-stone-100 flex flex-col justify-between">
      <Header />

      <main className="mx-auto max-w-[1280px] px-5 py-8 lg:px-10 flex-1 w-full">
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition hover:text-[#ff385c] dark:text-stone-400 dark:hover:text-white"
          >
            <Icon name="arrow-left" className="size-4" />
            Back to stays
          </Link>
        </div>

        {loading ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-8 w-2/3 rounded-lg bg-stone-200 dark:bg-stone-800" />
            <div className="h-4 w-1/3 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="aspect-[16/9] w-full rounded-2xl bg-stone-200 dark:bg-stone-800" />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-6 w-full rounded bg-stone-200 dark:bg-stone-800" />
                <div className="h-4 w-5/6 rounded bg-stone-200 dark:bg-stone-800" />
                <div className="h-4 w-4/6 rounded bg-stone-200 dark:bg-stone-800" />
              </div>
              <div className="h-64 rounded-2xl bg-stone-200 dark:bg-stone-800" />
            </div>
          </div>
        ) : error || !accommodation ? (
          <div className="my-16 flex flex-col items-center justify-center text-center">
            <div className="grid size-16 place-items-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
              <Icon name="alert-circle" className="size-8" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-stone-900 dark:text-white">
              Accommodation Not Found
            </h1>
            <p className="mt-2 text-stone-600 dark:text-stone-400 max-w-md">
              {error || "The accommodation you are looking for does not exist or has been removed."}
            </p>
            <Link
              href="/"
              className="mt-6 rounded-xl bg-[#ff385c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e00b41]"
            >
              Explore all stays
            </Link>
          </div>
        ) : (
          <article className="space-y-8 animate-rise">
            {/* Header section: Title, Location & Save button */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-3xl lg:text-4xl">
                  {accommodation.title}
                </h1>
                <div className="mt-2 flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
                  <Icon name="map-pin" className="size-4 text-[#ff385c]" />
                  <span className="font-medium text-stone-900 dark:text-stone-200">
                    {accommodation.location}
                  </span>
                  <span>•</span>
                  {accommodation.status == "Approved" && <span className="text-emerald-600 font-semibold dark:text-emerald-400">Approved Listing</span>}
                  {accommodation.status == "Pending" && <span className="text-amber-600 font-semibold dark:text-amber-400">Pending Listing</span>}
                  {accommodation.status == "Rejected" && <span className="text-red-600 font-semibold dark:text-red-400">Rejected Listing</span>}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 sm:pt-0">
                <button
                  type="button"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/5"
                >
                  <Icon
                    name="heart"
                    className={`size-4 ${
                      isFavorite ? "fill-[#ff385c] stroke-[#ff385c]" : "fill-none stroke-current"
                    }`}
                  />
                  {isFavorite ? "Saved" : "Save"}
                </button>
              </div>
            </div>

            {/* Main Image */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-2xl bg-stone-100 shadow-md dark:bg-stone-800">
              {imageError ? (
                <div className="flex size-full flex-col items-center justify-center bg-stone-200 text-stone-500 dark:bg-stone-800 dark:text-stone-400">
                  <Icon name="image" className="size-12 opacity-50" />
                  <span className="mt-2 text-sm">Image unavailable</span>
                </div>
              ) : (
                <img
                  src={accommodation.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"}
                  alt={accommodation.title}
                  onError={() => setImageError(true)}
                  className="size-full object-cover transition duration-700 hover:scale-102"
                />
              )}
              <div className="absolute bottom-4 left-4 rounded-xl bg-black/60 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                Location: {accommodation.location}
              </div>
            </div>

            {/* Grid Layout: Description & Booking Card */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              {/* Left Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Host Badge */}
                <div className="flex items-center justify-between border-b border-stone-200 pb-6 dark:border-white/10">
                  <div>
                    <h2 className="text-xl font-bold text-stone-900 dark:text-white">
                      Entire accommodation in {accommodation.location}
                    </h2>
                    <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                      Listing ID: #{accommodation.id} • Posted on {new Date(accommodation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-[#ff385c] to-[#e00b41] text-lg font-bold text-white shadow-md">
                    S
                  </div>
                </div>

                {/* Features Highlights */}
                <div className="space-y-4 border-b border-stone-200 pb-6 dark:border-white/10">
                  <div className="flex items-start gap-4">
                    <Icon name="check-circle" className="mt-1 size-5 text-[#ff385c]" />
                    <div>
                      <h3 className="font-semibold text-stone-900 dark:text-white">Verified Location</h3>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        {accommodation.location} is verified for accuracy and safety.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="shield" className="mt-1 size-5 text-[#ff385c]" />
                    <div>
                      <h3 className="font-semibold text-stone-900 dark:text-white">Stayly Protection</h3>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        Every booking includes free protection from Host cancellations and listing inaccuracies.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-3">
                    About this place
                  </h3>
                  <div className="prose dark:prose-invert text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line text-base">
                    {accommodation.description}
                  </div>
                </div>
              </div>

              {/* Right Booking Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 rounded-2xl border border-stone-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-[#181818]">
                  <div className="flex items-baseline justify-between border-b border-stone-100 pb-4 dark:border-white/10">
                    <div>
                      <span className="text-3xl font-extrabold text-stone-900 dark:text-white">
                        €{accommodation.price}
                      </span>
                      <span className="text-stone-500 dark:text-stone-400 font-medium"> / night</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full dark:bg-amber-950/50 dark:text-amber-300">
                      ★ 4.9 (New)
                    </span>
                  </div>

                  <div className="my-6 space-y-3">
                    <div className="rounded-xl border border-stone-200 dark:border-white/10 overflow-hidden">
                      <div className="grid grid-cols-2 border-b border-stone-200 dark:border-white/10">
                        <div className="p-3 border-r border-stone-200 dark:border-white/10">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500">
                            Check-in
                          </label>
                          <span className="text-sm font-medium text-stone-800 dark:text-stone-200">Add date</span>
                        </div>
                        <div className="p-3">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500">
                            Checkout
                          </label>
                          <span className="text-sm font-medium text-stone-800 dark:text-stone-200">Add date</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500">
                          Guests
                        </label>
                        <span className="text-sm font-medium text-stone-800 dark:text-stone-200">1 guest</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => alert("Reservation system initialized! Select dates to complete booking.")}
                      className="w-full rounded-xl bg-gradient-to-r from-[#ff385c] to-[#e00b41] py-3.5 text-center text-base font-bold text-white shadow-lg transition hover:brightness-105"
                    >
                      Reserve Stay
                    </button>
                    <p className="text-center text-xs text-stone-500 dark:text-stone-400">
                      You won&apos;t be charged yet
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-stone-100 pt-4 text-sm text-stone-600 dark:border-white/10 dark:text-stone-400">
                    <div className="flex justify-between">
                      <span>€{accommodation.price} x 5 nights</span>
                      <span>€{accommodation.price * 5}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>€45</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stayly service fee</span>
                      <span>€30</span>
                    </div>
                    <div className="flex justify-between border-t border-stone-200 pt-3 text-base font-bold text-stone-900 dark:border-white/10 dark:text-white">
                      <span>Total before taxes</span>
                      <span>€{accommodation.price * 5 + 75}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
}
