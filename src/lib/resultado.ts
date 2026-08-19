import { moeda } from './format.ts'

/** Mostra o HTML do resultado no elemento #resultado e rola até ele. */
export function mostrarResultado(html: string): void {
  const secao = document.getElementById('resultado')
  if (!secao) return
  const conteudo = secao.querySelector('.resultado-conteudo')
  if (!conteudo) return
  conteudo.innerHTML = html
  secao.hidden = false
  secao.scrollIntoView({ block: 'nearest' })
}

/** Mostra erro de validação no lugar do resultado. */
export function mostrarErro(msg: string): void {
  mostrarResultado('<p class="resultado-erro" role="alert">' + msg + '</p>')
}

/** Uma linha de resultado: rótulo + valor. Classe opcional 'total' ou 'destaque'. */
export function linha(rotulo: string, valor: string, classe = ''): string {
  return '<div class="resultado-linha' + (classe ? ' ' + classe : '') + '"><span>' + rotulo + '</span><strong>' + valor + '</strong></div>'
}

/** Junta linhas num bloco visual. Suporte: grupo(linhas[]) ou grupo(titulo, linhas[]). */
export function grupo(arg1: string | string[], arg2?: string[]): string {
  const linhas = Array.isArray(arg1) ? arg1 : arg2 || []
  const titulo = typeof arg1 === 'string' ? arg1 : ''
  const tituloHtml = titulo ? '<div class="resultado-grupo-titulo">' + titulo + '</div>' : ''
  return '<div class="resultado-grupo">' + tituloHtml + linhas.join('') + '</div>'
}

/** Badge indicando se os dados são ao vivo ou estáticos. */
export function badgeTempoReal(fonte: 'api' | 'fallback' | 'cache' | 'none'): string {
  const map: Record<string, { texto: string; classe: string }> = {
    api: { texto: '🟢 Ao vivo (BCB)', classe: 'badge-vivo' },
    fallback: { texto: '🟠 Estimado (fallback)', classe: 'badge-estatico' },
    cache: { texto: '🟡 Cache local', classe: 'badge-cache' },
    none: { texto: '⚪ Modo leve (offline)', classe: 'badge-offline' }
  }
  const b = map[fonte] || map.none
  return '<span class="badge-tempo-real ' + b.classe + '">' + b.texto + '</span>'
}

/** Lê valor de input do formulário. */
export function campoValor(form: HTMLFormElement, nome: string): string {
  const el = form.elements.namedItem(nome)
  if (el instanceof HTMLInputElement) return el.value
  if (el instanceof HTMLSelectElement) return el.value
  return ''
}

/** true se checkbox marcado. */
export function campoMarcado(form: HTMLFormElement, nome: string): boolean {
  const el = form.elements.namedItem(nome)
  return el instanceof HTMLInputElement ? el.checked : false
}