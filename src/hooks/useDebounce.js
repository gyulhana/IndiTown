import useTimeoutFn from './useTimeoutFn'
import { useEffect } from 'react'

const useDebounce = (fn, ms, deps) => {
  const [run, clear] = useTimeoutFn(fn, ms)

  useEffect(run, deps)

  return clear
}

export default useDebounce
