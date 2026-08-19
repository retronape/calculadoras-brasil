/**
 * Cálculos tributários e trabalhistas do Brasil.
 * Cada função é pura, documentada e testável isoladamente.
 */
import type { Faixa, Reducao, Tabelas2026 } from './tabelas.ts'
import { arredondar } from './arredondar.ts'

// ── INSS ─────────────────────────────────────────────────────

export interface ResultadoInss {
  contribuicao: number
  aliquotaEfetiva: number
  base: number
}

/** INSS do empregado CLT: alíquotas progressivas de 7,5% a 14%. */
export function inssClt(salario: number, t: Tabelas2026): ResultadoInss {
  const base = Math.min(Math.max(salario, 0), t.inss.teto)
  let contribuicao = 0
  let anterior = 0
  for (const faixa of t.inss.faixas) {
    const lim = Math.min(faixa.ate, base)
    if (lim > anterior) contribuicao += (lim - anterior) * (faixa.aliquota / 100)
    if (base <= faixa.ate) break
    anterior = faixa.ate
  }
  return { contribuicao: arredondar(contribuicao), aliquotaEfetiva: base > 0 ? (contribuicao / base) * 100 : 0, base }
}

/** INSS do contribuinte individual/facultativo. */
export function inssAutonomo(baseInformada: number, tipo: 'integral' | 'simplificado' | 'baixaRenda', t: Tabelas2026): ResultadoInss {
  const a = t.inss.autonomo
  const base = tipo === 'simplificado' || tipo === 'baixaRenda' ? t.salarioMinimo : Math.min(Math.max(baseInformada, t.salarioMinimo), t.inss.teto)
  const aliquota = a.aliquotas[tipo]
  const contribuicao = arredondar(base * (aliquota / 100))
  return { contribuicao, aliquotaEfetiva: base > 0 ? contribuicao / base : 0, base: arredondar(base) }
}

// ── IRRF ─────────────────────────────────────────────────────

export function impostoNaFaixa(base: number, faixas: Faixa[]): number {
  for (const f of faixas) {
    if (f.ate === null || base <= f.ate) {
      return Math.max(arredondar(base * (f.aliquota / 100) - f.deducao), 0)
    }
  }
  return 0
}

export function reducaoMensal(rendimentos: number, r: Reducao): number {
  if (rendimentos <= r.zeroAte) return r.maxReducao
  if (rendimentos <= r.zeraEm) return Math.max(r.base - r.coef * rendimentos, 0)
  return 0
}

export function reducaoAnual(rendimentos: number, r: Reducao): number {
  if (rendimentos <= r.zeroAte) return r.maxReducao
  if (rendimentos <= r.zeraEm) return Math.max(r.base - r.coef * rendimentos, 0)
  return 0
}

export interface ResultadoIrrf { deducao: number; base: number; impostoBruto: number; reducao: number; irrf: number }

export function irrfMensal(p: { bruto: number; inss: number; dependentes: number; usarSimplificado: boolean; t: Tabelas2026 }): ResultadoIrrf {
  const m = p.t.irrf.mensal
  const deducoesItemizadas = p.inss + p.dependentes * m.dependente
  const deducao = p.usarSimplificado ? Math.max(deducoesItemizadas, m.descontoSimplificado) : deducoesItemizadas
  const base = Math.max(p.bruto - deducao, 0)
  const impostoBruto = impostoNaFaixa(base, m.faixas)
  const reducao = Math.min(reducaoMensal(base, m.reducao), impostoBruto)
  return { deducao: arredondar(deducao), base: arredondar(base), impostoBruto: arredondar(impostoBruto), reducao: arredondar(reducao), irrf: arredondar(Math.max(impostoBruto - reducao, 0)) }
}

// ── IRPF ─────────────────────────────────────────────────────

export interface ResultadoIrpf { modelo: string; deducao: number; base: number; imposto: number; reducao: number; devido: number }

function irpfBase(rendimentos: number, deducao: number, modelo: string, t: Tabelas2026): ResultadoIrpf {
  const a = t.irpf.anual
  const base = Math.max(rendimentos - deducao, 0)
  const imposto = impostoNaFaixa(base, a.faixas)
  const reducao = Math.min(reducaoAnual(rendimentos, a.reducao), imposto)
  return { modelo, deducao: arredondar(deducao), base: arredondar(base), imposto: arredondar(imposto), reducao: arredondar(reducao), devido: arredondar(Math.max(imposto - reducao, 0)) }
}

