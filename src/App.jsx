import { useRef, useState } from 'react'
import DrawingArea from './components/DrawingArea'
import ToolBar from './components/ToolBar';
import { DrawProvider } from './context/useDraw';

function App() {
  
  const [currentTool, setCurrentTool] = useState('pen')
  const [elements, setElements] = useState([])
  const canvasRef = useRef(null)
  const [strokeWidth, setStrokeWidth] = useState('5')
  const [stroke, setStroke] = useState('black')
  const [roughness, setRoughness] = useState(0)

  return (
    <DrawProvider value={{elements,setElements, currentTool, setCurrentTool, setStroke, stroke, setStrokeWidth, strokeWidth, roughness, setRoughness}}>
      <>
        <div>
        <div className='flex flex-col justify-center items-center'>
    
        <ToolBar />

          <DrawingArea currentTool={currentTool}/>
        </div>
        </div>
      </>
    </DrawProvider>
  )
}

export default App
