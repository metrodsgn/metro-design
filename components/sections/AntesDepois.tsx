import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ANTES_DEPOIS } from "@/data/antes-depois";
import { getBeforeAfterItems } from "@/sanity/lib/fetchers";
import type { AntesDepoisItem } from "@/data/antes-depois";

export async function AntesDepois() {
  const editableItems = await getBeforeAfterItems();
  const rawItems = editableItems.length > 0 ? editableItems : ANTES_DEPOIS;
  const items = rawItems.filter((item) => item.antes && item.depois);

  return (
    <section id="antes-depois" className="py-section-md md:py-section-lg">
      <Container>
        <Reveal>
          <p className="section-eyebrow">Comparativo de identidade</p>

          <h2 className="font-editorial text-foreground mt-4 max-w-2xl text-3xl leading-tight tracking-tight md:text-5xl">
            Antes e depois
          </h2>

          <p className="text-muted mt-4 max-w-xl text-base leading-relaxed md:text-lg">
            Veja como uma nova identidade transforma a presença de cada marca.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 grid gap-8 md:gap-12 lg:gap-16">
            {items.map((item) => (
              <AntesDepoisPair key={item.cliente} item={item} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function AntesDepoisPair({ item }: { item: AntesDepoisItem }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      <ImageFrame
        src={item.antes!}
        label="ANTES"
        alt={item.altAntes ?? `Antes da identidade de ${item.cliente}`}
      />
      <ImageFrame
        src={item.depois!}
        label="DEPOIS"
        alt={item.altDepois ?? `Depois da identidade de ${item.cliente}`}
      />
    </div>
  );
}

function ImageFrame({
  src,
  label,
  alt,
}: {
  src: string;
  label: string;
  alt: string;
}) {
  return (
    <figure className="relative group w-full aspect-[4/3] rounded-card border border-border overflow-hidden md:aspect-[3/2]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-center"
        loading="lazy"
      />
      <span
        className="absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-sans text-white tracking-widest uppercase select-none"
        aria-hidden="true"
      >
        {label}
      </span>
    </figure>
  );
}
