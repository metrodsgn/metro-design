import crypto from "crypto";

const SECRET = process.env.CONTACT_FORM_SECRET;
const MIN_AGE_MS = 2000;                 // 2s — humano não envia mais rápido
const MAX_AGE_MS = 60 * 60 * 1000;       // 1h — token expira

/**
 * Gera um token assinado com timestamp.
 * Formato: "<timestamp>.<hmac-sha256-hex>"
 */
export function generateToken(): { token: string } {
  if (!SECRET) {
    throw new Error("CONTACT_FORM_SECRET não configurado");
  }
  const ts = Date.now();
  const sig = crypto
    .createHmac("sha256", SECRET)
    .update(String(ts))
    .digest("hex");
  return { token: `${ts}.${sig}` };
}

/**
 * Verifica se o token é válido (assinatura + janela de tempo).
 * Retorna false para qualquer anomalia — o caller trata como spam.
 */
export function verifyToken(token: string): boolean {
  if (!SECRET || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [tsStr, sig] = parts;
  const ts = Number(tsStr);
  if (!Number.isFinite(ts) || ts <= 0) return false;

  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(tsStr)
    .digest("hex");

  // Comparação timing-safe
  const sigBuf = Buffer.from(sig, "hex");
  const expBuf = Buffer.from(expected, "hex");
  if (sigBuf.length !== expBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return false;

  const age = Date.now() - ts;
  if (age < MIN_AGE_MS || age > MAX_AGE_MS) return false;

  return true;
}

/**
 * Escapa caracteres perigosos para interpolar em HTML de e-mail.
 */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}