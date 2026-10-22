export type ContactQualification =
  | "alta_compatibilidade"
  | "compatibilidade_a_avaliar"
  | "fora_do_escopo_atual";

export interface ContactQualificationInput {
  deliveriesCount: number;
  investmentRange?: string;
  challengeLength: number;
  hasWebsite: boolean;
  hasSocial: boolean;
  isDecisionMaker: boolean;
}

/**
 * Configuração de pesos e limiares para qualificação interna de leads.
 * Estes valores nunca são enviados ao visitante.
 */
export const QUALIFICATION_CONFIG = {
  weights: {
    deliveries: 0.25,      // quantidade de entregas selecionadas
    investment: 0.25,      // faixa de investimento informada
    challenge: 0.20,       // clareza/tamanho do desafio descrito
    website: 0.10,         // site informado
    social: 0.05,          // rede social informada
    decisionMaker: 0.15,   // perfil de quem decide
  },
  thresholds: {
    alta: 0.70,   // >= 0.70 -> alta_compatibilidade
    avaliar: 0.40, // >= 0.40 -> compatibilidade_a_avaliar
  },
} as const;

/**
 * Calcula a qualificação interna de um lead.
 *
 * Regras de negócio:
 * - Nenhuma resposta isolada rejeita um contato.
 * - Orçamento menor não é tratado automaticamente como mau cliente.
 * - Todo lead é marcado com revisao_humana: true.
 * - A classificação nunca aparece na UI nem nas respostas da API ao visitante.
 */
export function qualifyContact(
  input: ContactQualificationInput,
): {
  qualification: ContactQualification;
  score: number;
  reviewHuman: true;
} {
  const { weights, thresholds } = QUALIFICATION_CONFIG;

  let score = 0;

  // Entregas selecionadas (0 a 1)
  const deliveriesScore = Math.min(input.deliveriesCount / 3, 1);
  score += weights.deliveries * deliveriesScore;

  // Faixa de investimento informada (presença já pontua; valor não rejeita)
  score += weights.investment * (input.investmentRange ? 1 : 0);

  // Clareza e tamanho do desafio (caracteres do texto)
  const challengeScore = Math.min(input.challengeLength / 400, 1);
  score += weights.challenge * challengeScore;

  // Site informado
  score += weights.website * (input.hasWebsite ? 1 : 0);

  // Rede social informada
  score += weights.social * (input.hasSocial ? 1 : 0);

  // Perfil de decisor (fundador/gestor pontua mais, mas não exclui outros)
  score += weights.decisionMaker * (input.isDecisionMaker ? 1 : 0.5);

  let qualification: ContactQualification;
  if (score >= thresholds.alta) {
    qualification = "alta_compatibilidade";
  } else if (score >= thresholds.avaliar) {
    qualification = "compatibilidade_a_avaliar";
  } else {
    qualification = "fora_do_escopo_atual";
  }

  return { qualification, score, reviewHuman: true };
}
