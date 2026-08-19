/**
 * Gerenciador de dados em tempo real.
 *
 * Decide se busca dados ao vivo ou usa cache/fallback:
 * 1. Modo leve: SEMPRE fallback (zero chamadas de rede)
 * 2. Modo padrão: cache de 1h no localStorage, senão busca
 * 3. Modo rico/máximo: cache de 15min, busca ao vivo
 *
 * Os dados ficam em cache no localStorage e são atualizados
 * em background sem bloquear a UI.
 */

import { ler, salvar } from './storage.ts'
import { buscarTudo, type DadosTempoReal } from './api-bcb.ts'

const CHAVE_CACHE = 'dados-tempo-real'
const CHAVE_TIMESTAMP = 'dados-tr-timestamp'

/** TTL em milissegundos por modo */
const TTL_MS: Record<string, number> = {
  leve: Infinity,       // nunca busca
  padrao: 60 * 60 * 1000,   // 1 hora
  rico: 15 * 60 * 1000,     // 15 minutos
  maximo: 15 * 1000          // 15 segundos
}

/** Busca dados, respeitando o modo e o cache */
export async function obterDadosTempoReal(): Promise<DadosTempoReal | null> {
  const modo = document.documentElement.getAttribute('data-modo') || 'rico'

  // Modo leve: nunca busca dados externos
  if (modo === 'leve') return null

  const ttl = TTL_MS[modo] ?? 15 * 60 * 1000
  const timestamp = parseInt(ler<string>(CHAVE_TIMESTAMP) || '0', 10)
  const agora = Date.now()

  // Verifica se o cache ainda é válido
  if (agora - timestamp < ttl) {
    const cache = ler<DadosTempoReal>(CHAVE_CACHE)
    if (cache) return cache
  }

  // Busca novos dados
  try {
    const dados = await buscarTudo()
    salvar(CHAVE_CACHE, dados)
    salvar(CHAVE_TIMESTAMP, String(agora))
    return dados
  } catch {
    // Em caso de erro, retorna cache antigo se existir
    return ler<DadosTempoReal>(CHAVE_CACHE) || null
  }
}

/**
 * Busca dados em background sem bloquear.
 * Resolve com os dados cacheados primeiro, depois atualiza.
 */
export async function obterDadosComBackground(): Promise<DadosTempoReal | null> {
  const modo = document.documentElement.getAttribute('data-modo') || 'rico'
  if (modo === 'leve') return null

  const cache = ler<DadosTempoReal>(CHAVE_CACHE)
  // Retorna cache imediatamente se válido
  if (cache) {
    const timestamp = parseInt(ler<string>(CHAVE_TIMESTAMP) || '0', 10)
    const ttl = TTL_MS[modo] ?? 15 * 60 * 1000
    if (Date.now() - timestamp < ttl) return cache
  }

  // Atualiza em background
  obterDadosTempoReal().catch(() => {})
  return cache
}

/** Busca forçada (ignora cache) */
export async function forcarAtualizacao(): Promise<DadosTempoReal | null> {
  try {
    const dados = await buscarTudo()
    salvar(CHAVE_CACHE, dados)
    salvar(CHAVE_TIMESTAMP, String(Date.now()))
    return dados
  } catch {
    return null
  }
}
