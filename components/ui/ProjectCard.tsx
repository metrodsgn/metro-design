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
    <Link
      href={`/projetos/${slug}`}
      className="group focus-visible:outline-accent block rounded-[var(--radius-card)] focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      {/* Imagem ou placeholder */}
      <div className="border-border bg-surface group-hover:border-accent relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border transition-colors duration-200">
        {cover ? (
          <Image
            src={urlFor(cover).width(600).height(450).url()}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-editorial text-muted/60 group-hover:text-accent text-8xl transition-colors duration-200">
              {title.charAt(0)}
            </span>
          </div>
        )}

        {/* Overlay que aparece no hover */}
        <div className="from-background/90 absolute inset-0 flex items-end bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          <div className="flex w-full items-center justify-between p-5">
            <span className="text-foreground text-sm font-medium tracking-wide">
              Ver projeto
            </span>
            <span
              aria-hidden="true"
              className="text-accent translate-x-0 text-lg transition-transform duration-150 group-hover:translate-x-1"
            >
              →
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4">
        <h3 className="font-display text-foreground group-hover:text-accent text-lg font-bold tracking-tight transition-colors duration-150">
          {title}
        </h3>
        <p className="text-muted mt-1 text-sm">{category}</p>
      </div>
    </Link>
  );
}
