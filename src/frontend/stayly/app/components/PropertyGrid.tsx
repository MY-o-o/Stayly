"use client";

import { useEffect, useState } from "react";
import { properties } from "../data/properties";
import { PropertyCard } from "./PropertyCard";

function SkeletonCard() { return <div className="space-y-3"><div className="aspect-[1.18/1] animate-pulse rounded-[14px] bg-stone-200 dark:bg-stone-800" /><div className="h-4 w-3/4 animate-pulse rounded bg-stone-200 dark:bg-stone-800" /><div className="h-3 w-1/2 animate-pulse rounded bg-stone-200 dark:bg-stone-800" /></div>; }

export function PropertyGrid({ category }: { category: string }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), 450); return () => window.clearTimeout(timer); }, []);
  const shown = category === "Beachfront" ? properties : properties.filter((property) => property.category === category);
  const results = shown.length ? shown : properties.slice(0, 8);
  return <section id="stays" className="mx-auto max-w-[1560px] px-5 pb-20 lg:px-10" aria-live="polite"><h1 className="sr-only">Stays to explore</h1><div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{loading ? Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} />) : results.map((property) => <PropertyCard key={property.id} property={property} />)}</div>{!loading && <div className="mt-16 text-center"><p className="mb-4 text-lg font-semibold">Keep exploring amazing stays</p><button className="rounded-lg bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 dark:bg-white dark:text-stone-900">Show more</button></div>}</section>;
}
