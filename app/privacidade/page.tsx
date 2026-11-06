import { createSiteMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { CONTACT } from "@/lib/constants";
import styles from "./page.module.css";

export const metadata = createSiteMetadata({
  title: "Aviso de Privacidade — Metro Design",
  description:
    "Saiba como as informações enviadas pelo formulário de contato da Metro Design são utilizadas.",
  path: "/privacidade",
});

const contents = [
  ["controlador", "Quem trata seus dados"],
  ["informacoes", "Quais informações são recebidas"],
  ["uso", "Para que usamos essas informações"],
  ["armazenamento", "Envio e armazenamento"],
  ["servicos", "Serviços externos"],
  ["direitos", "Seus direitos e contato"],
  ["atualizacoes", "Atualizações deste aviso"],
] as const;

export default function PrivacidadePage() {
  return (
    <section className={styles.page}>
      <Container className="max-w-6xl">
        <header className={styles.hero}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" /> Privacidade
          </p>
          <h1 className={styles.title}>Aviso de Privacidade</h1>
          <p className={styles.intro}>
            Entenda quais informações recebemos quando você entra em contato e
            como são utilizadas.
          </p>
          <div className={styles.meta}>
            <span>Última atualização: 4 de novembro de 2026</span>
            <span>Versão 1.2</span>
          </div>
        </header>

        <div className={styles.layout}>
          <nav className={styles.contents} aria-label="Conteúdo do aviso">
            <p>Neste aviso</p>
            <ol>
              {contents.map(([id, label], index) => (
                <li key={id}>
                  <a href={`#${id}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.sections}>
            <section id="controlador" className={styles.section}>
              <h2>Quem trata seus dados</h2>
              <p>
                A Metro Design recebe e utiliza as informações que você envia
                pelo formulário deste site. Para dúvidas ou solicitações sobre
                seus dados, escreva para{" "}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
              </p>
            </section>

            <section id="informacoes" className={styles.section}>
              <h2>Quais informações são recebidas</h2>
              <p>
                O formulário recebe seu nome, e-mail, WhatsApp, como conheceu a
                Metro, perfil, entregas de interesse, faixa de investimento e a
                descrição do seu projeto.
              </p>
              <p>
                No envio, também registramos a data e a hora do consentimento e
                a versão deste aviso. Para reduzir envios automatizados, o site
                processa temporariamente o seu endereço IP, um token de tempo e
                um campo de verificação e o Cloudflare Turnstile.
              </p>
            </section>

            <section id="uso" className={styles.section}>
              <h2>Para que usamos essas informações</h2>
              <p>
                Usamos os dados para entender o seu projeto, responder ao
                contato e dar continuidade ao atendimento. As informações de
                segurança do formulário são usadas apenas para limitar envios
                automatizados. O envio depende do consentimento marcado por
                você.
              </p>
            </section>

            <section id="armazenamento" className={styles.section}>
              <h2>Envio e armazenamento</h2>
              <p>
                As informações são encaminhadas por e-mail usando a plataforma
                Resend e entregues ao endereço de contato configurado pela Metro
                Design. O formulário não grava as mensagens em um banco de dados
                próprio do site. O site não define um prazo próprio de retenção:
                depois da entrega, a mensagem permanece na caixa de e-mail
                destinatária até ser excluída pela Metro Design.
              </p>
            </section>

            <section id="servicos" className={styles.section}>
              <h2>Serviços externos</h2>
              <p>
                O Resend é usado para entregar as mensagens do formulário por
                e-mail. O site também carrega conteúdo editorial do Sanity, que
                não recebe os dados enviados no formulário. O mapa do Google
                Maps só é carregado quando você abre a localização na página de
                contato; nesse momento, seu navegador pode se conectar aos
                serviços do Google, sujeitos às políticas próprias desse
                fornecedor. O Cloudflare Turnstile é usado para verificar e
                reduzir envios automatizados no formulário.
              </p>
            </section>

            <section id="direitos" className={styles.section}>
              <h2>Seus direitos e contato</h2>
              <p>
                Você pode entrar em contato pelo e-mail acima para perguntar
                sobre o tratamento das informações enviadas ou solicitar
                atendimento dos direitos previstos na legislação de proteção de
                dados.
              </p>
            </section>

            <section id="atualizacoes" className={styles.section}>
              <h2>Atualizações deste aviso</h2>
              <p>
                Este aviso pode ser atualizado se o formulário, os fornecedores
                ou os procedimentos de tratamento mudarem.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </section>
  );
}
