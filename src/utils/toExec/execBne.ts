export const execBne = (functionElements: string []) : number => {
  const r1 = +functionElements[1].replace("x","")
  const r2 = +functionElements[2].replace("x","")
  const imm = +functionElements[3]
  console.log(r1-r2)
  console.log(imm)
  if(r1-r2){
    return imm
  } else{
    return 4
  }
}