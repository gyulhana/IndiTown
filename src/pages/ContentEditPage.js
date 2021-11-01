import styled from '@emotion/styled'
import axios from 'axios'
import { useCallback } from 'react'
import ContentsEdit from '../components/ContentsEdit'
import Text from '../components/Text'
import theme from '../themes'
import ContentEditProvider from '../contexts/ContentEditProvider'
import useSessionStorage from '../hooks/useSessionStorage'

const Container = styled.div`
  margin: 5rem 1rem 4rem 1rem;
  background-color: white;
  border-radius: 0.8rem;
`
const Header = styled.div`
  border-bottom: 1px solid ${theme.colors.gray_2};
  display: flex;
  justify-content: center;
  padding: 1rem;
`

const ContentEditPage = ({ subMenu, match }) => {
  const API_END_POINT = 'http://13.209.30.200'
  const [userInfo] = useSessionStorage('IndiTown')
  const { token } = userInfo

  const handleSubmitContent = useCallback(
    async (data) => {
      return await axios({
        method: 'post',
        url: `${API_END_POINT}/posts/create`,
        headers: {
          authorization: `Bearer ${token}`,
        },
        data,
      }).then((response) => response.data)
    },
    [token]
  )

  return (
    <Container>
      <ContentEditProvider
        handleSubmitContent={handleSubmitContent}
        subMenu={match.params.subMenu}
      >
        <Header>
          <Text strong block size="h5">
            게시물 만들기
          </Text>
        </Header>
        <ContentsEdit style={{ padding: '1rem' }} />
      </ContentEditProvider>
    </Container>
  )
}

export default ContentEditPage
