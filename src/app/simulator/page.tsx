"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { InputTextArea } from "@/components/TextAreaComponent"

import { removeNonNumericAndSplit } from "@/utils/removeNonNumericAndSplit";

import { decodeInstruction } from "@/utils/toDecode/decodeInstruction"

import { execAdd } from "@/utils/toExec/execAdd";
import { execSub } from "@/utils/toExec/execSub";
import { execAddi } from "@/utils/toExec/execAddi";
import { execSw } from "@/utils/toExec/execSw";
import { execLw } from "@/utils/toExec/execLw";
import { execAnd } from "@/utils/toExec/execAnd";
import { execOr } from "@/utils/toExec/execOr";

import r_type_flow from '../../assets/r_type_flow.svg'
import addi_flow from '../../assets/addi_flow.svg'
import sw_flow from '../../assets/sw_flow.svg'
import lw_flow from '../../assets/lw_flow.svg'
import beq_flow from '../../assets/beq_flow.svg'
import bne_flow from '../../assets/bne_flow.svg'

import { UnityControlSinals } from "@/types/UnityControlSinals";
import { execBeq } from "@/utils/toExec/execBeq";
import { execBne } from "@/utils/toExec/execBne";

interface FunctionSrc {
  [key: string]: { type: string; src: any }; // Index signature
}

