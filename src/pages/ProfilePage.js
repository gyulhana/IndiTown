import Profile from '../components/Profile'
import Nav from '../components/Nav'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { ApiUtils } from '../utils/api'

const StyledNav = styled.nav`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: #fff;
  text-align: center;
  font-weight: 500;
`

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    _id: '',
    image: '',
    followers: [],
    following: [],
    likes: [],
    posts: [],
  })

  const getUserInfoAsync = async (userId) => {
    const data = await ApiUtils.getUsersInfo(userId)
    if (data) {
      console.log(data)
      setUserData({ ...data })
    }
    console.log(userData)
    return data
  }

  useEffect(() => {
    getUserInfoAsync('617f8a69188c7c785b197411')
  }, [])

  const SpinnerWrapper = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
  `
  const StyledNav = styled.nav`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background-color: #fff;
    text-align: center;
    font-weight: 500;
  `

  return (
    <div>
      <Profile size="large" />
      <StyledNav>
        <Link to="/profile/writes">모집내역</Link>
        <Link to="/profile/participant">참여내역</Link>
        <Link to="/profile/likes">관심내역</Link>
      </StyledNav>
      <Nav style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <Nav.Item title="모집내역" index="writes">
          <Profile></Profile>
        </Nav.Item>
        <Nav.Item title="참여내역" index="participant">
          참여
        </Nav.Item>
        <Nav.Item title="관심내역" index="likes">
          관심
        </Nav.Item>
      </Nav>
    </div>
  )
}
/*<StyledNav>
        <Link to="/profile/writes">모집내역</Link>
        <Link to="/profile/participant">참여내역</Link>
        <Link to="/profile/likes">관심내역</Link>
      </StyledNav> */
export default ProfilePage
