import React, { useState,useRef, useEffect } from 'react'
import rough from 'roughjs';

const gen = rough.generator()




function DrawingArea(props) {

    const canvasRef = useRef(null)
    const {currentTool} = props
    const [isDrawing, setDrawing] = useState(false)
    const [prevPos,setPrevPos] = useState({x:0,y:0})
    const [elements, setElements] = useState([])

    const createElement = (x1,y1,x2,y2,ctx) => {

      if(currentTool === 'line'){
        const element = gen.line(x1,y1,x2,y2)
        return {x1,y1,x2,y2, element}
      }

      if(currentTool === 'rectangle'){
        const element = gen.rectangle(x1,y1,x2-x1,y2-y1)
        return {x1,y1,x2,y2, element}
      }
    
    }

    useEffect(()=>{
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0,0,canvas.width,canvas.height)      

      const roughCanvas =  rough.canvas(canvas)

      elements.forEach(({element}) => {roughCanvas.draw(element)})

      const onMouseDown = (e) =>{
        setDrawing(true)
        const x = e.clientX - canvas.offsetLeft
        const y = e.clientY - canvas.offsetTop
        
        if(currentTool === 'pen'){            
          setPrevPos({x,y})
          ctx.beginPath()
          ctx.moveTo(x,y)
          
        }

        const element = createElement(x,y,x,y)
        setElements(prev => [...prev,element])
        
      }

      const onMouseMove = (e) => {
          const x = e.clientX - canvas.offsetLeft
          const y = e.clientY - canvas.offsetTop

          if(!isDrawing)  return

          if(currentTool === 'pen'){            
            ctx.lineTo(x,y)
            ctx.stroke()
            setPrevPos({x,y})
          }
          
          const index = elements.length -1
          const {x1,y1} = elements[index]

          const element = createElement(x1,y1,x,y)

          const temp = [...elements]
          temp[index] = element
          setElements(temp)

      }

      const onMouseUp = () => {
        ctx.closePath()
          setDrawing(false)
          console.log(prevPos)
      }

      canvas.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
      canvas.addEventListener('mousedown', onMouseDown)

      return() => {
        canvas.removeEventListener('mousedown', onMouseDown)
        canvas.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

    },[elements])

  return (
    <div className='flex justify-center'>
    <canvas ref = {canvasRef} height={800} width={800} className='border-2 border-black'></canvas>
    </div>
  )
}

export default DrawingArea
