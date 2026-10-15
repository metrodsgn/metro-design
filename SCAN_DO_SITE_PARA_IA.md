# Contexto do site Metro Design para IA

Documento de referência para análise e manutenção deste repositório. Atualizado em 15/10/2026 por inspeção do código local e checagem responsiva em Chromium. Ele descreve o código encontrado, não confirma que a versão publicada esteja igual.

## Orientações para a IA

- Leia `AGENTS.md` antes de alterar código. O projeto usa Next.js 16.4; consulte a documentação instalada em `node_modules/next/dist/docs/` antes de mudar APIs ou convenções do Next.
- Inspecione os arquivos envolvidos antes de propor ou fazer alterações. Use este documento como mapa, não como substituto do código.
- Preserve a identidade visual escura, o conteúdo em português brasileiro e o trabalho já existente. Não substitua conteúdo real nem remova arquivos sem necessidade.
- Nunca copie valores de `.env.local`, credenciais, tokens ou dados privados para prompts, documentação ou logs.
- Ao concluir mudanças, informe os arquivos alterados e as verificações realmente executadas. Não afirme que testes, lint ou build passaram sem executá-los.

## Visão geral

Site institucional e portfólio da Metro Design, agência de branding e comunicação sediada em Fortaleza. A home apresenta a agência, serviços, projetos antes/depois, Metrus, cases, clientes e depoimentos. Os cases, clientes, depoimentos e comparativos antes/depois são gerenciados no Sanity; textos institucionais e serviços vêm de `lib/constants.ts`.

- Site configurado: `https://metrodesign.com.br` (`lib/constants.ts`).
- Idioma do documento: `pt-BR`.
- O código local pode divergir do site publicado.

## Tecnologias e comandos

- Next.js `16.4.0`, App Router, React `19.3.0` e TypeScript.
- Tailwind CSS 4 com integração Turbopack.
- Sanity 5, `next-sanity`, GROQ e `@sanity/image-url`.
- Resend para o formulário de contato.
- Framer Motion para animações.
- Fontes via `next/font/google`: Space Grotesk, Inter, Instrument Serif e JetBrains Mono.
- ESLint 9 e Prettier.
- Scripts em `package.json`: `dev`, `build`, `start`, `lint` e `format`. Não há script de testes configurado.

## Rotas

| Rota | Comportamento |
|---|---|
| `/` | Home composta em `app/page.tsx`. |
| `/projetos` | Lista os cases retornados pelo Sanity, com filtros de categoria. |
| `/projetos/[slug]` | Detalhe do case, galeria de imagens e navegação para cases adjacentes. Slugs inexistentes usam `notFound()`. |
| `/contato` | Formulário, contatos diretos, redes sociais e mapa. |
| `/privacidade` | Aviso de privacidade ligado ao formulário e ao rodapé; os dados legais do controlador, base legal e prazos de retenção precisam ser confirmados pela Metro antes da publicação. |
| `/studio/[[...tool]]` | Sanity Studio nativo, configurado em `sanity.config.ts`. |
| `/api/contato` | POST usado pelo formulário público para validar e enviar mensagem via Resend. |
| `/api/contato/token` | GET fornece token temporizado ao formulário. Também existe um POST legado que envia mensagens; veja “Pontos para revisar”. |
| `/sitemap.xml` | Sitemap estático e dinâmico com páginas públicas e cases carregados do Sanity. |
| `/robots.txt` | Permite indexação pública, aponta para o sitemap e bloqueia `/api/` e `/studio/`. |

`app/layout.tsx` inclui fontes, metadados e `SiteShell`. `lib/metadata.ts` monta canonical, Open Graph e Twitter Card por rota; `app/opengraph-image.tsx` gera a imagem de compartilhamento padrão. `components/layout/SiteShell.tsx` omite Header, Footer e botão flutuante de WhatsApp em `/studio`; também oculta o botão flutuante em `/contato`, onde o acesso ao WhatsApp está no cartão “Contato direto”. Nas demais rotas mantém o shell público. A página do Studio é renderizada por `NextStudio`.

## Estrutura do código

- `app/`: rotas, layouts, metadados, estilos globais e endpoints.
- `components/layout/`: cabeçalho, rodapé e shell público.
- `components/sections/`: seções da home, contato e galerias/listagens de projetos.
- `components/ui/`: elementos reutilizáveis, cards, marca, contêineres, animações e botão de WhatsApp.
- `components/studio/`: ícone Metro usado na configuração do Sanity Studio.
- `lib/constants.ts`: dados institucionais, contato, navegação, categorias e conteúdo fixo.
- `lib/anti-spam.ts`: geração/verificação do token de tempo e escape de HTML.
- `sanity/lib/`: cliente, consultas GROQ, fetchers, URLs de imagem e integração Live.
- `sanity/schemaTypes/`: schemas de Case, Cliente, Depoimento e Antes e Depois, além de controles de cor.
- `data/antes-depois.ts`: dados locais de fallback do comparador.
- `public/`: arquivos estáticos, incluindo o vídeo usado no Hero.

