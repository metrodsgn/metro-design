"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CONTACT, CONTACT_FAQ } from "@/lib/constants";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { TurnstileWidget } from "@/components/ui/TurnstileWidget";
import {
  EMAIL_ERROR_MESSAGE,
  isValidEmail,
} from "@/lib/validation";

const DELIVERY_GROUPS = [
  { title: "Branding & Design", items: ["Naming e criação de marcas", "Identidade visual", "Brand book", "Redesign de marcas", "Sinalização e materiais gráficos"] },
  { title: "Comunicação & Conteúdo", items: ["Planejamento estratégico", "Gestão de redes sociais", "Campanhas digitais"] },
  { title: "Audiovisual & Direção Criativa", items: ["Fotografia publicitária", "Produção de vídeos", "Direção de arte para campanhas"] },
  { title: "Produtos Digitais", items: ["Sites", "E-commerces", "Plataformas e sistemas"] },
  { title: "Outras opções", items: ["Ainda não sei, quero orientação", "Outro"] },
];
const DELIVERIES = DELIVERY_GROUPS.flatMap((group) => group.items);

const INVESTMENT_RANGES = [
  "Até R$ 5.000",
  "R$ 5.000 a R$ 10.000",
  "R$ 10.000 a R$ 20.000",
  "R$ 20.000 a R$ 50.000",
  "Acima de R$ 50.000",
  "Ainda estou definindo",
];

const HOW_HEARD_OPTIONS = ["Instagram", "Indicação", "Google", "IA", "LinkedIn", "Campanha patrocinada", "Outro"];

const PHRASE_OPTIONS = [
  "Sou fundador(a) ou proprietário(a) de uma empresa",
  "Sou diretor(a) ou gestor(a) de marketing",
  "Sou profissional autônomo ou especialista",
  "Tenho uma startup ou negócio em fase de lançamento",
  "Tenho uma empresa consolidada e busco reposicionamento",
  "Sou de uma agência e busco colaboração",
  "Preciso de um site, sistema ou produto digital para minha empresa",
];

type Status = "idle" | "loading" | "success" | "error";

const PHONE_FIELDS = new Set(["phone", "whatsapp"]);

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";

  const local =
    digits.length > 11 && digits.startsWith("55")
      ? digits.slice(2, 13)
      : digits.slice(0, 11);
  const area = local.slice(0, 2);
  const number = local.slice(2);

  if (local.length <= 2) return `(${area}`;
  if (number.length <= 4) return `(${area}) ${number}`;
  if (number.length <= 8) {
    return `(${area}) ${number.slice(0, 4)}-${number.slice(4)}`;
  }

  return `(${area}) ${number.slice(0, 5)}-${number.slice(5)}`;
}

