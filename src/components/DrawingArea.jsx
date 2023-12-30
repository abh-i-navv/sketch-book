import React, { useState,useRef, useEffect } from 'react'
import rough from 'roughjs';
import useDraw from '../context/useDraw';

const gen = rough.generator()

function DrawingArea() {

    const canvasRef = useRef(null)
    const [isDrawing, setDrawing] = useState(false)
    // const [prevPos,setPrevPos] = useState({x:0,y:0})
    // const [elements, setElements] = useState([])
    const {elements, setElements,strokeWidth,setStrokeWidth,stroke,setStroke, setRoughness,roughness,currentTool,elemenHistory, setElementHistory} = useDraw()
    const [points,setPoints] = useState([])
    // const [strokeWidth, setStrokeWidth] = useState('5')
    // const [stroke, setStroke] = useState('black')
    // const [roughness, setRoughness] = useState(0)


    const createElement = (x1,y1,x2,y2,options,pointsArr ) => {

      // creating line element
      if(currentTool === 'line'){
        const element = gen.line(x1,y1,x2,y2, options)
        return {x1,y1,x2,y2, element}
      }

      // creating RECTANGLE element
      if(currentTool === 'rectangle'){
        const element = gen.rectangle(x1,y1,x2-x1,y2-y1,options)
        return {x1,y1,x2,y2, element}
      }

      // creating ellipse element
      if(currentTool === 'ellipse'){

        // ellipse(centerX, centerY, width, height)
        const element = gen.ellipse((x1+x2)/2,(y1+y2)/2,x2-x1,y2-y1, options)
        return {x1,y1,x2,y2, element}

      }

      // creating rhombus element
      if(currentTool === 'rhombus'){

        // used some maths for calculating points of rhombus
        // A-> top, B-> left, C-> bottom, D-> right
        const A = [x1+Math.floor((x2-x1)/2) , y1] 
        const B = [x1, Math.floor((y2-y1)/2)  + (y2+y1)/2]
        const C = [x1+Math.floor((x2-x1)/2) , y2-y1+y2]
        const D = [x2,Math.floor((y2-y1)/2)  + (y2+y1)/2]
        const pts = [A,B,C,D]


        const element = gen.polygon(pts,options)
        return {x1,y1,x2,y2, element}
      }

      // creating triangle element
      if(currentTool === 'triangle'){

        // used some maths for calculating points of triangle
        // A-> top, B-> left, C-> right
        const A = [x1+Math.floor((x2-x1)/2) , y1] 
        const B = [x1, y2]
        const C = [x2, y2]
        const pts = [A,B,C,A]


        const element = gen.polygon(pts,options)
        return {x1,y1,x2,y2, element}
      }

      //creating pen element
      if(currentTool === 'pen') {
        const element = gen.curve(pointsArr,options)
        return {x1,y1,x2,y2, element}
      }

      //creating eraser element
      if(currentTool === 'eraser') {
        const element = gen.curve(pointsArr,options)
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
        
        if(currentTool === 'pen' || currentTool === 'eraser'){  
          
          // clearing array of points
          setPoints([])
          let options = {stroke:stroke, strokeWidth:strokeWidth, roughness:roughness}
          if(currentTool === 'eraser'){
            options = {stroke: "white",strokeWidth: 50, roughness: 0}
          }

          // setting first point on mouse down
          setPoints(pts=> [...pts,[x,y]])
          const {element} = createElement(x,y,x,y,options,points)

          //initialising the linearShape element
          setElements(prev => [...prev,element])
        }

        // creating initial element for line and rectangle
        else{
          const options = {stroke:stroke, strokeWidth, roughness:roughness}
          const element = createElement(x,y,x,y,options)
          setElements(prev => [...prev,element])
        }
        
      }

      const onMouseMove = (e) => {
          const x = e.clientX - canvas.offsetLeft
          const y = e.clientY - canvas.offsetTop

          if(!isDrawing)  return
          
          // getting index of last element in array
          const index = elements.length -1
          const {x1,y1} = elements[index]

          if(currentTool === 'pen' || currentTool === 'eraser'){            
            
            // updating array of points on mouse movement
            setPoints(points=> [...points,[x,y]])

            let options = {stroke:stroke, strokeWidth:strokeWidth, roughness:roughness}
            if(currentTool === 'eraser'){
              options = {stroke: "white",strokeWidth: 50, roughness: 0}
            }

            //updating element according to the movement of mouse
            const {element} = createElement(x1,y1,x,y,options,points)
            const tempElements = [...elements]
            tempElements[index] = element
            setElements(tempElements)
          }
          
          // for line and rectangle
          else{
  
            //updating element according to the movement of mouse
            const options = {stroke:stroke, strokeWidth, roughness:roughness}
            const element = createElement(x1,y1,x,y, options)
  
            const tempElements = [...elements]
            tempElements[index] = element
            setElements(tempElements)
          }

      }

      const onMouseUp = () => {
        
        setDrawing(false)
        setPoints([])
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
    <div className='flex justify-center '>
    <canvas ref = {canvasRef} height={window.innerHeight} width={window.innerWidth} 
    className={` border-2 border-black m-0 ${currentTool === 'eraser' ? "cursor-cell" : "cursor-crosshair"}`} id='canvas'></canvas>
    </div>
  )
}

export default DrawingArea