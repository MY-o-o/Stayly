"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Icon } from "../../components/Icon";
import { useAuth } from "../../context/AuthContext";
import {
  getPendingAccommodations,
  approveAccommodation,
  rejectAccommodation,
  Accommodation,
} from "../../lib/api";

export default function AdminAccommodationsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const [pendingAccommodations, setPendingAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [actionInProgress, setActionInProgress] = useState<number | null>(null);

  const isAdmin = isAuthenticated && user?.role?.toLowerCase() === "admin";

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    getPendingAccommodations()
      .then((data) => {
        if (isMounted) {
          setPendingAccommodations(data);
        }
      })
      .catch((err: Error) => {
        if (isMounted) {
          setError(err.message || "Failed to fetch pending accommodations.");
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
  }, [isAdmin]);

  const handleApprove = async (id: number, title: string) => {
    setActionInProgress(id);
    setActionMessage(null);
    try {
      await approveAccommodation(id);
      setPendingAccommodations((prev) => prev.filter((item) => item.id !== id));
      setActionMessage({
        type: "success",
        text: `Accommodation "${title}" has been APPROVED.`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to approve accommodation";
      setActionMessage({
        type: "error",
        text: msg,
      });
    } finally {
      setActionInProgress(null);
    }
  };

  const handleReject = async (id: number, title: string) => {
    setActionInProgress(id);
    setActionMessage(null);
    try {
      await rejectAccommodation(id);
      setPendingAccommodations((prev) => prev.filter((item) => item.id !== id));
      setActionMessage({
        type: "success",
        text: `Accommodation "${title}" has been REJECTED.`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to reject accommodation";
      setActionMessage({
        type: "error",
        text: msg,
      });
    } finally {
      setActionInProgress(null);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-[#222] transition-colors dark:bg-[#0f0f0f] dark:text-stone-100 flex flex-col justify-between">
      <Header />

      <main className="mx-auto max-w-[1280px] px-5 py-10 flex-1 w-full">
        {/* Header section */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-8 border-b border-stone-200 pb-6 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-600 dark:bg-red-950/50 dark:text-red-400">
                Admin Moderation Panel
              </span>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
              Pending Accommodations
            </h1>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              Review and moderate host accommodation listings before publishing.
            </p>
          </div>
        </div>

        {/* Action message banner */}
        {actionMessage && (
          <div
            className={`mb-6 flex items-center justify-between rounded-xl p-4 text-sm font-medium ${
              actionMessage.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50"
                : "bg-red-50 text-red-800 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/50"
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon
                name={actionMessage.type === "success" ? "check-circle" : "alert-circle"}
                className="size-5 shrink-0"
              />
              <span>{actionMessage.text}</span>
            </div>
            <button
              onClick={() => setActionMessage(null)}
              className="text-xs underline hover:opacity-75"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Protection / Authorization check */}
        {authLoading || (loading && isAdmin) ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-2xl bg-stone-200 dark:bg-stone-800" />
            ))}
          </div>
        ) : !isAuthenticated || !isAdmin ? (
          <div className="my-12 rounded-2xl border border-red-200 bg-red-50 p-8 text-center shadow-sm dark:border-red-950/50 dark:bg-red-950/30">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
              <Icon name="shield" className="size-8" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-stone-900 dark:text-white">
              Access Denied
            </h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
              You must be logged in as an <strong className="font-bold">Admin</strong> to view and moderate accommodation requests.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/login?returnUrl=/admin/accommodations"
                className="rounded-xl bg-[#ff385c] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#e00b41]"
              >
                Log In as Admin
              </Link>
              <Link
                href="/"
                className="rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 shadow-sm transition hover:bg-stone-50 dark:border-white/15 dark:bg-stone-800 dark:text-stone-200"
              >
                Return Home
              </Link>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            <p className="font-semibold">Error fetching pending accommodations:</p>
            <p className="text-sm">{error}</p>
          </div>
        ) : pendingAccommodations.length === 0 ? (
          <div className="my-12 flex flex-col items-center justify-center rounded-2xl border border-stone-200 bg-white p-12 text-center shadow-sm dark:border-white/10 dark:bg-[#181818]">
            <div className="grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Icon name="check-circle" className="size-8" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-stone-900 dark:text-white">
              All Moderated!
            </h2>
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400 max-w-md">
              There are currently no pending accommodation requests waiting for approval.
            </p>
            <Link
              href="/"
              className="mt-6 rounded-xl border border-stone-200 px-6 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/5"
            >
              Go to Home Page
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-sm font-semibold text-stone-500 dark:text-stone-400">
              Showing {pendingAccommodations.length} pending listing(s)
            </p>

            {pendingAccommodations.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-stretch overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-[#181818]"
              >
                {/* Image */}
                <div className="relative md:w-72 aspect-[16/10] md:aspect-auto shrink-0 bg-stone-200 dark:bg-stone-800">
                  <img
                    src={item.imageUrl || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"}
                    alt={item.title}
                    className="size-full object-cover"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                    Pending
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-stone-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-stone-600 dark:text-stone-300">
                          <Icon name="map-pin" className="size-4 text-[#ff385c]" />
                          {item.location}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-2xl font-extrabold text-stone-900 dark:text-white">
                          €{item.price}
                        </span>
                        <span className="text-xs text-stone-500 dark:text-stone-400 block">per night</span>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-stone-100 pt-4 dark:border-white/10">
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      Owner ID: #{item.ownerId} • Submitted: {new Date(item.createdAt).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/accommodations/${item.id}`}
                        target="_blank"
                        className="rounded-xl border border-stone-200 px-4 py-2.5 text-xs font-bold text-stone-700 shadow-sm transition hover:bg-stone-100 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/10"
                      >
                        View Details
                      </Link>

                      <button
                        type="button"
                        disabled={actionInProgress === item.id}
                        onClick={() => handleReject(item.id, item.title)}
                        className="flex items-center gap-1.5 rounded-xl border border-rose-300 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-700 shadow-sm transition hover:bg-rose-100 disabled:opacity-50 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900/60"
                      >
                        <Icon name="x" className="size-4" />
                        Reject
                      </button>

                      <button
                        type="button"
                        disabled={actionInProgress === item.id}
                        onClick={() => handleApprove(item.id, item.title)}
                        className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-emerald-700 disabled:opacity-50"
                      >
                        {actionInProgress === item.id ? (
                          <span className="inline-block size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                          <Icon name="check" className="size-4" />
                        )}
                        Approve
                      </button>
                    </div>
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
