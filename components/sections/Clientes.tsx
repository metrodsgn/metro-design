import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CLIENTS } from "@/lib/constants";
import { getAllClients, type ClientLogo } from "@/sanity/lib/fetchers";
import { urlFor } from "@/sanity/lib/image";

export async function Clientes() {
  const clients = await getAllClients();

  return (
    <section id="clientes" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <h2 className="font-editorial text-foreground max-w-2xl text-3xl leading-tight tracking-tight md:text-5xl">
            {CLIENTS.title}
          </h2>
        </Reveal>
      </Container>

      {clients.length > 0 && clients.length < 4 && (
        <Reveal delay={0.15}>
          <Container>
            <div className="mt-12 flex flex-wrap justify-center gap-4 md:mt-16">
              {clients.map((client) => (
                <ClientCard key={client._id} client={client} />
              ))}
            </div>
          </Container>
        </Reveal>
      )}

      {clients.length >= 4 && (
        <>
          <Reveal delay={0.15}>
            <div className="mt-16 overflow-hidden">
              <div className="animate-marquee flex w-max">
                {[0, 1, 2, 3].map((copy) => (
                  <div
                    key={`row1-copy-${copy}`}
                    aria-hidden={copy > 0}
                    className="flex shrink-0 gap-4 pr-4"
                  >
                    {clients.map((client) => (
                      <ClientCard
                        key={`row1-${copy}-${client._id}`}
                        client={client}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-4 overflow-hidden">
              <div className="animate-marquee-reverse flex w-max">
                {[0, 1, 2, 3].map((copy) => (
                  <div
                    key={`row2-copy-${copy}`}
                    aria-hidden={copy > 0}
                    className="flex shrink-0 gap-4 pr-4"
                  >
                    {[...clients].reverse().map((client) => (
                      <ClientCard
                        key={`row2-${copy}-${client._id}`}
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
