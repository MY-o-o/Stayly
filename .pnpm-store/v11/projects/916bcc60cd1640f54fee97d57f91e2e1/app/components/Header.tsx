"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { SearchBar } from "./SearchBar";
import { useScrollDirection } from "../hooks/useScrollDirection";

export function Header() {
  const isScrolled = useScrollDirection();
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <header className={`sticky top-0 z-40 border-b border-stone-100 transition-all dark:border-white/10 ${isScrolled ? "bg-white/90 shadow-sm backdrop-blur-xl dark:bg-[#0f0f0f]/90" : "bg-white dark:bg-[#0f0f0f]"}`}>
      <div className="mx-auto flex max-w-[1560px] items-center justify-between gap-5 px-5 py-4 lg:px-10">
        <a href="#top" className="group flex items-center gap-2 text-2xl font-extrabold tracking-[-1.2px] text-[#ff385c]" aria-label="Stayly home">
          <span className="grid size-8 place-items-center rounded-xl bg-[#ff385c] text-base text-white transition-transform group-hover:rotate-6">S</span>Stayly
        </a>
        <div className="hidden lg:block"><SearchBar /></div>
        <nav className="hidden items-center gap-6 text-sm font-medium xl:flex" aria-label="Primary navigation">
          <a className="hover:text-[#ff385c]" href="#stays">Stays</a><a className="hover:text-[#ff385c]" href="#experiences">Experiences</a><a className="hover:text-[#ff385c]" href="#online">Online Experiences</a>
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Toggle dark mode" onClick={toggleTheme} className="grid size-10 place-items-center rounded-full transition hover:bg-stone-100 dark:hover:bg-white/10"><Icon name={dark ? "sun" : "moon"} className="size-4" /></button>
          <button aria-label="Choose language and region" className="hidden size-10 place-items-center rounded-full transition hover:bg-stone-100 sm:grid dark:hover:bg-white/10"><Icon name="globe" className="size-[18px]" /></button>
          <button aria-label="Open user menu" className="flex h-11 items-center gap-2 rounded-full border border-stone-200 py-1 pl-3 pr-1.5 shadow-sm transition hover:shadow-md dark:border-white/15"><Icon name="menu" className="size-4" /><span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-stone-300 to-stone-500 text-[10px] font-bold text-white">G</span></button>
        </div>
      </div>
      <div className="px-5 pb-3 lg:hidden"><SearchBar /></div>
    </header>
  );
}