export default function Simulator() {
  
  const [binaryInstructions, setBinaryInstrucions] = useState('')

  const [regis, setRegis] = useState(new Array(32).fill(0))

  const [instructionMem, setInstructionMem] = useState(new Array(32).fill(0))

  const [dataMem, setDataMem] = useState(new Array(50).fill(0))

  const [controlUnity, setControlUnity] = useState<UnityControlSinals>({
    aluSrc:'0',
    memToReg:'0',
    regWrite:'0',
    memRead:'0',
    memWrite:'0',
    branch:'0',
    aluOp0:'0',
    aluOp1:'0'
  })

  const [pc, setPc] = useState(0)

  const [targetFunction, setTargetFunction] = useState('')

  const [functionSrc, setFunctionSrc] = useState<FunctionSrc>({
    add:{type:'R', src: r_type_flow.src},
    sub: {type:'R', src: r_type_flow.src},
    and:{type:'R', src: r_type_flow.src},
    or:{type:'R', src: r_type_flow.src},
    addi:{type:'I', src: addi_flow.src},
    sw:{type:'S', src: sw_flow.src},
    lw:{type:'I', src: lw_flow.src},
    beq:{type:'SB', src: beq_flow.src},
    bne:{type:'SB', src: bne_flow.src}
  })

  const refsInstructionsArray = useRef<Array<HTMLInputElement  | null>>(Array(32).fill(null));
  const refsRegisArray = useRef<Array<HTMLInputElement  | null>>(Array(32).fill(null));
  const refsMemDatasArray = useRef<Array<HTMLInputElement  | null>>(Array(32).fill(null));

  const scrollToInput = useCallback((index: number,array:React.MutableRefObject<(HTMLInputElement | null)[]>) => {
    console.log(index,array)
    const inputRef = array.current[index];
    if (inputRef) {
      inputRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },[])

  const handleTextAreaInputChange = (event: React.FormEvent<HTMLInputElement>) =>{
    setBinaryInstrucions(event.currentTarget.value)
  }

  const handleRegisInputChange = (event: React.FormEvent<HTMLInputElement>,index:number) => {
    let aux = regis;
    aux[index]=+(event.currentTarget.value);
    setRegis([...aux])
  }

  const handleExecFunction = useCallback((decodedFunction: string, index: number) => {
    const functionElements = decodedFunction.replaceAll(",", "").split(" ") 
    console.log(functionElements);
    switch (functionElements[0]) {
      case 'add':
        setTargetFunction('add')
        setRegis([...execAdd(functionElements,regis)])
        scrollToInput(+functionElements[1].replace("x",""),refsRegisArray)
        setPc((index*4)+4)
        setControlUnity({
          aluSrc:'0',
          memToReg:'0',
          regWrite:'1',
          memRead:'0',
          memWrite:'0',
          branch:'0',
          aluOp0:'1',
          aluOp1:'0'
        })
        break;      
      case 'sub':
        setTargetFunction('sub')
        setRegis([...execSub(functionElements, regis)])
        scrollToInput(+functionElements[1].replace("x",""),refsRegisArray)
        setPc((index*4)+4)
        setControlUnity({
          aluSrc:'0',
          memToReg:'0',
          regWrite:'1',
          memRead:'0',
          memWrite:'0',
          branch:'0',
          aluOp0:'1',
          aluOp1:'0'
        })
        break; 
      case 'and':
        setTargetFunction('and')
        setRegis([...execAnd(functionElements, regis)])
        scrollToInput(+functionElements[1].replace("x",""),refsRegisArray)
        setPc((index*4)+4)
        setControlUnity({
          aluSrc:'0',
          memToReg:'0',
          regWrite:'1',
          memRead:'0',
          memWrite:'0',
          branch:'0',
          aluOp0:'1',
          aluOp1:'0'
        })        
        break;
      case 'or':
        setTargetFunction('or')
        setRegis([...execOr(functionElements, regis)])
        scrollToInput(+functionElements[1].replace("x",""),refsRegisArray)
        setPc((index*4)+4)
        setControlUnity({
          aluSrc:'0',
          memToReg:'0',
          regWrite:'1',
          memRead:'0',
          memWrite:'0',
          branch:'0',
          aluOp0:'1',
          aluOp1:'0'
        })
        break;        
      case 'addi':
        setTargetFunction('addi')
        setRegis([...execAddi(functionElements, regis)])
        scrollToInput(+functionElements[1].replace("x",""),refsRegisArray)
        setPc((index*4)+4)
        setControlUnity({
          aluSrc:'1',
          memToReg:'0',
          regWrite:'1',
          memRead:'0',
          memWrite:'0',
          branch:'0',
          aluOp0:'0',
          aluOp1:'0'
        })
        break;
      case 'sw':
        setTargetFunction('sw')
        const [editedMemory, targetMemAddress] = execSw(functionElements, regis, dataMem)
        setDataMem([...editedMemory])
        scrollToInput(targetMemAddress,refsMemDatasArray)
        setPc((index*4)+4)
        setControlUnity({
          aluSrc:'1',
          memToReg:'X',
          regWrite:'0',
          memRead:'0',
          memWrite:'1',
          branch:'0',
          aluOp0:'0',
          aluOp1:'0'
        })
        break;
      case 'lw':
        setTargetFunction('lw')
        setRegis([...execLw(functionElements, regis, dataMem)])
        scrollToInput(+functionElements[1].replace("x",""),refsRegisArray)
        setPc((index*4)+4)
        setControlUnity({
          aluSrc:'1',
          memToReg:'1',
          regWrite:'1',
          memRead:'1',
          memWrite:'0',
          branch:'0',
          aluOp0:'0',
          aluOp1:'0'
        })
        
      break;        
      case 'beq':
        setTargetFunction('beq')
        const pcToSetBeqCase = pc+(execBeq(functionElements))
        setPc(pcToSetBeqCase)
        setControlUnity({
          aluSrc:'0',
          memToReg:'X',
          regWrite:'0',
          memRead:'0',
          memWrite:'0',
          branch:'1',
          aluOp0:'1',
          aluOp1:'0'
        }) 
        scrollToInput(pcToSetBeqCase/4,refsInstructionsArray)
        break
      case 'bne':
        setTargetFunction('bne')
        const pcToSetBneCase = pc+(execBne(functionElements))
        setPc(pcToSetBneCase)
        setControlUnity({
          aluSrc:'0',
          memToReg:'X',
          regWrite:'0',
          memRead:'0',
          memWrite:'0',
          branch:'1',
          aluOp0:'1',
          aluOp1:'0'
        }) 
        scrollToInput(pcToSetBneCase/4,refsInstructionsArray)        
        break
    }
  },[pc])

  useEffect(()=>{
    const instructions = removeNonNumericAndSplit(binaryInstructions,32)
    for(let i=0; i<instructions.length; i++){
      const decoded = decodeInstruction(instructions[i])
      let aux = instructionMem
      aux[i] = decoded
      setInstructionMem([...aux])
    }
  },[binaryInstructions])

  return (
    <main className="flex flex-col lg:flex-row  h-screen justify-center align-center text-lg bg-white">
      <div id="Arq" className="flex h-screen w-11/12 lg:w-2/6  flex-col justify-center ml-2 ">
        <div id="RiscFiveInstructions" className="flex h-[17%] w-full rounded-t-2xl bg-purple-600 hover:bg-purple-700 text-white border-2 border-b-0 border-black">
            <div id="TextArea" className="flex h-full w-full items-center justify-center rounded-t-xl" >
              <InputTextArea title={'RiscV Instructions:'} placeholder={'Paste here'} rows={4} onChange={handleTextAreaInputChange} value={binaryInstructions}/>
            </div>
        </div>
        <div id="PC" className="flex flex-col h-[10%] font-bold w-full w-full  items-center justify-center bg-purple-200 hover:bg-purple-400 border-2 border-b-0 border-black">
            <label className="w-20 text-black text-center">{`PC:`}</label>
            <input type={"text"} className="w-20 text-black text-center" disabled value={pc}/>
        </div>         
        <div id="MemInstructions" className="flex h-[23%] w-full w-full  items-center justify-center bg-purple-600 hover:bg-purple-700 text-white  border-2 border-b-0 border-black">
          <div id="MemInstructionsContent" className="h-full w-full grid grid-cols-1 gap-2 p-2 overflow-auto scrollbar-thin-scroll">
              {instructionMem.map((item,index)=>(
                <div key={`instruction-${index}`} className="flex flex-col h-full w-full items-center justify-center">
                  <label className="w-full text-center font-bold">{`Instruction ${index} (#${index*4}):`}</label>
                  <div className="w-full flex justify-center align-center">
                    <input type={"text"} ref={(el) => (refsInstructionsArray.current[index] = el)} className="w-full pl-2 rounded-md" disabled value={item}/>
                    {pc/4==index && item ?
                      <button 
                        key={`button-${index}`} 
                        type={"button"} 
                        className="h-full ml-2 bg-white hover:bg-gray-200 hover:text-red-600 text-purple-600 py-2 px-4 rounded-xl shadow-md transition duration-300 ease-in-out"
                        onClick={()=>{handleExecFunction(instructionMem[index],index)}}
                        >Run</button>      
                        :
                        <></>              
                    }
                  </div>
                </div>
              ))
              }
          </div> 
        </div> 
        <div id="Regis" className="flex h-[9%] w-full bg-purple-200 hover:bg-purple-400 border-2 border-b-0 border-black">
          <div id="RegisContent" className="w-full h-full grid grid-cols-2 gap-2 text-center p-2 overflow-auto scrollbar-thin-scroll">
                  {regis.map((item,index)=>(
                    <div key={`regis-${index}`} className="flex flex-col h-full w-full items-center justify-center ">
                      <label className="w-20 font-bold text-black">{`Reg ${index}:`}</label>
                      <input type={"text"} ref={(el) => (refsRegisArray.current[index] = el)} className="w-20 text-black text-center rounded-md" onChange={(event)=>{handleRegisInputChange(event,index)}} value={item}/>
                    </div>
                  ))}
                </div>
        </div>
        <div id="MemData" className="flex h-[9%] w-full bg-purple-600 hover:bg-purple-700 text-white border-2  border-b-0 border-black">
          <div id="MemDataContent" className="h-full w-full grid grid-cols-2 gap-2 text-center p-2 overflow-auto scrollbar-thin-scroll">
                {dataMem.map((item,index)=>(
                  <div key={`mem-${index}`} className="flex flex-col h-full w-full items-center justify-center ">
                    <label className="w-20 font-bold">{`Mem ${index}:`}</label>
                    <input type={"text"} ref={(el) => (refsMemDatasArray.current[index] = el)} className="w-20 rounded-md text-center" disabled value={item}/>
                  </div>
                ))
                }
          </div>
        </div>
        <div id="UC" className="flex flex-col h-[30%] w-full rounded-b-2xl items-center justify-center bg-purple-200 hover:bg-purple-400 border-2 border-black">
                  <div id="ControlUnity" className="w-full grid grid-cols-3 gap-2  p-2">
                    {Object.entries(controlUnity).map(([key,value], index)=>(
                      <div key={index} className="flex flex-col h-full w-full items-center justify-center">
                        <label className="w-full text-center font-bold text-black">{`${key}:`}</label>
                        <input type={"text"} className="w-full text-center rounded-md text-black" disabled value={value}/>
                      </div>         
                    ))}
                    {targetFunction == 'bne' ?
                      <div key={'bne'} className="flex flex-col h-full w-full items-center justify-center border-2 border-dashed border-yellow-600">
                        <label className="w-full text-center font-bold text-black ">{`NotEquals:`}</label>
                        <input type={"text"} className="w-full text-center rounded-md text-black" disabled value={1}/>
                      </div> 
                      :
                      <></>
                    }
                  </div>
        </div>
      </div>
      <div id="DataFlow" className="flex flex-col w-full items-center justify-center">
          {targetFunction && (
            <>
              <p className="text-center m-2">{`Data Flow: ${functionSrc[targetFunction].type} Type Instruction`}</p>
              <img src={functionSrc[targetFunction].src}  className="h-5/6 max-w-max" alt="logo" />
            </>
          )}
      </div>
</main>
  );
}
