import {opcode,func3,rs1,rs2} from "./InstructionComponetsTypes"

export type STypeInstruction = {
  opcode: opcode,
  func3: func3,
  rs1:rs1,
  rs2: rs2,
  imm_a: `${string & { length: 5 }}`,
  imm_b: `${string & { length: 7 }}`
}