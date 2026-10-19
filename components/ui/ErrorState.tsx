"use client";

type ErrorStateProps = {
  retry?: () => void;
  global?: boolean;
};

function ErrorContent({ retry }: { retry?: () => void }) {
  return (
    <main className="flex min-h-[70svh] flex-col items-center justify-center px-6 py-section-md text-center">
      <p className="section-eyebrow">Algo deu errado</p>
      <h1 className="font-editorial text-foreground mt-5 text-4xl leading-[1.05] tracking-tight md:text-6xl">
        Não conseguimos carregar esta página.
      </h1>
      <p className="text-muted mt-4 max-w-lg text-sm leading-relaxed md:text-base">
        Pode ter sido uma falha temporária de conexão. Tente novamente em alguns
        instantes.
      </p>
      {retry && (
        <button
          type="button"
          onClick={retry}
          className="ui-button ui-button-primary mt-8"
        >
          Tentar novamente
        </button>
      )}
    </main>
  );
}

export function ErrorState({ retry, global = false }: ErrorStateProps) {
  if (!global) return <ErrorContent retry={retry} />;

  return (
    <html lang="pt-BR">
      <body className="bg-background text-foreground font-sans antialiased">
        <ErrorContent retry={retry} />
      </body>
    </html>
  );
}
