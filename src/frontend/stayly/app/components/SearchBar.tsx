"use client";

import { Icon } from "./Icon";

const fields = [
  ["Where", "Search destinations", "map-pin"],
  ["Check in", "Add dates", "calendar"],
  ["Check out", "Add dates", "calendar"],
  ["Who", "Add guests", "users"],
] as const;

export function SearchBar() {
  return (
    <form className="flex h-16 w-full items-center rounded-full border border-stone-200 bg-white p-1.5 shadow-[0_3px_12px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-[#181818] sm:w-auto" onSubmit={(event) => event.preventDefault()}>
      {fields.map(([label, placeholder, icon], index) => (
        <button key={label} type="button" className={`hidden min-w-[118px] px-4 text-left sm:block ${index > 0 ? "border-l border-stone-200 dark:border-white/10" : ""}`}>
          <span className="block text-[11px] font-bold text-stone-900 dark:text-white">{label}</span>
          <span className="block text-xs text-stone-500">{placeholder}</span>
        </button>
      ))}
      <button type="button" className="flex min-w-0 flex-1 items-center gap-3 px-3 text-left sm:hidden">
        <Icon name="search" className="size-5 shrink-0" />
        <span><strong className="block text-sm">Anywhere</strong><span className="text-xs text-stone-500">Any week · Add guests</span></span>
      </button>
      <button type="submit" aria-label="Search stays" className="grid size-11 shrink-0 place-items-center rounded-full bg-[#ff385c] text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff385c]">
        <Icon name="search" className="size-5" />
      </button>
    </form>
  );
}
