import { createContext, useContext, useState } from 'react'

const UserContext = createContext()
export const useUserInfo = () => useContext(UserContext)

const LocationProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({})
  const [token, setToken] = useState('')

  const updateUserInfo = (userInformation) => {
    setUserInfo(userInformation)
  }

  const updateToken = (userToken) => {
    setToken(userToken)
  }

  return (
    <UserContext.Provider
      value={{ userInfo, token, updateUserInfo, updateToken }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default LocationProvider
