"use client";

import { useState, FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { CONTACT_FORM, CONTACT, SOCIAL } from "@/lib/constants";

type Status = "idle" | "loading" | "success" | "error";

export function Contato() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
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
    } catch {
      setStatus("error");
      setErrorMessage("Erro de conexão. Tente novamente.");
    }
  };

  return (
    <section className="py-16 md:py-24">
      <Container>
        <span className="text-accent text-sm font-medium tracking-widest uppercase">
          {CONTACT_FORM.label}
        </span>

        <h1 className="font-editorial text-foreground mt-4 max-w-2xl text-4xl leading-tight tracking-tight md:text-6xl">
          {CONTACT_FORM.title}
        </h1>

        <p className="text-muted mt-6 max-w-xl text-base leading-relaxed md:text-lg">
          {CONTACT_FORM.description}
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-[6fr_5fr] md:gap-16 lg:gap-24">
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

            <Field
              id="company"
              label={CONTACT_FORM.fields.company.label}
              placeholder={CONTACT_FORM.fields.company.placeholder}
              type="text"
            />

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
                className="border-border bg-surface text-foreground placeholder:text-muted focus:border-accent w-full resize-none rounded-md border px-4 py-3 text-sm transition-colors focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-foreground text-background hover:bg-accent hover:text-foreground inline-flex min-h-12 items-center rounded-md px-6 text-sm font-medium transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Enviando..." : CONTACT_FORM.submit}
            </button>

            {status === "success" && (
              <p className="text-sm text-emerald-400">
                Mensagem enviada! Responderemos em breve.
              </p>
            )}
            {status === "error" && (
              <p className="text-accent text-sm">{errorMessage}</p>
            )}
          </form>

          <div className="space-y-10">
            <div>
              <h2 className="text-foreground text-sm font-semibold tracking-wide uppercase">
                Contato direto
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-muted hover:text-accent transition-colors"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                    className="text-muted hover:text-accent transition-colors"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
                <li className="text-muted">{CONTACT.address}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-foreground text-sm font-semibold tracking-wide uppercase">
                Redes
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {SOCIAL.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({
  id,
  label,
  placeholder,
  type,
  required,
}: {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  required?: boolean;
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
        className="border-border bg-surface text-foreground placeholder:text-muted focus:border-accent w-full rounded-md border px-4 py-3 text-sm transition-colors focus:outline-none"
      />
    </div>
  );
}