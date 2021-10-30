import styled from '@emotion/styled'
import axios from 'axios'
import { useCallback } from 'react'
import ContentsEdit from '../components/ContentsEdit'
import Text from '../components/Text'
import theme from '../themes'

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
  const handleSubmitContnet = useCallback(async (post) => {
    return await axios
      .post(`https://jsonplaceholder.typicode.com/posts`, post)
      .then((response) => response.data)
  }, [])

  return (
    <Container>
      <Header>
        <Text strong block size="h5">
          게시물 만들기
        </Text>
      </Header>
      <ContentsEdit style={{ padding: '1rem' }} />
    </Container>
  )
}

export default ContentEditPage
