import styled from '@emotion/styled'
import axios from 'axios'
import { useCallback } from 'react'
import ContentsEdit from '../components/ContentsEdit'
import Text from '../components/Text'
import theme from '../themes'
import ContentEditProvider from '../contexts/ContentEditProvider'

const Container = styled.div`
  margin: 1rem;
  background-color: white;
  border-radius: 0.8rem;
`
const Header = styled.div`
  border-bottom: 1px solid ${theme.colors.gray_2};
  display: flex;
  justify-content: center;
  padding: 1rem;
`

const ContentEditPage = () => {
  const API_END_POINT = 'http://13.209.30.200'
  const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxNzc5OTliNDdlYzMzMjlkNDM0YjkwYyIsImVtYWlsIjoiYUBhLmEifSwiaWF0IjoxNjM1MzE2OTY1fQ._m_M1OchkSKUL88dxYwFlNITRgYDjodN9cQdL3RHyWY`

  const handleSubmitContent = useCallback(
    async (data) => {
      return await axios({
        method: 'post',
        url: `${API_END_POINT}/posts/create`,
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
        data,
      }).then((response) => response.data)
    },
    [TOKEN]
  )

  return (
    <ContentEditProvider handleSubmitContent={handleSubmitContent}>
      <Container>
        <Header>
          <Text strong block size="h5">
            게시물 만들기
          </Text>
        </Header>
        <ContentsEdit style={{ padding: '1rem' }} />
      </Container>
    </ContentEditProvider>
  )
}

export default ContentEditPage
