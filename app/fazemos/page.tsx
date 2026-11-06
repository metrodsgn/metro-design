import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ServicesProcess } from "@/components/sections/ServicesProcess";
import { ReasonsAccordion } from "@/components/sections/ReasonsAccordion";
import { createSiteMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = createSiteMetadata({ title: "Fazemos — Metro Design", description: "Branding, conteúdo, audiovisual e tecnologia em uma operação única, para que a marca chegue inteira a cada ponto de contato.", path: "/fazemos" });

const fronts = [
  { title: "Branding & Design", intro: "O ponto de partida para quem quer se posicionar de forma consistente e memorável. Criamos marcas do zero ou evoluímos as que já existem, traduzindo propósito em sistema visual.", items: ["Naming e criação de marcas", "Identidade visual", "Brand book", "Redesign de marcas"], image: "/fotos/DSC03252.JPG", imageAlt: "Profissional da Metro trabalhando em um computador no estúdio" },
  { title: "Comunicação & Conteúdo", intro: "A comunicação é o elo entre a marca e o mercado. Planejamos, produzimos e gerimos a presença digital com um objetivo claro: engajamento real e resultado consistente.", items: ["Planejamento estratégico", "Gestão de redes sociais", "Campanhas e tráfego pago", "Treinamento de equipes em branding"], image: "/fotos/DSC03249.JPG", imageAlt: "Integrante da equipe Metro conversando no estúdio" },
  { title: "Audiovisual & Direção Criativa", intro: "Conteúdo visual constrói marca. Com estrutura própria, produzimos fotos e vídeos exclusivos que humanizam a marca e funcionam em campanhas, ações e materiais institucionais.", items: ["Fotografia publicitária", "Vídeos curtos e institucionais", "Direção de arte para campanhas", "Sinalização e materiais gráficos"], image: "/fotos/DSC03248.JPG", imageAlt: "Profissional da Metro em conversa criativa no estúdio" },
  { title: "Produtos Digitais & Tecnologia", intro: "Sites, plataformas e sistemas que nascem com a identidade da marca e resolvem problemas reais do negócio, do primeiro protótipo ao produto no ar. Quem desenhou a sua marca desenha a sua interface, e nada se perde entre agência e desenvolvedor.", items: ["Sites institucionais e landing pages", "E-commerces e canais de venda", "Portais e plataformas", "Sistemas web e aplicações internas", "MVPs e produtos sob demanda", "UX/UI", "Integrações e automações"], image: "/fotos/DSC03245.JPG", imageAlt: "Integrante da equipe Metro ao lado de uma estação de trabalho" },
];
const reasons: (readonly [string, string])[] = [
  ["Estratégia como ponto de partida.", "Investigamos antes de criar. Negócio, público e objetivo definem a entrega, não o contrário."],
  ["Operação multidisciplinar.", "Branding, conteúdo, audiovisual e tecnologia com o mesmo time. Coerência sem ruído."],
  ["Capacidade de entrega complexa.", "Da marca à campanha, do feed ao site, do on-line ao off-line, com o mesmo padrão estético e conceitual."],
  ["Processo claro do início ao fim.", "Etapas, prazos e aprovações definidos. Você sempre sabe em que ponto está o seu projeto."],
  ["Parceria de longo prazo.", "Mais do que executar projetos, construímos marcas lado a lado, com visão de futuro."],
];
const audiences = [
  ["Quem está começando um negócio.", "Naming, identidade visual e um site para chegar ao mercado do jeito certo."],
  ["Empresas que cresceram e a marca ficou para trás.", "Redesign, brand book e um site à altura do que a empresa é hoje."],
  ["Times de marketing que precisam de constância.", "Planejamento, redes sociais, campanhas e conteúdo com métrica."],
  ["Marcas que precisam de imagem própria.", "Fotos e vídeos exclusivos no lugar de banco de imagens."],
  ["Negócios que querem vender on-line.", "E-commerce e canais de venda com a cara da marca."],
  ["Operações que vivem em planilhas e fundadores com uma ideia para validar.", "Sistemas sob medida, automações e MVPs."],
];
export default function FazemosPage() {
  return <div className={styles.page}>
    <Container>
      <header className={styles.hero}>
        <h1>Quatro frentes,<br />um pensamento integrado.</h1>
        <p className={styles.lead}>Branding, conteúdo, audiovisual e tecnologia em uma operação única, para que a marca chegue inteira a cada ponto de contato.</p>
      </header>
      <section aria-label="Frentes de atuação" className={styles.fronts}>
        {fronts.map((front) => (
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
                src={front.image}
                alt={front.imageAlt}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1280px) 40vw, 560px"
                className={styles.frontImage}
              />
            </figure>
          </article>
        ))}
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
        <h2>Pra quem é</h2><p className={styles.lead}>Negócios de todos os portes, em momentos diferentes.</p>
        <div>{audiences.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
    </Container>
  </div>;
}
