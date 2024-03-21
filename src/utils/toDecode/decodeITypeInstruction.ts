import { Function3 } from "@/enums/Function3";
import { func3, imm, rd, rs1 } from "@/types/InstructionComponetsTypes";
import { expandImmTo32Bits } from "../expandImmTo32Bits";

export const decodeITypeInstruction = (riscVInstrucion:string) : string =>  {
  const funct3 = riscVInstrucion.substring(riscVInstrucion.length - 15, riscVInstrucion.length - 12) as Function3
  console.log(`funct3: ${funct3}`)
  
  const str_imm = riscVInstrucion.substring(0, 12) 
  console.log(`str_imm: ${str_imm}`)
  const expandedImm = expandImmTo32Bits(str_imm) as imm
  console.log(`expandedImm: ${expandedImm}`)

  const str_rs1 = riscVInstrucion.substring(12, 17) as rs1
  console.log(`str_rs1: ${str_rs1}`)

  const str_rd = riscVInstrucion.substring(20, 25) as rd
  console.log(`str_rd: ${str_rd}`)

  const int_imm = ~~parseInt(`${expandedImm}`, 2);
  const int_rs1 = parseInt(str_rs1, 2);
  const int_rd = parseInt(str_rd, 2);

  switch (funct3) {
      case Function3.ADD_SUB:
          return(`addi x${int_rd}, x${int_rs1}, ${int_imm}`);
      default:
          return("Unknown I-Type instruction");
  } 
}