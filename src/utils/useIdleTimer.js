import { useRef, useState, useEffect } from 'react'

export const useIdleTimer = (time) => {
  const [isIdle, setIsIdle] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const startTimer = () => {
    timer.current = setTimeout(() => {
      setIsIdle(true)
    }, time)
  }
  const resetTimer = () => {
    clearTimeout(timer.current)
    startTimer()
  }

  const handleMouseMove = () => {
    setIsIdle(false)
    resetTimer()
  }

  return isIdle
}
