import axios from 'axios'
import { useCallback } from 'react'
import { useAsync } from '../hooks'
import { Link } from 'react-router-dom'
import ContentsProvider from '../contexts/ContentsProvider'
import ContentsSummaryList from '../components/ContentsSummaryList'
import Spinner from '../components/Spinner'
import WriteButton from '../components/WriteButton'
import styled from '@emotion/styled'

const ContentsPage = ({ subMenu }) => {
  const API_END_POINT = 'http://13.209.30.200'
  const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxNzc5OTliNDdlYzMzMjlkNDM0YjkwYyIsImVtYWlsIjoiYUBhLmEifSwiaWF0IjoxNjM1MzE2OTY1fQ._m_M1OchkSKUL88dxYwFlNITRgYDjodN9cQdL3RHyWY`

  const initialContents = useAsync(async () => {
    return await axios
      .get(`${API_END_POINT}/posts/channel/616a205422996f0bc94f6e23`)
      .then((response) => response.data)
  }, [])

  const handleAddContent = useCallback(
    async (content) => {
      return await axios({
        method: 'post',
        url: `${API_END_POINT}/posts/create`,
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
        data: content,
      }).then((response) => response.data)
    },
    [TOKEN]
  )

  const handleDeleteContent = useCallback(
    async (id) => {
      return await axios({
        method: 'delete',
        url: `${API_END_POINT}/posts/delete`,
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
        data: {
          id,
        },
      }).then(() => ({ id }))
    },
    [TOKEN]
  )

  const SpinnerWrapper = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
  `

  return (
    <ContentsProvider
      initialContents={initialContents.value?.filter(
        (content) => JSON.parse(content.title).type === subMenu
      )}
      handleDeleteContent={handleDeleteContent}
      handleAddContent={handleAddContent}
    >
      <div>
        {initialContents.isLoading ? (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        ) : (
          <ContentsSummaryList />
        )}
      </div>
      <Link to={`/${subMenu}/edit`}>
        <WriteButton />
      </Link>
    </ContentsProvider>
  )
}

export default ContentsPage
