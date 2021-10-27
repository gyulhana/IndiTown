import { useCallback, useState, useRef } from 'react'
const useAsyncFn = (fn, deps) => {
  // 실행할 함수, dependency
  const lastCallId = useRef(0) //실행된 id를 기록하기
  const [state, setState] = useState({
    isLoading: false,
  })

  const callback = useCallback((...args) => {
    const callId = ++lastCallId.current // 아이디 증가

    if (!state.isLoading) {
      setState({ ...state, isLoading: true })
    }

    return fn(...args).then(
      (value) => {
        // 제일 마지막으로 호출된 콜백만 상태에 기록 (원래는 첫번째와 두번째 누른게 있을시 첫번째만 기록)
        callId === lastCallId.current && setState({ value, isLoading: false })
        return value
      },
      (error) => {
        callId === lastCallId.current && setState({ error, isLoading: false })
        setState({ error, isLoading: false })
        return error
      }
    )
    // eslint-disable-next-line
  }, deps)

  return [state, callback]
}

export default useAsyncFn
