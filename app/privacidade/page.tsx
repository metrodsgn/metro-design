import { createSiteMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { CONTACT } from "@/lib/constants";

export const metadata = createSiteMetadata({
  title: "Aviso de Privacidade — Metro Design",
  description:
    "Saiba como as informações enviadas pelo formulário de contato da Metro Design são utilizadas.",
  path: "/privacidade",
});

export default function PrivacidadePage() {
  return (
    <section className="pt-section-lg pb-section-md">
      <Container className="max-w-4xl">
        <span className="section-eyebrow">Privacidade</span>
        <h1 className="font-editorial text-foreground mt-4 text-4xl leading-[1.05] tracking-tight md:text-6xl">
          Aviso de Privacidade
        </h1>
        <p className="text-muted mt-5 text-sm">
          Última atualização: 26 de outubro de 2026
        </p>

        <div className="text-muted mt-10 space-y-8 text-base leading-relaxed">
          <section>
            <h2 className="text-foreground text-lg">
              Quem trata seus dados
            </h2>
            <p className="mt-2">
              A Metro Design recebe e utiliza as informações que você envia
              pelo formulário deste site. Para dúvidas ou solicitações sobre
              seus dados, escreva para{" "}
              <a
                className="text-foreground break-all underline decoration-accent underline-offset-4"
                href={`mailto:${CONTACT.email}`}
              >
                {CONTACT.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-lg">
              Quais informações são recebidas
            </h2>
            <p className="mt-2">
              O formulário recebe seu nome, e-mail, WhatsApp, empresa, cargo,
              quantidade de colaboradores, como conheceu a Metro, perfil
              profissional, entregas de interesse, faixa de investimento e a
              descrição do seu desafio. Site e rede social são opcionais.
            </p>
            <p className="mt-3">
              No envio, também registramos a data e a hora do consentimento e a
              versão deste aviso. Para reduzir envios automatizados, o site
              processa temporariamente o seu endereço IP, um token de tempo e um
              campo de verificação.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-lg">
              Para que usamos essas informações
            </h2>
            <p className="mt-2">
              Usamos os dados para entender o seu projeto, responder ao contato
              e dar continuidade ao atendimento. As informações de segurança do
              formulário são usadas apenas para limitar envios automatizados. O
              envio depende do consentimento marcado por você.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-lg">
              Envio e armazenamento
            </h2>
            <p className="mt-2">
              As informações são encaminhadas por e-mail usando a plataforma
              Resend e entregues ao endereço de contato configurado pela Metro
              Design. O formulário não grava as mensagens em um banco de dados
              próprio do site. O site não define um prazo próprio de retenção:
              depois da entrega, a mensagem permanece na caixa de e-mail
              destinatária até ser excluída pela Metro Design.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-lg">
              Serviços externos
            </h2>
            <p className="mt-2">
              O Resend é usado para entregar as mensagens do formulário por
              e-mail. O site também carrega conteúdo editorial do Sanity, que
              não recebe os dados enviados no formulário. O mapa do Google Maps
              só é carregado quando você abre a localização na página de
              contato; nesse momento, seu navegador pode se conectar aos
              serviços do Google, sujeitos às políticas próprias desse
              fornecedor.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-lg">
              Seus direitos e contato
            </h2>
            <p className="mt-2">
              Você pode entrar em contato pelo e-mail acima para perguntar sobre
              o tratamento das informações enviadas ou solicitar atendimento
              dos direitos previstos na legislação de proteção de dados.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-lg">
              Atualizações deste aviso
            </h2>
            <p className="mt-2">
              Este aviso pode ser atualizado se o formulário, os fornecedores ou
              os procedimentos de tratamento mudarem.
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
