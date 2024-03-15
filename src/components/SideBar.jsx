import React from 'react'
import { FaPen } from "react-icons/fa";
import { MdOutlineRectangle } from "react-icons/md";
import { MdOutlineClear } from "react-icons/md";
import { IoEllipseOutline } from "react-icons/io5";
import { GoDiamond } from "react-icons/go";
import { IoTriangleOutline } from "react-icons/io5";
import { LuEraser } from "react-icons/lu";
import { RiDragMove2Fill } from "react-icons/ri";
import { MdPanTool } from "react-icons/md";
import { IconContext } from 'react-icons';
import { MdOutlineHorizontalRule } from "react-icons/md";
import useDraw from '../context/useDraw';

export default function () {
    const {currentTool,setCurrentTool,strokeWidth,setStrokeWidth,stroke,setStroke, setRoughness,
        roughness,setElements,elements,elementHistory, setElementHistory,scale, setScale} = useDraw()
    

  return (
    <>

    <div className='flex flex-col border-[#322560] border-2 mt-2 shadow-md rounded-lg lg:hidden shadow:md text-white absolute top-0 left-0 h-auto w-16'>
        <IconContext.Provider value= {{color: "black"}}>
            
        <div className={`cursor-pointer m-2 p-2 flex items-center justify-center hover:bg-[#b3aad5] ${currentTool === 'moving' ? 'bg-[#b3aad5]' : ''} `} onClick={() => {setCurrentTool('moving')}}>
            <RiDragMove2Fill />
            </div>
            <div className={`cursor-pointer m-2 p-2 flex items-center justify-center hover:bg-[#b3aad5] ${currentTool === 'pan' ? 'bg-[#b3aad5]' : ''}`} onClick={() => {setCurrentTool('pan')}}>
            <MdPanTool />
            </div>

            <div className={`cursor-pointer m-2 p-2 flex items-center justify-center hover:bg-[#b3aad5] ${currentTool === 'pen' ? 'bg-[#b3aad5]' : ''}`} onClick={()=>{setCurrentTool('pen')}} >
            <FaPen />
            </div>
        </IconContext.Provider>
            <IconContext.Provider value= {{size: "1.3em", color: "black"}}>

            <div className={`cursor-pointer m-2 p-2 flex items-center justify-center hover:bg-[#b3aad5] ${currentTool === 'line' ? 'bg-[#b3aad5]' : ''}`} onClick={()=>{setCurrentTool('line')}}>
                <MdOutlineHorizontalRule />
            </div>
            <div className={`cursor-pointer m-2 p-2 flex items-center justify-center hover:bg-[#b3aad5] ${currentTool === 'rectangle' ? 'bg-[#b3aad5]' : ''} `} onClick={()=>{setCurrentTool('rectangle')}}>
                <MdOutlineRectangle  />
            </div>
            <div className={`cursor-pointer m-2 p-2 flex items-center justify-center hover:bg-[#b3aad5] ${currentTool === 'ellipse' ? 'bg-[#b3aad5]' : ''}`} onClick={()=>{setCurrentTool('ellipse')}}>
                <IoEllipseOutline  />
            </div>
            <div className={`cursor-pointer m-2 p-2 flex items-center justify-center hover:bg-[#b3aad5] ${currentTool === 'rhombus' ? 'bg-[#b3aad5]' : ''}`} onClick={()=>{setCurrentTool('rhombus')}}>
                <GoDiamond  />
            </div>
            <div className={`cursor-pointer m-2 p-2 flex items-center justify-center hover:bg-[#b3aad5] ${currentTool === 'triangle' ? 'bg-[#b3aad5]' : ''}`} onClick={()=>{setCurrentTool('triangle')}}>
                <IoTriangleOutline  />
            </div>
            <div className={`cursor-pointer m-2 p-2 flex items-center justify-center hover:bg-[#b3aad5] ${currentTool === 'eraser' ? 'bg-[#b3aad5]' : ''}`} onClick={()=>{setCurrentTool('eraser')}}>
                <LuEraser  />
            </div>        
            <div className={`cursor-pointer m-2 p-2 flex items-center justify-center hover:bg-[#c49898]`} onClick={() => {setElements([])}}>
                <MdOutlineClear />
            </div>
            </IconContext.Provider>
    </div>
    </>
  )
}
