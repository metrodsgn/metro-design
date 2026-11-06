type TurnstileVerification = {
  success: boolean;
  hostname?: string;
  action?: string;
};

// Chave de teste oficial da Cloudflare, restrita ao servidor de desenvolvimento.
const DEVELOPMENT_TEST_SECRET = "1x0000000000000000000000000000000AA";

function getTurnstileSecret() {
  return process.env.TURNSTILE_SECRET_KEY ||
    (process.env.NODE_ENV === "development" ? DEVELOPMENT_TEST_SECRET : "");
}

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<boolean> {
  const secret = getTurnstileSecret();
  if (!secret || !token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body, cache: "no-store" },
  );

  if (!response.ok) return false;
  const result = (await response.json()) as TurnstileVerification;
  return result.success === true;
}
