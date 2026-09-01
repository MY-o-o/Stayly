"use client";

import { useState } from "react";
import { CategoryFilter } from "./components/CategoryFilter";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Icon } from "./components/Icon";
import { PropertyGrid } from "./components/PropertyGrid";

export default function Home() {
  const [category, setCategory] = useState("Beachfront");
  return <div id="top" className="min-h-screen bg-white text-[#222] transition-colors dark:bg-[#0f0f0f] dark:text-stone-100">
    <Header />

    <main>
      <CategoryFilter onChange={setCategory} />
      <PropertyGrid category={category} />
    </main>
    
    <button 
      className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-105 dark:bg-white dark:text-stone-900 sm:left-auto sm:right-7 sm:translate-x-0" 
      aria-label="Show map"
    >
      <Icon name="map" className="size-4" />
      Show map
    </button>
    
    <Footer />
  </div>;
}
