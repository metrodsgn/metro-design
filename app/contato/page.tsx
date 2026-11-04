import type { Metadata } from "next";
import { Contato } from "@/components/sections/Contato";
import { Faq } from "@/components/sections/Faq";
import { CONTACT_FAQ } from "@/lib/constants";
import { createSiteMetadata } from "@/lib/metadata";

export const metadata: Metadata = createSiteMetadata({
  title: "Fale Conosco — Metro Design",
  description:
    "Vamos construir algo juntos. Conte sobre o seu projeto e respondemos em até 1 dia útil.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <div>
      <Faq content={CONTACT_FAQ} compact />
      <Contato />
    </div>
  );
}