## Home e identidade visual

A ordem em `app/page.tsx` é: Hero, Somos, Fazemos, AntesDepois, Metrus, ProjetosSelecionados, Clientes, FaixaTexto e Depoimentos.

- O visual usa fundo escuro, texto claro e vermelho como cor de ação/destaque. Tokens e estilos globais ficam em `app/globals.css`.
- O cabeçalho tem marca com link para home, links de navegação, botões “Ver projetos” e “Fale conosco” no desktop e menu expansível em telas menores. Escape fecha o menu mobile.
- Os CTAs de projetos e contato ficam no cabeçalho; o Hero não os duplica.
- `Fazemos` apresenta os serviços em acordeão.
- `Metrus` inclui apresentação e chamada para contato.
- `FaixaTexto` é a faixa animada de marcas/logos; sua implementação está em `components/sections/FaixaTexto.tsx`.
- Há controles compartilhados de botão, ícone e formulário definidos nos estilos globais. Verifique o CSS atual antes de alterar tokens ou comportamento responsivo.

### Responsividade

- O layout usa os breakpoints Tailwind `sm`, `md`, `lg` e `xl`. O cabeçalho mantém o menu compacto abaixo de `xl`; o menu abre por botão e fecha ao escolher uma rota ou pressionar Escape.
- Os contêineres limitam a largura máxima e reduzem os recuos em telas estreitas. Grades de projetos começam em uma coluna e passam a duas em `sm` e três em `lg`; filtros permitem quebra em várias linhas.
- No mockup do Metrus, o status fica abaixo do texto em telas estreitas e volta à mesma linha em `sm` ou acima.
- O botão flutuante de WhatsApp respeita a área segura inferior e não é exibido em `/contato` para não cobrir os campos. O link equivalente fica no cartão de contato direto.
- A home, `/projetos`, `/contato` e `/privacidade` foram verificadas em Chromium nas larguras 320, 375, 390, 768, 1024 e 1440 px. Em cada medida, `document.documentElement.scrollWidth` foi igual à largura da viewport.
- Em 320 px também foram verificados o menu mobile, uma página de case e o lightbox. Isso confirma a ausência de overflow horizontal nessas rotas e estados testados, não a aparência em todos os aparelhos físicos.
- O Sanity Studio usa a interface do próprio Sanity; os estilos responsivos do site não redesenham essa tela.

## Sanity e conteúdo

### Configuração do Studio

`sanity.config.ts` configura o Studio com título “Metro Design”, ícone Metro, rota base `/studio`, plugin de estrutura e Vision. O editor de documentos é o formulário nativo do Sanity. Há personalizações no schema (grupos de campos, input de cor da marca e estrutura de navegação), mas não foi encontrada uma implementação de layout/formulário completo em HTML/CSS próprio. Mudanças visuais do Studio devem usar as APIs de componentes do Sanity compatíveis com a versão instalada.

### Case

Schema em `sanity/schemaTypes/case.ts`. Campos:

- Grupo **Informações**: título, slug, cliente, categoria, cor da marca, ano e `featured`.
- Grupo **Imagens**: capa e galeria, com hotspot.
- Grupo **Conteúdo do case**: descrição em Portable Text e serviços.

Título, slug, cliente, categoria e ano são obrigatórios. Capa é opcional. Categoria oferece as opções fixas de `CASE_CATEGORIES` (`Branding`, `Audiovisual`, `Comunicação`, `Campanha`, `Digital`). `brandColor` tem input customizado e aceita hexadecimal de seis dígitos; vazio usa o vermelho padrão da Metro. `featured` indica seleção editorial da home, conforme a regra abaixo.

Consultas em `sanity/lib/queries.ts`; fetchers em `sanity/lib/fetchers.ts`:

- `getAllCases`: todos os cases, ordenados por ano decrescente e título crescente.
- `getFeaturedCases`: cases com `featured == true`, na mesma ordem.
- `getCaseBySlug`: case completo, dimensões dos assets da capa/galeria, descrição e serviços.
- `getAllClients`: clientes com logo definido, ordenados por `order` e nome.
- `getAllTestimonials`: depoimentos ordenados por `order` e data de criação decrescente.
- `getBeforeAfterItems`: documentos com as duas imagens definidas, ordenados por `order` e data de criação decrescente. Em caso de erro retorna lista vazia.

