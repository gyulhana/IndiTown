/*global kakao*/
import styled from '@emotion/styled'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { useLocation } from '../contexts/LocationProvider'

const CheckLocationContainer = styled.div`
  padding: 1.25rem 2rem;
  height: 100vh;
  box-sizing: border-box;
`
const MapLocation = styled.div`
  width: 19.5rem;
  height: 22.625rem;
  border-radius: 0.825rem;
  pointer-events: 'none';
  position: 'relative';
  margin: 3.5rem auto;
`

const FindButtonStyle = {
  width: '100%',
  padding: '0.875rem',
}

const FindButtonText = styled.span`
  font-size: 1.25rem;
  margin-left: 1rem;
  vertical-align: text-bottom;
`

const NextStep = styled.div`
  text-align: center;
  opacity: 0;
  transform: translateY(50%);
  transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);

  &.checked {
    opacity: 1;
    transform: translateY(0);
  }
`

const Address = styled.div`
  color: #333;
  margin: 3.25rem auto;
  font-size: 1.25rem;
  height: 1.25rem;
  font-weight: 700;
  text-align: center;
`

const CheckLocation = ({ loaded = false, ...props }) => {
  const { updateLocation } = useLocation()
  const [location, setLocation] = useState({
    latitude: 33.450701,
    longitude: 126.570667,
  })
  const [address, setAddress] = useState('')
  const [isCheck, setIsCheck] = useState(false)
  const mapRef = useRef(null)

  const geocoder = useMemo(() => new kakao.maps.services.Geocoder(), [])
  const searchAddrFromCoords = useCallback(
    (coords, callback) => {
      geocoder.coord2RegionCode(coords.longitude, coords.latitude, callback)
    },
    [geocoder]
  )

  const displayCenterInfo = useCallback(
    (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].region_type === 'H') {
            setAddress(result[i].address_name)
            updateLocation(result[i].address_name)
            break
          }
        }
      }
    },
    [setAddress, updateLocation]
  )

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    })

    setTimeout(() => setIsCheck(true), 300)
  }

  useEffect(() => {
    const locationPosition = new kakao.maps.LatLng(
      location.latitude,
      location.longitude
    )
    const options = {
      center: locationPosition,
      level: 3,
    }

    const map = new kakao.maps.Map(mapRef.current, options)
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(location.latitude, location.longitude),
    })
    marker.setMap(map)
    const infoWindow = new kakao.maps.InfoWindow({
      content:
        '<div style="padding: 0.25rem; width: 160px; text-align: center;">여기에 계신가요?!</div>',
    })
    infoWindow.open(map, marker)
    map.setCenter(locationPosition)
    searchAddrFromCoords(location, displayCenterInfo)
  }, [location, searchAddrFromCoords, displayCenterInfo])

  return (
    <CheckLocationContainer>
      <MapLocation ref={mapRef} {...props} />
      <Address>{isCheck ? address : ''}</Address>
      <Button
        primary={false}
        style={FindButtonStyle}
        onClick={getCurrentPosition}
      >
        <svg
          width="15"
          height="22"
          viewBox="0 0 15 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 0C3.35357 0 0 3.443 0 7.7C0 13.475 6.02565 22 7.5 22C8.97435 22 15 13.475 15 7.7C15 3.443 11.6464 0 7.5 0ZM7.5 10.45C6.02143 10.45 4.82143 9.218 4.82143 7.7C4.82143 6.182 6.02143 4.95 7.5 4.95C8.97857 4.95 10.1786 6.182 10.1786 7.7C10.1786 9.218 8.97857 10.45 7.5 10.45Z"
            fill="#F5F5F5"
          />
        </svg>
        <FindButtonText>나의 타운 찾기</FindButtonText>
      </Button>
      <NextStep className={isCheck ? 'checked' : ''}>
        <Link to={'/signup'}>
          <Button
            primary={true}
            style={{
              marginTop: 1,
              width: '100%',
              padding: '0.313rem 0.625rem',
            }}
          >
            넘어가기
          </Button>
        </Link>
      </NextStep>
    </CheckLocationContainer>
  )
}

export default CheckLocation
