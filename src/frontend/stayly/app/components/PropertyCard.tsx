"use client";

import Link from "next/link";
import { useState } from "react";
import type { Accommodation } from "../lib/api";
import { Icon } from "./Icon";

export function PropertyCard({ accommodation }: { accommodation: Accommodation }) {
  const [favorite, setFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const fallbackImage =
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80";

  return (
    <article className="group animate-rise flex flex-col">
      <Link
        href={`/accommodations/${accommodation.id}`}
        className="relative block aspect-[1.18/1] w-full overflow-hidden rounded-[16px] bg-stone-200 shadow-sm transition-all duration-300 group-hover:shadow-md dark:bg-stone-800"
      >
        {imageError ? (
          <div className="flex size-full flex-col items-center justify-center bg-stone-200 text-stone-500 dark:bg-stone-800 dark:text-stone-400">
            <Icon name="image" className="size-8 opacity-40" />
            <span className="mt-1 text-xs font-medium">No Image</span>
          </div>
        ) : (
          <img
            src={accommodation.imageUrl || fallbackImage}
            alt={`${accommodation.title} in ${accommodation.location}`}
            onError={() => setImageError(true)}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setFavorite(!favorite);
          }}
          aria-label={favorite ? "Remove from favourites" : "Add to favourites"}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/20 text-white backdrop-blur-md transition hover:scale-110"
        >
          <Icon
            name="heart"
            className={`size-5 ${
              favorite ? "fill-[#ff385c] stroke-[#ff385c]" : "fill-black/30 stroke-white"
            }`}
          />
        </button>
      </Link>
      <div className="pt-3 text-[15px] leading-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-stone-900 truncate dark:text-white">
            <Link href={`/accommodations/${accommodation.id}`} className="hover:underline">
              {accommodation.title}
            </Link>
          </h3>
          <span className="flex items-center gap-1 text-xs font-medium text-stone-700 dark:text-stone-300">
            ★ 4.9
          </span>
        </div>
        <p className="text-stone-500 truncate dark:text-stone-400 text-sm mt-0.5">
          {accommodation.location}
        </p>
        <p className="mt-2 text-stone-900 dark:text-white">
          <span className="font-extrabold text-base">€{accommodation.price}</span>{" "}
          <span className="text-stone-500 dark:text-stone-400 text-sm">night</span>
        </p>
      </div>
    </article>
  );
}
