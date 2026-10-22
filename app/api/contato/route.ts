import { NextResponse } from "next/server";
import { Resend } from "resend";
import { verifyToken, escapeHtml } from "@/lib/anti-spam";
import { rateLimit } from "@/lib/rate-limit";
import { qualifyContact } from "@/lib/contact-qualification";

const resend = new Resend(process.env.RESEND_API_KEY);

const SUBMIT_WINDOW_MS = 60 * 60 * 1000; // 1h
const SUBMIT_LIMIT = 10;                 // 10 envios por IP por hora

type Body = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  whatsapp?: unknown;
  company?: unknown;
  website?: unknown; // honeypot
  socialMedia?: unknown;
  profession?: unknown;
  companySize?: unknown;
  howHeard?: unknown;
  phrase?: unknown;
  deliveries?: unknown;
  investmentRange?: unknown;
  challenge?: unknown;
  consent?: unknown;
  formToken?: unknown;
};

function getIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

export async function POST(request: Request) {
  try {
    const ip = getIp(request);
    const limit = rateLimit({
      key: `submit:${ip}`,
      limit: SUBMIT_LIMIT,
      windowMs: SUBMIT_WINDOW_MS,
    });

    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Muitas solicitações. Tente novamente mais tarde." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as Body;

    // 1. Honeypot
    if (typeof body.website === "string" && body.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    // 2. Token de timing (min 8s de preenchimento)
    if (
      typeof body.formToken !== "string" ||
      !verifyToken(body.formToken)
    ) {
      return NextResponse.json({ ok: true });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const whatsapp = typeof body.whatsapp === "string" ? body.whatsapp.trim() : "";
    const company =
      typeof body.company === "string" ? body.company.trim() : "";
    const socialMedia =
      typeof body.socialMedia === "string" ? body.socialMedia.trim() : "";
    const profession =
      typeof body.profession === "string" ? body.profession.trim() : "";
    const companySize =
      typeof body.companySize === "string" ? body.companySize.trim() : "";
    const howHeard =
      typeof body.howHeard === "string" ? body.howHeard.trim() : "";
    const phrase =
      typeof body.phrase === "string" ? body.phrase.trim() : "";
    const challenge =
      typeof body.challenge === "string" ? body.challenge.trim() : "";
    const investmentRange =
      typeof body.investmentRange === "string"
        ? body.investmentRange.trim()
        : "";
    const consent =
      typeof body.consent === "string" ? body.consent.trim() : "";

    const rawDeliveries = body.deliveries;
    const deliveries: string[] = Array.isArray(rawDeliveries)
      ? rawDeliveries.filter((d) => typeof d === "string").map((d) => d)
      : [];

    // 3. Campos obrigatórios — 400 (usuário legítimo)
    if (!name || !email || !challenge || !consent) {
      return NextResponse.json(
        { error: "Preencha os campos obrigatórios." },
        { status: 400 },
      );
    }

    // 4. WhatsApp com ao menos 10 dígitos
    const whatsappDigits = whatsapp.replace(/\D/g, "");
    if (whatsappDigits.length < 10) {
      return NextResponse.json(
        { error: "Informe um WhatsApp válido com ao menos 10 dígitos." },
        { status: 400 },
      );
    }

    // 5. Ao menos uma entrega selecionada
    if (deliveries.length === 0) {
      return NextResponse.json(
        { error: "Selecione ao menos uma entrega." },
        { status: 400 },
      );
    }

    // 6. Consentimento obrigatório
    if (consent !== "true") {
      return NextResponse.json(
        { error: "Você precisa concordar com o tratamento de dados." },
        { status: 400 },
      );
    }

    // 7. Limites de tamanho — 200 silencioso (spam)
    if (
      name.length > 100 ||
      email.length > 200 ||
      phone.length > 30 ||
      whatsapp.length > 30 ||
      company.length > 100 ||
      socialMedia.length > 200 ||
      profession.length > 100 ||
      companySize.length > 50 ||
      howHeard.length > 100 ||
      phrase.length > 200 ||
      investmentRange.length > 100 ||
      challenge.length > 800
    ) {
      return NextResponse.json({ ok: true });
    }

    // 8. Formato de email — 400 (usuário legítimo)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }

    // 9. Qualificação interna (nunca exposta ao visitante)
    const decisionMaker =
      phrase === "Sou fundador(a) ou proprietário(a) de uma empresa" ||
      phrase === "Sou diretor(a) ou gestor(a) de marketing";
    void qualifyContact({
      deliveriesCount: deliveries.length,
      investmentRange: investmentRange || undefined,
      challengeLength: challenge.length,
      hasWebsite: !!company && /^https?:\/\//i.test(company),
      hasSocial: !!socialMedia,
      isDecisionMaker: decisionMaker,
    });

    // 10. Registro de consentimento LGPD (data/hora + versão da política)
    const consentRecordedAt = new Date().toISOString();
    const privacyPolicyVersion = "1.0";

    // 11. Escape HTML para e-mail
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeWhatsapp = escapeHtml(whatsapp);
    const safeCompany = escapeHtml(company);
    const safeSocialMedia = escapeHtml(socialMedia);
    const safeProfession = escapeHtml(profession);
    const safeCompanySize = escapeHtml(companySize);
    const safeHowHeard = escapeHtml(howHeard);
    const safePhrase = escapeHtml(phrase);
    const safeChallenge = escapeHtml(challenge).replace(/\n/g, "<br />");
    const safeInvestmentRange = escapeHtml(investmentRange);
    const safeDeliveries = deliveries.map((d) => escapeHtml(d)).join(", ");

    // 12. Envio por e-mail
    const { error } = await resend.emails.send({
      from: "Metro Design <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL_TO || "contato@metrodesign.com.br",
      replyTo: email,
      subject: `Novo contato: ${safeName}${safeCompany ? ` (${safeCompany})` : ""}`,
      html: `
        <h2>Novo contato pelo site</h2>
        <p><strong>Nome:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${safePhone ? `<p><strong>Telefone:</strong> ${safePhone}</p>` : ""}
        ${safeWhatsapp ? `<p><strong>WhatsApp:</strong> ${safeWhatsapp}</p>` : ""}
        ${safeCompany ? `<p><strong>Empresa:</strong> ${safeCompany}</p>` : ""}
        ${safeSocialMedia ? `<p><strong>Rede social:</strong> ${safeSocialMedia}</p>` : ""}
        ${safeProfession ? `<p><strong>Cargo:</strong> ${safeProfession}</p>` : ""}
        ${safeCompanySize ? `<p><strong>Nº de colaboradores:</strong> ${safeCompanySize}</p>` : ""}
        ${safeHowHeard ? `<p><strong>Como conheceu:</strong> ${safeHowHeard}</p>` : ""}
        ${safePhrase ? `<p><strong>Perfil:</strong> ${safePhrase}</p>` : ""}
        ${safeInvestmentRange ? `<p><strong>Investimento:</strong> ${safeInvestmentRange}</p>` : ""}
        <p><strong>Entregas:</strong> ${safeDeliveries}</p>
        <p><strong>Consentimento LGPD:</strong> ${consent} (${consentRecordedAt}, v${privacyPolicyVersion})</p>
        <hr />
        <p><strong>Desafio:</strong></p>
        <p>${safeChallenge}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Erro ao enviar email. Tente novamente." },
        { status: 500 },
      );
    }

    // Resposta ao visitante: apenas sucesso, sem dados de qualificação
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Erro inesperado. Tente novamente." },
      { status: 500 },
    );
  }
}
