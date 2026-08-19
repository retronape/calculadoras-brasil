export function moeda(v: number): string {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function numero(v: number, c = 2): string {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c })
}

export function percentual(v: number, c = 2): string {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c }) + ' %'
}

export function parseNumero(s: string): number {
  return parseFloat(String(s).replace(/\./g, '').replace(',', '.').replace(/[^\d.\-]/g, '')) || 0
}
