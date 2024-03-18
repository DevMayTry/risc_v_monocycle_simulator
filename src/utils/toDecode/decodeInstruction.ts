import { OpCode } from "@/enums/OpCode";
import { Function3 } from "@/enums/Function3";
import { Function7 } from "@/enums/Function7";
import { decodeRTypeInstruction } from "./decodeRTypeInstruction";
import { decodeITypeInstruction } from "./decodeITypeInstruction";
import { decodeLwInstruction } from "./decodeLWInstruction";


export const decodeInstruction = (riscVInstrucion:string): string => {

    const opcode = riscVInstrucion.slice(-7) as OpCode
    const funct3 = riscVInstrucion.substring(riscVInstrucion.length - 15, riscVInstrucion.length - 12) as Function3
    switch (opcode) {
        case OpCode.R:
            // instructions
            return decodeRTypeInstruction(riscVInstrucion)
            break;
        case OpCode.IMM:
            // I-Type instructions
            return decodeITypeInstruction(riscVInstrucion)
            break;
        case OpCode.LOAD:
            // Lw Instruction
            console.log('lw')
            return decodeLwInstruction(riscVInstrucion)
            break;
        case OpCode.STORE:
            const str_imm_upper = riscVInstrucion.substring(0, 7) as Function7
            const str_rs1 = riscVInstrucion.substring(12, 17) as Function7
            const str_rs2 = riscVInstrucion.substring(7, 12) as Function7
            const str_imm_lower = riscVInstrucion.substring(20, 25) as Function7

            const int_imm = parseInt(`${str_imm_upper}${str_imm_lower}`, 2);
            const int_rs1 = parseInt(str_rs1, 2);
            const int_rs2 = parseInt(str_rs2, 2);

            return(`sw x${int_rs2}, ${int_imm}(x${int_rs1})`);
            break;
        case OpCode.BRANCH:
            switch (funct3) {
                case Function3.BEQ:
                    return("beq instruction");
                    break;
                case Function3.BNE:
                    return("bne instruction");
                    break;
                default:
                    return("Unknown branch instruction");
                    break;
            }
            break;
        default:
            return("Unknown opcode");
            break;
    }
}