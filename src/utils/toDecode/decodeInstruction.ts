import { OpCode } from "@/enums/OpCode";
import { decodeRTypeInstruction } from "./decodeRTypeInstruction";
import { decodeITypeInstruction } from "./decodeITypeInstruction";
import { decodeLwInstruction } from "./decodeLWInstruction";
import { decodeSBTypeInstruction } from "./decodeSBTypeInstruction";
import { decodeSTypeInstruction } from "./decodeSTypeInstruction";


export const decodeInstruction = (riscVInstrucion:string): string => {

    const opcode = riscVInstrucion.slice(-7) as OpCode
    switch (opcode) {
        case OpCode.R:
            // R-Type instructions
            return decodeRTypeInstruction(riscVInstrucion)
        case OpCode.IMM:
            // I-Type instructions
            return decodeITypeInstruction(riscVInstrucion)
        case OpCode.LOAD:
            // Lw Instruction
            console.log('lw')
            return decodeLwInstruction(riscVInstrucion)
        case OpCode.STORE:
            return decodeSTypeInstruction(riscVInstrucion);
        case OpCode.BRANCH:
            return decodeSBTypeInstruction(riscVInstrucion)
        default:
            return("Unknown opcode");
    }
}