import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CLIENTS } from "@/lib/constants";
import type { ClientLogo } from "@/sanity/lib/fetchers";
import { urlFor } from "@/sanity/lib/image";

export function Clientes({ clients }: { clients: ClientLogo[] }) {
  const visibleClients = clients.filter((client) => client.logo?.asset?._ref);
  const marqueeClients = visibleClients.length >= 4
    ? Array.from({ length: Math.ceil(16 / visibleClients.length) }, () => visibleClients).flat()
    : visibleClients;

  return (
    <section id="clientes" className="py-section-md md:py-section-lg">
      <Container>
        <Reveal>
          <h2 className="type-h2 text-foreground max-w-2xl">
            {CLIENTS.title}
          </h2>
        </Reveal>
      </Container>

      {visibleClients.length > 0 && visibleClients.length < 4 && (
        <Reveal delay={0.15}>
          <Container>
            <div className="mt-12 flex flex-wrap justify-center gap-4 md:mt-16">
              {visibleClients.map((client) => (
                <ClientCard key={client._id} client={client} />
              ))}
            </div>
          </Container>
        </Reveal>
      )}

      {visibleClients.length >= 4 && (
        <>
          <Reveal delay={0.15}>
            <div className="clients-marquee mt-16 overflow-hidden">
              <div className="animate-marquee flex w-max">
                {[0, 1].map((copy) => (
                  <div
                    key={`row1-copy-${copy}`}
                    aria-hidden={copy > 0}
                    className="flex shrink-0 gap-4 pr-4"
                  >
                    {marqueeClients.map((client, index) => (
                      <ClientCard
                        key={`row1-${copy}-${client._id}-${index}`}
                        client={client}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="clients-marquee mt-4 overflow-hidden">
              <div className="animate-marquee-reverse flex w-max">
                {[0, 1].map((copy) => (
                  <div
                    key={`row2-copy-${copy}`}
                    aria-hidden={copy > 0}
                    className="flex shrink-0 gap-4 pr-4"
                  >
                    {[...marqueeClients].reverse().map((client, index) => (
                      <ClientCard
                        key={`row2-${copy}-${client._id}-${index}`}
                        client={client}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </>
      )}
    </section>
  );
}

function ClientCard({ client }: { client: ClientLogo }) {
  return (
    <div className="relative flex h-28 w-56 shrink-0 items-center justify-center sm:h-32 sm:w-64">
      <Image
        src={urlFor(client.logo).width(800).fit("max").url()}
        alt={`Logo de ${client.name}`}
        fill
        sizes="256px"
        className="scale-150 object-contain mix-blend-screen"
      />
    </div>
  );
}
