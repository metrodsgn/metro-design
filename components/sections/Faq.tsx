import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Container } from "@/components/ui/Container";
import { FAQ } from "@/lib/constants";

export function Faq() {
  const items = FAQ.items.filter((item) => item.answer.trim());
  if (!items.length) return null;

  return (
    <section data-theme="light" className="about-faq bg-background py-20 text-foreground md:py-32">
      <Container>
        <h2 className="about-faq__title type-h2">{FAQ.title}</h2>
        <FaqAccordion items={items} />
      </Container>
    </section>
  );
}
