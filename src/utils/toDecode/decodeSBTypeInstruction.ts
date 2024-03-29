import { Function3 } from "@/enums/Function3";
import { func3, imm, rs1, rs2 } from "@/types/InstructionComponetsTypes";
import { expandImmTo32Bits } from "../expandImmTo32Bits";

export const decodeSBTypeInstruction = (riscVInstrucion:string) : string => {

  const funct3 = riscVInstrucion.substring(riscVInstrucion.length - 15, riscVInstrucion.length - 12) as Function3
  console.log(`funct3: ${funct3}`)

  const str_imm_upper = riscVInstrucion.substring(0, 7)
  const str_imm_lower = riscVInstrucion.substring(20, 25)
  
  const bit_11 = str_imm_lower[str_imm_lower.length-1]
  console.log(`bit_11: ${bit_11}`)

  const bit_4_to_1 = str_imm_lower.slice(0, -1);
  console.log(`bit_4_to_1: ${bit_4_to_1}`)

  const bit_12 = str_imm_upper[0]
  console.log(`bit_12: ${bit_12}`)

  const bit_10_to_5 = str_imm_upper.substring(1)
  console.log(`bit_10_to_5: ${bit_10_to_5}`)

  const imm = bit_12 + bit_11 + bit_10_to_5 + bit_4_to_1 + 0
  console.log(`imm: ${imm}`)

  const expandedImm = expandImmTo32Bits(imm) as imm
  console.log(`expandedImm: ${expandedImm}`)

  const str_rs1 = riscVInstrucion.substring(12, 17) as rs1
  console.log(`str_rs1: ${str_rs1}`)

  const str_rs2 = riscVInstrucion.substring(7, 12) as rs2
  console.log(`str_rs1: ${str_rs1}`)


  const int_rs1 = parseInt(str_rs1, 2);
  const int_rs2 = parseInt(str_rs2, 2);
  const int_imm = ~~parseInt(`${expandedImm}`, 2);          
  switch (funct3) {
    case Function3.BEQ:
        return(`beq x${int_rs1}, x${int_rs2}, ${int_imm}`);
    case Function3.BNE:
        return(`bne x${int_rs1}, x${int_rs2}, ${int_imm}`);
    default:
        return("Unknown branch instruction");
  }
}