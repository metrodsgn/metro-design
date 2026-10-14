"use client";

type ErrorStateProps = {
  retry?: () => void;
  global?: boolean;
};

export function ErrorState({ retry, global = false }: ErrorStateProps) {
  const content = (
    <main className="flex min-h-[70svh] flex-col items-center justify-center px-6 py-20 text-center">
      <p className="section-eyebrow">ALGO DEU ERRADO</p>
      <h1 className="font-editorial text-foreground mt-5 text-4xl md:text-6xl">
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

  if (!global) return content;

  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          background: "#0a0a0a",
          color: "#f5f5f5",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <main
          style={{
            minHeight: "70svh",
            padding: "5rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#ff3038", letterSpacing: ".18em", fontSize: 12 }}>
            ALGO DEU ERRADO
          </p>
          <h1
            style={{
              maxWidth: 800,
              margin: "1rem 0 0",
              fontFamily: "Georgia, serif",
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              fontWeight: 400,
            }}
          >
            Não conseguimos carregar esta página.
          </h1>
          <p style={{ maxWidth: 500, color: "#a3a3a3", lineHeight: 1.7 }}>
            Pode ter sido uma falha temporária de conexão. Tente novamente em
            alguns instantes.
          </p>
          {retry && (
            <button
              type="button"
              onClick={retry}
              style={{
                marginTop: 16,
                border: 0,
                borderRadius: 8,
                padding: "14px 20px",
                background: "#ff3038",
                color: "white",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              Tentar novamente
            </button>
          )}
        </main>
      </body>
    </html>
  );
}
