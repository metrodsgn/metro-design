"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { getLenis } from "@/lib/smooth-scroll";

const EASE = [0.16, 1, 0.3, 1] as const;
const SESSION_KEY = "metro-exit-intent";
const ACTIVATION_DELAY = 15_000;

const SERVICES = [
  "Branding & Identidade Visual",
  "Naming",
  "Redesign de marca",
  "Planejamento estratégico",
  "Gestão de redes sociais",
  "Campanhas digitais",
  "Fotografia e audiovisual",
  "Direção criativa",
  "Outro",
];

type FormState = {
  name: string;
  company: string;
  service: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
  name: "",
  company: "",
  service: "",
  description: "",
};

const noopSubscribe = () => () => {};

function buildMessage(form: FormState) {
  const lines = [
    "Olá, equipe Metro Design! 👋",
    "",
    "Conheci o trabalho de vocês pelo site e gostaria de conversar sobre um projeto.",
    "",
    `👤 Nome: ${form.name.trim()}`,
  ];

  if (form.company.trim()) {
    lines.push("", `🏢 Empresa: ${form.company.trim()}`);
  }

  lines.push("", `🎨 Serviço: ${form.service}`);

  if (form.description.trim()) {
    lines.push("", `📝 Sobre o projeto: ${form.description.trim()}`);
  }

  lines.push(
    "",
    "Gostaria de saber mais sobre como podemos trabalhar juntos!",
  );

  return lines.join("\n");
}

