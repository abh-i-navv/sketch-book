import { useRef, useState } from 'react'
import DrawingArea from './components/DrawingArea'
import { FaPen } from "react-icons/fa";
import { MdOutlineRectangle } from "react-icons/md";
import { MdOutlineClear } from "react-icons/md";
import { IoRemoveOutline } from "react-icons/io5";
import { DrawProvider } from './context/useDraw';
import { IoEllipseOutline } from "react-icons/io5";
import { GoDiamond } from "react-icons/go";
import { IoTriangleOutline } from "react-icons/io5";
import { LuEraser } from "react-icons/lu";

function App() {
  
  const [currentTool, setCurrentTool] = useState('pen')
  const [elements, setElements] = useState([])
  const canvasRef = useRef(null)

  return (
    <DrawProvider value={{elements,setElements}}>
      <>
        <div>
        <div className='flex flex-row justify-center items-center'>
        
        
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

        </div>
          <DrawingArea currentTool={currentTool}/>
        </div>
      </>
    </DrawProvider>
  )
}

export default App
