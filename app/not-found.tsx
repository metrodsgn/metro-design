import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70svh] flex-col items-center justify-center px-6 py-20 text-center">
      <p className="section-eyebrow">404 · PÁGINA NÃO ENCONTRADA</p>
      <h1 className="font-editorial text-foreground mt-5 text-4xl leading-[1.05] tracking-tight md:text-6xl">
        Este caminho não existe.
      </h1>
      <p className="text-muted mt-4 max-w-lg text-sm leading-relaxed md:text-base">
        O endereço pode ter mudado. Volte para a página inicial e continue
        explorando os projetos da Metro.
      </p>
      <Link href="/" className="ui-button ui-button-primary mt-8">
        Voltar para o início
      </Link>
    </main>
  );
}