### Regra dos projetos na home e categorias

`ProjetosSelecionados` busca em paralelo todos os cases e os destacados. No filtro inicial, exibe todos os cases e coloca os marcados como destaque editorial primeiro. Marcar destaque no Studio altera essa ordem quando os dados da home são atualizados.

Na home, o filtro **Todos** mostra até seis cases, priorizando os marcados como destaque editorial; os filtros de categoria mostram todos os cases daquela categoria. O link “Todos os projetos” leva à rota `/projetos`, que lista o catálogo completo. As opções visíveis são a união das categorias canônicas em `CASE_CATEGORIES` e das categorias efetivamente encontradas nos cases carregados, para não esconder uma categoria já cadastrada com outro valor.

`/projetos` mostra todos os cases. A grade de projetos selecionados e a grade geral usam componentes distintos; confira seus estilos antes de alterar proporções ou comportamento de filtro.

### Outros documentos Sanity

- **Cliente** (`sanity/schemaTypes/client.ts`): nome, logo obrigatório e ordem. A seção de clientes consome esses documentos.
- **Depoimento** (`sanity/schemaTypes/testimonial.ts`): nome, empresa, cargo opcional, foto opcional do cliente, fala, inicial de fallback, horário textual e ordem. A seção fica oculta quando não há depoimentos. As fotos são consultadas do Sanity para o avatar; sem foto, o carrossel mostra a inicial.
- **Antes e Depois** (`sanity/schemaTypes/beforeAfter.ts`): cliente, segmento, resumo, entrega principal, imagens de antes/depois com alt obrigatório e ordem.

Os textos de apresentação das seções e dados de contato/redes ficam em `lib/constants.ts`, não no Sanity.

## Imagens, animação e interação

- O detalhe do case constrói a galeria a partir da capa (se houver) e das imagens adicionais. As dimensões originais vêm dos metadados Sanity e são passadas aos componentes para preservar proporções. URLs de imagem usam `fit("max")` para não forçar recorte/ampliação dos originais.
- A apresentação da galeria/lightbox fica em `ProjectGallery.tsx`; confira o componente e os estilos antes de mudar ajuste (`object-fit`), dimensões ou controles.
- `AntesDepois` prioriza os documentos do Sanity; se a busca falha ou não retorna conteúdo, usa os dados locais de `data/antes-depois.ts`. O comparador permite arrastar o divisor e tem controles de navegação.
- `Clientes` busca logos no Sanity. Com menos de quatro itens, exibe cartões estáticos centralizados; a partir de quatro, monta duas faixas contínuas com cópias dos logos. A animação considera `prefers-reduced-motion`.
- `Depoimentos` mostra três cards em telas `lg` ou maiores e um card central nas telas menores. Chevrons vermelhos sem fundo ficam nas laterais. Framer Motion anima a fileira na direção da navegação: os cards se movem juntos e um novo depoimento entra pela lateral oposta. Respeita movimento reduzido. Os cards não têm estado visual selecionado. Avatares usam foto opcional do Sanity ou a inicial cadastrada.
- O parallax do vídeo do Hero é desativado para dispositivos sem hover. Os efeitos de hover dos cards de projeto são neutralizados em telas touch; a chamada “Ver projeto” permanece visível. O comparador antes/depois continua aceitando gesto de toque.
- Movimento reduzido e scroll nativo devem ser preservados ao modificar animações. Verifique `app/globals.css` e o componente específico.

### Verificações da revisão responsiva

- `npm run lint` — passou.
- `npx tsc --noEmit` — passou.
- Chromium: `/`, `/projetos`, `/contato` e `/privacidade` em 320, 375, 390, 768, 1024 e 1440 px; largura de documento igual à viewport em todas as combinações testadas.
- Chromium em 320 px: página de case, lightbox, menu mobile e estados de toque verificados sem overflow horizontal.
- `git diff --check` — passou.
- Build de produção não confirmado nesta revisão: Turbopack falhou ao iniciar um processo auxiliar no ambiente. A tentativa alternativa via Webpack não retornou saída e foi interrompida; não registrar o build como aprovado.

## Formulário de contato e proteção contra spam

O formulário em `components/sections/Contato.tsx` obtém um token de `/api/contato/token` via GET sem cache e envia nome, e-mail, telefone, empresa, serviço, mensagem e token para `/api/contato`. O formulário e o rodapé ligam ao aviso em `/privacidade`. O aviso descreve o encaminhamento por e-mail via Resend, o uso do Google Maps incorporado e a ausência de gravação das submissões em banco de dados próprio do app. Identificação legal do controlador, base legal e prazo de retenção da caixa de e-mail precisam ser confirmados antes de publicar o aviso.

