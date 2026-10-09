"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type ProjectCardProps = {
  title: string;
  slug: string;
  category: string;
  cover?: {
    asset: { _ref: string; _type: string };
    hotspot?: { x: number; y: number };
  };
};

export function ProjectCard({
  title,
  slug,
  category,
  cover,
}: ProjectCardProps) {
  return (
    <Link href={`/projetos/${slug}`} className="group block">
      {/* Imagem ou placeholder */}
      <div className="border-border bg-surface relative aspect-[4/3] overflow-hidden rounded-lg border transition-colors group-hover:border-accent">
        {cover ? (
          <Image
            src={urlFor(cover).width(600).height(450).url()}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-editorial text-muted/40 group-hover:text-accent/60 text-8xl transition-colors">
              {title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4">
        <h3 className="font-display text-foreground group-hover:text-accent text-lg font-bold tracking-tight transition-colors">
          {title}
        </h3>
        <p className="text-muted mt-1 text-sm">{category}</p>
      </div>
    </Link>
  );
}