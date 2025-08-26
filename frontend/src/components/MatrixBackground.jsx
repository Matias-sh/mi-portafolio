import React, { useEffect, useRef } from 'react'

const MatrixBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    // Configurar tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Caracteres para el efecto matriz
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const chars = matrixChars.split('')

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    
    // Array para almacenar la posición Y de cada columna
    const drops = Array(columns).fill(0).map(() => Math.random() * canvas.height / fontSize)

    // Función de animación
    const draw = () => {
      // Semi-transparente negro para crear el efecto de desvanecimiento
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00ff41' // Color verde matriz
      ctx.font = `${fontSize}px monospace`

      // Dibujar caracteres cayendo
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx.fillStyle = `rgba(0, 255, 65, ${Math.random() * 0.5 + 0.1})` // Opacidad variable
        ctx.fillText(text, x, y)

        // Resetear la gota cuando llega al final o aleatoriamente
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none opacity-30"
      style={{ zIndex: 1 }}
    />
  )
}

export default MatrixBackground