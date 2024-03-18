import {opcode,func3,func7,rd,rs1,rs2} from "./InstructionComponetsTypes"

export type RTypeInstruction = {
  opcode: opcode,
  func3: func3,
  func7:func7,
  rd:rd,
  rs1:rs1,
  rs2: rs2
}