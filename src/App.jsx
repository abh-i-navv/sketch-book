import { useRef, useState,useEffect } from 'react'
import DrawingArea from './components/DrawingArea'
import ToolBar from './components/ToolBar';
import { DrawProvider } from './context/useDraw';

function App() {
  
  const [currentTool, setCurrentTool] = useState('pen')
  const [elements, setElements] = useState([])
  const canvasRef = useRef(null)
  const [strokeWidth, setStrokeWidth] = useState('5')
  const [stroke, setStroke] = useState('#000000')
  const [roughness, setRoughness] = useState(0)
  const [ elementHistory, setElementHistory] = useState([])
  const [isMoving, setMoving] = useState([])
  const [scale, setScale] = useState(1)
  
  return (
      <DrawProvider value={{elements,setElements, currentTool, setCurrentTool, setStroke, stroke,
      setStrokeWidth, strokeWidth, roughness, setRoughness, elementHistory, setElementHistory, isMoving, setMoving,scale, setScale,canvasRef}}>
        <>
          <div className='overflow-y-scroll no-scrollbar overflow-hidden'>
          <div className='flex flex-col justify-center items-center '>
      
          <ToolBar />

            <DrawingArea currentTool={currentTool}/>
          </div>
          </div>
        </>
      </DrawProvider>
  )
}

export default App
