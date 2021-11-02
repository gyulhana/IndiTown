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
  const [userInfo] = useSessionStorage('IndiTown')
  const { token } = userInfo

  const initialContents = useAsync(async () => {
    return await ApiUtils.getPostsList()
  }, [])

  const handleAddContent = useCallback(
    async (content) => {
      return await ApiUtils.createContent({ token, content })
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
