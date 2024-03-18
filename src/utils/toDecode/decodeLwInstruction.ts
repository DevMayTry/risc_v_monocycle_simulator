import { Function3 } from "@/enums/Function3";
import { Function7 } from "@/enums/Function7";

export const decodeLwInstruction = (riscVInstrucion:string) : string =>  {
  const str_imm = riscVInstrucion.substring(0, 12) as Function7
  const str_rs1 = riscVInstrucion.substring(12, 17) as Function7
  const str_rd = riscVInstrucion.substring(20, 25) as Function7

  console.log(str_imm)
  
  const int_imm = parseInt(str_imm, 2);
  const int_rs1 = parseInt(str_rs1, 2);
  const int_rd = parseInt(str_rd, 2);            
  
  return(`lw x${int_rd}, ${int_imm}(x${int_rs1})`);
}