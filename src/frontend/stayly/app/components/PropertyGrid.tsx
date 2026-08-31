"use client";

import { useEffect, useState } from "react";
import { Accommodation, getAccommodations } from "../lib/api";
import { PropertyCard } from "./PropertyCard";

function SkeletonCard() { return <div className="space-y-3"><div className="aspect-[1.18/1] animate-pulse rounded-[14px] bg-stone-200 dark:bg-stone-800" /><div className="h-4 w-3/4 animate-pulse rounded bg-stone-200 dark:bg-stone-800" /></div>; }

export function PropertyGrid({ category: _category }: { category: string }) {
  const [loading, setLoading] = useState(true); const [items, setItems] = useState<Accommodation[]>([]); const [error, setError] = useState<string | null>(null);
  
  useEffect(() => 
  { 
    getAccommodations()
      .then(setItems)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false)); 
  }, []);
  
  return <section id="stays" className="mx-auto max-w-[1560px] px-5 pb-20 lg:px-10" aria-live="polite">
    <h1 className="sr-only">Stays to explore</h1>
    {error && <p className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{error}</p>}
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {loading ? Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} />) 
        : items.map((accommodation) => <PropertyCard key={accommodation.id} accommodation={accommodation} />)}
    </div>
    {!loading && !error && items.length === 0 && <p className="py-16 text-center text-stone-500">No approved accommodations are available yet.</p>}
  </section>;
}
