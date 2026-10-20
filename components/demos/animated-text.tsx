import AnimatedText from "@/components/ui/animated-text";

/**
 * Demo do AnimatedText com o lettering "metro design" usado no rodapé
 * da transição da home. Role até a área para ver o revel por letra.
 */
export default function AnimatedTextDemo() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-12 px-6 py-24">
      <AnimatedText
        text="metro design"
        className="font-sans text-accent text-center text-[12cqw] leading-[1.05] font-semibold tracking-[-0.04em] whitespace-nowrap"
        animationType="letters"
        duration={0.6}
        staggerDelay={0.045}
        initialY={40}
        initialOpacity={0}
      />

      <AnimatedText
        text="estratégia com método"
        className="font-editorial text-foreground max-w-3xl text-center text-4xl leading-tight md:text-6xl"
        animationType="words"
        duration={0.7}
        staggerDelay={0.07}
        initialY={30}
      />
    </div>
  );
}
