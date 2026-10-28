const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PROTOCOL_RE = /^[a-z][a-z0-9+.-]*:\/\//i;

export const EMAIL_ERROR_MESSAGE =
  "Informe um e-mail válido, como nome@empresa.com.";
export const SITE_URL_ERROR_MESSAGE =
  "Informe uma URL HTTPS válida, como https://www.exemplo.com.";

export function normalizeSiteUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (PROTOCOL_RE.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^\/+/, "")}`;
}

export function isValidSiteUrl(value: string) {
  const normalized = normalizeSiteUrl(value);
  if (!normalized || /\s/.test(normalized)) return false;

  let url: URL;
  try {
    url = new URL(normalized);
  } catch {
    return false;
  }

  if (url.protocol !== "https:") return false;
  if (url.username || url.password) return false;

  const hostname = url.hostname;
  if (!hostname || hostname.length > 253) return false;

  const labels = hostname.split(".");
  if (labels.length < 2) return false;

  const tld = labels[labels.length - 1];
  if (!tld || tld.length < 2 || !/^[a-z]/i.test(tld)) return false;

  return labels.every(
    (label) =>
      label.length > 0 &&
      label.length <= 63 &&
      /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label),
  );
}

export function isValidEmail(value: string) {
  const email = value.trim();
  return email.length <= 254 && EMAIL_RE.test(email);
}
