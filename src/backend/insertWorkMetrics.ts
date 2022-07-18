import { getSpreadsheet } from "../config/spreadsheet"

export interface WorkMetrics {
  data: string
  nome: string
  horas: string
  entrevistas: number
  abducoes: number
  pontos: number
  referidos: number
  print: Print
}
type Print = "ENVIADO" | "NÃO ENVIADO" | "---"

export async function insertWorkMetrics({
  data,
  abducoes,
  entrevistas,
  horas,
  nome,
  pontos,
  print,
  referidos,
}: WorkMetrics) {
  const spreadsheet = await getSpreadsheet(
    "1E2S0JM2qcGGT9783aTmgADr3FFVw3yKTAQ-8OIi6_xo"
  )
  spreadsheet.addRecord("20.07-26.07", [
    data,
    nome,
    horas,
    entrevistas,
    abducoes,
    pontos,
    referidos,
    print,
  ])
}
