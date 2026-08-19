import dados from '../dados/tabelas-2026.json' with { type: 'json' }

export interface Faixa {
  ate: number | null
  aliquota: number
  deducao: number
}

export interface Reducao {
  zeroAte: number
  maxReducao: number
  base: number
  coef: number
  zeraEm: number
}

export interface Tabelas2026 {
  meta: { ano: string; vigenciaAte: string; atualizadaEm: string; fonte: string; nota: string }
  salarioMinimo: number
  inss: {
    teto: number
    faixas: { ate: number; aliquota: number }[]
    autonomo: {
      aliquotas: { integral: number; simplificado: number; baixaRenda: number }
      planoSimplificado: number
      baixaRendaValor: number
    }
  }
  irrf: {
    mensal: {
      faixas: Faixa[]
      dependente: number
      descontoSimplificado: number
      reducao: Reducao
    }
  }
  irpf: {
    anual: {
      faixas: Faixa[]
      dependente: number
      descontoSimplificado: number
      descontoSimplificadoPercentual: number
      reducao: Reducao
    }
  }
  rendaFixa: { ir: { ate: number | null; aliquota: number }[] }
  fgts: { depositoMensal: number; multaSemJustaCausa: number; jurosAnuais: number; distribuicaoAnual: number }
  poupanca: { selicLimite: number; taxaQuandoAcima: number; percentualQuandoAbaixo: number }
}

export const tabelas = dados as Tabelas2026
