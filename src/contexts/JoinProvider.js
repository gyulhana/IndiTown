import { createContext, useContext } from 'react'
import useToggle from '../hooks/useToggle'

const JoinContext = createContext()
export const useJoinContext = () => useContext(JoinContext)

const JoinProvider = ({ children }) => {
  const [openModal, setOpenModal] = useToggle(false)

  return (
    <JoinContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </JoinContext.Provider>
  )
}

export default JoinProvider
