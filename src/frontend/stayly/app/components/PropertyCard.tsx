"use client";

import Image from "next/image";
import { useState } from "react";
import type { Property } from "../data/properties";
import { Icon } from "./Icon";

export function PropertyCard({ property }: { property: Property }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [favorite, setFavorite] = useState(property.isFavorite);
  const advance = (change: number) => setImageIndex((current) => (current + change + property.images.length) % property.images.length);
  return <article className="group animate-rise">
    <div className="relative aspect-[1.18/1] overflow-hidden rounded-[14px] bg-stone-200 dark:bg-stone-800">
      <Image src={property.images[imageIndex]} alt={`${property.title} in ${property.location}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
        {property.images.map((_, index) => 
        <button key={index} 
          onClick={() => setImageIndex(index)} 
          aria-label={`Show photo ${index + 1}`} 
          className={`h-1.5 rounded-full shadow ${index === imageIndex ? "w-4 bg-white" : "w-1.5 bg-white/70"}`} 
        />)}
      </div>
      <button onClick={() => setFavorite(!favorite)} aria-label={favorite ? "Remove from favourites" : "Add to favourites"} className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/10 text-white backdrop-blur-sm transition hover:scale-110"><Icon name="heart" className={`size-5 ${favorite ? "fill-[#ff385c] stroke-[#ff385c]" : "fill-black/20"}`} /></button>
      <button onClick={() => advance(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 hidden size-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-stone-900 opacity-0 shadow transition group-hover:grid group-hover:opacity-100"><Icon name="chevron-left" className="size-4" /></button>
      <button onClick={() => advance(1)} aria-label="Next photo" className="absolute right-3 top-1/2 hidden size-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-stone-900 opacity-0 shadow transition group-hover:grid group-hover:opacity-100"><Icon name="chevron-right" className="size-4" /></button>
    </div>
    <div className="pt-3 text-[15px] leading-5"><div className="flex items-start justify-between gap-3"><h3 className="font-semibold">{property.location}</h3><span className="flex shrink-0 items-center gap-1 text-sm"><Icon name="star" className="size-3.5 fill-current" />{property.rating}</span></div><p className="text-stone-500">{property.distance}</p><p className="text-stone-500">{property.dates}</p><p className="mt-2"><span className="font-semibold">€{property.price}</span> night</p></div>
  </article>;
}