No endpoint principal (`app/api/contato/route.ts`):

- Os dados são tratados como valores desconhecidos e convertidos para strings; nome, e-mail e mensagem são obrigatórios.
- Há limites de tamanho por campo, validação simples de e-mail, honeypot `website`, verificação do token e escape de conteúdo antes da montagem do HTML do e-mail.
- Mensagens aceitas são enviadas pelo Resend. Erros de validação e envio retornam respostas HTTP de erro; submissões identificadas como spam têm resposta silenciosa de sucesso.
- A proteção atual não é um limitador de requisições por IP. Não descreva honeypot/token como rate limit.

`lib/anti-spam.ts` assina timestamp com HMAC-SHA256, compara assinatura em tempo constante e aceita tokens com idade entre 2 segundos e 1 hora. `CONTACT_FORM_SECRET` precisa estar configurado para gerar e validar tokens.

## Variáveis de ambiente

Nomes referenciados no código (configure localmente/na hospedagem, sem colocar os valores neste documento):

- `NEXT_PUBLIC_SANITY_PROJECT_ID` — obrigatório.
- `NEXT_PUBLIC_SANITY_DATASET` — obrigatório.
- `NEXT_PUBLIC_SANITY_API_VERSION` — opcional; padrão atual `2026-10-09` em `sanity/env.ts`.
- `CONTACT_FORM_SECRET` — necessário para token anti-spam do formulário.
- `RESEND_API_KEY` — chave de envio do Resend.
- `CONTACT_EMAIL_TO` — opcional; destinatário padrão no código `contato@metrodesign.com.br`.

## Pontos para revisar (não são mudanças feitas por este documento)

1. **POST duplicado para contato**: `app/api/contato/token/route.ts` também exporta POST para envio, com uma versão menor do payload. O cliente usa `/api/contato`; decidir se o POST no caminho `/token` ainda é necessário ou deve ser removido. Não confundir essa rota com a rota principal.
2. **Remetente Resend**: `app/api/contato/route.ts` usa `onboarding@resend.dev`. Confirmar configuração e domínio remetente para produção.
3. **Rate limiting**: honeypot e token de tempo reduzem spam simples, mas não há limite explícito por IP/usuário. Avaliar proteção adicional de acordo com hospedagem e volume.
4. **Dados de demonstração do antes/depois**: revisar `data/antes-depois.ts` e substituir exemplos/imagens externos por conteúdo final autorizado quando apropriado.
5. **Token de fonte mono**: `app/globals.css` declara `--font-mono: var(--font-mono), ...`, referência autorrecursiva; `app/layout.tsx` registra JetBrains Mono como `--font-jetbrains`. Conferir e corrigir o alias caso o token seja usado.
6. **Sanity Live**: existe `sanity/lib/live.ts`, mas a árvore de rotas inspecionada não renderiza `SanityLive`; as consultas dos fetchers usam `client.fetch`. Confirmar se atualização em tempo real/cache do Studio é requisito antes de integrar.
7. **SEO**: metadados canonical, Open Graph e Twitter Card são montados em `lib/metadata.ts`; a imagem padrão vem de `app/opengraph-image.tsx`. `app/sitemap.ts` consulta cases publicados no Sanity e `app/robots.ts` direciona os crawlers. Verificar as URLs no domínio de produção após o deploy.
8. **Contato e portfólio publicados**: confirmar em ambiente de lançamento que endereço, telefone, redes, clientes, depoimentos, capas e cases estão atualizados e autorizados. Os valores públicos atuais estão em `lib/constants.ts` e no Sanity.
9. **Dependências**: Framer Motion é usado. `styled-components` está declarado; não remover sem verificar integração/uso indireto do Sanity.

## Como manter este documento

Quando comportamento, schema, rotas ou variáveis forem alterados, atualize as seções correspondentes e a data de revisão. Diferencie sempre fatos confirmados no código, comportamento que depende dos dados do Sanity e hipóteses sobre produção. Não registre aqui valores de segredo.

## Solicitação modelo para outra IA

“Leia `AGENTS.md` e `SCAN_DO_SITE_PARA_IA.md`, depois confira o código atual dos arquivos envolvidos. Preserve os fluxos e o conteúdo existentes; implemente apenas o escopo solicitado. Consulte a documentação local do Next.js 16.4 antes de alterar APIs do Next. Ao final, liste as mudanças e as verificações realmente executadas, sem inventar resultados.”
