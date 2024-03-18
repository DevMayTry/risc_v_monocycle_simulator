export const execSub = (functionElements: string [], regis: number[]) : number[] => {
  const rd = +functionElements[1].replace("x","")
  const r1 = +functionElements[2].replace("x","")
  const r2 = +functionElements[3].replace("x","")
  let aux = regis
  aux[rd]=aux[r1]-aux[r2]
  return aux
}