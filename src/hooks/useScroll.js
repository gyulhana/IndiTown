import { useEffect, useRef, useState } from 'react'

const useScroll = () => {
  const [state, setState] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    const handleScroll = () => {
      setState({
        x: element.scrollLeft,
        y: element.scrollTop,
      })
    }

    element.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [ref])

  return [ref, state]
}

export default useScroll
