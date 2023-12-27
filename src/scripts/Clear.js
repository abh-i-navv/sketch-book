
export const Clear = (canvasRef) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0,0,canvas.clientWidth, canvas.height)
}
