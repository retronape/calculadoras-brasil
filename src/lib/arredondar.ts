export function arredondar(valor: number, casas = 2): number {
  const fator = Math.pow(10, casas)
  return Math.round((valor + Number.EPSILON) * fator) / fator
}
