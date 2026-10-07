import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60" />

      <Container className="relative z-10">
        <h1 className="font-display text-foreground max-w-5xl text-4xl leading-tight font-bold tracking-tight md:text-6xl lg:text-7xl">
          Transformamos negócios com design e comunicação estratégica.
        </h1>
      </Container>
    </section>
  );
}