export function ExitIntentModal() {
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [openError, setOpenError] = useState("");
  const [fallbackHref, setFallbackHref] = useState("");

  const shownRef = useRef(false);
  const readyRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const trigger = useCallback(() => {
    if (shownRef.current || !readyRef.current) return;
    shownRef.current = true;

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Armazenamento indisponível (modo privado) — segue sem persistir.
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setOpen(true);
  }, []);

  // Gatilhos: saída pelo topo no desktop e scroll para cima no mobile.
  useEffect(() => {
    if (!mounted) return;

    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        shownRef.current = true;
        return;
      }
    } catch {
      // Sem sessionStorage, mantém o comportamento em memória.
    }

    const timer = window.setTimeout(() => {
      readyRef.current = true;
    }, ACTIVATION_DELAY);

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)");

    const onMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget || event.clientY > 0) return;
      trigger();
    };

    let lastY = window.scrollY;
    let lastTime = performance.now();
    let upward = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const now = performance.now();
      const elapsed = now - lastTime;

      if (elapsed <= 600) {
        upward = y < lastY ? upward + (lastY - y) : 0;
      } else {
        upward = 0;
      }

      if (upward >= 240 && y > window.innerHeight * 0.5) {
        trigger();
      }

      lastY = y;
      lastTime = now;
    };

    if (finePointer.matches) {
      document.addEventListener("mouseout", onMouseOut);
    }

    if (coarsePointer.matches) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mounted, trigger]);

  const close = useCallback(() => setOpen(false), []);

  // Bloqueia o scroll (compatível com Lenis) e devolve o foco ao fechar.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    getLenis()?.stop();
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const nameInput = dialog?.querySelector<HTMLInputElement>("#exit-name");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    // No mobile evita abrir o teclado automaticamente; o foco vai ao diálogo.
    if (finePointer.matches) {
      nameInput?.focus();
    } else {
      dialog?.focus();
    }

    return () => {
      getLenis()?.start();
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open]);

  // Esc e armadilha de foco dentro do diálogo.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
        ),
      ).filter((element) => element.offsetParent !== null);

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));

    if (errors[name as keyof FormState]) {
      setErrors((previous) => {
        const next = { ...previous };
        delete next[name as keyof FormState];
        return next;
      });
    }

    if (openError) setOpenError("");
  };

  const validate = () => {
    const next: FormErrors = {};

    if (!form.name.trim()) {
      next.name = "Informe seu nome.";
    }

    if (!form.service) {
      next.service = "Selecione o serviço desejado.";
    }

    if (form.description.length > 600) {
      next.description = "Use no máximo 600 caracteres.";
    }

    return next;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      requestAnimationFrame(() => {
        document.getElementById(`exit-${firstError}`)?.focus();
      });
      return;
    }

    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      buildMessage(form),
    )}`;

    let popup: Window | null = null;
    try {
      popup = window.open(href, "_blank");
      if (popup) popup.opener = null;
    } catch {
      popup = null;
    }

    if (!popup) {
      setFallbackHref(href);
      setOpenError(
        "Não conseguimos abrir o WhatsApp automaticamente. Use o link abaixo — seus dados continuam preenchidos.",
      );
      return;
    }

    setOpenError("");
    close();
  };

  if (!mounted) return null;

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-end justify-center bg-black/70 p-3 backdrop-blur-md sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-intent-title"
            aria-describedby="exit-intent-description"
            tabIndex={-1}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE }}
            className="relative max-h-[94svh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-surface text-foreground shadow-elevated focus:outline-none"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/80 to-transparent"
            />

            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-accent hover:text-foreground"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>

            <div className="p-5 sm:p-8">
              <p className="label-mono text-accent mb-2 sm:mb-3">Antes de ir</p>
              <h2
                id="exit-intent-title"
                className="font-editorial max-w-[18ch] text-[clamp(1.5rem,4.2vw,2.35rem)] leading-[1.05] tracking-tight"
              >
                Seu próximo grande projeto começa aqui.
              </h2>
              <p
                id="exit-intent-description"
                className="text-muted mt-2.5 max-w-[42ch] text-sm leading-relaxed sm:mt-3"
              >
                Antes de ir, que tal dar vida à sua próxima ideia? Conte um
                pouco sobre o que você precisa e vamos conversar.
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-5 grid gap-3 sm:mt-6 sm:gap-4"
              >
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  <Field
                    id="exit-name"
                    label="Nome completo"
                    required
                    error={errors.name}
                  >
                    <input
                      id="exit-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={errors.name ? "exit-name-error" : undefined}
                      className="contact-input"
                    />
                  </Field>

                  <Field id="exit-company" label="Empresa">
                    <input
                      id="exit-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Opcional"
                      className="contact-input"
                    />
                  </Field>
                </div>

                <Field
                  id="exit-service"
                  label="Serviço desejado"
                  required
                  error={errors.service}
                >
                  <select
                    id="exit-service"
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    aria-invalid={errors.service ? true : undefined}
                    aria-describedby={errors.service ? "exit-service-error" : undefined}
                    className="contact-select"
                  >
                    <option value="" disabled>
                      Selecione um serviço
                    </option>
                    {SERVICES.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  id="exit-description"
                  label="Sobre o projeto"
                  error={errors.description}
                >
                  <textarea
                    id="exit-description"
                    name="description"
                    rows={2}
                    maxLength={600}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Conte brevemente o que você precisa (opcional)"
                    aria-invalid={errors.description ? true : undefined}
                    aria-describedby={errors.description ? "exit-description-error" : undefined}
                    className="contact-textarea min-h-[4.5rem]"
                  />
                </Field>

                <button
                  type="submit"
                  className="ui-button ui-button-accent w-full"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="shrink-0"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Conversar pelo WhatsApp
                  <span aria-hidden="true">↗</span>
                </button>

                {openError && (
                  <p className="contact-error contact-error-block" role="alert">
                    {openError}{" "}
                    {fallbackHref && (
                      <a
                        href={fallbackHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-error-link"
                      >
                        Abrir o WhatsApp manualmente ↗
                      </a>
                    )}
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(overlay, document.body);
}

function Field({
  id,
  label,
  required = false,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="label-mono mb-1 block text-foreground-soft"
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
      {error && (
        <span id={`${id}-error`} className="contact-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
