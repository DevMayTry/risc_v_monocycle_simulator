export const execLw = (functionElements: string [], regis: number[], dataMem: number[]) : number[] => {
  const rd = +functionElements[1].replace("x","")
  const [scale,offset] = functionElements[2].replace("(","").replace(")","").split("x")
  const memAddress = +scale+(regis[+offset])
  let aux = regis
  aux[rd]=dataMem[memAddress]
  return aux
}