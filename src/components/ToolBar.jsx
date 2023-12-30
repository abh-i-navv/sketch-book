import React, { useEffect, useState } from 'react'
import { FaPen } from "react-icons/fa";
import { MdOutlineRectangle } from "react-icons/md";
import { MdOutlineClear } from "react-icons/md";
import { IoRemoveOutline } from "react-icons/io5";
import { IoEllipseOutline } from "react-icons/io5";
import { GoDiamond } from "react-icons/go";
import { IoTriangleOutline } from "react-icons/io5";
import { LuEraser } from "react-icons/lu";
import useDraw from '../context/useDraw';
import { LuUndo2 } from "react-icons/lu";
import { LuRedo2 } from "react-icons/lu";



function ToolBar() {
  const {currentTool,setCurrentTool,strokeWidth,setStrokeWidth,stroke,setStroke, setRoughness,roughness,setElements,elements,elementHistory, setElementHistory} = useDraw()

  
  function Undo(){
    if(elements.length != 0){

      let elementCopy = elements
      const lastElement = elementCopy.pop()
      
      console.log(elements)
      setElementHistory(prev => [...prev, lastElement])
      setElements((elements) => [...elements])
    }
  }

  function Redo(){
      if(elementHistory.length != 0){
        
          let redoElement = elementHistory.pop()
          console.log(elementHistory)
          
          setElements((prev) => [...prev,redoElement])
          setElementHistory((prev) => [...prev])
      }
      else {
        return
      }

  }

  // const actionOnKeyPress=(e)=>{
  //   console.log(e.key, e.ctrlKey)
  //   if(e.key==='z'){
  //     console.log("chalra kya?")
  //     return Undo()
      
  //   }
  //   if(e.ctrlKey && e.key==='y'){
  //     return Redo()
  //   }  
  // }

  // useEffect(()=> {
  //   document.addEventListener('keydown', actionOnKeyPress)
    
  //   // return(
  //   //   document.removeEventListener('keydown', actionOnKeyPress)
  //   // )
  // },[ ])

  return (
    <>
    <div className='flex'>
        <div className='border-black border-2 cursor-pointer m-2 p-2' onClick={()=>{setCurrentTool('pen')}} >
          <FaPen  />
        </div>
        <div className='border-black border-2 cursor-pointer m-2 p-2' onClick={()=>{setCurrentTool('line')}}>
          <IoRemoveOutline  />
        </div>
        <div className='border-black border-2 cursor-pointer m-2 p-2' onClick={()=>{setCurrentTool('rectangle')}}>
          <MdOutlineRectangle  />
        </div>
        <div className='border-black border-2 cursor-pointer m-2 p-2' onClick={()=>{setCurrentTool('ellipse')}}>
          <IoEllipseOutline  />
        </div>
        <div className='border-black border-2 cursor-pointer m-2 p-2' onClick={()=>{setCurrentTool('rhombus')}}>
          <GoDiamond  />
        </div>
        <div className='border-black border-2 cursor-pointer m-2 p-2' onClick={()=>{setCurrentTool('triangle')}}>
          <IoTriangleOutline  />
        </div>
        <div className='border-black border-2 cursor-pointer m-2 p-2' onClick={()=>{setCurrentTool('eraser')}}>
          <LuEraser  />
        </div>        
        <div className='border-black border-2 cursor-pointer m-2 p-2' onClick={() => {setElements([])}}>
          <MdOutlineClear />
        </div>

        <div className='flex flex-col items-center m-2'>
            <span className='justify-center'>width</span>
            <input type='range' min={1} max={30} value={strokeWidth} onChange={(e) => {setStrokeWidth(e.target.value)}} ></input>
        </div>
        <div className='flex flex-col items-center m-2'>
            <span>roughness</span>
            <input type='range'min={0} max={3} value={roughness} step={0.5} onChange={(e) => {setRoughness(e.target.value)}}></input>
        </div>

        <div className='flex justify-center items-center m-2'>
          <input type='color' value={stroke} onChange={(e) => {setStroke(e.target.value)}}></input>
        </div>
    </div>

    <div className='flex absolute top-14 right-10' >
    <div className='m-2 border-2 cursor-pointer' onClick={() =>Undo()} >
      <LuUndo2 className='' size={30}/>
    </div>

    <div className='m-2 border-2 cursor-pointer' onClick={Redo}>
      <LuRedo2 className='' size={30}/>
    </div>
    </div>

    </>
  )
}

export default ToolBar