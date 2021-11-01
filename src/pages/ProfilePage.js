import Profile from '../components/Profile'
import Nav from '../components/Nav'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { ApiUtils } from '../utils/api'
import useSessionStorage from '../hooks/useSessionStorage'
import theme from '../themes'
import ContentsSummaryList from '../components/ContentsSummaryList'
import ContentsProvider from '../contexts/ContentsProvider'

const ProfileContainer = styled.div`
  margin: 1rem;
  margin-top: 5rem;
  border-radius: 12.8px;
`

const ProfileWrapper = styled.div`
  background-color: #fff;
`

const ProfilePage = () => {
  const [userInfo] = useSessionStorage('IndiTown')
  const { _id } = userInfo
  const [userData, setUserData] = useState({})
  const [myPostsList, setMyPostsList] = useState([])

  const getUserInfoAsync = async (userId) => {
    const data = await ApiUtils.getUsersInfo(userId)
    setUserData({
      ...data,
      userName: JSON.parse(data.fullName).userName,
      location: JSON.parse(data.fullName).location,
    })
    return data
  }

  const getPostsListsAsync = async () => {
    const posts = await ApiUtils.getPostsList()
    const myPosts = posts.filter((post) => post.author._id === _id)
    setMyPostsList(myPosts)
  }

  useEffect(() => {
    getUserInfoAsync(_id)
    getPostsListsAsync()
  }, [])

  return (
    <ProfileContainer>
      <ProfileWrapper>
        <Profile
          lazy
          threshold={0.5}
          size="large"
          nickName={userData.userName}
          email={userData.email}
          town={userData.location}
          style={{ margin: '1rem 1rem 0 1rem', padding: '1.75rem 0 1.75rem' }}
        />
      </ProfileWrapper>
      <Nav
        style={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          filter: 'none',
          borderBottom: `1px solid ${theme.colors.gray_2}`,
        }}
      >
        <Nav.Item title="모집내역" index="profile/writes">
          <ContentsProvider initialContents={myPostsList}>
            <ContentsSummaryList style={{ padding: '1rem 0 0' }} />
          </ContentsProvider>
        </Nav.Item>
        <Nav.Item title="참여내역" index="profile/participant">
          참여
        </Nav.Item>
        <Nav.Item title="관심내역" index="profile/likes">
          관심
        </Nav.Item>
      </Nav>
    </ProfileContainer>
  )
}

export default ProfilePage
