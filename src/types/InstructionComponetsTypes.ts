export type opcode = `${string & { length: 7 }}`
export type func7 = `${string & { length: 7 }}`
export type func3 = `${string & { length: 3 }}`
export type rs1 = `${string & { length: 5 }}`
export type rs2 = `${string & { length: 5 }}`
export type rd = `${string & { length: 5 }}`
export type imm = `${string & { length: 32 }}`