export function irpfCompleta(rendimentos: number, d: { dependentes: number; educacao: number; saude: number; previdencia: number }, t: Tabelas2026): ResultadoIrpf {
  const a = t.irpf.anual
  return irpfBase(rendimentos, d.dependentes * a.dependente + d.educacao + d.saude + d.previdencia, 'Completa', t)
}

export function irpfSimplificada(rendimentos: number, t: Tabelas2026): ResultadoIrpf {
  const a = t.irpf.anual
  return irpfBase(rendimentos, Math.min(rendimentos * (a.descontoSimplificadoPercentual / 100), a.descontoSimplificado), 'Simplificada', t)
}

// ── FGTS ─────────────────────────────────────────────────────

export interface ResultadoFgts { saldo: number; totalDepositado: number; juros: number; depositoMensal: number }

export function fgtsSaldo(p: { salario: number; depositoMensal?: number; meses: number; saldoInicial?: number; t: Tabelas2026 }): ResultadoFgts {
  const f = p.t.fgts
  const dep = p.depositoMensal ?? p.salario * (f.depositoMensal / 100)
  const taxaMensal = Math.pow(1 + (f.jurosAnuais + f.distribuicaoAnual) / 100, 1 / 12) - 1
  let saldo = Math.max(p.saldoInicial ?? 0, 0)
  for (let i = 0; i < p.meses; i++) saldo = saldo * (1 + taxaMensal) + dep
  const totalDepositado = Math.max(p.saldoInicial ?? 0, 0) + dep * p.meses
  return { saldo: arredondar(saldo), totalDepositado: arredondar(totalDepositado), juros: arredondar(saldo - totalDepositado), depositoMensal: arredondar(dep) }
}

export function multaFgts(saldo: number, t: Tabelas2026): number {
  return arredondar(saldo * (t.fgts.multaSemJustaCausa / 100))
}

// ── RESCISÃO ─────────────────────────────────────────────────

export interface ResultadoRescisao {
  saldoSalario: number; avisoPrevio: number; trezeProporcional: number;
  feriasProporcionais: number; fgtsPeriodo: number; multaFgts: number; total: number
}

export function calcularRescisao(d: { salario: number; diasTrabalhados: number; mesesTrabalhados: number; avisoIndenizado: boolean; semJustaCausa: boolean; saldoFgts?: number }, t: Tabelas2026): ResultadoRescisao {
  const f = t.fgts
  const saldoSalario = d.salario / 30 * Math.max(d.diasTrabalhados, 0)
  const avisoPrevio = d.avisoIndenizado ? d.salario : 0
  const meses = d.mesesTrabalhados + (d.avisoIndenizado ? 1 : 0)
  const trezeProporcional = d.salario * (meses / 12)
  const feriasProporcionais = d.salario * (meses / 12) * (4 / 3)
  const fgtsPeriodo = (d.salario * meses) * (f.depositoMensal / 100)
  const baseMulta = fgtsPeriodo + (d.saldoFgts ?? 0)
  const multaFgts = d.semJustaCausa ? baseMulta * (f.multaSemJustaCausa / 100) : 0
  const total = saldoSalario + avisoPrevio + trezeProporcional + feriasProporcionais + fgtsPeriodo + multaFgts
  return { saldoSalario: arredondar(saldoSalario), avisoPrevio: arredondar(avisoPrevio), trezeProporcional: arredondar(trezeProporcional), feriasProporcionais: arredondar(feriasProporcionais), fgtsPeriodo: arredondar(fgtsPeriodo), multaFgts: arredondar(multaFgts), total: arredondar(total) }
}

// ── HORAS EXTRAS ─────────────────────────────────────────────

export interface ResultadoHorasExtras { valorHoraNormal: number; valorHora50: number; valorHora100: number; total50: number; total100: number; totalGeral: number }

