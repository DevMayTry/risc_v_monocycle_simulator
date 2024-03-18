import { Function3 } from "@/enums/Function3";
import { Function7 } from "@/enums/Function7";

export const decodeITypeInstruction = (riscVInstrucion:string) : string =>  {
  
  const funct3 = riscVInstrucion.substring(riscVInstrucion.length - 15, riscVInstrucion.length - 12) as Function3
  
  const str_imm = riscVInstrucion.substring(0, 12) as Function7
  const str_rs1 = riscVInstrucion.substring(12, 17) as Function7
  const str_rd = riscVInstrucion.substring(20, 25) as Function7

  const int_imm = parseInt(str_imm, 2);
  const int_rs1 = parseInt(str_rs1, 2);
  const int_rd = parseInt(str_rd, 2);

  switch (funct3) {
      case Function3.ADD_SUB:
          return(`addi x${int_rd}, x${int_rs1}, ${int_imm}`);
          break;
      default:
          return("Unknown I-Type instruction");
          break;
  } 
}