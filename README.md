# Metro Design

Site em Next.js com conteúdo de projetos no Sanity e formulário de contato com Resend e Cloudflare Turnstile.

## Desenvolvimento

```bash
npm install
npm run dev
```

Configure em `.env.local` o projeto e o dataset do Sanity (`NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET`), além de `CONTACT_FORM_SECRET` e `RESEND_API_KEY` para testar o formulário. Se não houver chaves de Turnstile no ambiente de desenvolvimento, o site usa as chaves públicas de teste da Cloudflare. Elas não são usadas no build de produção.

## Publicação

Configure no ambiente de produção:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` e `NEXT_PUBLIC_SANITY_DATASET`;
- `CONTACT_FORM_SECRET` (segredo longo e aleatório);
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` e `TURNSTILE_SECRET_KEY` da mesma configuração real do Cloudflare Turnstile;
- `RESEND_API_KEY`, `CONTACT_EMAIL_TO` e `CONTACT_EMAIL_FROM` (por exemplo, `Metro Design <contato@metrodesign.com.br>`).

Antes da publicação, verifique `metrodesign.com.br` no Resend e configure `CONTACT_EMAIL_FROM` com um remetente do domínio. Sem as chaves reais de Turnstile, o formulário de produção permanece indisponível por segurança.

O limite de requisições atual fica em memória e só vale por instância do servidor. Em uma implantação com múltiplas instâncias, conecte um armazenamento compartilhado para aplicar o limite globalmente.

## Verificações

```bash
npm run lint
npx tsc --noEmit
npm run build
```
