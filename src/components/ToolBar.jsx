import React from 'react'
import { FaPen } from "react-icons/fa";
import { MdOutlineRectangle } from "react-icons/md";
import { MdOutlineClear } from "react-icons/md";
import { IoRemoveOutline } from "react-icons/io5";
import { IoEllipseOutline } from "react-icons/io5";
import { GoDiamond } from "react-icons/go";
import { IoTriangleOutline } from "react-icons/io5";
import { LuEraser } from "react-icons/lu";
import useDraw from '../context/useDraw';


function ToolBar() {

    const {currentTool,setCurrentTool,strokeWidth,setStrokeWidth,stroke,setStroke, setRoughness,roughness,setElements} = useDraw()

  return (
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
  )
}

export default ToolBar