export function horasExtras(p: { salario: number; horas50: number; horas100: number }): ResultadoHorasExtras {
  const normal = p.salario / 220
  const v50 = normal * 1.5, v100 = normal * 2
  const t50 = v50 * p.horas50, t100 = v100 * p.horas100
  return { valorHoraNormal: arredondar(normal), valorHora50: arredondar(v50), valorHora100: arredondar(v100), total50: arredondar(t50), total100: arredondar(t100), totalGeral: arredondar(t50 + t100) }
}

// ── 13º SALÁRIO ──────────────────────────────────────────────

export interface ResultadoDecimoTerceiro { bruto: number; inss: number; irrf: number; liquido: number }

export function decimoTerceiro(p: { salario: number; mesesTrabalhados: number; diasNoUltimoMes?: number; usarSimplificado?: boolean; dependentes?: number }, t: Tabelas2026): ResultadoDecimoTerceiro {
  let meses = Math.max(0, Math.min(12, p.mesesTrabalhados))
  if ((p.diasNoUltimoMes ?? 30) < 15) meses = Math.max(0, meses - 1)
  const bruto = (p.salario / 12) * meses
  const inssR = inssClt(bruto, t)
  const irrfR = irrfMensal({ bruto, inss: inssR.contribuicao, dependentes: p.dependentes ?? 0, usarSimplificado: p.usarSimplificado ?? true, t })
  return { bruto: arredondar(bruto), inss: arredondar(inssR.contribuicao), irrf: arredondar(irrfR.irrf), liquido: arredondar(bruto - inssR.contribuicao - irrfR.irrf) }
}

// ── FÉRIAS ───────────────────────────────────────────────────

export interface ResultadoFerias { bruto: number; terco: number; totalBruto: number; inss: number; irrf: number; liquido: number }

export function feriasProporcionais(p: { salario: number; mesesTrabalhados: number; diasNoUltimoMes?: number; usarSimplificado?: boolean; dependentes?: number }, t: Tabelas2026): ResultadoFerias {
  let meses = Math.max(0, Math.min(12, p.mesesTrabalhados))
  if ((p.diasNoUltimoMes ?? 30) < 14) meses = Math.max(0, meses - 1)
  const bruto = (p.salario / 12) * meses
  const terco = bruto / 3
  const totalBruto = bruto + terco
  const inssR = inssClt(totalBruto, t)
  const irrfR = irrfMensal({ bruto: totalBruto, inss: inssR.contribuicao, dependentes: p.dependentes ?? 0, usarSimplificado: p.usarSimplificado ?? true, t })
  return { bruto: arredondar(bruto), terco: arredondar(terco), totalBruto: arredondar(totalBruto), inss: arredondar(inssR.contribuicao), irrf: arredondar(irrfR.irrf), liquido: arredondar(totalBruto - inssR.contribuicao - irrfR.irrf) }
}

// ── APOSENTADORIA ────────────────────────────────────────────

export interface ResultadoAposentadoria { idadeMinima: number; tempoMinimoContribuicao: number; tempoRestante: number; idadeAposentadoria: number; valorEstimado: number }

export function simularAposentadoria(p: { salarioAtual: number; tempoContribuicao: number; idadeAtual: number; sexo?: 'M' | 'F' }, t: Tabelas2026): ResultadoAposentadoria {
  const isF = p.sexo === 'F'
  const idadeMinima = isF ? 62 : 65
  const tempoMinimo = isF ? 15 : 20
  const tempoRestante = Math.max(Math.max(0, idadeMinima - p.idadeAtual), Math.max(0, tempoMinimo - p.tempoContribuicao))
  return { idadeMinima, tempoMinimoContribuicao: tempoMinimo, tempoRestante, idadeAposentadoria: p.idadeAtual + tempoRestante, valorEstimado: arredondar(Math.min(p.salarioAtual, t.inss.teto) * 0.85) }
}

// ── IOF ──────────────────────────────────────────────────────

export interface ResultadoIof { aliquota: number; valor: number; total: number }

export function calcularIof(p: { valor: number; dias: number; tipo?: 'credito' | 'cambio' }): ResultadoIof {
  const aliquota = (p.tipo ?? 'credito') === 'credito' && p.dias > 30 ? 0 : 0.38
  const valor = arredondar(p.valor * (aliquota / 100))
  return { aliquota, valor, total: arredondar(p.valor + valor) }
}
