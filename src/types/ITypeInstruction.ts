import {opcode,func3,rd,rs1,rs2} from "./InstructionComponetsTypes"

export type ITypeInstruction = {
  opcode: opcode,
  func3: func3,
  rd:rd,
  rs1:rs1,
  imm: `${string & { length: 12 }}`
}