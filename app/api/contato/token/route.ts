import { NextResponse } from "next/server";
import { Resend } from "resend";
import { generateToken, verifyToken, escapeHtml } from "@/lib/anti-spam";

const resend = new Resend(process.env.RESEND_API_KEY);

type Body = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  website?: unknown; // honeypot
  formToken?: unknown;
};

export async function GET() {
  try {
    return NextResponse.json(generateToken(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível preparar o formulário." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;

    // 1. Honeypot
    if (typeof body.website === "string" && body.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    // 2. Token de timing
    if (
      typeof body.formToken !== "string" ||
      !verifyToken(body.formToken)
    ) {
      return NextResponse.json({ ok: true });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const company =
      typeof body.company === "string" ? body.company.trim() : "";
    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    // 3. Campos obrigatórios — 400 (usuário legítimo)
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Preencha os campos obrigatórios." },
        { status: 400 },
      );
    }

    // 4. Limites de tamanho — 200 silencioso (spam)
    if (
      name.length > 100 ||
      email.length > 200 ||
      company.length > 100 ||
      message.length > 5000
    ) {
      return NextResponse.json({ ok: true });
    }

    // 5. Formato de email — 400 (usuário legítimo)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }

    // 6. Escape HTML
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    // 7. Envio
    const { error } = await resend.emails.send({
      from: "Metro Design <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL_TO || "contato@metrodesign.com.br",
      replyTo: email,
      subject: `Novo contato: ${safeName}${safeCompany ? ` (${safeCompany})` : ""}`,
      html: `
        <h2>Novo contato pelo site</h2>
        <p><strong>Nome:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${safeCompany ? `<p><strong>Empresa:</strong> ${safeCompany}</p>` : ""}
        <hr />
        <p><strong>Mensagem:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Erro ao enviar email. Tente novamente." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Erro inesperado. Tente novamente." },
      { status: 500 },
    );
  }
}
