"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CONTACT } from "@/lib/constants";

// Configurações ajustáveis dos serviços reais da Metro.
const DELIVERIES = [
  "Naming e criação de marcas",
  "Identidade visual",
  "Brand book",
  "Redesign de marcas",
  "Planejamento estratégico",
  "Gestão de redes sociais",
  "Campanhas digitais",
  "Fotografia publicitária",
  "Produção de vídeos",
  "Direção de arte para campanhas",
  "Sinalização e materiais gráficos",
  "Outro",
];

const INVESTMENT_RANGES = [
  "Até R$ 2.000",
  "R$ 2.000 a R$ 5.000",
  "R$ 5.000 a R$ 10.000",
  "R$ 10.000 a R$ 20.000",
  "Acima de R$ 20.000",
  "Ainda estou definindo o investimento",
];

const COMPANY_SIZES = ["Apenas eu", "2 a 10", "11 a 50", "51 a 200", "Mais de 200"];

const HOW_HEARD_OPTIONS = ["Instagram", "Indicação", "Busca no Google", "Behance", "Outro"];

const PHRASE_OPTIONS = [
  "Sou fundador(a) ou proprietário(a) de uma empresa",
  "Sou diretor(a) ou gestor(a) de marketing",
  "Sou profissional autônomo ou especialista",
  "Tenho uma startup ou negócio em fase de lançamento",
  "Tenho uma empresa consolidada e busco reposicionamento",
  "Sou de uma agência e busco colaboração",
];

type Status = "idle" | "loading" | "success" | "error";

