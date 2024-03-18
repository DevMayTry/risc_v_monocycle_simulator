import { Function3 } from "@/enums/Function3";
import { Function7 } from "@/enums/Function7";

export const decodeRTypeInstruction = (riscVInstrucion:string) : string => {

  const funct3 = riscVInstrucion.substring(riscVInstrucion.length - 15, riscVInstrucion.length - 12) as Function3

  const str_rs1 = riscVInstrucion.substring(12, 17) as Function7
  const str_rs2 = riscVInstrucion.substring(7, 12) as Function7
  const str_rd = riscVInstrucion.substring(20, 25) as Function7

  const int_rs1 = parseInt(str_rs1, 2);
  const int_rs2 = parseInt(str_rs2, 2);
  const int_rd = parseInt(str_rd, 2);            
  switch (funct3) {
      case Function3.ADD_SUB:
          const funct7 = riscVInstrucion.substring(0, 7) as Function7

          if (funct7 === Function7.ADD) {
              return(`add x${int_rd}, x${int_rs1}, x${int_rs2}`);
          } else if (funct7 === Function7.SUB) {
              return(`sub x${int_rd}, x${int_rs1}, x${int_rs2}`);
          } else {
              return("Unknown R-Type instruction");
          }
      case Function3.AND:
          return(`and x${int_rd}, x${int_rs1}, x${int_rs2}`);
      case Function3.OR:
          return(`or x${int_rd}, x${int_rs1}, x${int_rs2}`);
      default:
          return("Unknown R-Type instruction");
  }
}