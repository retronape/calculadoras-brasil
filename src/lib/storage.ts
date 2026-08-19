const PREFIXO = 'cb:'

export function salvar(chave: string, valor: unknown): boolean {
  try {
    window.localStorage.setItem(PREFIXO + chave, JSON.stringify(valor))
    return true
  } catch {
    return false
  }
}

export function ler<T>(chave: string): T | null {
  try {
    const r = window.localStorage.getItem(PREFIXO + chave)
    return r === null ? null : (JSON.parse(r) as T)
  } catch {
    return null
  }
}

export function remover(chave: string): void {
  try {
    window.localStorage.removeItem(PREFIXO + chave)
  } catch {}
}
