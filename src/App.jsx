import { useRef, useState } from 'react'
import DrawingArea from './components/DrawingArea'
import { FaPen } from "react-icons/fa";
import { MdOutlineRectangle } from "react-icons/md";
import { MdOutlineClear } from "react-icons/md";
import { Clear } from './scripts/Clear';
import { IoRemoveOutline } from "react-icons/io5";

function App() {
  
  const [currentTool, setCurrentTool] = useState('line')
  const canvasRef = useRef(null)

  return (
    <>
      <div>
      <div className='flex flex-row justify-center items-center'>
      
      {/* <div className='border-black border-2 cursor-pointer m-2 p-2'>
        <FaPen onClick={()=>{setCurrentTool('pen')}} />
      </div> */}
      <div className='border-black border-2 cursor-pointer m-2 p-2'>
        <IoRemoveOutline onClick={()=>{setCurrentTool('line')}} />
      </div>
      <div className='border-black border-2 cursor-pointer m-2 p-2'>
        <MdOutlineRectangle onClick={()=>{setCurrentTool('rectangle')}} />
      </div>

      {/* <div className='border-black border-2 cursor-pointer m-2 p-2'>
        <MdOutlineClear onClick={Clear(canvasRef)}/>
      </div> */}

      </div>
        <DrawingArea currentTool={currentTool}/>
      </div>
    </>
  )
}

export default App
