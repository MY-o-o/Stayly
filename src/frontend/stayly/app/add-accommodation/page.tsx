"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Icon } from "../components/Icon";
import { useAuth } from "../context/AuthContext";
import { createAccommodation } from "../lib/api";

export default function AddAccommodationPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [imagePreviewError, setImagePreviewError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !description.trim() || !location.trim() || !price || !imageUrl.trim()) {
      setError("Please fill out all required fields.");
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setError("Please enter a valid positive price per night.");
      return;
    }

    try {
      setSubmitting(true);
      await createAccommodation({
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        price: numericPrice,
        imageUrl: imageUrl.trim(),
      });

      setSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create accommodation";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-[#222] transition-colors dark:bg-[#0f0f0f] dark:text-stone-100 flex flex-col justify-between">
      <Header />

      <main className="mx-auto max-w-3xl px-5 py-12 flex-1 w-full">
        {/* Header Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition hover:text-[#ff385c] dark:text-stone-400 dark:hover:text-white"
          >
            <Icon name="arrow-left" className="size-4" />
            Return home
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
            List Your Accommodation
          </h1>
          <p className="mt-2 text-base text-stone-600 dark:text-stone-400">
            Share your space with travelers around the world. Your listing will be reviewed by our team before going live.
          </p>
        </div>

        {authLoading ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#181818] animate-pulse space-y-4">
            <div className="h-6 w-1/3 bg-stone-200 rounded dark:bg-stone-800" />
            <div className="h-10 w-full bg-stone-200 rounded dark:bg-stone-800" />
            <div className="h-10 w-full bg-stone-200 rounded dark:bg-stone-800" />
          </div>
        ) : !isAuthenticated ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center shadow-sm dark:border-amber-900/50 dark:bg-amber-950/30">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300">
              <Icon name="lock" className="size-7" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-stone-900 dark:text-white">
              Authentication Required
            </h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
              You must be logged in to create and submit an accommodation listing.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/login?returnUrl=/add-accommodation"
                className="rounded-xl bg-[#ff385c] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#e00b41]"
              >
                Log In Now
              </Link>
              <Link
                href="/register"
                className="rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50 dark:border-white/15 dark:bg-stone-800 dark:text-stone-200"
              >
                Create Account
              </Link>
            </div>
          </div>
        ) : success ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm dark:border-emerald-900/50 dark:bg-emerald-950/30 animate-rise">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-300">
              <Icon name="check-circle" className="size-10" />
            </div>
            <h2 className="mt-4 text-2xl font-extrabold text-stone-900 dark:text-white">
              Submission Successful!
            </h2>
            <p className="mt-2 text-base text-emerald-800 dark:text-emerald-300 max-w-lg mx-auto">
              Your accommodation <strong className="font-bold">&quot;{title}&quot;</strong> has been successfully created and sent for moderation. You can track its status in your dashboard.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/my-accommodations"
                className="rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-700"
              >
                View My Accommodations
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSuccess(false);
                  setTitle("");
                  setDescription("");
                  setLocation("");
                  setPrice("");
                  setImageUrl("");
                }}
                className="rounded-xl border border-stone-300 bg-white px-6 py-3.5 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50 dark:border-white/15 dark:bg-stone-800 dark:text-stone-200"
              >
                Add Another Accommodation
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#181818] sm:p-10">
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
                <Icon name="alert-circle" className="size-5 shrink-0 text-red-500" />
                <span className="flex-1">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300"
                >
                  Accommodation Title *
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Luxury Beachfront Villa with Private Pool"
                  className="mt-2 block w-full rounded-xl border border-stone-300 bg-transparent px-4 py-3 text-stone-900 placeholder-stone-400 transition focus:border-[#ff385c] focus:outline-none focus:ring-2 focus:ring-[#ff385c]/20 dark:border-white/15 dark:text-white dark:placeholder-stone-500"
                />
              </div>

              {/* Location & Price Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Location */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300"
                  >
                    Location *
                  </label>
                  <input
                    id="location"
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Barcelona, Spain"
                    className="mt-2 block w-full rounded-xl border border-stone-300 bg-transparent px-4 py-3 text-stone-900 placeholder-stone-400 transition focus:border-[#ff385c] focus:outline-none focus:ring-2 focus:ring-[#ff385c]/20 dark:border-white/15 dark:text-white dark:placeholder-stone-500"
                  />
                </div>

                {/* Price */}
                <div>
                  <label
                    htmlFor="price"
                    className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300"
                  >
                    Price per night (€) *
                  </label>
                  <div className="relative mt-2">
                    <span className="absolute left-4 top-3.5 text-stone-400 font-semibold">€</span>
                    <input
                      id="price"
                      type="number"
                      min="1"
                      step="any"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="150"
                      className="block w-full rounded-xl border border-stone-300 bg-transparent pl-8 pr-4 py-3 text-stone-900 placeholder-stone-400 transition focus:border-[#ff385c] focus:outline-none focus:ring-2 focus:ring-[#ff385c]/20 dark:border-white/15 dark:text-white dark:placeholder-stone-500"
                    />
                  </div>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label
                  htmlFor="imageUrl"
                  className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300"
                >
                  Image URL *
                </label>
                <input
                  id="imageUrl"
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setImagePreviewError(false);
                  }}
                  placeholder="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                  className="mt-2 block w-full rounded-xl border border-stone-300 bg-transparent px-4 py-3 text-stone-900 placeholder-stone-400 transition focus:border-[#ff385c] focus:outline-none focus:ring-2 focus:ring-[#ff385c]/20 dark:border-white/15 dark:text-white dark:placeholder-stone-500"
                />
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                  Provide a direct public image link (e.g., Unsplash, Imgur, or direct CDN image URL).
                </p>

                {/* Image Preview Card */}
                {imageUrl && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-stone-200 bg-stone-100 p-2 dark:border-white/10 dark:bg-stone-800">
                    <p className="mb-2 text-[11px] font-bold uppercase text-stone-500">Image Preview</p>
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-stone-200 dark:bg-stone-700">
                      {imagePreviewError ? (
                        <div className="flex size-full flex-col items-center justify-center text-stone-400">
                          <Icon name="alert-circle" className="size-6" />
                          <span className="mt-1 text-xs">Invalid image URL</span>
                        </div>
                      ) : (
                        <img
                          src={imageUrl}
                          alt="Preview"
                          onError={() => setImagePreviewError(true)}
                          className="size-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300"
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  rows={5}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your property, features, amenities, view, and nearby attractions..."
                  className="mt-2 block w-full rounded-xl border border-stone-300 bg-transparent p-4 text-stone-900 placeholder-stone-400 transition focus:border-[#ff385c] focus:outline-none focus:ring-2 focus:ring-[#ff385c]/20 dark:border-white/15 dark:text-white dark:placeholder-stone-500"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-gradient-to-r from-[#ff385c] to-[#e00b41] py-4 text-base font-bold text-white shadow-md transition hover:brightness-105 disabled:opacity-60"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block size-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Submitting Listing...
                    </span>
                  ) : (
                    "Submit Accommodation for Review"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
