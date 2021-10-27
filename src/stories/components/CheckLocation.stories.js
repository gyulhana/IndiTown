import CheckLocation from '../../components/CheckLocation'
import LocationProvider from '../../contexts/LocationProvider'

export default {
  title: 'Component/CheckLocation',
  component: CheckLocation,
}

export const Default = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', width: 375, height: 600 }}>
      <LocationProvider>
        <CheckLocation />
      </LocationProvider>
    </div>
  )
}
