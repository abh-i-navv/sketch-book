import React, { useState,useRef, useEffect } from 'react'

function DrawingArea(props) {

    const canvasRef = useRef(null)
    const {currentTool} = props
    const [isDrawing, setDrawing] = useState(false)
    const [prevPos,setPrevPos] = useState({x:0,y:0})

    useEffect(()=>{
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      const onMouseDown = (e) =>{
        setDrawing(true)
        const x = e.clientX - canvas.offsetLeft
        const y = e.clientY - canvas.offsetTop
        setPrevPos({x,y})

        ctx.beginPath()
        ctx.moveTo(x,y)
        
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
            
            if(currentTool === 'rectangle'){
              
              const prevShape = {
                x: prevPos.x,
                y: prevPos.y,
                width: x-prevPos.x,
                height: y-prevPos.y
              }
            ctx.clearRect(prevShape.x, prevShape.y, prevShape.width, prevShape.height)
            ctx.strokeRect(prevPos.x,prevPos.y, x-prevPos.x, y-prevPos.y)
            ctx.stroke()
          }

      }

      const onMouseUp = () => {
        ctx.closePath()
          setDrawing(false)
          setPrevPos({})
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

    },[isDrawing])

  return (
    <div className='flex justify-center'>
    <canvas ref = {canvasRef} height={800} width={800} className='border-2 border-black'></canvas>
    </div>
  )
}

export default DrawingArea
