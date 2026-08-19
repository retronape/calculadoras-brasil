/**
 * Cálculos de investimentos e inflação.
 */
import { arredondar } from './arredondar.ts'
import type { Tabelas2026 } from './tabelas.ts'

export interface Taxas { cdiDiaria: number; selicDiaria: number; data: string; aproximado: boolean }

export function selicAnual(diaria: number): number { return Math.pow(1 + diaria, 252) - 1 }
export function taxaMensalEquivalente(diaria: number): number { return Math.pow(1 + diaria, 30) - 1 }
export function cdbMensal(cdiMensal: number, percentualCdi: number): number { return cdiMensal * (percentualCdi / 100) }

export function poupancaMensal(selicAnualTaxa: number, t: Tabelas2026): number {
  return selicAnualTaxa * 100 > t.poupanca.selicLimite ? t.poupanca.taxaQuandoAcima / 100 : (selicAnualTaxa * (t.poupanca.percentualQuandoAbaixo / 100)) / 12
}

export interface ProdutoSimulado { taxaMensal: number; bruto: number; totalAportado: number; juros: number; ir: number; liquido: number }

export function simular(p: { inicial: number; aporteMensal: number; meses: number; taxaMensal: number; aliquotaIr: number }): ProdutoSimulado {
  let saldo = Math.max(p.inicial, 0), totalAportado = saldo, juros = 0
  for (let m = 0; m < p.meses; m++) { const j = saldo * p.taxaMensal; saldo += j; juros += j; saldo += Math.max(p.aporteMensal, 0); totalAportado += Math.max(p.aporteMensal, 0) }
  const ir = Math.max(juros * (p.aliquotaIr / 100), 0)
  return { taxaMensal: arredondar(p.taxaMensal * 100, 4), bruto: arredondar(saldo), totalAportado: arredondar(totalAportado), juros: arredondar(juros), ir: arredondar(ir), liquido: arredondar(saldo - ir) }
}

export function aliquotaIrRendaFixa(dias: number, t: Tabelas2026): number {
  const faixas = t.rendaFixa.ir
  let aliquota = faixas[faixas.length - 1].aliquota
  for (const f of faixas) { if (f.ate === null || dias <= f.ate) { aliquota = f.aliquota; break } }
  return aliquota
}

export interface ResultadoInflacao { valorFuturo: number; perdaPoderCompra: number; perdaPercentual: number }

export function simularInflacao(p: { valorAtual: number; taxaIpca: number; meses: number }): ResultadoInflacao {
  const anos = p.meses / 12, fator = Math.pow(1 + p.taxaIpca, anos)
  return { valorFuturo: arredondar(p.valorAtual * fator), perdaPoderCompra: arredondar(p.valorAtual - p.valorAtual / fator), perdaPercentual: arredondar((1 - 1 / fator) * 100) }
}

export interface ResultadoFinanciamento { sistema: 'price' | 'sac'; parcelaInicial: number; parcelaFinal: number; totalPago: number; totalJuros: number; valorFinanciado: number }

export function simularFinanciamento(p: { valorImovel: number; entrada: number; taxaJurosAnual: number; prazoMeses: number; sistema: 'price' | 'sac' }): ResultadoFinanciamento {
  const valorFinanciado = Math.max(0, p.valorImovel - p.entrada)
  const taxaMensal = p.taxaJurosAnual / 100 / 12
  if (taxaMensal <= 0 || p.prazoMeses <= 0 || valorFinanciado <= 0) return { sistema: p.sistema, parcelaInicial: 0, parcelaFinal: 0, totalPago: 0, totalJuros: 0, valorFinanciado }
  const prestacoes: number[] = []
  if (p.sistema === 'price') {
    const f = Math.pow(1 + taxaMensal, p.prazoMeses)
    const pf = valorFinanciado * (taxaMensal * f) / (f - 1)
    for (let m = 0; m < p.prazoMeses; m++) prestacoes.push(arredondar(pf))
  } else {
    const amort = valorFinanciado / p.prazoMeses
    let saldoDevedor = valorFinanciado
    for (let m = 0; m < p.prazoMeses; m++) { prestacoes.push(arredondar(amort + saldoDevedor * taxaMensal)); saldoDevedor -= amort }
  }
  const totalPago = prestacoes.reduce((s, v) => s + v, 0)
  return { sistema: p.sistema, parcelaInicial: prestacoes[0] ?? 0, parcelaFinal: prestacoes[prestacoes.length - 1] ?? 0, totalPago, totalJuros: arredondar(totalPago - valorFinanciado), valorFinanciado }
}

export interface ResultadoCartao { parcelaValor: number; totalPago: number; totalJuros: number; jurosPercentual: number }

export function simularCartao(p: { valor: number; parcelas: number; taxaJurosMensal: number }): ResultadoCartao {
  const taxa = p.taxaJurosMensal / 100
  if (taxa <= 0 || p.parcelas <= 0 || p.valor <= 0) { const pf = p.valor / p.parcelas; return { parcelaValor: arredondar(pf), totalPago: arredondar(p.valor), totalJuros: 0, jurosPercentual: 0 } }
  const f = Math.pow(1 + taxa, p.parcelas)
  const pf = p.valor * (taxa * f) / (f - 1), tp = pf * p.parcelas
  return { parcelaValor: arredondar(pf), totalPago: arredondar(tp), totalJuros: arredondar(tp - p.valor), jurosPercentual: arredondar((tp / p.valor - 1) * 100) }
}
