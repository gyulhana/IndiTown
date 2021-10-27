import { createContext, useContext, useState } from 'react'

const LocationContext = createContext()

export const useLocation = () => useContext(LocationContext)

const LocationProvider = ({ children }) => {
  const [currentLocation, setLocation] = useState('')

  const updateLocation = (locationInfo) => {
    setLocation(locationInfo)
  }

  return (
    <LocationContext.Provider value={{ currentLocation, updateLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

export default LocationProvider
