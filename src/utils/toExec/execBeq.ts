export const execBeq = (functionElements: string [], regis: number[]) : number => {
  const r1 = +functionElements[1].replace("x","")
  const r2 = +functionElements[2].replace("x","")
  const imm = +functionElements[3]
  if(regis[r1]-regis[r2]){
    return 4
  } else{
    return imm
  }
}