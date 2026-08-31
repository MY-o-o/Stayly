"use client";

import Link from "next/link";
import { useState } from "react";
import type { Accommodation } from "../lib/api";
import { Icon } from "./Icon";

export function PropertyCard({ accommodation }: { accommodation: Accommodation }) {
  const [favorite, setFavorite] = useState(false);
  return <article className="group animate-rise"><Link href={`/accommodations/${accommodation.id}`} className="relative block aspect-[1.18/1] overflow-hidden rounded-[14px] bg-stone-200 dark:bg-stone-800"><img src={accommodation.imageUrl} alt={`${accommodation.title} in ${accommodation.location}`} className="size-full object-cover transition duration-500 group-hover:scale-105" /><button type="button" onClick={(event) => { event.preventDefault(); setFavorite(!favorite); }} aria-label={favorite ? "Remove from favourites" : "Add to favourites"} className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/10 text-white backdrop-blur-sm transition hover:scale-110"><Icon name="heart" className={`size-5 ${favorite ? "fill-[#ff385c] stroke-[#ff385c]" : "fill-black/20"}`} /></button></Link><div className="pt-3 text-[15px] leading-5"><h3 className="font-semibold">{accommodation.title}</h3><p className="text-stone-500">{accommodation.location}</p><p className="mt-2"><span className="font-semibold">€{accommodation.price}</span> night</p></div></article>;
}
