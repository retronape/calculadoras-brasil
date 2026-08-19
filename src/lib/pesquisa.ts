export interface ItemPesquisa {
  titulo: string
  descricao: string
  slug: string
  categoria: string
  palavrasChave: string[]
}

export const itensPesquisa: ItemPesquisa[] = [
  // ── Calculadoras ────────────────────────────────────────
  {
    titulo: 'Salário Líquido CLT',
    descricao: 'Calcule seu salário líquido real com descontos de INSS e IRPF.',
    slug: '/calculadora/salario-liquido-clt/',
    categoria: 'calculadora',
    palavrasChave: ['salario', 'liquido', 'clt', 'desconto', 'inss', 'irpf', 'folha', 'pagamento', 'bruto', 'net']
  },
  {
    titulo: 'INSS',
    descricao: 'Cálculo de contribuição ao INSS para empregados e autônomos.',
    slug: '/calculadora/inss/',
    categoria: 'calculadora',
    palavrasChave: ['inss', 'contribuicao', 'previdencia', 'autonomo', 'individual', 'simplificado', 'baixa renda', 'teto']
  },
  {
    titulo: 'IRPF Anual',
    descricao: 'Simulação de Imposto de Renda Pessoa Física anual.',
    slug: '/calculadora/irpf-anual/',
    categoria: 'calculadora',
    palavrasChave: ['irpf', 'imposto de renda', 'declaracao', 'anual', 'deducao', 'simplificado', 'completo', 'renda']
  },
  {
    titulo: 'FGTS',
    descricao: 'Cálculo de saldo FGTS e projeção de rendimentos.',
    slug: '/calculadora/fgts/',
    categoria: 'calculadora',
    palavrasChave: ['fgts', 'fundo', 'garantia', 'trabalho', 'deposito', 'saldo', 'rendimento', 'multa', '40']
  },
  {
    titulo: 'Nota para Passar',
    descricao: 'Calcule a nota necessária para atingir a média desejada.',
    slug: '/calculadora/nota-para-passar/',
    categoria: 'calculadora',
    palavrasChave: ['nota', 'passar', 'media', 'prova', 'escola', 'universidade', 'nota final', 'estudar']
  },
  {
    titulo: 'Rendimento de Investimentos',
    descricao: 'Simule rendimentos de CDB, LCI, LCA, Tesouro Direto e poupança.',
    slug: '/calculadora/rendimento-investimentos/',
    categoria: 'calculadora',
    palavrasChave: ['investimento', 'rendimento', 'cdb', 'lci', 'lca', 'tesouro direto', 'poupanca', 'juros', 'rentabilidade']
  },
  {
    titulo: 'Rescisão Trabalhista',
    descricao: 'Calcule os valores devidos na demissão: aviso prévio, férias, 13º, multa FGTS.',
    slug: '/calculadora/rescisao-trabalhista/',
    categoria: 'calculadora',
    palavrasChave: ['rescisao', 'demissao', 'aviso previo', 'ferias', 'decimo terceiro', 'multa', 'fgts', 'trabalhista']
  },
  {
    titulo: 'Horas Extras',
    descricao: 'Calcule o valor das horas extras comuns e em domingos/feriados.',
    slug: '/calculadora/horas-extras/',
    categoria: 'calculadora',
    palavrasChave: ['horas extras', '50 por cento', '100 por cento', 'domingo', 'feriado', 'trabalho', 'extra']
  },
  {
    titulo: 'Décimo Terceiro',
    descricao: 'Cálculo do 13º salário líquido com descontos de INSS e IRPF.',
    slug: '/calculadora/decimo-terceiro/',
    categoria: 'calculadora',
    palavrasChave: ['decimo terceiro', '13', '13 salario', 'terceiro', 'bonus', 'natal', 'parcela']
  },
  {
    titulo: 'Férias',
    descricao: 'Cálculo de férias proporcionais com 1/3 constitucional.',
    slug: '/calculadora/ferias/',
    categoria: 'calculadora',
    palavrasChave: ['ferias', 'terco', 'constitucional', 'recesso', 'descanso', 'periodo aquisitivo', 'abono']
  },
  {
    titulo: 'Aposentadoria',
    descricao: 'Simulação de aposentadoria por idade e tempo de contribuição.',
    slug: '/calculadora/aposentadoria/',
    categoria: 'calculadora',
    palavrasChave: ['aposentadoria', 'inss', 'previdencia', 'idade', 'tempo contribuicao', 'beneficio', 'aposentar']
  },
  {
    titulo: 'Inflação',
    descricao: 'Calcule o efeito da inflação no poder de compra do dinheiro.',
    slug: '/calculadora/inflacao/',
    categoria: 'calculadora',
    palavrasChave: ['inflacao', 'ipc', 'poder de compra', 'correcao', 'preco', 'economia', 'perda']
  },
  {
    titulo: 'Financiamento',
    descricao: 'Simulação de financiamento com Tabela SAC e Price.',
    slug: '/calculadora/financiamento/',
    categoria: 'calculadora',
    palavrasChave: ['financiamento', 'sac', 'price', 'parcela', 'imovel', 'casa', 'veiculo', 'emprestimo', 'juros']
  },
  {
    titulo: 'Cartão de Crédito',
    descricao: 'Calcule juros e parcelas de compras no cartão de crédito.',
    slug: '/calculadora/cartao-credito/',
    categoria: 'calculadora',
    palavrasChave: ['cartao de credito', 'juros', 'parcela', 'compra', 'bandeira', 'rotativo', 'fatura']
  },
  {
    titulo: 'IOF',
    descricao: 'Cálculo do Imposto sobre Operações Financeiras.',
    slug: '/calculadora/iof/',
    categoria: 'calculadora',
    palavrasChave: ['iof', 'imposto', 'operacao', 'financeira', 'credito', 'cambio', 'emprestimo']
  },

  // ── Utilidades ──────────────────────────────────────────
  {
    titulo: 'Calendário CLT',
    descricao: 'Veja seus próximos direitos: 13º, férias, feriados.',
    slug: '/utilidades/calendario-clt/',
    categoria: 'utilidade',
    palavrasChave: ['calendario', 'clt', 'feriado', 'ferias', 'decimo', 'datas', 'cronograma', 'direitos']
  },
  {
    titulo: 'Conversor de Salário',
    descricao: 'Converta salário mensal para valor por hora, dia, semana e ano.',
    slug: '/utilidades/conversor-salario/',
    categoria: 'utilidade',
    palavrasChave: ['conversor', 'salario', 'hora', 'dia', 'semana', 'ano', 'mensal', 'converter']
  },
  {
    titulo: 'CLT vs PJ',
    descricao: 'Compare lado a lado os dois regimes de trabalho.',
    slug: '/utilidades/clt-vs-pj/',
    categoria: 'utilidade',
    palavrasChave: ['clt', 'pj', 'comparar', 'regime', 'mei', 'freelancer', 'empregado', 'autonomo', 'trabalho']
  },
  {
    titulo: 'Conversor de Moedas',
    descricao: 'Converta BRL para USD e EUR com taxas aproximadas.',
    slug: '/utilidades/conversor-moedas/',
    categoria: 'utilidade',
    palavrasChave: ['moeda', 'conversor', 'dolar', 'euro', 'cambio', 'usd', 'eur', 'brl', 'taxa']
  },
  {
    titulo: 'Linha do Tempo Financeira',
    descricao: 'Projeção de quanto teria guardando X por mês.',
    slug: '/utilidades/linha-do-tempo/',
    categoria: 'utilidade',
    palavrasChave: ['linha do tempo', 'projecao', 'poupanca', 'guardar', 'mes', 'futuro', 'acumular']
  },
  {
    titulo: 'Tempo de Trabalho',
    descricao: 'Quanto tempo de trabalho para comprar um celular, carro ou casa?',
    slug: '/utilidades/tempo-de-trabalho/',
    categoria: 'utilidade',
    palavrasChave: ['tempo', 'trabalho', 'comprar', 'celular', 'carro', 'casa', 'quanto tempo', 'objetivo']
  },
  {
    titulo: 'Perfil Financeiro',
    descricao: 'Quiz: qual é o seu estilo financeiro?',
    slug: '/utilidades/perfil-financeiro/',
    categoria: 'utilidade',
    palavrasChave: ['perfil', 'financeiro', 'quiz', 'estilo', 'personalidade', 'dinheiro', 'hábito']
  },
  {
    titulo: 'Rastreador de Inflação',
    descricao: 'Quanto valia R$100 em 2010 vs hoje?',
    slug: '/utilidades/rastreador-inflacao/',
    categoria: 'utilidade',
    palavrasChave: ['rastreador', 'inflacao', 'ipc', 'historico', 'poder de compra', 'valor', 'correcao']
  },

  // ── Curiosidades ────────────────────────────────────────
  {
    titulo: 'Fatos Financeiros',
    descricao: 'Curiosidades que você não sabia sobre dinheiro.',
    slug: '/curiosidade/fatos/',
    categoria: 'curiosidade',
    palavrasChave: ['fatos', 'curiosidades', 'dinheiro', 'sabia', 'interessante', 'historia']
  },
  {
    titulo: 'Mapa Salarial',
    descricao: 'Quanto ganha cada profissão no Brasil?',
    slug: '/curiosidade/mapa-salarial/',
    categoria: 'curiosidade',
    palavrasChave: ['mapa', 'salarial', 'profissao', 'quanto ganha', 'remuneracao', 'carreira']
  },
  {
    titulo: 'Simulador de Mesada',
    descricao: 'Quanto guardar por mês para uma criança?',
    slug: '/curiosidade/mesada/',
    categoria: 'curiosidade',
    palavrasChave: ['mesada', 'crianca', 'filho', 'educacao', 'guardar', 'mes', 'dinheiro']
  },
  {
    titulo: 'Quanto Vale Sua Vida?',
    descricao: 'Calcule o valor total da sua vida financeira.',
    slug: '/curiosidade/quanto-vale-sua-vida/',
    categoria: 'curiosidade',
    palavrasChave: ['quanto vale', 'vida', 'valor total', 'renda', 'tempo', 'existencia']
  },
  {
    titulo: 'Quiz de Dinheiro',
    descricao: 'Teste seus conhecimentos sobre finanças.',
    slug: '/curiosidade/quiz-dinheiro/',
    categoria: 'curiosidade',
    palavrasChave: ['quiz', 'dinheiro', 'conhecimento', 'teste', 'perguntas', 'respostas', 'financas']
  }
]

/**
 * Remove acentos e normaliza para busca.
 */
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Filtra itens de pesquisa com base em uma query do usuário.
 * Busca no título, descrição e palavras-chave.
 */
export function filtrarItens(query: string): ItemPesquisa[] {
  if (!query || query.trim().length < 2) return []

  const termos = normalizar(query).split(' ').filter(Boolean)

  const itensComScore = itensPesquisa.map((item) => {
    const tituloNorm = normalizar(item.titulo)
    const descNorm = normalizar(item.descricao)
    const chavesNorm = item.palavrasChave.map(normalizar).join(' ')
    const todoTexto = `${tituloNorm} ${descNorm} ${chavesNorm}`

    let score = 0
    for (const termo of termos) {
      if (tituloNorm.includes(termo)) score += 3
      if (chavesNorm.includes(termo)) score += 2
      if (descNorm.includes(termo)) score += 1
    }

    return { item, score }
  })

  return itensComScore
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item)
}
