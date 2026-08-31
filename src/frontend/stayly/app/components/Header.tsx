"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Icon } from "./Icon";
import { SearchBar } from "./SearchBar";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { useAuth } from "../context/AuthContext";

export function Header() {
  const isScrolled = useScrollDirection();
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, logout } = useAuth();

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
  };

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "G";

  return (
    <header className={`sticky top-0 z-40 border-b border-stone-100 transition-all dark:border-white/10 ${isScrolled ? "bg-white/90 shadow-sm backdrop-blur-xl dark:bg-[#0f0f0f]/90" : "bg-white dark:bg-[#0f0f0f]"}`}>
      <div className="mx-auto flex max-w-[1560px] items-center justify-between gap-5 px-5 py-4 lg:px-10">
        <Link href="/" className="group flex items-center gap-2 text-2xl font-extrabold tracking-[-1.2px] text-[#ff385c]" aria-label="Stayly home">
          <span className="grid size-8 place-items-center rounded-xl bg-[#ff385c] text-base text-white transition-transform group-hover:rotate-6">S</span>Stayly
        </Link>
        <div className="hidden lg:block"><SearchBar /></div>
        <nav className="hidden items-center gap-6 text-sm font-medium xl:flex" aria-label="Primary navigation">
          <a className="hover:text-[#ff385c]" href="#stays">Stays</a>
          <a className="hover:text-[#ff385c]" href="#experiences">Experiences</a>
          <a className="hover:text-[#ff385c]" href="#online">Online Experiences</a>
        </nav>
        <div className="flex items-center gap-2">
          {isAuthenticated && user && <span className="hidden text-sm font-semibold text-stone-700 dark:text-stone-200 sm:inline">Hi, {user.name}</span>}
          <button aria-label="Toggle dark mode" onClick={toggleTheme} className="grid size-10 place-items-center rounded-full transition hover:bg-stone-100 dark:hover:bg-white/10">
            <Icon name={dark ? "sun" : "moon"} className="size-4" />
          </button>
          <button aria-label="Choose language and region" className="hidden size-10 place-items-center rounded-full transition hover:bg-stone-100 sm:grid dark:hover:bg-white/10">
            <Icon name="globe" className="size-[18px]" />
          </button>

          {/* User Menu Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              aria-label="Open user menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-11 items-center gap-2 rounded-full border border-stone-200 py-1 pl-3 pr-1.5 shadow-sm transition hover:shadow-md dark:border-white/15"
            >
              <Icon name="menu" className="size-4" />
              <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-[#ff385c] to-[#e00b41] text-[11px] font-bold text-white shadow-inner">
                {initial}
              </span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-13 z-50 w-64 origin-top-right rounded-2xl border border-stone-100 bg-white py-2 shadow-xl ring-1 ring-black/5 transition-all dark:border-white/10 dark:bg-[#1c1c1c] dark:shadow-2xl">
                {isAuthenticated && user ? (
                  <>
                    <div className="border-b border-stone-100 px-4 py-3 dark:border-white/10">
                      <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Signed in as</p>
                      <p className="truncate text-sm font-bold text-stone-900 dark:text-white">{user.name}</p>
                      <p className="truncate text-xs text-stone-500">{user.email}</p>
                    </div>
                    <div className="py-1">
                      {user.role.toLowerCase() === "user" && <Link href="/add-accommodation" onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 text-sm text-stone-700 transition hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-white/5">Add accommodation</Link>}
                      {user.role.toLowerCase() === "user" && <Link href="/my-accommodations" onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 text-sm text-stone-700 transition hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-white/5">My accommodations</Link>}
                      {user.role.toLowerCase() === "admin" && <Link href="/api/admin/accommodations/pending" onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 text-sm text-stone-700 transition hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-white/5">Admin Panel</Link>}
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2.5 text-left text-sm font-semibold text-[#ff385c] transition hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        Log out
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="py-1">
                      <Link
                        href="/register"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm font-bold text-stone-900 transition hover:bg-stone-50 dark:text-white dark:hover:bg-white/5"
                      >
                        Sign up
                      </Link>
                      <Link
                        href="/login"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-white/5"
                      >
                        Log in
                      </Link>
                    </div>
                    <div className="my-1 border-t border-stone-100 dark:border-white/10" />
                    <div className="py-1">
                      <a
                        href="#top"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm text-stone-600 transition hover:bg-stone-50 dark:text-stone-400 dark:hover:bg-white/5"
                      >
                        Help Center
                      </a>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="px-5 pb-3 lg:hidden"><SearchBar /></div>
    </header>
  );
}

