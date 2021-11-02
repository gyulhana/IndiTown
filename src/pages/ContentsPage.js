import axios from 'axios'
import { useCallback } from 'react'
import { useAsync } from '../hooks'
import { Link } from 'react-router-dom'
import ContentsProvider from '../contexts/ContentsProvider'
import ContentsSummaryList from '../components/ContentsSummaryList'
import Spinner from '../components/Spinner'
import WriteButton from '../components/WriteButton'
import styled from '@emotion/styled'
import useSessionStorage from '../hooks/useSessionStorage'
import { ApiUtils } from '../utils/api'

const ContentsPage = ({ subMenu }) => {
  const API_END_POINT = 'http://13.209.30.200'

  const [userInfo] = useSessionStorage('IndiTown')
  const { token } = userInfo

  const initialContents = useAsync(async () => {
    return await ApiUtils.getPostsList()
  }, [])

  const handleAddContent = useCallback(
    async (content) => {
      return await axios({
        method: 'post',
        url: `${API_END_POINT}/posts/create`,
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: content,
      }).then((response) => response.data)
    },
    [token]
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
      handleAddContent={handleAddContent}
    >
      <div>
        {initialContents.isLoading ? (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        ) : (
          <ContentsSummaryList subMenu={subMenu} />
        )}
      </div>
      <Link to={`/content/${subMenu}/edit`}>
        <WriteButton />
      </Link>
    </ContentsProvider>
  )
}

export default ContentsPage
