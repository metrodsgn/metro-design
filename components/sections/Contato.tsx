"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CONTACT } from "@/lib/constants";

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
  const [mapOpen, setMapOpen] = useState(false);
  const firstErrorRef = useRef<HTMLElement | null>(null);

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
      name: "Preencha o nome.",
      email: "Preencha o e-mail.",
      company: "Preencha o nome da empresa.",
      profession: "Preencha o cargo.",
      companySize: "Informe o nº de colaboradores.",
      howHeard: "Informe como conheceu a Metro.",
      phrase: "Selecione uma frase.",
      challenge: "Conte sobre o seu desafio.",
      whatsapp: "Informe seu WhatsApp.",
    };

    for (const [field, msg] of Object.entries(required)) {
      const el = document.getElementById(field);
      const value = (formData[field] || "").trim();
      if (!value) {
        nextErrors[field] = msg;
        if (!firstField && el) firstField = el;
      }
    }

    const emailValue = (formData.email || "").trim();
    if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      nextErrors.email = "Informe um e-mail válido.";
      if (!firstField) {
        const el = document.getElementById("email");
        if (el) firstField = el;
      }
    }

    const whatsappValue = (formData.whatsapp || "").trim();
    const whatsappDigits = whatsappValue.replace(/\D/g, "");
    if (whatsappDigits.length < 10) {
      nextErrors.whatsapp = "Informe um WhatsApp com ao menos 10 dígitos.";
      if (!firstField) {
        const el = document.getElementById("whatsapp");
        if (el) firstField = el;
      }
    }

    const challengeValue = (formData.challenge || "").trim();
    if (challengeValue.length > 800) {
      nextErrors.challenge = "O desafio deve ter no máximo 800 caracteres.";
      if (!firstField) {
        const el = document.getElementById("challenge");
        if (el) firstField = el;
      }
    }

    const deliveries = DELIVERIES.filter((d) => formData[`delivery_${d}`] === "on");
    if (deliveries.length === 0) {
      nextErrors.deliveries = "Selecione ao menos uma entrega.";
      if (!firstField) {
        const el = document.querySelector('[name^="delivery_"]');
        if (el) firstField = el as HTMLElement;
      }
    }

    if (formData.consent !== "true") {
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
    const target = event.target;
    const { name } = target;
    const value =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
          ? "true"
          : ""
        : target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      website: "",
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
        <div className="contact-grid">
          {/* Coluna esquerda — título e texto (sticky no desktop) */}
          <div className="contact-intro">
            <div className="space-y-6">
              <h1
                className="font-editorial text-foreground leading-[0.88] tracking-[-0.045em]"
                style={{ fontSize: "clamp(48px, 9vw, 128px)" }}
              >
                Vamos<span className="block"> conversar?</span>
              </h1>
              <p className="text-muted text-[19px] leading-relaxed max-w-[400px]">
                Queremos entender os detalhes do seu próximo projeto. Será um
                prazer co-criar com o seu time.
              </p>
            </div>
          </div>

          {/* Coluna direita — formulário */}
          <form
            onSubmit={handleSubmit}
            className="contact-form grid"
            noValidate
          >
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              style={{ position: "absolute", left: "-9999px" }}
              aria-hidden="true"
            />

            {/* Linha 1: Nome e E-mail */}
            <ContactInput
              id="name"
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
              type="email"
              required
              placeholder="E-mail*"
              value={formData.email || ""}
              onChange={handleChange}
              error={fieldErrors.email}
              ariaLabel="E-mail"
            />

            {/* Select: frase (largura total) */}
            <div className="md:col-span-2">
              <ContactSelect
                id="phrase"
                required
                value={formData.phrase || ""}
                onChange={handleChange}
                error={fieldErrors.phrase}
                ariaLabel="Qual frase melhor te representa"
                options={PHRASE_OPTIONS}
              />
            </div>

            {/* Textarea: desafio (largura total) */}
            <div className="md:col-span-2">
              <textarea
                id="challenge"
                name="challenge"
                required
                maxLength={800}
                value={formData.challenge || ""}
                onChange={handleChange}
                className="contact-textarea"
                placeholder="Nos conte sobre o seu desafio*"
                aria-label="Nos conte sobre o seu desafio"
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

            {/* Fieldset: Entregas (largura total) */}
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
            <div className="md:col-span-2">
              <ContactSelect
                id="investmentRange"
                required
                value={formData.investmentRange || ""}
                onChange={handleChange}
                error={fieldErrors.investmentRange}
                ariaLabel="Qual a disponibilidade de investimento em design do seu projeto"
                options={INVESTMENT_RANGES}
              />
            </div>

            {/* Linha: Nome da empresa e Site */}
            <ContactInput
              id="company"
              type="text"
              required
              placeholder="Nome da empresa*"
              value={formData.company || ""}
              onChange={handleChange}
              error={fieldErrors.company}
              ariaLabel="Nome da empresa"
            />
            <ContactInput
              id="siteUrl"
              type="url"
              placeholder="Site (opcional)"
              value={formData.siteUrl || ""}
              onChange={handleChange}
              error={fieldErrors.siteUrl}
              ariaLabel="Site"
            />

            {/* Linha: Seu cargo e Nº de colaboradores */}
            <ContactInput
              id="profession"
              type="text"
              required
              placeholder="Seu cargo*"
              value={formData.profession || ""}
              onChange={handleChange}
              error={fieldErrors.profession}
              ariaLabel="Seu cargo"
            />
            <ContactSelect
              id="companySize"
              required
              value={formData.companySize || ""}
              onChange={handleChange}
              error={fieldErrors.companySize}
              ariaLabel="Nº de colaboradores"
              options={COMPANY_SIZES}
            />

            {/* Select: como conheceu (largura total) */}
            <div className="md:col-span-2">
              <ContactSelect
                id="howHeard"
                required
                value={formData.howHeard || ""}
                onChange={handleChange}
                error={fieldErrors.howHeard}
                ariaLabel="Como conheceu a Metro"
                options={HOW_HEARD_OPTIONS}
              />
            </div>

            {/* Linha: WhatsApp e rede social */}
            <ContactInput
              id="whatsapp"
              type="tel"
              required
              placeholder="Seu WhatsApp*"
              value={formData.whatsapp || ""}
              onChange={handleChange}
              error={fieldErrors.whatsapp}
              ariaLabel="Seu WhatsApp"
            />
            <ContactInput
              id="socialMedia"
              type="url"
              placeholder="Sua rede social"
              value={formData.socialMedia || ""}
              onChange={handleChange}
              error={fieldErrors.socialMedia}
              ariaLabel="Sua rede social"
            />

            {/* Consentimento (largura total) */}
            <div className="md:col-span-2">
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

            {/* Botão (largura total) */}
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

      <ContactMapWidget
        open={mapOpen}
        onToggle={() => setMapOpen((value) => !value)}
      />
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
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(CONTACT.address)}&output=embed`;

  return (
    <div className="contact-map">
      <div
        id="contact-map-panel"
        className="contact-map__panel"
        hidden={!open}
      >
        <div className="contact-map__top">
          <p className="contact-map__address">{CONTACT.address}</p>
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
  type = "text",
  required = false,
  placeholder,
  value,
  onChange,
  error,
  ariaLabel,
}: {
  id: string;
  type?: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  ariaLabel: string;
}) {
  return (
    <div>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event as React.ChangeEvent<HTMLInputElement>)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="contact-input"
      />
      {error && (
        <span className="contact-error" role="alert">
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
  options,
}: {
  id: string;
  required?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  ariaLabel: string;
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
