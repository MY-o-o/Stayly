"use client";

import { useRef, useState } from "react";
import { Icon } from "./Icon";

const categories = [
  ["Beachfront", "waves"], ["Cabins", "tent"], ["Trending", "sparkles"], ["Islands", "palmtree"], ["OMG!", "badge-check"], ["Tiny Homes", "home"], ["Amazing Pools", "pool"], ["Countryside", "tree"], ["Design", "sparkles"], ["Lakefront", "waves"], ["Tropical", "palmtree"],
] as const;

export function CategoryFilter({ onChange }: { onChange: (category: string) => void }) {
  const [active, setActive] = useState("Beachfront");
  const rail = useRef<HTMLDivElement>(null);
  const choose = (category: string) => { setActive(category); onChange(category); };
  const scroll = (distance: number) => rail.current?.scrollBy({ left: distance, behavior: "smooth" });
  return <div className="mx-auto flex max-w-[1560px] items-center gap-3 px-5 py-5 lg:px-10">
    <button onClick={() => scroll(-280)} aria-label="Scroll categories left" className="hidden size-9 shrink-0 place-items-center rounded-full border border-stone-200 bg-white shadow-sm transition hover:scale-105 lg:grid dark:border-white/15 dark:bg-[#181818]"><Icon name="chevron-left" className="size-4" /></button>
    <div ref={rail} className="no-scrollbar flex flex-1 gap-7 overflow-x-auto scroll-smooth" role="tablist" aria-label="Property categories">
      {categories.map(([label, icon]) => <button key={label} role="tab" aria-selected={active === label} onClick={() => choose(label)} className={`group relative flex shrink-0 flex-col items-center gap-2 pb-3 text-xs font-medium transition ${active === label ? "text-stone-950 dark:text-white" : "text-stone-500 hover:text-stone-950 dark:hover:text-white"}`}><Icon name={icon} className="size-6 stroke-[1.5]" /><span>{label}</span><span className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-stone-950 dark:bg-white ${active === label ? "block" : "hidden"}`} /></button>)}
    </div>
    <button onClick={() => scroll(280)} aria-label="Scroll categories right" className="hidden size-9 shrink-0 place-items-center rounded-full border border-stone-200 bg-white shadow-sm transition hover:scale-105 lg:grid dark:border-white/15 dark:bg-[#181818]"><Icon name="chevron-right" className="size-4" /></button>
    <button className="hidden shrink-0 items-center gap-2 rounded-xl border border-stone-300 px-4 py-3 text-xs font-semibold transition hover:bg-stone-50 xl:flex dark:border-white/15 dark:hover:bg-white/10"><Icon name="sliders" className="size-4" />Filters</button>
  </div>;
}
