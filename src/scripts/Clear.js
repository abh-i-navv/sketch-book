
export const Clear = () => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0,0,canvas.clientWidth, canvas.height)
}
