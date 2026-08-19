import SalarioLiquido from './salario-liquido-clt.astro'
import Inss from './inss.astro'
import IrpfAnual from './irpf-anual.astro'
import Fgts from './fgts.astro'
import NotaParaPassar from './nota-para-passar.astro'
import RendimentoInvestimentos from './rendimento-investimentos.astro'
import RescisaoTrabalhista from './rescisao-trabalhista.astro'
import HorasExtras from './horas-extras.astro'
import DecimoTerceiro from './decimo-terceiro.astro'
import Ferias from './ferias.astro'
import Aposentadoria from './aposentadoria.astro'
import Inflacao from './inflacao.astro'
import Financiamento from './financiamento.astro'
import CartaoCredito from './cartao-credito.astro'
import Iof from './iof.astro'
import Poupanca from './poupanca.astro'
import SimuladorEnem from './simulador-enem.astro'
import BolsaEstudos from './bolsa-estudos.astro'

export interface MetaCalculadora {
  slug: string
  titulo: string
  descricao: string
  seo: string
  precisaTabelas: boolean
  categoria: 'trabalho' | 'impostos' | 'investimentos' | 'previdencia' | 'estudos'
  aviso?: string
  explicacao: string[]
}

export interface CalculadoraRegistrada {
  slug: string
  meta: MetaCalculadora
  Componente: unknown
}

export const rotulosCategoria: Record<MetaCalculadora['categoria'], string> = {
  trabalho: 'Trabalho',
  impostos: 'Impostos',
  investimentos: 'Investimentos',
  previdencia: 'Previdência',
  estudos: 'Estudos'
}

