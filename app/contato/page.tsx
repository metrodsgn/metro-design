import type { Metadata } from "next";
import { Contato } from "@/components/sections/Contato";

export const metadata: Metadata = {
  title: "Fale Conosco — Metro Design",
  description:
    "Vamos construir algo juntos. Conte sobre o seu projeto e respondemos em até 1 dia útil.",
};

export default function ContatoPage() {
  return (
    <div>
      <Contato />
    </div>
  );
}
