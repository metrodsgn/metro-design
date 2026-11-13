import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ServicesProcess } from "@/components/sections/ServicesProcess";
import { ReasonsAccordion } from "@/components/sections/ReasonsAccordion";
import { createSiteMetadata } from "@/lib/metadata";
import styles from "./page.module.css";
import { getServiceFrontPhotos, type ServiceFrontPhotos } from "@/sanity/lib/fetchers";
import { urlFor } from "@/sanity/lib/image";

export const metadata = createSiteMetadata({ title: "Fazemos — Metro Design", description: "Branding, conteúdo, audiovisual e tecnologia para marcas que querem se posicionar, se comunicar e crescer com consistência.", path: "/fazemos" });

const fronts = [
  { title: "Branding & Design", intro: "Toda marca precisa de uma identidade que faça sentido para o negócio e para as pessoas. Criamos marcas do zero ou damos novos caminhos às que já existem, unindo posicionamento, personalidade e design para construir identidades que se destacam e permanecem relevantes.", items: ["Estratégia e posicionamento de marca", "Naming e criação de marcas", "Identidade visual", "Brand book e diretrizes de marca", "Redesign e evolução de marcas", "Sinalização e design de materiais gráficos"], image: "/fotos/DSC03252.JPG", imageAlt: "Profissional da Metro trabalhando em um computador no estúdio", imageField: "brandingDesign" },
  { title: "Comunicação & Conteúdo", intro: "Uma boa comunicação vai além de estar presente. É sobre construir relacionamentos, fortalecer a presença da marca e criar conexões que fazem sentido para o público e para o negócio. Na Metro, planejamos, produzimos e gerenciamos conteúdos e campanhas com consistência, personalidade e foco em resultados.", items: ["Planejamento de comunicação", "Gestão de redes sociais", "Produção de conteúdo", "Campanhas publicitárias", "Gestão de tráfego pago", "Treinamento de equipes em branding"], image: "/fotos/DSC03249.JPG", imageAlt: "Integrante da equipe Metro conversando no estúdio", imageField: "communicationContent" },
  { title: "Audiovisual & Direção Criativa", intro: "Da concepção à produção, criamos conteúdos visuais que comunicam com personalidade e propósito. Com estrutura própria, direção criativa e atenção aos detalhes, produzimos fotografias, vídeos e campanhas que traduzem a identidade de cada marca em imagens que fazem sentido.", items: ["Fotografia publicitária", "Produção audiovisual", "Vídeos institucionais e comerciais", "Conteúdo para redes sociais", "Direção criativa e de arte", "Cobertura de eventos"], image: "/fotos/DSC03248.JPG", imageAlt: "Profissional da Metro em conversa criativa no estúdio", imageField: "audiovisualCreativeDirection" },
  { title: "Produtos Digitais & Tecnologia", intro: "Tecnologia boa é aquela que simplifica, conecta e resolve. Desenvolvemos sites, plataformas e soluções digitais que unem experiência, funcionalidade e identidade de marca. Do primeiro protótipo ao produto no ar, pensamos cada detalhe para que design e tecnologia trabalhem juntos, sem perder de vista o que o negócio realmente precisa.", items: ["Sites institucionais e landing pages", "E-commerces", "Portais e plataformas digitais", "Plataformas SaaS", "Sistemas web e aplicações internas", "MVPs e produtos sob demanda", "UX/UI Design", "Integrações e automações"], image: "/fotos/DSC03245.JPG", imageAlt: "Integrante da equipe Metro ao lado de uma estação de trabalho", imageField: "digitalProductsTechnology" },
] as const;
const reasons: (readonly [string, string])[] = [
  ["Primeiro, a gente entende. Depois, cria.", "Antes de propor qualquer solução, buscamos entender o negócio, o público e os desafios de cada cliente. Porque boas decisões começam com as perguntas certas."],
  ["Tudo conversa. Tudo faz sentido.", "Integramos branding, estratégia, design, comunicação, audiovisual e tecnologia, com decisões orientadas por dados. Assim, cada entrega mantém a coerência com a identidade da marca e contribui para os objetivos do negócio."],
  ["Do planejamento à execução.", "Uma boa ideia precisa funcionar na prática. Por isso, combinamos capacidade criativa, conhecimento técnico e acompanhamento para tirar projetos do papel com qualidade e coerência."],
  ["Organização que você acompanha.", "Projetos bem conduzidos precisam de clareza. Por isso, trabalhamos com etapas definidas, acompanhamento das entregas e ferramentas próprias que facilitam a comunicação, as aprovações e o dia a dia com nossos clientes."],
  ["Parceria de longo prazo.", "Acreditamos em parcerias construídas com confiança, diálogo e comprometimento. Queremos conhecer seu negócio, acompanhar sua evolução e estar por perto nos próximos desafios."],
];
const audiences = [
  ["Para quem está começando.", "Da escolha do nome à construção da identidade e da presença digital. Tudo para sua marca chegar ao mercado com personalidade e consistência."],
  ["Para quem cresceu e precisa evoluir.", "Seu negócio mudou, mas a marca não acompanhou? Repensamos posicionamento, identidade e experiências para refletir o momento atual da empresa."],
  ["Para quem precisa de uma comunicação mais presente.", "Planejamento, conteúdo, redes sociais e campanhas para manter sua marca ativa, relevante e próxima do público, com acompanhamento de resultados."],
  ["Para quem quer mostrar sua marca de verdade.", "Fotografia, vídeo e direção criativa para produzir conteúdos originais que valorizam a identidade, a personalidade e os diferenciais do seu negócio."],
  ["Para quem quer vender também no digital.", "E-commerces e canais de venda que combinam experiência de compra, funcionalidade e identidade de marca."],
  ["Para quem precisa simplificar processos.", "Sistemas personalizados, integrações e automações para organizar operações, reduzir tarefas manuais e tornar o dia a dia mais eficiente."],
  ["Para quem tem uma ideia e quer tirá-la do papel.", "Da concepção ao MVP, ajudamos a estruturar, desenhar e desenvolver produtos digitais para testar soluções e dar os primeiros passos no mercado."],
];
export default async function FazemosPage() {
  let serviceFrontPhotos: ServiceFrontPhotos | null = null;
  try {
    serviceFrontPhotos = await getServiceFrontPhotos();
  } catch {
    // Keep the local photos available if Sanity is temporarily unreachable.
  }

  return <div className={styles.page}>
    <Container>
      <header className={styles.hero}>
        <h1>Quatro frentes,<br />um pensamento integrado.</h1>
        <p className={styles.lead}>Branding, conteúdo, audiovisual e tecnologia. Diferentes especialidades que se complementam, porque acreditamos que uma marca precisa fazer sentido em tudo o que diz, mostra e entrega.</p>
      </header>
      <section aria-label="Frentes de atuação" className={styles.fronts}>
        {fronts.map((front) => {
          const sanityImage = serviceFrontPhotos?.[front.imageField];
          const imageSrc = sanityImage?.asset
            ? urlFor({
                _type: "image",
                asset: sanityImage.asset,
                crop: sanityImage.crop,
                hotspot: sanityImage.hotspot,
              })
                .width(1200)
                .height(1500)
                .fit("crop")
                .auto("format")
                .url()
            : front.image;

          return (
            <article className={styles.front} key={front.title}>
              <div className={styles.frontContent}>
                <h2>{front.title}</h2>
                <p>{front.intro}</p>
                <ul>
                  {front.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <Link href="/fale" className="ui-button ui-button-accent">
                  Quero essa frente <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <figure className={styles.frontPhoto}>
                <Image
                  src={imageSrc}
                  alt={sanityImage?.alt || front.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1280px) 40vw, 560px"
                  className={styles.frontImage}
                />
              </figure>
            </article>
          );
        })}
      </section>
      <section className={styles.reasons}>
        <h2 className={styles.reasonsTitle}>
          <span>Por que escolher</span>
          <span>a Metro.</span>
        </h2>
        <ReasonsAccordion items={reasons} />
      </section>
      <section className={styles.process} aria-labelledby="process-title">
        <h2 id="process-title">Como funciona.</h2>
        <ServicesProcess />
      </section>
      <section className={styles.audiences}>
        <h2>O próximo passo tem muitas formas. E a gente ajuda a dar forma ao seu.</h2><p className={styles.lead}>Cada negócio tem seu momento. E cada momento traz novos desafios.</p>
        <div>{audiences.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
    </Container>
  </div>;
}