export const calculadoras: CalculadoraRegistrada[] = [
  {
    slug: 'salario-liquido-clt',
    Componente: SalarioLiquido,
    meta: {
      slug: 'salario-liquido-clt',
      titulo: 'Salário Líquido CLT',
      descricao: 'Calcule seu salário líquido real com descontos de INSS e IRRF.',
      seo: 'Calculadora de salário líquido CLT: calcule o desconto do INSS progressivo e do IRRF com a tabela vigente em 2026.',
      precisaTabelas: true,
      categoria: 'trabalho',
      explicacao: [
        'O salário líquido é o valor que sobra após os descontos obrigatórios de INSS e Imposto de Renda (IRRF).',
        'O INSS é progressivo: cada faixa incide apenas sobre a parcela que excede a anterior.',
        'O IRRF pode usar o desconto simplificado (20% dos rendimentos) ou o completo (com deduções).'
      ]
    }
  },
  {
    slug: 'inss',
    Componente: Inss,
    meta: {
      slug: 'inss',
      titulo: 'INSS',
      descricao: 'Calcule a contribuição ao INSS para empregados CLT e trabalhadores autônomos.',
      seo: 'Calculadora de INSS: contribuição do empregado CLT e autônomo com as alíquotas progressivas de 7,5% a 14%.',
      precisaTabelas: true,
      categoria: 'impostos',
      explicacao: [
        'O INSS usa alíquotas progressivas de 7,5% a 14%, limitadas ao teto de R$ 8.475,55.',
        'Cada faixa só incide sobre a parcela do salário que excede a faixa anterior.',
        'O trabalhador autônomo pode optar por planos integral (20%), simplificado (11%) ou baixa renda (5%).'
      ]
    }
  },
  {
    slug: 'irpf-anual',
    Componente: IrpfAnual,
    meta: {
      slug: 'irpf-anual',
      titulo: 'IRPF Anual',
      descricao: 'Compare as declarações simplificada e completa do Imposto de Renda.',
      seo: 'Simulador de IRPF: compare a declaração simplificada com a completa e veja o imposto devido ou restituição.',
      precisaTabelas: true,
      categoria: 'impostos',
      explicacao: [
        'A simplificada aplica 20% de desconto sobre rendimentos tributáveis, limitado a R$ 17.640.',
        'A completa permite deduzir dependentes, educação, saúde e previdência.',
        'A Lei 15.270/2025 zera o IR para rendimentos anuais até R$ 60.000.'
      ]
    }
  },
  {
    slug: 'fgts',
    Componente: Fgts,
    meta: {
      slug: 'fgts',
      titulo: 'FGTS',
      descricao: 'Projete o saldo da sua conta do FGTS ao longo do tempo.',
      seo: 'Calculadora de FGTS: projeta o saldo com depósitos mensais e rendimento de 3% ao ano.',
      precisaTabelas: true,
      categoria: 'trabalho',
      explicacao: [
        'O empregador deposita 8% do salário bruto todo mês na conta do FGTS.',
        'O FGTS rende 3% ao ano + taxes de distribuição de lucros.',
        'Na demissão sem justa causa, o trabalhador recebe multa de 40% sobre o saldo.'
      ]
    }
  },
  {
    slug: 'nota-para-passar',
    Componente: NotaParaPassar,
    meta: {
      slug: 'nota-para-passar',
      titulo: 'Nota para Passar',
      descricao: 'Calcule a nota que você precisa na prova final para passar na matéria.',
      seo: 'Calculadora de nota para passar: descubra a nota necessária na prova final para alcançar a média.',
      precisaTabelas: false,
      categoria: 'estudos',
      explicacao: [
        'A fórmula considera o peso de cada avaliação e a média final necessária.',
        'Se a nota calculada for maior que 10, infelizmente não é possível passar apenas com a prova final.',
        'Pense nisso como uma ferramenta de planejamento: quanto estudar para cada prova.'
      ]
    }
  },
  {
    slug: 'rendimento-investimentos',
    Componente: RendimentoInvestimentos,
    meta: {
      slug: 'rendimento-investimentos',
      titulo: 'Rendimento de Investimentos',
      descricao: 'Simule o rendimento de CDB, Tesouro Direto e outros investimentos.',
      seo: 'Calculadora de rendimento: simule CDB, poupança e Tesouro Direto com juros compostos e IR.',
      precisaTabelas: true,
      categoria: 'investimentos',
      explicacao: [
        'O rendimento é calculado com juros compostos: cada mês rende sobre o saldo acumulado.',
        'A alíquota de IR é regressiva: 22,5% (até 180 dias) a 15% (acima de 720 dias).',
        'A poupança rende Selic (se > 8,5%) ou 70% da Selic (se ≤ 8,5%).'
      ]
    }
  },
  {
    slug: 'rescisao-trabalhista',
    Componente: RescisaoTrabalhista,
    meta: {
      slug: 'rescisao-trabalhista',
      titulo: 'Rescisão Trabalhista',
      descricao: 'Calcule as verbas devidas numa demissão CLT.',
      seo: 'Calculadora de rescisão trabalhista: saldo de salário, aviso prévio, 13º, férias e multa do FGTS.',
      precisaTabelas: true,
      categoria: 'trabalho',
      explicacao: [
        'Na demissão sem justa causa, o empregado recebe: saldo de salário, aviso prévio, 13º proporcional, férias + 1/3 e multa de 40% do FGTS.',
        'Se o aviso for indenizado, o trabalhador recebe o valor sem trabalhar.',
        'Na justa causa, perde a multa do FGTS e o aviso prévio.'
      ]
    }
  },
  {
    slug: 'horas-extras',
    Componente: HorasExtras,
    meta: {
      slug: 'horas-extras',
      titulo: 'Horas Extras',
      descricao: 'Calcule o valor das horas extras com 50% e 100%.',
      seo: 'Calculadora de horas extras CLT: valor da hora extra 50% (dia útil) e 100% (feriado/domingo).',
      precisaTabelas: false,
      categoria: 'trabalho',
      explicacao: [
        'A CLT garante no mínimo 50% sobre a hora normal em dias úteis.',
        'Em feriados e domingos, o adicional é de 100%.',
        'A base de cálculo é 220 horas mensais (8h/dia × 22 dias úteis).'
      ]
    }
  },
  {
    slug: 'decimo-terceiro',
    Componente: DecimoTerceiro,
    meta: {
      slug: 'decimo-terceiro',
      titulo: '13º Salário',
      descricao: 'Calcule o 13º salário proporcional com descontos.',
      seo: 'Calculadora de 13º salário: valor bruto proporcional com descontos de INSS e IRRF.',
      precisaTabelas: true,
      categoria: 'trabalho',
      explicacao: [
        'O 13º é proporcional aos meses trabalhados no ano.',
        'Mês com menos de 15 dias não conta no cálculo.',
        'Sobre o valor bruto incidem INSS e IRRF.'
      ]
    }
  },
  {
    slug: 'ferias',
    Componente: Ferias,
    meta: {
      slug: 'ferias',
      titulo: 'Férias Proporcionais',
      descricao: 'Calcule suas férias proporcionais com 1/3 constitucional.',
      seo: 'Calculadora de férias proporcionais CLT: valor bruto, 1/3 constitucional e descontos de INSS e IRRF.',
      precisaTabelas: true,
      categoria: 'trabalho',
      explicacao: [
        'A Constituição garante férias com, no mínimo, 1/3 a mais.',
        'Proporcional: 1/14 avos por mês trabalhado, mínimo 14 dias no mês.',
        'Sobre o total (férias + 1/3), incidem INSS e IRRF.'
      ]
    }
  },
  {
    slug: 'aposentadoria',
    Componente: Aposentadoria,
    meta: {
      slug: 'aposentadoria',
      titulo: 'Aposentadoria',
      descricao: 'Projete quando você pode se aposentar com a reforma de 2019.',
      seo: 'Simulador de aposentadoria INSS: regras da reforma de 2019, idade mínima e tempo de contribuição.',
      precisaTabelas: true,
      categoria: 'previdencia',
      explicacao: [
        'A reforma estabeleceu idade mínima de 65 (homens) e 62 (mulheres).',
        'Regra por pontos: soma de idade + tempo ≥ 100 (homens) ou ≥ 90 (mulheres).',
        'O valor estimado é 85% da média salarial, limitado ao teto do INSS.'
      ]
    }
  },
  {
    slug: 'inflacao',
    Componente: Inflacao,
    meta: {
      slug: 'inflacao',
      titulo: 'IPCA / Inflação',
      descricao: 'Veja quanto seu dinheiro perde de poder de compra com a inflação.',
      seo: 'Calculadora de inflação IPCA: simule a perda de poder de compra ao longo dos anos.',
      precisaTabelas: false,
      categoria: 'investimentos',
      explicacao: [
        'O IPCA é o principal índice de inflação medido pelo IBGE.',
        'Se sua renda não acompanha o IPCA, você perde poder de compra.',
        '4,5% ao ano acumula quase 25% em 5 anos.'
      ]
    }
  },
  {
    slug: 'financiamento',
    Componente: Financiamento,
    meta: {
      slug: 'financiamento',
      titulo: 'Financiamento Imobiliário',
      descricao: 'Compare SAC e Tabela Price no financiamento da sua casa.',
      seo: 'Simulador de financiamento imobiliário: compare SAC e Tabela Price com juros e total pago.',
      precisaTabelas: false,
      categoria: 'investimentos',
      explicacao: [
        'SAC: amortização constante, parcelas decrescentes.',
        'Price: parcelas fixas, juros concentrados no início.',
        'Geralmente o SAC é mais vantajoso no total.'
      ]
    }
  },
  {
    slug: 'cartao-credito',
    Componente: CartaoCredito,
    meta: {
      slug: 'cartao-credito',
      titulo: 'Cartão de Crédito',
      descricao: 'Veja quanto você realmente paga ao parcelar uma compra.',
      seo: 'Calculadora de parcelamento no cartão de crédito: valor da parcela, total e juros.',
      precisaTabelas: false,
      categoria: 'investimentos',
      explicacao: [
        'O parcelamento usa a fórmula de juros compostos (mesma do financiamento).',
        'R$ 1.000 em 12x a 2,5% ao mês pode virar R$ 1.304.',
        'Compare com pagamento à vista (geralmente com desconto).'
      ]
    }
  },
  {
    slug: 'iof',
    Componente: Iof,
    meta: {
      slug: 'iof',
      titulo: 'IOF Internacional',
      descricao: 'Calcule o IOF em transações internacionais e empréstimos.',
      seo: 'Calculadora de IOF: alíquota e valor em créditos e câmbio internacional.',
      precisaTabelas: false,
      categoria: 'impostos',
      explicacao: [
        'IOF de crédito: 0,38% a.d. nos primeiros 30 dias, 0% depois.',
        'IOF de câmbio: 0,38% fixo.',
        'Quitar empréstimos antes de 30 dias pode ser mais caro.'
      ]
    }
  },
  {
    slug: 'poupanca',
    Componente: Poupanca,
    meta: {
      slug: 'poupanca',
      titulo: 'Poupança',
      descricao: 'Simule o rendimento da poupança com a taxa atual do Selic.',
      seo: 'Calculadora de poupança: simule o rendimento com a taxa atual do Selic e veja se compensa.',
      precisaTabelas: false,
      categoria: 'investimentos',
      aviso: 'A poupança rende pouco. Considere alternativas como CDB, Tesouro Direto ou LCI.',
      explicacao: [
        'A poupança rende 70% da Selic quando a Selic está ≤ 8,5% ao ano.',
        'Quando a Selic supera 8,5%, a poupança rende apenas 0,5% ao mês (6,17% a.a.).',
        'Compare com o CDI: geralmente o CDB paga mais que a poupança.'
      ]
    }
  },
  {
    slug: 'simulador-enem',
    Componente: SimuladorEnem,
    meta: {
      slug: 'simulador-enem',
      titulo: 'Simulador ENEM',
      descricao: 'Simule sua nota no ENEM e veja a chance de passar no curso desejado.',
      seo: 'Simulador ENEM: calcule sua nota e compare com notas de corte de universidades.',
      precisaTabelas: false,
      categoria: 'estudos',
      explicacao: [
        'A nota do ENEM é calculada pela média ponderada das cinco áreas.',
        'Esta simulação usa pesos padrão para fins educacionais.',
        'Para cálculos oficiais, consulte o edital do vestibular desejado.'
      ]
    }
  },
  {
    slug: 'bolsa-estudos',
    Componente: BolsaEstudos,
    meta: {
      slug: 'bolsa-estudos',
      titulo: 'Bolsa de Estudos',
      descricao: 'Calcule o valor da bolsa de estudos com base na sua renda familiar.',
      seo: 'Calculadora de bolsa de estudos: simule o valor com base na renda familiar.',
      precisaTabelas: false,
      categoria: 'estudos',
      explicacao: [
        'O valor da bolsa é calculado com base na renda familiar per capita.',
        'Esta é uma simulação educacional.',
        'Programas como ProUni e Sisu possuem critérios específicos.'
      ]
    }
  }
]
