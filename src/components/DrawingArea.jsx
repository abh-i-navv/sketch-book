import React, { useState,useRef, useEffect } from 'react'
import rough from 'roughjs';

const gen = rough.generator()




function DrawingArea(props) {

    const canvasRef = useRef(null)
    const {currentTool} = props
    const [isDrawing, setDrawing] = useState(false)
    const [prevPos,setPrevPos] = useState({x:0,y:0})
    const [elements, setElements] = useState([])
    const [points,setPoints] = useState([])

    const createElement = (x1,y1,x2,y2,pointsArr) => {

      // creating line element
      if(currentTool === 'line'){
        const element = gen.line(x1,y1,x2,y2)
        return {x1,y1,x2,y2, element}
      }

      // creating RECTANGLE element
      if(currentTool === 'rectangle'){
        const element = gen.rectangle(x1,y1,x2-x1,y2-y1)
        return {x1,y1,x2,y2, element}
      }

      //creating pen element
      if(currentTool === 'pen') {
        const element = gen.linearPath(pointsArr)
        return {x1,y1,x2,y2, element}
      }
    
    }

    useEffect(()=>{

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      ctx.clearRect(0,0,canvas.width,canvas.height)      
      
      const roughCanvas =  rough.canvas(canvas)

      elements.forEach((obj) => {
        
        // this is for drawing line and rectangle elements
        const {element} = obj
        if(element){
          roughCanvas.draw(element)
        }

        // this is for drawing elements of pen
        else if(obj){
          roughCanvas.draw(obj)
        }
      })

      const onMouseDown = (e) =>{
        setDrawing(true)
        const x = e.clientX - canvas.offsetLeft
        const y = e.clientY - canvas.offsetTop
        
        if(currentTool === 'pen'){  

          // clearing array of points
          setPoints([])

          // setting first point on mouse down
          setPoints(pts=> [...pts,[x,y]])
          const {element} = createElement(x,y,x,y,points)

          //initialising the linearShape element
          setElements(prev => [...prev,element])
        }

        // creating initial element for line and rectangle
        else{
          const element = createElement(x,y,x,y)
          setElements(prev => [...prev,element])
        }
        
      }

      const onMouseMove = (e) => {
          const x = e.clientX - canvas.offsetLeft
          const y = e.clientY - canvas.offsetTop

          if(!isDrawing)  return

          if(currentTool === 'pen'){            
            
            // updating array of points on mouse movement
            setPoints(points=> [...points,[x,y]])

            // getting index of last element in array
            const index = elements.length -1
            const {x1,y1} = elements[index]

            //updating element according to the movement of mouse
            const {element} = createElement(x1,y1,x,y,points)
            const tempElements = [...elements]
            tempElements[index] = element
            setElements(tempElements)
          }
          
          // for line and rectangle
          else{
            // getting index of last element in array
            const index = elements.length -1
            const {x1,y1} = elements[index]
  
            //updating element according to the movement of mouse
            const element = createElement(x1,y1,x,y)
  
            const tempElements = [...elements]
            tempElements[index] = element
            setElements(tempElements)
          }

      }

      const onMouseUp = () => {
        
        setDrawing(false)
        ctx.closePath()
        
      }

      //adding event listeners for mouse actions
      canvas.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
      canvas.addEventListener('mousedown', onMouseDown)

      return() => {
        // clearing event listeners
        canvas.removeEventListener('mousedown', onMouseDown)
        canvas.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

    },[elements,currentTool,isDrawing])

  return (
    <div className='flex justify-center'>
    <canvas ref = {canvasRef} height={800} width={800} className='border-2 border-black' id='canvas'></canvas>
    </div>
  )
}

export default DrawingArea