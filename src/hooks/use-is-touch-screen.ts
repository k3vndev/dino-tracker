import { useEffect, useState } from 'react'

export const useIsTouchScreen = () => {
  const [isTouchScreen, setIsTouchScreen] = useState(false)

  useEffect(() => {
    const checkTouchScreen = () => {
      const isTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsTouchScreen(isTouchScreen)
    }
    checkTouchScreen()

    window.addEventListener('resize', checkTouchScreen)
    window.addEventListener('click', checkTouchScreen)

    return () => {
      window.removeEventListener('resize', checkTouchScreen)
      window.removeEventListener('click', checkTouchScreen)
    }
  }, [])

  return isTouchScreen
}
