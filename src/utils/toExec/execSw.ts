export const execSw = (functionElements: string [], regis: number[], dataMem: number[]) : [number[], number] => {
  const rd = +functionElements[1].replace("x","")
  const [scale,offset] = functionElements[2].replace("(","").replace(")","").split("x")
  const memAddress = +scale+(regis[+offset])
  let aux = dataMem
  aux[memAddress]=regis[rd]
  return [aux,memAddress]
}