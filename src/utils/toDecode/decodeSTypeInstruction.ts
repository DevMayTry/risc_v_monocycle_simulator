import { imm, rs1, rs2 } from "@/types/InstructionComponetsTypes";
import { expandImmTo32Bits } from "../expandImmTo32Bits";

export const decodeSTypeInstruction = (riscVInstrucion:string) : string =>  {
  const str_imm_upper = riscVInstrucion.substring(0, 7)
  const str_imm_lower = riscVInstrucion.substring(20, 25) 
  const expandedImm = expandImmTo32Bits(`${str_imm_upper}${str_imm_lower}`) as imm

  const str_rs1 = riscVInstrucion.substring(12, 17) as rs1
  const str_rs2 = riscVInstrucion.substring(7, 12) as rs2
  
  const int_imm = ~~parseInt(`${expandedImm}`, 2);
  const int_rs1 = parseInt(str_rs1, 2);
  const int_rs2 = parseInt(str_rs2, 2);
  
  return(`sw x${int_rs2}, ${int_imm}(x${int_rs1})`);
}