export function Contato() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formToken, setFormToken] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [tokenError, setTokenError] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [mapOpen, setMapOpen] = useState(true);
  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

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

    const required: Record<string, string> = {
      name: "Preencha o nome.",
      email: "Preencha o e-mail.",
      howHeard: "Informe como conheceu a Metro.",
      phrase: "Selecione uma frase.",
      challenge: "Conte sobre o seu desafio.",
      investmentRange: "Informe quanto pretende investir.",
      whatsapp: "Informe seu WhatsApp.",
    };

    for (const [field, msg] of Object.entries(required)) {
      const value = (formData[field] || "").trim();
      if (!value) {
        nextErrors[field] = msg;
      }
    }

    const emailValue = (formData.email || "").trim();
    if (emailValue && !isValidEmail(emailValue)) {
      nextErrors.email = EMAIL_ERROR_MESSAGE;
    }

    const whatsappValue = (formData.whatsapp || "").trim();
    const whatsappDigits = whatsappValue.replace(/\D/g, "");
    if (whatsappDigits.length < 10) {
      nextErrors.whatsapp = "Informe um WhatsApp com ao menos 10 dígitos.";
    }

    const challengeValue = (formData.challenge || "").trim();
    if (challengeValue.length > 800) {
      nextErrors.challenge = "O desafio deve ter no máximo 800 caracteres.";
    }

    const deliveries = DELIVERIES.filter((d) => formData[`delivery_${d}`] === "on");
    if (deliveries.length === 0) {
      nextErrors.deliveries = "Selecione ao menos uma entrega.";
    }

    if (formData.consent !== "true") {
      nextErrors.consent = "Você precisa concordar com o tratamento de dados.";
    }

    const firstKey = Object.keys(nextErrors)[0];
    setFieldErrors(nextErrors);
    return !firstKey;
  }, [formData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = event.target;
    const { name } = target;
    const rawValue = target.value;
    let value = rawValue;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      value = target.checked ? "true" : "";
    } else if (PHONE_FIELDS.has(name)) {
      value = formatPhone(rawValue);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "email") {
      const trimmed = value.trim();
      if (trimmed !== value) {
        setFormData((prev) => ({ ...prev, email: trimmed }));
      }
      setFieldErrors((prev) => {
        const next = { ...prev };
        if (!trimmed || isValidEmail(trimmed)) {
          delete next.email;
        } else {
          next.email = EMAIL_ERROR_MESSAGE;
        }
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

    if (!turnstileToken) {
      setStatus("error");
      setErrorMessage("Conclua a verificação de segurança antes de enviar.");
      return;
    }

    const deliveries = DELIVERIES.filter((d) => formData[`delivery_${d}`] === "on");
    const email = (formData.email || "").trim();
    const payload = {
      name: formData.name,
      email,
      whatsapp: formData.whatsapp,
      website: formData.website || "",
      howHeard: formData.howHeard,
      phrase: formData.phrase,
      deliveries,
      investmentRange: formData.investmentRange,
      challenge: formData.challenge,
      consent: formData.consent,
      formToken,
      turnstileToken,
    };

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      setTurnstileToken("");
      setTurnstileResetKey((key) => key + 1);

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(result.error || "Erro ao enviar. Tente novamente.");
        return;
      }

      setStatus("success");
    } catch {
      setTurnstileToken("");
      setTurnstileResetKey((key) => key + 1);
      setStatus("error");
      setErrorMessage(
        "Nosso sinal caiu entre a Aldeota e o servidor. Tente de novo ou chame no WhatsApp.",
      );
    }
  }, [formToken, formData, turnstileToken, validate]);

  if (status === "success") {
    return (
      <section className="pt-section-lg pb-section-lg">
        <Container className="max-w-2xl">
          <div className="text-center">
            <p className="label-mono text-accent mb-4">Sucesso</p>
            <h1 className="type-h1 text-foreground">
              Recebemos o seu projeto.
            </h1>
            <p className="type-body text-muted mt-6 max-w-lg mx-auto">
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
            <p className="type-caption mt-8 text-muted">
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
    <section className="contact-page">
      <Container>
        <div className="contact-grid">
          {/* Coluna esquerda — título e texto */}
          <div className="contact-intro">
            <div className="space-y-6">
              <h1 className="type-h1 text-foreground">
                Conta sobre o seu projeto.
              </h1>
              <p className="type-body text-muted max-w-[400px]">
                Respondemos em até 1 dia útil.
              </p>
            </div>
          </div>

          {/* Coluna direita — formulário */}
          <form
            onSubmit={handleSubmit}
            className="contact-form"
            noValidate
          >
            <div className="contact-area">
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={formData.website || ""}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              style={{ position: "absolute", left: "-9999px" }}
              aria-hidden="true"
            />

            {/* Linha 1: Nome e E-mail */}
            <ContactInput
              id="name"
              wrapperClassName="contact-area__half"
              type="text"
              required
              placeholder="Nome*"
              value={formData.name || ""}
              onChange={handleChange}
              error={fieldErrors.name}
              ariaLabel="Nome"
            />
            <ContactInput
              id="email"
              wrapperClassName="contact-area__half"
              type="email"
              required
              inputMode="email"
              autoComplete="email"
              placeholder="E-mail*"
              value={formData.email || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={fieldErrors.email}
              ariaLabel="E-mail"
            />

            {/* Select: frase (largura total) */}
            <div className="contact-area__full">
              <ContactSelect
                id="phrase"
                required
                value={formData.phrase || ""}
                onChange={handleChange}
                error={fieldErrors.phrase}
                ariaLabel="Qual frase descreve você?"
                placeholder="Qual frase descreve você?*"
                options={PHRASE_OPTIONS}
              />
            </div>

            {/* Textarea: desafio (largura total) */}
            <div className="contact-area__full">
              <textarea
                id="challenge"
                name="challenge"
                required
                maxLength={800}
                value={formData.challenge || ""}
                onChange={handleChange}
                className="contact-textarea"
                placeholder="Conta sobre o seu projeto.*"
                aria-label="Conta sobre o seu projeto"
                aria-describedby="challenge-hint"
              />
              {fieldErrors.challenge && (
                <span className="contact-error" role="alert">
                  {fieldErrors.challenge}
                </span>
              )}
              <p id="challenge-hint" className="contact-hint">
                O que você quer construir, para quem e por quê. Pode ser breve. {formData.challenge?.length || 0}/800 caracteres
              </p>
            </div>

            </div>

            {/* Fieldset: Entregas (largura total) */}
            <div className="contact-area">
            <div className="contact-area__full">
              <fieldset
                className="contact-fieldset"
                aria-labelledby="deliveries-label"
              >
                <legend id="deliveries-label" className="contact-legend">
                  O que o seu projeto precisa?
                  <span className="text-accent">*</span>
                </legend>
                <div className="contact-deliveries">
                  {DELIVERIES.map((delivery) => (
                    <ServiceToggle
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

            {/* Select: investimento (largura total) */}
            <div className="contact-area__full">
              <ContactSelect
                id="investmentRange"
                required
                value={formData.investmentRange || ""}
                onChange={handleChange}
                error={fieldErrors.investmentRange}
                ariaLabel="Quanto pretende investir?"
                placeholder="Quanto pretende investir?*"
                options={INVESTMENT_RANGES}
              />
            </div>

            </div>

            <div className="contact-area">
              {/* Select: como conheceu e WhatsApp */}
              <div className="contact-area__half">
                <ContactSelect
                  id="howHeard"
                  required
                  value={formData.howHeard || ""}
                  onChange={handleChange}
                  error={fieldErrors.howHeard}
                  ariaLabel="Como conheceu a Metro"
                  placeholder="Como conheceu a Metro?*"
                  options={HOW_HEARD_OPTIONS}
                />
              </div>

              <ContactInput
                id="whatsapp"
                wrapperClassName="contact-area__half"
                type="tel"
                required
                inputMode="tel"
                autoComplete="tel"
                placeholder="WhatsApp com DDD*"
                value={formData.whatsapp || ""}
                onChange={handleChange}
                error={fieldErrors.whatsapp}
                ariaLabel="Seu WhatsApp com DDD"
              />

              {/* Consentimento (largura total) */}
              <div className="contact-area__full">
                <label className="contact-checkbox-label cursor-pointer">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent === "true"}
                  onChange={handleChange}
                  className="contact-checkbox-input"
                />
                <span className="contact-checkbox-box"></span>
                <span className="contact-checkbox-text">
                  Concordo com o tratamento de meus dados conforme o{" "}
                  <Link
                    href="/privacidade"
                    className="contact-privacy-link"
                  >
                    Aviso de Privacidade
                  </Link>
                  <span className="text-accent">*</span>
                </span>
                </label>
                {fieldErrors.consent && (
                  <span className="contact-error contact-error-block" role="alert">
                    {fieldErrors.consent}
                  </span>
                )}
              </div>

              <div className="contact-area__full">
                <TurnstileWidget
                  onToken={handleTurnstileToken}
                  resetKey={turnstileResetKey}
                />
              </div>

              {/* Botão (largura total) */}
              <div className="contact-area__full">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="contact-button"
                >
                  {status === "loading" ? "Enviando…" : "Enviar proposta de projeto"}
                </button>
              </div>
            </div>

            {tokenError && (
              <div>
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
              <div>
                <p className="contact-error contact-error-block" role="alert">
                  {errorMessage}
                </p>
              </div>
            )}
          </form>
        </div>

        <section className="contact-faq" aria-labelledby="contact-faq-title">
          <h2 id="contact-faq-title">{CONTACT_FAQ.title}</h2>
          <FaqAccordion items={CONTACT_FAQ.items} splitColumns />
        </section>

        <ContactMapWidget
          open={mapOpen}
          onToggle={() => setMapOpen((value) => !value)}
        />
      </Container>
    </section>
  );
}

function ContactMapWidget({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`Metro Design e Comunicação, ${CONTACT.address}`)}`;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(CONTACT.coordinates)}&z=17&output=embed`;
  const [addressBeforeCity, addressAfterCity] = CONTACT.address.split("Fortaleza – CE");

  return (
    <div className="contact-map">
      <div className="mb-6 max-w-3xl space-y-4">
        <h2 className="type-h2">Onde estamos.</h2>
        <p className="type-body text-muted">Sede em Fortaleza, atendimento em todo o Brasil. Venha tomar um café com a gente, com hora marcada.</p>
        <p className="type-body">
          {addressBeforeCity}
          <br />
          Fortaleza – CE{addressAfterCity}
        </p>
        <p className="type-body text-muted">Segunda a sexta, 8h às 18h</p>
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="ui-button ui-button-secondary">
          Abrir no Google Maps <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div
        id="contact-map-panel"
        className="contact-map__panel"
        hidden={!open}
      >
        <div className="contact-map__top">
          <p className="contact-map__address">
            {addressBeforeCity}
            <br />
            Fortaleza – CE{addressAfterCity}
          </p>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-map__link"
          >
            Como chegar <span aria-hidden="true">↗</span>
          </a>
        </div>
        {open && (
          <iframe
            title={`Mapa de localização: ${CONTACT.address}`}
            src={embedUrl}
            className="contact-map__frame"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        )}
      </div>

      <button
        type="button"
        onClick={onToggle}
        className="contact-map__toggle"
        aria-expanded={open}
        aria-controls="contact-map-panel"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        {open ? "Fechar mapa" : "Abrir mapa"}
      </button>
    </div>
  );
}

function ContactInput({
  id,
  wrapperClassName,
  type = "text",
  required = false,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  ariaLabel,
  inputMode,
  autoComplete,
}: {
  id: string;
  wrapperClassName?: string;
  type?: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  ariaLabel: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
}) {
  return (
    <div className={wrapperClassName}>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event as React.ChangeEvent<HTMLInputElement>)}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className="contact-input"
      />
      {error && (
        <span id={`${id}-error`} className="contact-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function ContactSelect({
  id,
  required = false,
  value,
  onChange,
  error,
  ariaLabel,
  placeholder = "Selecione uma opção",
  options,
}: {
  id: string;
  required?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  ariaLabel: string;
  placeholder?: string;
  options: string[];
}) {
  return (
    <div>
      <select
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={(event) => onChange(event as React.ChangeEvent<HTMLSelectElement>)}
        aria-label={ariaLabel}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="contact-select"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <span id={`${id}-error`} className="contact-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function ServiceToggle({
  id,
  name,
  label,
  checked,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="service-toggle">
      <input
        type="checkbox"
        id={id}
        name={name}
        value={label}
        checked={checked}
        onChange={onChange}
        className="service-toggle-input"
      />
      <span className="service-toggle-text">{label}</span>
    </label>
  );
}