export function Contato() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formToken, setFormToken] = useState("");
  const [tokenError, setTokenError] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const firstErrorRef = useRef<HTMLElement | null>(null);

  // Busca o token de anti-spam (tempo mínimo de 8s de preenchimento).
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
          setTokenError(false);
        }
      })
      .catch(() => {
        if (active) {
          setFormToken("");
          setTokenError(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const validate = useCallback((): boolean => {
    const nextErrors: Record<string, string> = {};
    let firstField: HTMLElement | null = null;

    const required: Record<string, string> = {
      name: "Nome é obrigatório.",
      email: "E-mail é obrigatório.",
      company: "Nome da empresa é obrigatório.",
      website: "Site é obrigatório.",
      profession: "Seu cargo é obrigatório.",
      companySize: "Nº de colaboradores é obrigatório.",
      howHeard: "Como conheceu a Metro é obrigatório.",
      phrase: "Qual frase melhor te representa é obrigatório.",
      challenge: "Nos conte sobre o seu desafio é obrigatório.",
      whatsapp: "Seu WhatsApp é obrigatório.",
    };

    for (const [field, msg] of Object.entries(required)) {
      const el = document.getElementById(field);
      const value = (formData[field] || "").trim();
      if (!value) {
        nextErrors[field] = msg;
        if (!firstField && el) firstField = el;
      }
    }

    // E-mail válido
    const emailValue = (formData.email || "").trim();
    if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      nextErrors.email = "Informe um e-mail válido.";
      if (!firstField) {
        const el = document.getElementById("email");
        if (el) firstField = el;
      }
    }

    // WhatsApp com ao menos 10 dígitos
    const whatsappValue = (formData.whatsapp || "").trim();
    const whatsappDigits = whatsappValue.replace(/\D/g, "");
    if (whatsappDigits.length < 10) {
      nextErrors.whatsapp = "Informe um WhatsApp com ao menos 10 dígitos.";
      if (!firstField) {
        const el = document.getElementById("whatsapp");
        if (el) firstField = el;
      }
    }

    // Desafio máximo 800 caracteres
    const challengeValue = (formData.challenge || "").trim();
    if (challengeValue.length > 800) {
      nextErrors.challenge = "O desafio deve ter no máximo 800 caracteres.";
      if (!firstField) {
        const el = document.getElementById("challenge");
        if (el) firstField = el;
      }
    }

    // Ao menos uma entrega
    const deliveries = DELIVERIES.filter((d) => formData[`delivery_${d}`] === "on");
    if (deliveries.length === 0) {
      nextErrors.deliveries = "Selecione ao menos uma entrega.";
      if (!firstField) {
        const el = document.querySelector('[name^="delivery_"]');
        if (el) firstField = el as HTMLElement;
      }
    }

    // Consentimento obrigatório
    if (formData.consent !== "on") {
      nextErrors.consent = "Você precisa concordar com o tratamento de dados.";
      if (!firstField) {
        const el = document.getElementById("consent");
        if (el) firstField = el;
      }
    }

    setFieldErrors(nextErrors);
    firstErrorRef.current = firstField;
    return Object.keys(nextErrors).length === 0;
  }, [formData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>, label: string) => {
    const key = `delivery_${label}`;
    setFormData((prev) => ({ ...prev, [key]: event.target.checked ? "on" : "" }));
    if (fieldErrors.deliveries) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.deliveries;
        return next;
      });
    }
  };

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      firstErrorRef.current?.focus?.();
      setStatus("error");
      setErrorMessage("Por favor, revise os campos destacados.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    if (!formToken) {
      setStatus("error");
      setErrorMessage(
        "Nosso sinal caiu entre a Aldeota e o servidor. Tente de novo ou chame no WhatsApp.",
      );
      return;
    }

    const deliveries = DELIVERIES.filter((d) => formData[`delivery_${d}`] === "on");

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      company: formData.company,
      website: "", // honeypot, sempre vazio
      socialMedia: formData.socialMedia,
      profession: formData.profession,
      companySize: formData.companySize,
      howHeard: formData.howHeard,
      phrase: formData.phrase,
      deliveries,
      investmentRange: formData.investmentRange,
      challenge: formData.challenge,
      consent: formData.consent,
      formToken,
    };

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(result.error || "Erro ao enviar. Tente novamente.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Nosso sinal caiu entre a Aldeota e o servidor. Tente de novo ou chame no WhatsApp.",
      );
    }
  }, [formToken, formData, validate]);

  if (status === "success") {
    return (
      <section className="pt-section-lg pb-section-lg">
        <Container className="max-w-2xl">
          <div className="text-center">
            <p className="label-mono text-accent mb-4">Sucesso</p>
            <h1 className="font-editorial text-foreground text-4xl leading-[1.05] tracking-tight md:text-6xl">
              Recebemos o seu projeto.
            </h1>
            <p className="text-muted mt-6 max-w-lg mx-auto text-base leading-relaxed md:text-lg">
              A sua mensagem chegou até a gente com segurança. Vamos analisar
              com calma e retornar pelo e-mail ou WhatsApp que você informou.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="ui-button ui-button-secondary"
              >
                Voltar ao início
              </Link>
              <Link
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-button ui-button-accent"
              >
                Falar pelo WhatsApp <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <p className="mt-8 text-muted text-xs leading-relaxed">
              Consulte nosso{" "}
              <Link
                href="/privacidade"
                className="text-foreground underline decoration-accent underline-offset-4"
              >
                Aviso de Privacidade
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="pt-section-lg pb-section-lg">
      <Container>
        {/* Cabeçalho da seção com três colunas */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start md:items-center mb-16 md:mb-20"
        >
          <div className="order-2 md:order-1">
            <Link
              href="/"
              className="label-mono hover:text-accent transition-colors"
            >
              Contato
            </Link>
          </div>
          <div className="order-3 md:order-2 text-center">
            <Link
              href="/"
              className="font-wordmark text-accent mt-16 leading-[0.78] font-medium tracking-[-0.035em] break-all select-none text-[clamp(4rem,22vw,18rem)]"
              aria-label="Metro Design — início"
            >
              metro<span className="text-[clamp(1.1rem,4.6vw,3.8rem)]">.</span>
            </Link>
          </div>
          <div className="order-1 md:order-3 text-right md:text-left">
            <button
              type="button"
              className="label-mono hover:text-accent transition-colors"
              onClick={() => {
                const menuToggle = document.querySelector(
                  '[aria-controls="main-menu"]',
                ) as HTMLElement | null;
                menuToggle?.click();
              }}
            >
              Menu
            </button>
          </div>
        </div>

        <div className="contact-section-grid grid gap-16 md:gap-24 lg:gap-32 md:grid-cols-[2fr_3fr]">
          {/* Coluna esquerda — título e texto de apoio */}
          <div
            className="flex flex-col justify-start md:sticky md:top-24"
          >
            <div className="space-y-8">
              <h1
                className="font-editorial text-foreground leading-[0.88] tracking-[-0.045em] md:text-[clamp(64px,18vw,128px)]"
                style={{ fontSize: "clamp(64px, 18vw, 128px)" }}
              >
                Vamos<span className="block"> conversar?</span>
              </h1>
              <p className="text-muted text-[19px] leading-relaxed max-w-[400px] md:text-base">
                Queremos entender os detalhes do seu próximo projeto. Será um
                prazer co-criar com o seu time.
              </p>
            </div>
          </div>

          {/* Coluna direita — formulário */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 md:grid md:grid-cols-2 md:gap-6 lg:gap-8"
            noValidate
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              style={{ position: "absolute", left: "-9999px" }}
              aria-hidden="true"
            />
            {/* Linha 1: Nome e E-mail */}
            <ContactField
              id="name"
              label="Nome"
              required
              value={formData.name || ""}
              onChange={handleChange}
              error={fieldErrors.name}
            />
            <ContactField
              id="email"
              label="E-mail"
              type="email"
              required
              value={formData.email || ""}
              onChange={handleChange}
              error={fieldErrors.email}
            />

            {/* Select: frase */}
            <ContactSelect
              id="phrase"
              label="Qual frase melhor te representa?"
              options={PHRASE_OPTIONS}
              required
              value={formData.phrase || ""}
              onChange={handleChange}
              error={fieldErrors.phrase}
            />

            {/* Textarea: desafio */}
            <div className="md:col-span-2">
              <ContactLabel htmlFor="challenge" label="Nos conte sobre o seu desafio" required />
              <textarea
                id="challenge"
                name="challenge"
                rows={6}
                required
                maxLength={800}
                value={formData.challenge || ""}
                onChange={handleChange}
                className="contact-input w-full min-h-[200px] resize-y"
                placeholder="Conte sobre o seu desafio..."
              />
              {fieldErrors.challenge && (
                <span className="contact-error" role="alert">
                  {fieldErrors.challenge}
                </span>
              )}
              <p className="contact-hint">
                {formData.challenge?.length || 0}/800 caracteres
              </p>
            </div>

            {/* Fieldset: Entregas */}
            <div className="md:col-span-2">
              <fieldset
                className="contact-fieldset"
                aria-labelledby="deliveries-label"
              >
                <legend id="deliveries-label" className="contact-legend">
                  Selecione as entregas que você acredita que o projeto necessita
                  <span className="text-accent">*</span>
                </legend>
                <div className="contact-deliveries">
                  {DELIVERIES.map((delivery) => (
                    <ContactCheckbox
                      key={delivery}
                      id={`delivery_${delivery}`}
                      name={`delivery_${delivery}`}
                      label={delivery}
                      checked={formData[`delivery_${delivery}`] === "on"}
                      onChange={(event) => handleDeliveryChange(event, delivery)}
                    />
                  ))}
                  {fieldErrors.deliveries && (
                    <span className="contact-error contact-error-block" role="alert">
                      {fieldErrors.deliveries}
                    </span>
                  )}
                </div>
              </fieldset>
            </div>

            {/* Select: investimento */}
            <ContactSelect
              id="investmentRange"
              label="Qual a disponibilidade de investimento em design do seu projeto?"
              options={INVESTMENT_RANGES}
              required
              value={formData.investmentRange || ""}
              onChange={handleChange}
              error={fieldErrors.investmentRange}
            />

            {/* Linha: Nome da empresa e Site */}
            <ContactField
              id="company"
              label="Nome da empresa"
              required
              value={formData.company || ""}
              onChange={handleChange}
              error={fieldErrors.company}
            />
            <ContactField
              id="website"
              label="Site"
              type="url"
              required
              value={formData.website || ""}
              onChange={handleChange}
              error={fieldErrors.website}
              placeholder="https://"
            />

            {/* Linha: Seu cargo e Nº de colaboradores */}
            <ContactField
              id="profession"
              label="Seu cargo"
              required
              value={formData.profession || ""}
              onChange={handleChange}
              error={fieldErrors.profession}
            />
            <ContactSelect
              id="companySize"
              label="Nº de colaboradores"
              options={COMPANY_SIZES}
              required
              value={formData.companySize || ""}
              onChange={handleChange}
              error={fieldErrors.companySize}
            />

            {/* Select: como conheceu */}
            <ContactSelect
              id="howHeard"
              label="Como conheceu a Metro?"
              options={HOW_HEARD_OPTIONS}
              required
              value={formData.howHeard || ""}
              onChange={handleChange}
              error={fieldErrors.howHeard}
            />

            {/* Linha: WhatsApp e rede social */}
            <ContactField
              id="whatsapp"
              label="Seu WhatsApp"
              type="tel"
              required
              value={formData.whatsapp || ""}
              onChange={handleChange}
              error={fieldErrors.whatsapp}
              placeholder="(00) 00000-0000"
            />
            <ContactField
              id="socialMedia"
              label="Sua rede social"
              type="url"
              value={formData.socialMedia || ""}
              onChange={handleChange}
              error={fieldErrors.socialMedia}
              placeholder="instagram.com/"
            />

            {/* Consentimento */}
            <div className="md:col-span-2 flex items-start gap-3">
              <ContactCheckbox
                id="consent"
                name="consent"
                label="Concordo com o tratamento de meus dados conforme o "
                checked={formData.consent === "on"}
                onChange={handleChange}
                inline
              >
                <Link
                  href="/privacidade"
                  className="contact-privacy-link"
                >
                  Aviso de Privacidade
                </Link>
                <span className="text-accent">*</span>
              </ContactCheckbox>
              {fieldErrors.consent && (
                <span className="contact-error contact-error-block" role="alert">
                  {fieldErrors.consent}
                </span>
              )}
            </div>

            {/* Botão */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="contact-button"
              >
                {status === "loading" ? "Enviando…" : "Enviar proposta de projeto"}
              </button>
            </div>

            {tokenError && (
              <div className="md:col-span-2">
                <p className="contact-error" role="status">
                  O formulário não preparou direito. Tenta recarregar a página
                  ou, se preferir,{" "}
                  <Link
                    href={`https://wa.me/${CONTACT.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-error-link"
                  >
                    chama no WhatsApp
                  </Link>
                  .
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="md:col-span-2">
                <p className="contact-error contact-error-block" role="alert">
                  {errorMessage}
                </p>
              </div>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}

function ContactField({
  id,
  label,
  type = "text",
  required = false,
  value,
  onChange,
  error,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <ContactLabel htmlFor={id} label={label} required={required} />
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event as React.ChangeEvent<HTMLInputElement>)}
        placeholder={placeholder}
        className={`contact-input ${error ? "" : ""}`}
      />
      {error && (
        <span className="contact-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function ContactLabel({
  htmlFor,
  label,
  required = false,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="contact-label block mb-2"
    >
      {label}
      {required && <span className="text-accent">*</span>}
    </label>
  );
}

function ContactSelect({
  id,
  label,
  options,
  required = false,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  options: string[];
  required?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}) {
  return (
    <div>
      <ContactLabel htmlFor={id} label={label} required={required} />
      <select
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={(event) => onChange(event as React.ChangeEvent<HTMLSelectElement>)}
        className="contact-select"
      >
        <option value="" disabled>
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <span className="contact-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function ContactCheckbox({
  id,
  name,
  label,
  checked,
  onChange,
  inline = false,
  children,
}: {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inline?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <label
      className={`contact-checkbox-label ${inline ? "contact-checkbox-inline" : ""} cursor-pointer`}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only contact-checkbox-input"
      />
      <span className="contact-checkbox-box"></span>
      <span className="contact-checkbox-text">
        {label}
        {children}
      </span>
    </label>
  );
}
