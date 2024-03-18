"use client";

import React, { useEffect, useRef, useState } from "react";

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

import rtypeflow from '../../assets/imagem3.svg'
import itypeflow from '../../assets/i_type_flow.png'
import stypeflow from '../../assets/s_type_flow.png'
import btypeflow from '../../assets/b_type_flow.png'
import { UnityControlSinals } from "@/types/UnityControlSinals";

export default function Home() {

  
  const [binaryInstructions, setBinaryInstrucions] = useState('00000001010000000000011100010011')

  const [regis, setRegis] = useState(new Array(32).fill(0))

  const refsInstructionsArray = useRef<Array<HTMLInputElement  | null>>(Array(32).fill(null));
  const refsRegisArray = useRef<Array<HTMLInputElement  | null>>(Array(32).fill(null));
  const refsMemDatasArray = useRef<Array<HTMLInputElement  | null>>(Array(32).fill(null));

  const scrollToInput = (index: number,array:React.MutableRefObject<(HTMLInputElement | null)[]>) => {
    const inputRef = array.current[index];
    if (inputRef) {
      inputRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const [instructionMem, setInstructionMem] = useState(new Array(32).fill(0))

  const [dataMem, setDataMem] = useState(new Array(50).fill(0))

  const [controlUnity, setControlUnity] = useState<UnityControlSinals>({
    branch: '',
    aluSrc: '',
    aluOp0: '',
    aluOp1: '',
    memRead: '',
    memWrite: '',
    memToReg: '',
    regWrite: ''
  })

  const [pc, setPc] = useState(0)

  const [functionType, setFunctionType] = useState('')

  const handleTextAreaInputChange = (event: React.FormEvent<HTMLInputElement>) =>{
    setBinaryInstrucions(event.currentTarget.value)
  }

  const handleRegisInputChange = (event: React.FormEvent<HTMLInputElement>,index:number) => {
    let aux = regis;
    aux[index]=+(event.currentTarget.value);
    setRegis([...aux])
  }

  const handleExecFunction = (decodedFunction: string, index: number) => {
    const functionElements = decodedFunction.replaceAll(",", "").split(" ") 
    console.log(functionElements);
    switch (functionElements[0]) {
      case 'add':
        setFunctionType('R')
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
        setFunctionType('R')
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
        setFunctionType('R')
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
        setFunctionType('R')
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
        setFunctionType('I')
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
        setFunctionType('S')
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
        setFunctionType('I')
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
    }
  }

  useEffect(()=>{
    const instructions = removeNonNumericAndSplit(binaryInstructions,32)
    for(let i=0; i<instructions.length; i++){
      const decoded = decodeInstruction(instructions[i])
      let aux = instructionMem
      aux[i] = decoded
      setInstructionMem([...aux])
    }
  },[binaryInstructions])

  useEffect(()=>{
    scrollToInput(pc/4,refsInstructionsArray)
  },[pc])

  return (
    <main className="flex h-screen justify-center align-center">
      <div id="Arq" className="flex h-screen w-1/4 flex-col justify-center ml-2 ">
        <div id="RiscFiveInstructions" className="flex h-[17%] w-full bg-black rounded-t-2xl">
            <div id="TextArea" className="flex h-full w-full bg-red-300 items-center justify-center rounded-t-xl" >
              <InputTextArea title={'RiscV Instructions:'} placeholder={'Paste here'} rows={4} onChange={handleTextAreaInputChange} value={binaryInstructions}/>
            </div>
        </div>
        <div id="PC" className="flex h-[10%] w-full w-full  items-center justify-center bg-red-400">
            <label className="w-20 text-center">{`PC:`}</label>
            <input type={"text"} className="w-20" disabled value={pc}/>
        </div>         
        <div id="MemInstructions" className="flex h-[23%] w-full w-full  items-center justify-center bg-red-400">
          <div id="MemInstructionsContent" className="h-full w-full grid grid-cols-1 gap-2 bg-red-200 p-2 overflow-auto">
              {instructionMem.map((item,index)=>(
                <div key={index} className="flex flex-col h-full w-full items-center justify-center">
                  <label className="w-full text-center">{`Instruction ${index} (#${index*4}):`}</label>
                  <div className="w-full flex">
                    <input type={"text"} ref={(el) => (refsInstructionsArray.current[index] = el)} className="w-full" disabled value={item}/>
                    {pc/4==index && item ?
                      <button 
                        type={"button"} 
                        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        onClick={()=>{handleExecFunction(instructionMem[index],index)}}
                        >exec</button>      
                        :
                        <></>              
                    }
                  </div>
                </div>
              ))
              }
          </div> 
        </div> 
        <div id="Regis" className="flex h-[9%] w-full bg-slate-400">
          <div id="RegisContent" className="w-full h-full grid grid-cols-2 gap-2 text-center p-2 overflow-auto">
                  {regis.map((item,index)=>(
                    <div key={index} className="flex flex-col h-full w-full items-center justify-center ">
                      <label className="w-20">{`Reg ${index}:`}</label>
                      <input type={"text"} ref={(el) => (refsRegisArray.current[index] = el)} className="w-20 text-center" onChange={(event)=>{handleRegisInputChange(event,index)}} value={item}/>
                    </div>
                  ))}
                </div>
        </div>
        <div id="MemData" className="flex h-[9%] w-full bg-slate-400">
          <div id="MemDataContent" className="h-full w-full grid grid-cols-2 gap-2 text-center p-2 overflow-auto">
                {dataMem.map((item,index)=>(
                  <div key={index} className="flex flex-col h-full w-full items-center justify-center ">
                    <label className="w-20">{`Mem ${index}:`}</label>
                    <input type={"text"} ref={(el) => (refsMemDatasArray.current[index] = el)} className="w-20 text-center" disabled value={item}/>
                  </div>
                ))
                }
          </div>
        </div>
        <div id="UC" className="flex flex-col h-[30%] w-full bg-red-200 rounded-b-2xl">
                  <div id="ControlUnity" className="w-full grid grid-cols-3 gap-2  p-2">
                    {Object.entries(controlUnity).map(([key,value])=>(
                      <div className="flex flex-col h-full w-full items-center justify-center m-2">
                        <label className="w-20">{`${key}:`}</label>
                        <input type={"text"} className="w-20" disabled value={value}/>
                      </div>         
                    ))}
                  </div>
        </div>
      </div>
      <div id="DataFlow" className="flex flex-col w-full items-center justify-center">
          {functionType === 'R' && (
            <div>
              <p className="text-center m-2 text-white">Data Flow: R Type Instruction</p>
              <img src={rtypeflow.src}  className="h-auto" alt="logo" />
            </div>
          )}
          {functionType === 'I' && (
            <>
              <p className="text-center m-2">Data Flow: I Type Instruction</p>
              <img src={rtypeflow.src}  className="h-5/6 max-w-max" alt="logo" />
            </>
          )}
          {functionType === 'S' && (
            <>
              <p className="text-center m-2 text-white">Data Flow: S Type Instruction</p>
              <img src={stypeflow.src}  className="h-auto max-w-max" alt="logo" />
            </>
          )}  
          {functionType === 'B' && (
            <>
              <p className="text-center m-2 text-white">Data Flow: B Type Instruction</p>
              <img src={btypeflow.src}  className="h-auto max-w-max" alt="logo" />
            </>
          )}  
      </div>      
</main>
  );
}
