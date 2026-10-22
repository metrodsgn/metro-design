type Hit = { count: number; resetAt: number };
const store = new Map<string, Hit>();

/**
 * Rate limiting simples por chave (ex: IP).
 * Retorna se a requisição é permitida, quantas restam e quando o limite reseta.
 * Observação: em memória — adequado para instância única. Em ambiente serverless
 * com múltiplas instâncias (Vercel), considere substituir por Upstash Redis.
 */
export function rateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string;
  limit: number;
  windowMs: number;
}): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const hit = store.get(key);

  if (!hit || now > hit.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (hit.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: hit.resetAt };
  }

  hit.count += 1;
  return { allowed: true, remaining: limit - hit.count, resetAt: hit.resetAt };
}
