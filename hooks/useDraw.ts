import {useEffect, useRef, useState} from 'react'
 
const useDraw = (onDraw: ({ctx, currentPoint, prevPoint}: Draw) => void) => {
    const [mouseDown, setMouseDown] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const prevPoint = useRef<null | Point>(null)

    const onMouseDown = () => setMouseDown(true)

    const clear = () => {
        
    }
    useEffect(()=>{
        const handler = (e: MouseEvent) => {
            if(!mouseDown) return
            const currentPoint = computePointInCanvas(e)
            const ctx = canvasRef.current?.getContext("2d")
            if(!ctx || !currentPoint) return

            onDraw({ctx, currentPoint, prevPoint: prevPoint.current})
            prevPoint.current = currentPoint    
        }
        const computePointInCanvas = (e: MouseEvent) => {
            const canvas = canvasRef.current
            if(!canvas) return

            const rectangle = canvas.getBoundingClientRect()
            const x = e.clientX - rectangle.left
            const y = e.clientY - rectangle.top

            return {x,y}
        }

        const mouseUpHandler = () => {
            setMouseDown(false)
            prevPoint.current = null
        }
        //add event listeners
        canvasRef.current?.addEventListener('mousemove', handler)
        window.addEventListener('mouseup', mouseUpHandler)
        //remove event listeners
        return () => {
            canvasRef.current?.removeEventListener('mousemove',handler)
            window.removeEventListener('mouseup', mouseUpHandler)
         }
    },[onDraw])

    return {canvasRef, onMouseDown}
}
 
export default useDraw;