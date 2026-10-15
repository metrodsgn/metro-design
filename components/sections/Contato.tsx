"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { Container } from "@/components/ui/Container";
import { CONTACT_FORM, CONTACT, SERVICES, SOCIAL } from "@/lib/constants";

type Status = "idle" | "loading" | "success" | "error";

export function Contato() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [formToken, setFormToken] = useState("");

  useEffect(() => {
    let active = true;

    fetch("/api/contato/token", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Token indisponível");
        return (await response.json()) as { token?: unknown };
      })
      .then((result) => {
        if (active && typeof result.token === "string") {
          setFormToken(result.token);
        }
      })
      .catch(() => {
        if (active) setFormToken("");
      });

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (!formToken) {
      setStatus("error");
      setErrorMessage("Não foi possível preparar o formulário. Tente novamente.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      service: formData.get("service"),
      message: formData.get("message"),
      formToken,
    };

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(result.error || "Erro ao enviar. Tente novamente.");
        return;
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
      setPhone("");
    } catch {
      setStatus("error");
      setErrorMessage("Erro de conexão. Tente novamente.");
    }
  };

  return (
    <section className="py-12 md:py-16">
      <Container className="max-w-[100rem]">
        <span className="section-eyebrow">
          {CONTACT_FORM.label}
        </span>

        <h1 className="font-editorial text-foreground mt-4 max-w-2xl text-4xl leading-tight tracking-tight md:text-6xl">
          {CONTACT_FORM.title}
        </h1>

        <p className="text-muted mt-6 max-w-xl text-base leading-relaxed md:text-lg">
          {CONTACT_FORM.description}
        </p>

        <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-[7fr_4fr] md:gap-16 lg:gap-24">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Field
                id="name"
                label={CONTACT_FORM.fields.name.label}
                placeholder={CONTACT_FORM.fields.name.placeholder}
                type="text"
                required
              />
              <Field
                id="email"
                label={CONTACT_FORM.fields.email.label}
                placeholder={CONTACT_FORM.fields.email.placeholder}
                type="email"
                required
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Field
                id="phone"
                label="Telefone / WhatsApp"
                placeholder="(00) 00000-0000"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(formatPhone(event.target.value))}
              />
              <Field
                id="company"
                label={CONTACT_FORM.fields.company.label}
                placeholder={CONTACT_FORM.fields.company.placeholder}
                type="text"
              />
            </div>

            <div>
              <label
                htmlFor="service"
                className="text-foreground mb-2 block text-sm font-medium"
              >
                Tipo de projeto
              </label>
              <select
                id="service"
                name="service"
                required
                defaultValue=""
                className="ui-input"
              >
                <option value="" disabled>
                  Selecione uma área
                </option>
                {SERVICES.areas.map((area) => (
                  <option key={area.title} value={area.title}>
                    {area.title}
                  </option>
                ))}
                <option value="Outro / ainda não sei">
                  Outro / ainda não sei
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="text-foreground mb-2 block text-sm font-medium"
              >
                {CONTACT_FORM.fields.message.label}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder={CONTACT_FORM.fields.message.placeholder}
                className="ui-input resize-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="ui-button ui-button-accent"
              >
                {status === "loading" ? "Enviando..." : CONTACT_FORM.submit}
              </button>
              <p className="text-muted text-sm">
                Retornamos em até 1 dia útil.
              </p>
            </div>

            <p className="text-muted max-w-2xl text-xs leading-relaxed">
              Ao enviar, suas informações serão usadas para responder à sua
              solicitação. Consulte nosso{" "}
              <a
                href="/privacidade"
                className="text-foreground underline decoration-accent underline-offset-4"
              >
                Aviso de Privacidade
              </a>
              .
            </p>

            {status === "success" && (
              <p className="text-sm text-emerald-400">
                Mensagem enviada! Responderemos em breve.
              </p>
            )}
            {status === "error" && (
              <p className="text-accent text-sm">{errorMessage}</p>
            )}
          </form>

          <aside className="space-y-10 md:pt-2">
            <div className="border-border rounded-xl border p-6 md:p-8">
              <h2 className="text-foreground text-sm font-semibold tracking-wide uppercase">
                Contato direto
              </h2>
              <ul className="mt-4 text-sm">
                <li className="border-border border-b">
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-muted hover:text-accent flex min-h-12 items-center justify-between gap-4 transition-colors"
                  >
                    {CONTACT.email}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
                <li className="border-border border-b">
                  <a
                    href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                    className="text-muted hover:text-accent flex min-h-12 items-center justify-between gap-4 transition-colors"
                  >
                    {CONTACT.phone}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
                <li className="text-muted pt-4">{CONTACT.address}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-foreground text-sm font-semibold tracking-wide uppercase">
                Redes
              </h2>
              <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                {SOCIAL.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent inline-flex items-center gap-2 transition-colors"
                    >
                      <SocialIcon name={item.name} />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <section
          className="relative left-1/2 mt-16 w-screen -translate-x-1/2 border-y border-[var(--color-border)] bg-[#0d0d0d] md:mt-20"
          aria-label={`Mapa de localização: ${CONTACT.address}`}
        >
          <div className="mx-auto flex max-w-[100rem] flex-col gap-3 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 md:px-12">
            <div>
              <p className="section-eyebrow">
                Nossa localização
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
                {CONTACT.address}
              </p>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-button ui-button-secondary w-fit shrink-0"
            >
              Como chegar <span aria-hidden="true">↗</span>
            </a>
          </div>
          <iframe
            title={`Mapa de localização: ${CONTACT.address}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(CONTACT.address)}&output=embed`}
            className="mx-5 mb-6 h-[300px] w-[calc(100%-2.5rem)] overflow-hidden rounded-2xl border border-white/15 sm:mx-8 sm:w-[calc(100%-4rem)] sm:h-[360px] md:mx-12 md:mb-8 md:h-[420px] md:w-[calc(100%-6rem)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </section>
      </Container>
    </section>
  );
}

function SocialIcon({ name }: { name: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (name === "Instagram") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "TikTok") {
    return (
      <svg {...common}>
        <path d="M14 4v10.5a4.5 4.5 0 1 1-4-4.47" />
        <path d="M14 4c.5 2.7 2.2 4.4 5 4.8" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="2.5" y="4" width="19" height="16" rx="2" />
      <path d="M7 8h3.2a2 2 0 0 1 0 4H7zm0 4h3.7a2 2 0 0 1 0 4H7zm7.5 1h5a2.5 2.5 0 0 0-5 0v1a2.5 2.5 0 0 0 4.5 1.5" />
    </svg>
  );
}

function Field({
  id,
  label,
  placeholder,
  type,
  required,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  required?: boolean;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-foreground mb-2 block text-sm font-medium"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        inputMode={type === "tel" ? "tel" : undefined}
        maxLength={type === "tel" ? 15 : undefined}
        className="ui-input"
      />
    </div>
  );
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;

  const areaCode = digits.slice(0, 2);
  const number = digits.slice(2);

  if (number.length <= 4) return `(${areaCode}) ${number}`;
  if (number.length <= 8) {
    return `(${areaCode}) ${number.slice(0, 4)}-${number.slice(4)}`;
  }

  return `(${areaCode}) ${number.slice(0, 5)}-${number.slice(5)}`;
}
