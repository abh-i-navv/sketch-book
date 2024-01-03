import React, { useState,useRef, useEffect } from 'react'
import rough from 'roughjs';
import useDraw from '../context/useDraw';

function cartesianDistance(x1,y1, x2,y2){
  return Math.round((Math.sqrt(Math.pow(y2-y1,2) + Math.pow(x2-x1,2))))
}




const gen = rough.generator()

function DrawingArea() {

    const canvasRef = useRef(null)
    const [action, setAction] = useState('none')
    const [movingElement, setMovingElement] = useState(null) // for keeping track of the selected element using selection tool
    
    const {elements, setElements,strokeWidth,setStrokeWidth,stroke,setStroke, setRoughness,
      roughness, currentTool,setCurrentTool,elemenHistory, setElementHistory, isMoving, setMoving} = useDraw()
    const [points,setPoints] = useState([])


    const createElement = (id, type,x1,y1,x2,y2,options,pointsArr ) => {

      // creating line element
      if(currentTool === 'line' || type === 'line'){
        const element = gen.line(x1,y1,x2,y2, options)
        return {id, type,x1,y1,x2,y2, element, options}
      }

      // creating RECTANGLE element
      if(currentTool === 'rectangle' || type === 'rectangle'){
        
        const element = gen.rectangle(x1,y1,x2-x1,y2-y1,options)
        
        return {id,type,x1,y1,x2,y2, element}
      }

      // creating ellipse element
      if(currentTool === 'ellipse' || type === 'ellipse'){

        // ellipse(centerX, centerY, width, height)
        const element = gen.ellipse((x1+x2)/2,(y1+y2)/2,x2-x1,y2-y1, options)
        return {id,type,x1,y1,x2,y2, element}

      }

      // creating rhombus element
      if(currentTool === 'rhombus' || type === 'rhombus'){

        // used some maths for calculating points of rhombus
        // A-> top, B-> left, C-> bottom, D-> right
        const A = [x1+Math.floor((x2-x1)/2) , y1] 
        const B = [x1, Math.floor((y2-y1)/2)  + (y2+y1)/2]
        const C = [x1+Math.floor((x2-x1)/2) , y2-y1+y2]
        const D = [x2,Math.floor((y2-y1)/2)  + (y2+y1)/2]
        const pts = [A,B,C,D]


        const element = gen.polygon(pts,options)
        return {id,type,x1,y1,x2,y2,pts, element}
      }

      // creating triangle element
      if(currentTool === 'triangle' || type === 'triangle'){

        // used some maths for calculating points of triangle
        // A-> top, B-> left, C-> right
        const A = [x1+Math.floor((x2-x1)/2) , y1] 
        const B = [x1, y2]
        const C = [x2, y2]
        const pts = [A,B,C,A]


        const element = gen.polygon(pts,options)
        return {id,type,x1,y1,x2,y2,pts, element}
      }

      //creating pen element
      if(currentTool === 'pen' || type === 'pen') {

        const element = gen.curve(pointsArr,options)
        return {id,type,pointsArr, element}
      }

      //creating eraser element
      if(currentTool === 'eraser') {
        const element = gen.curve(pointsArr,options)
        return {id,type,x1,y1,x2,y2, element}
      }
    
    }

    // for finding if a element exists on the given point
    const elementFinder = (x,y,element) => {
      const {x1,y1,x2,y2,type} = element

      // Line -> AB, to check if a point P lies on line => dist(AB) = dist(AP) + dist(PB)
      if(type === 'line'){
        const lineDist = cartesianDistance(x1,y1,x2,y2)
        const pointDist = cartesianDistance(x,y,x1,y1) + cartesianDistance(x,y,x2,y2)
        if( lineDist === pointDist){
          return element
        }
      }
      
      // checking for rectangle and ellipse
      else if(type === 'rectangle' || type === 'ellipse'){
        const maxX = Math.max(x1,x2)
        const maxY = Math.max(y1,y2)
        const minX = Math.min(x1,x2)
        const minY = Math.min(y1,y2)
    
        if(x <= maxX && x >= minX && y<= maxY && y>=minY){
          
          return element
        }
      }

      //if point P lies inside triangle => area(ABC) = area(PAB) + area(PAC) + area(PBC)
      else if(type === 'triangle'){
        const {pts} = element
        const A = pts[0]
        const B = pts[1]
        const C = pts[2]
        const P = [x,y]
    
        const area = (x1,y1,x2,y2,x3,y3) => {
          // Area A = [ x1(y2 – y3) + x2(y3 – y1) + x3(y1-y2)]/2 
          return Math.abs((x1*(y2-y3) + x2*(y3-y1)+ x3*(y1-y2))/2.0)
        }
        const originalArea = area(A[0],A[1],B[0],B[1],C[0],C[1])
        const testArea = area(P[0],P[1],A[0],A[1],B[0],B[1]) + area(P[0],P[1],B[0],B[1],C[0],C[1]) + area(P[0],P[1],A[0],A[1],C[0],C[1])
    
        if(originalArea === testArea) return  element
      }
    
      else if(type=== 'rhombus'){
        const {pts} = element
    
        function inside(point, vs) {
          // ray-casting algorithm based on
          // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
          
          var x = point[0], y = point[1];
          
          var inside = false;
          for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
              var xi = vs[i][0], yi = vs[i][1];
              var xj = vs[j][0], yj = vs[j][1];
              
              var intersect = ((yi > y) != (yj > y))
                  && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
              if (intersect) inside = !inside;
          }
          
          return inside;
      }
    
        if(inside([ x, y ], pts)){
          return element
        }
      }

      else if(type === 'pen'){
        // console.log(element)
        // console.log(x,y)

        const {pointsArr} = element

        for(let i =0; i<pointsArr.length; i++){

          const currX = pointsArr[i][0]
          const currY = pointsArr[i][1]

          if(Math.abs(currX-x) <=5 && Math.abs(currY-y) <= 5){
            const obj = {element:element, X: currX, Y: currY}
            return obj        
          }
        }

      }
      
    }
    
    //looping through each element and checking if point P lies on the element
    const findElement = (x,y,elements) => {
      return (elements.find(element => elementFinder(x,y,element)))
    }


    // function updateElement(index,x1,y1,x,y,options,points){
    //   const ele = createElement(index,currentTool, x1,y1,x,y,options,points)

    //   const tempEle = [...elements]
    //   tempEle[index] = ele
    //   setElements(tempEle)

    // }

    useEffect(()=>{

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      ctx.clearRect(0,0,canvas.width,canvas.height)      
      
      const roughCanvas =  rough.canvas(canvas)

      if(elements.length > 0){
        elements.forEach((obj) => {
          if(!obj)  return
          // this is for drawing elements
          if(obj.element){
            roughCanvas.draw(obj.element)
          }
          else  return
  
        })
      }

      const onMouseDown = (e) =>{

        // calculating the coordinates with reference to canvas
        const x = e.clientX - canvas.offsetLeft
        const y = e.clientY - canvas.offsetTop

        // if selection tool is selected
        if(currentTool === 'moving'){
          setAction('moving')
          if(elements){
    
            //getting the element at the point x,y
            const currElement = findElement(x,y, elements)        

            if(currElement){
              if(currElement.type ==='pen'){
                const {pointsArr} = currElement
                setPoints(pointsArr)
                
                let offsetX = x 
                let offsetY = y  
            
                setMovingElement([currElement,offsetX,offsetY])
              }
              else{

                const offsetX = x-currElement.x1
                const offsetY = y-currElement.y1
                setMovingElement([currElement,offsetX,offsetY]) //Data of selected element at point x,y
              }
            }
          }

        }
        else{
          setAction('drawing')
          const index = elements.length
          if(currentTool === 'pen' ){  
            
            // clearing array of points
            setPoints([])
            let options = {stroke:stroke, strokeWidth:strokeWidth, roughness:roughness}
                        
              // setting first point on mouse down
              setPoints(pts=> [...pts,[x,y]])
              const element = createElement(index,currentTool,x,y,x,y,options,points)
              
              //initialising the linearShape element
              setElements(prev => [...prev,element])
            
          }

          else if(currentTool === 'eraser'){
            setAction('erasing')
            if(!elements) return
            
          }
  
          // creating initial element for line and rectangle
          else{
            const options = {stroke:stroke, strokeWidth, roughness:roughness}
            const element = createElement(index,currentTool,x,y,x,y,options)
            setElements(prev => [...prev,element])
          }
          
        }

        
      }

      const onMouseMove = (e) => {
          const x = e.clientX - canvas.offsetLeft
          const y = e.clientY - canvas.offsetTop
          
          if(action === 'drawing') {
            
            // getting index of last element in array
            const index = elements.length -1
            const {x1,y1} = elements[index]
            
            if(currentTool === 'eraser')  return

            if(currentTool === 'pen' ){            
              
              // updating array of points on mouse movement
              setPoints(points=> [...points,[x,y]])
  
              let options = {stroke:stroke, strokeWidth:strokeWidth, roughness:roughness}
               
              //updating element according to the movement of mouse
              const element = createElement(index+1,currentTool, x1,y1,x,y,options,points)
              const tempElements = [...elements]
              tempElements[index] = element
              setElements(tempElements)
              
            }
            
            // for line and rectangle
            else{
    
              //updating element according to the movement of mouse
              const options = {stroke:stroke, strokeWidth, roughness:roughness}
              const element = createElement(index+1,currentTool, x1,y1,x,y, options)
    
              const tempElements = [...elements]
              tempElements[index] = element
              setElements(tempElements)
            }
          }

          else if(action === 'moving'){
            
            if(!movingElement)  return
            const type = movingElement[0].type // geting shape type
            const {options} = movingElement[0].element // getting options of the element
            
            if(type === 'pen'){
              // console.log(newX,newY)
              let pointsArr = [...points]
              
              const newX = (x-pointsArr[0][0])
              const newY = (y-pointsArr[0][1])
              let offsetX = (x-pointsArr[0][0])
              let offsetY = (y-pointsArr[0][1])
              let currDist = cartesianDistance(x,y, pointsArr[0][0], pointsArr[0][1])

              for(let i =0; i<pointsArr.length; i++){
                  
                const currX = pointsArr[i][0]
                const currY = pointsArr[i][1]
      
                const tempDist = cartesianDistance(x,y,currX,currY)
                
                if(tempDist < currDist){
                  currDist = tempDist
                  offsetX = x-currX
                  offsetY = y-currY

                }
              }

              console.log(offsetX,offsetY)
              // console.log(movingElement[1],movingElement[2])
              // const offsetAr = []

              // for(let i =0; i <pointsArr.length; i++){
              
              // }


              // console.log([x,y], [pointsArr[0][0], pointsArr[0][1]])

              const element = movingElement[0]
              
              let {id} = element
              
              for(let i =0; i<pointsArr.length; i++){
                pointsArr[i][0] = pointsArr[i][0] + offsetX
                pointsArr[i][1] = pointsArr[i][1] + offsetY
              }
              // setPoints(pointsArr)
              const updatedElement = createElement(id,type,pointsArr[0][0],pointsArr[0][1],pointsArr[1][0], pointsArr[1][1], options,pointsArr)
                
                const tempElements = [...elements]
                tempElements[id-1] = updatedElement
                setElements(tempElements)

            }
            else if(type && type != 'pen'){
              const newX = (x-movingElement[1])
              const newY = (y-movingElement[2])

                const {id,type, x1,y1,x2,y2} = movingElement[0]
                
                //updating the element on mouse move
                const updatedElement = createElement(id,type,newX,newY,newX+x2-x1, newY+y2-y1, options)
                
                const tempElements = [...elements]
                tempElements[id-1] = updatedElement
                setElements(tempElements)
                
              }

          }
          else if(action === 'erasing'){
            const tempElement = findElement(x,y,elements)
            if(tempElement){
              const updatedElements = [...elements]
              updatedElements[tempElement.id-1] = []
              setElements(updatedElements) 
            }
          }

          else{
            return
          }
          

      }

      const onMouseUp = () => {
        
        setAction('none')
        setPoints([])
        setMovingElement(null)
        ctx.closePath()
        
      }

      //adding event listeners for mouse actions
      canvas.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
      canvas.addEventListener('mousedown', onMouseDown)

      // canvas.addEventListener('touchmove', onMouseMove)
      // document.addEventListener('touchend', onMouseUp)
      // canvas.addEventListener('touchstart', onMouseDown)

      return() => {
        // clearing event listeners
        canvas.removeEventListener('mousedown', onMouseDown)
        canvas.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)

        // canvas.removeEventListener('touchstart', onMouseDown)
        // canvas.removeEventListener('touchmove', onMouseMove)
        // document.removeEventListener('touchend', onMouseUp)
        
      }

    },[elements,currentTool,action])

  return (
    <div className='flex justify-center '>
    <canvas ref = {canvasRef} height={window.innerHeight} width={window.innerWidth} 
    className={` border-2 border-[#F2F2F2] m-0 ${currentTool === 'eraser' ? "cursor-cell" : "cursor-crosshair"}`} id='canvas'></canvas>
    </div>
  )
}

export default DrawingArea