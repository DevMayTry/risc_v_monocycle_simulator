export const execAddi = (functionElements: string [], regis: number[]) : number[] => {
  const rd = +functionElements[1].replace("x","")
  const rs = +functionElements[2].replace("x","")
  const imm = +functionElements[3]
  let aux = regis
  aux[rd]=aux[rs]+imm
  return aux
}