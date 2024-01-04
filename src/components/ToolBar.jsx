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
import { RiDragMove2Fill } from "react-icons/ri";
import { MdPanTool } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";



function ToolBar() {
  const {currentTool,setCurrentTool,strokeWidth,setStrokeWidth,stroke,setStroke, setRoughness,
    roughness,setElements,elements,elementHistory, setElementHistory,scale, setScale} = useDraw()

  
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


  return (
    <>
    <div className='flex absolute top-0 border-2 border-[#322560] z-10 bg-[#fafafa] rounded-xl'>
        <div className='border-[#322560] border-2 cursor-pointer m-2 p-2' onClick={() => {setCurrentTool('moving')}}>
          <RiDragMove2Fill />
        </div>
        <div className='border-[#322560] border-2 cursor-pointer m-2 p-2' onClick={() => {setCurrentTool('pan')}}>
          <MdPanTool />
        </div>

        <div className='border-[#322560] border-2 cursor-pointer m-2 p-2' onClick={()=>{setCurrentTool('pen')}} >
          <FaPen  />
        </div>
        <div className='border-[#322560] border-2 cursor-pointer m-2 p-2' onClick={()=>{setCurrentTool('line')}}>
          <IoRemoveOutline  />
        </div>
        <div className='border-[#322560] border-2 cursor-pointer m-2 p-2' onClick={()=>{setCurrentTool('rectangle')}}>
          <MdOutlineRectangle  />
        </div>
        <div className='border-[#322560] border-2 cursor-pointer m-2 p-2' onClick={()=>{setCurrentTool('ellipse')}}>
          <IoEllipseOutline  />
        </div>
        <div className='border-[#322560] border-2 cursor-pointer m-2 p-2' onClick={()=>{setCurrentTool('rhombus')}}>
          <GoDiamond  />
        </div>
        <div className='border-[#322560] border-2 cursor-pointer m-2 p-2' onClick={()=>{setCurrentTool('triangle')}}>
          <IoTriangleOutline  />
        </div>
        <div className='border-[#322560] border-2 cursor-pointer m-2 p-2' onClick={()=>{setCurrentTool('eraser')}}>
          <LuEraser  />
        </div>        
        <div className='border-[#322560] border-2 cursor-pointer m-2 p-2' onClick={() => {setElements([])}}>
          <MdOutlineClear />
        </div>

        <div className='flex flex-col items-center m-2'>
            <span className='justify-center select-none'>Width</span>
            <input type='range' min={1} max={50} value={strokeWidth} className='w-20' onChange={(e) => {setStrokeWidth(e.target.value)}} ></input>
        </div>
        <div className='flex flex-col items-center m-2'>
            <span className='select-none'>Roughness</span>
            <input type='range'min={0} max={3} value={roughness} step={0.5} className='w-20'  onChange={(e) => {setRoughness(e.target.value)}}></input>
        </div>

        <div className='flex justify-center items-center m-2'>
          <input type='color' value={stroke} onChange={(e) => {setStroke(e.target.value)}}></input>
        </div>
    </div>
    <div className='flex absolute top-0 right-0' >
    <div className='m-2 border-[#322560] border-2 cursor-pointer rounded-lg' onClick={Undo} >
      <LuUndo2 className='' size={30}/>
    </div>

    <div className='m-2 cursor-pointer border-[#322560] border-2 rounded-lg' onClick={Redo}>
      <LuRedo2 className='' size={30}/>
    </div>
    </div>

    <div className='flex absolute bottom-5 right-5' >
    <div className='m-2 border-[#322560] border-2 cursor-pointer rounded-lg' onClick={() => setScale(prev => Math.max((prev-0.1),0.2))} >
      <FaMinus className='' size={20}/>
    </div>

    <div className='m-2 cursor-pointer border-[#322560] border-2 rounded-lg' onClick={() => setScale(prev => Math.min((prev+0.1),2.5))}>
      <FaPlus className='' size={20}/>
    </div>
    </div>


    </>
  )
}

export default ToolBar