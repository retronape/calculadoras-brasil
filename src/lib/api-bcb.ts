/**
 * Camada de dados do Banco Central do Brasil (BCB).
 * Busca CDI, Selic e IPCA em tempo real via API pública.
 * Se falhar, retorna dados estáticos fallback.
 *
 * API docs: https://dadosabertos.bcb.gov.br/
 * Todas as rotas são GET e retornam JSON sem necessidade de autenticação.
 */

export interface ResultadoSerie {
  valor: number
  data: string // dd/mm/aaaa
  fonte: 'api' | 'fallback'
}

// Dados estáticos de fallback (atualize anualmente)
const FALLBACK = {
  cdi: 14.90,
  selic: 14.90,
  ipcaMensal: [0.52, 0.78, 0.56, 0.43, 0.34, 0.28, 0.39, 0.42, 0.44, 0.55, 0.30, 0.21],
  ipcaAnual: 5.01
}

const BASE = 'https://api.bcb.gov.br/dados/serie'

async function buscarSerie(codigo: number, ultimos = 1): Promise<{ valor: number; data: string }[]> {
  const url = `${BASE}/bcdata.sgs.${codigo}/dados/ultimos/${ultimos}?formato=json`
  const res = await fetch(url, {
    signal: AbortSignal.timeout(5000),
    headers: { 'Accept': 'application/json' }
  })
  if (!res.ok) throw new Error('BCB API ' + res.status)
  const dados = await res.json()
  return dados.map((d: any) => ({ valor: parseFloat(d.valor), data: d.data }))
}

/** CDI acumulado mensal (%) */
export async function buscarCdi(): Promise<ResultadoSerie> {
  try {
    const r = await buscarSerie(432, 1)
    const diaria = r[0].valor / 100
    const acumulada = Math.pow(1 + diaria, 22) - 1
    return { valor: acumulada * 100, data: r[0].data, fonte: 'api' }
  } catch {
    return { valor: FALLBACK.cdi, data: '15/08/2026 (fallback)', fonte: 'fallback' }
  }
}

/** Selic acumulada mensal (%) */
export async function buscarSelic(): Promise<ResultadoSerie> {
  try {
    const r = await buscarSerie(4189, 1)
    const diaria = r[0].valor / 100
    const acumulada = Math.pow(1 + diaria, 22) - 1
    return { valor: acumulada * 100, data: r[0].data, fonte: 'api' }
  } catch {
    return { valor: FALLBACK.selic, data: '15/08/2026 (fallback)', fonte: 'fallback' }
  }
}

/** IPCA dos últimos 12 meses (%) */
export async function buscarIpca(): Promise<ResultadoSerie> {
  try {
    const r = await buscarSerie(433, 12)
    const acumulado = r.reduce((acc, item) => acc * (1 + item.valor / 100), 1) - 1
    return { valor: acumulado * 100, data: r[r.length - 1].data, fonte: 'api' }
  } catch {
    return { valor: FALLBACK.ipcaAnual, data: '15/08/2026 (fallback)', fonte: 'fallback' }
  }
}

/** IPCA mensal (array dos últimos 12 meses) */
export async function buscarIpcaMensal(): Promise<ResultadoSerie[]> {
  try {
    const r = await buscarSerie(433, 12)
    return r.map(item => ({ valor: item.valor, data: item.data, fonte: 'api' as const }))
  } catch {
    return FALLBACK.ipcaMensal.map((v, i) => ({
      valor: v,
      data: String(12 - i).padStart(2, '0') + '/2026 (fallback)',
      fonte: 'fallback' as const
    }))
  }
}

/** PTAX — cotação de vendas do dólar (último dia útil) */
export async function buscarDolar(): Promise<ResultadoSerie> {
  try {
    const r = await buscarSerie(1, 1)
    return { valor: r[0].valor, data: r[0].data, fonte: 'api' }
  } catch {
    return { valor: 5.50, data: '15/08/2026 (fallback)', fonte: 'fallback' }
  }
}

/** PTAX — cotação de vendas do euro (último dia útil) */
export async function buscarEuro(): Promise<ResultadoSerie> {
  try {
    const r = await buscarSerie(21619, 1)
    return { valor: r[0].valor, data: r[0].data, fonte: 'api' }
  } catch {
    return { valor: 6.00, data: '15/08/2026 (fallback)', fonte: 'fallback' }
  }
}

export interface DadosTempoReal {
  cdi: ResultadoSerie
  selic: ResultadoSerie
  ipca: ResultadoSerie
  dolar: ResultadoSerie
  euro: ResultadoSerie
  todosAoVivo: boolean
}

/** Busca todos os dados de uma vez */
export async function buscarTudo(): Promise<DadosTempoReal> {
  const [cdi, selic, ipca, dolar, euro] = await Promise.all([
    buscarCdi(), buscarSelic(), buscarIpca(), buscarDolar(), buscarEuro()
  ])
  return {
    cdi, selic, ipca, dolar, euro,
    todosAoVivo: [cdi, selic, ipca, dolar, euro].every(d => d.fonte === 'api')
  }
}
