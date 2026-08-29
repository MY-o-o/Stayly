import type { SVGProps } from "react";

type IconName = "search" | "map-pin" | "calendar" | "users" | "globe" | "menu" | "heart" | "star" | "chevron-left" | "chevron-right" | "sliders" | "moon" | "sun" | "map" | "tree" | "waves" | "tent" | "sparkles" | "home" | "pool" | "palmtree" | "badge-check" | "facebook" | "instagram" | "twitter";

const paths: Record<IconName, React.ReactNode> = {
  search: <><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></>,
  "map-pin": <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.9-8.6a5.5 5.5 0 0 0-.1-7.8Z"/>,
  star: <path d="m12 3 2.78 5.63 6.22.9-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.92 1.06-6.2L3 9.53l6.22-.9L12 3Z"/>,
  "chevron-left": <path d="m15 18-6-6 6-6"/>,
  "chevron-right": <path d="m9 18 6-6-6-6"/>,
  sliders: <><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/></>,
  moon: <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z"/>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
  map: <><path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Z"/><path d="M9 3v15M15 6v15"/></>,
  tree: <><path d="M12 21v-6M7 21h10M12 3 5 14h14L12 3Z"/><path d="m12 7-5 8h10l-5-8Z"/></>,
  waves: <path d="M2 12c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 17c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/>,
  tent: <><path d="m3 21 9-18 9 18H3Z"/><path d="m7 21 5-9 5 9"/></>,
  sparkles: <><path d="m12 3-1.5 4.5L6 9l4.5 1.5L12 15l1.5-4.5L18 9l-4.5-1.5L12 3Z"/><path d="m19 16-.8 2.2L16 19l2.2.8L19 22l.8-2.2L22 19l-2.2-.8L19 16Z"/></>,
  home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z"/><path d="M9 21v-7h6v7"/></>,
  pool: <><path d="M4 6h16M6 6v6a6 6 0 0 0 12 0V6"/><path d="M2 19c2 0 2-1.5 4-1.5S8 19 10 19s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/></>,
  palmtree: <><path d="M12 22v-9"/><path d="M12 13c-1-7-7-7-9-4 4-1 6 2 9 4ZM12 13c1-7 7-7 9-4-4-1-6 2-9 4ZM12 13c-5-5-2-9 0-10 2 2 5 5 0 10Z"/></>,
  "badge-check": <><path d="m12 3 2.2 2 3-.1.7 2.9 2.5 1.7-1.3 2.7.3 3-2.7 1.3-1.5 2.6-3-.6-3 .6-1.5-2.6-2.7-1.3.3-3-1.3-2.7L6.8 7.8l.7-2.9 3 .1L12 3Z"/><path d="m8.5 12 2.2 2.2 4.8-4.8"/></>,
  facebook: <path d="M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9a1 1 0 0 1 1-1Z"/>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></>,
  twitter: <path d="M21 6.5a7.8 7.8 0 0 1-2.2.6A3.8 3.8 0 0 0 20.5 5a7.7 7.7 0 0 1-2.5 1A3.8 3.8 0 0 0 11.5 9.5c0 .3 0 .6.1.9A10.8 10.8 0 0 1 3.8 6.5a3.8 3.8 0 0 0 1.2 5.1 3.7 3.7 0 0 1-1.7-.5 3.8 3.8 0 0 0 3 3.7 3.9 3.9 0 0 1-1.7.1 3.8 3.8 0 0 0 3.6 2.6A7.7 7.7 0 0 1 3.5 19 10.8 10.8 0 0 0 9.4 20.7c7.1 0 11-5.9 11-11v-.5A7.7 7.7 0 0 0 22 7.2L21 6.5Z"/>,
};

export function Icon({ name, className = "", ...props }: { name: IconName; className?: string } & SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>{paths[name]}</svg>;
}
