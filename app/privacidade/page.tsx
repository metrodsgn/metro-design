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
    <section className="py-12 md:py-20">
      <Container className="max-w-4xl">
        <span className="section-eyebrow">Privacidade</span>
        <h1 className="font-editorial mt-4 text-4xl leading-tight tracking-tight md:text-6xl">
          Aviso de Privacidade
        </h1>
        <p className="text-muted mt-5 text-sm">
          Última atualização: 15 de outubro de 2026
        </p>

        <div className="text-muted mt-10 space-y-8 text-base leading-relaxed">
          <section>
            <h2 className="text-foreground text-lg font-semibold">
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
            <h2 className="text-foreground text-lg font-semibold">
              Quais informações são recebidas e para quê
            </h2>
            <p className="mt-2">
              O formulário pode receber seu nome, e-mail, telefone, empresa, tipo
              de projeto e mensagem. Usamos essas informações para entender e
              responder ao contato que você iniciou.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-lg font-semibold">
              Envio e armazenamento
            </h2>
            <p className="mt-2">
              As mensagens são encaminhadas por e-mail usando a plataforma
              Resend e entregues ao endereço de contato configurado pela Metro
              Design. O formulário não grava as mensagens em um banco de dados
              próprio do site. Depois da entrega, a mensagem fica sujeita às
              regras de acesso, armazenamento e exclusão da caixa de e-mail
              destinatária.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-lg font-semibold">
              Proteção contra envios automatizados
            </h2>
            <p className="mt-2">
              O formulário usa um campo de verificação e um token temporário
              para reduzir envios automatizados. Esses mecanismos não são usados
              para criar um perfil sobre você.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-lg font-semibold">
              Serviços externos
            </h2>
            <p className="mt-2">
              O site incorpora um mapa do Google Maps na página de contato. Ao
              carregar esse mapa, seu navegador pode se conectar aos serviços
              do Google, sujeitos às políticas próprias desse fornecedor.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-lg font-semibold">
              Seus direitos e contato
            </h2>
            <p className="mt-2">
              Você pode entrar em contato pelo e-mail acima para perguntar sobre
              o tratamento das informações enviadas ou solicitar atendimento
              dos direitos previstos na legislação de proteção de dados.
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
