import { OpCode } from "@/enums/OpCode";
import { decodeRTypeInstruction } from "./decodeRTypeInstruction";
import { decodeITypeInstruction } from "./decodeITypeInstruction";
import { decodeLWInstruction } from "./decodeLWInstruction";
import { decodeSBTypeInstruction } from "./decodeSBTypeInstruction";
import { decodeSTypeInstruction } from "./decodeSTypeInstruction";


export const decodeInstruction = (riscVInstrucion:string): string => {
    
    console.log(`INSTRUÇÃO BINÁRIA: ${riscVInstrucion}`)
    const opcode = riscVInstrucion.slice(-7) as OpCode
    console.log(`OPCODE: ${opcode}`)
    switch (opcode) {
        case OpCode.R:
            return decodeRTypeInstruction(riscVInstrucion)
        case OpCode.IMM:
            return decodeITypeInstruction(riscVInstrucion)
        case OpCode.LOAD:
            console.log('lw')
            return decodeLWInstruction(riscVInstrucion)
        case OpCode.STORE:
            return decodeSTypeInstruction(riscVInstrucion);
        case OpCode.BRANCH:
            return decodeSBTypeInstruction(riscVInstrucion)
        default:
            return("Unknown opcode");
    }
}