# TODOs do Projeto Metro Design

Itens temporariamente removidos ou simplificados que devem ser revisados depois.

## Sanity / CMS

- [ ] **Reativar validação obrigatória do campo `cover`** no schema `case.ts`
  - Removido em: 2026-10-09
  - Motivo: ainda não temos imagens reais dos cases
  - Quando: quando todas as imagens estiverem cadastradas no Studio
  - Arquivo: `sanity/schemaTypes/case.ts`

## Contato

- [ ] **Substituir placeholders de contato** por dados reais
  - Email, telefone, WhatsApp, endereço
  - Arquivo: `lib/constants.ts` (bloco `CONTACT`)
- [ ] **Substituir links de redes sociais** por URLs reais
  - Arquivo: `lib/constants.ts` (bloco `SOCIAL`)

## Cases

- [ ] **Cadastrar os 8 cases restantes** no Sanity
  - DEZA Arquitetura, Flávio Rocha, Kazui, Salvo Burguer, HiFive, NBA Store, Crocobeach, NatEssential
- [ ] **Subir imagens reais** dos cases no Sanity

## Clientes

- [ ] **Substituir os 15 placeholders** ("Cliente 10" a "Cliente 24") por nomes reais
  - Arquivo: `lib/constants.ts` (bloco `CLIENTS`)

## Depoimentos

- [ ] **Substituir os 8 depoimentos** placeholder por depoimentos reais
  - Arquivo: `lib/constants.ts` (bloco `TESTIMONIALS`)

  ## Animações (Fase 6 — pulado)

- [ ] **6.4 — Transição de página** (Framer Motion `AnimatePresence`)
  - Complexidade alta, ganho visual pequeno
  - Fazer só se sobrar tempo no final

- [ ] **6.6 — Microinterações**
  - Underline animado nos links do Header
  - Efeito ripple nos botões
  - Cursor customizado
  - Fazer só se sobrar tempo no final

  ## Email (Resend)

- [ ] **Verificar domínio `metrodesign.com.br` no Resend**
  - Quando: antes do lançamento
  - Onde: dashboard do Resend → Domains → Add Domain
  - Requer: acesso ao DNS do domínio
  - Depois de verificar: trocar o `from` no `route.ts` de `onboarding@resend.dev` para `Metro Design <contato@metrodesign.com.br>`
  - E trocar o `CONTACT_EMAIL_TO` no `.env.local` para o email real da agência

- [ ] **Ajustar `CONTACT_EMAIL_TO` para o email real da agência**
  - Atualmente: `oi@metrodesign.com.br` (só funciona em teste)

  ## Google Tag Manager (GTM)

- [ ] **Adicionar GTM ao site**
  - Quando: antes do lançamento (ou quando a agência tiver o ID)
  - Instalar: `npm install @next/third-parties`
  - Adicionar `NEXT_PUBLIC_GTM_ID` no `.env.local`
  - Adicionar `<GoogleTagManager gtmId={...} />` no `app/layout.tsx` (dentro do `<html>`, antes do `<body>`)
  - Depois: a agência configura as tags (GA4, Meta Pixel, etc.) no dashboard do GTM

- [ ] **Configurar tags no dashboard do GTM**
  - Google Analytics (GA4)
  - Meta Pixel (se usar Facebook Ads)
  - Outras conforme necessidade