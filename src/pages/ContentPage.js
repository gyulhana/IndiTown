import styled from '@emotion/styled'
import { Fragment, useCallback, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { useAsync } from '../hooks'
import ContentsProvider from '../contexts/ContentsProvider'
import ContentsDescription from '../components/ContentsDescription'
import CommentInput from '../components/CommentInput'
import CommentList from '../components/CommentList'
import Spinner from '../components/Spinner'
import theme from '../themes'
import useSessionStorage from '../hooks/useSessionStorage'
import { ApiUtils } from '../utils/api'
import { TimeUtils } from '../utils/time'

const ContentPage = () => {
  const { contentId } = useParams()
  const [userInfo, setUserInfo] = useSessionStorage('IndiTown')
  const { token, _id } = userInfo
  const [comments, setComments] = useState([])
  const history = useHistory()

  const content = useAsync(async () => {
    const response = await ApiUtils.getContentDetail(contentId)
    setComments(response.comments)
    return response
  }, [contentId])

  const handleDeleteContent = useCallback(
    async (contentId) => {
      await ApiUtils.deleteContent({ token, contentId })
      history.push(`/food`)
    },
    [history, token]
  )

  const handleCommentSubmit = useCallback(
    async (comment) => {
      const createdComment = await ApiUtils.createComment({ token, comment })
      setComments([...comments, createdComment])
    },
    [token, comments]
  )

  const moveToChat = (value) => {
    if (_id !== value._id) {
      const userName = JSON.parse(value.fullName).userName
      setUserInfo({
        ...userInfo,
        contactUserId: '',
      })
      setUserInfo({
        ...userInfo,
        contactUserId: value._id,
      })
      history.push(`/chatting/${userName}`)
    }
  }
  console.log(content.value)

  const Container = styled.div`
    margin: 5rem 1rem;
    background-color: white;
    border-radius: 0.8rem;
  `

  if (!content.isLoading && content.value) {
    return (
      <ContentsProvider handleDeleteContent={handleDeleteContent}>
        <Container>
          <Fragment>
            <ContentsDescription
              id={content.value?._id}
              style={{
                padding: '1rem',
                borderBottom: `1px solid ${theme.colors.gray_2}`,
              }}
              userEmail={content.value.author.email}
              userNickName={JSON.parse(content.value.author.fullName).userName}
              userTown={JSON.parse(content.value.author.fullName).location}
              title={JSON.parse(content.value.title).title}
              contentImg={content.value.image}
              isExpired={!TimeUtils.checkExpired(content.value)}
              progress={JSON.parse(content.value.title)}
              progressTime={TimeUtils.calculateTime(
                JSON.parse(content.value.title).recruitmentDate
              )}
              updatedAt={content.value.updatedAt}
              onClick={() => moveToChat(content.value.author)}
            />
          </Fragment>

          <CommentInput
            style={{
              padding: '1rem',
            }}
            onSubmit={(e) => {
              e.preventDefault()
              handleCommentSubmit({
                comment: e.target[0].value,
                postId: contentId,
              })
            }}
          />
          <CommentList comments={comments} />
        </Container>
      </ContentsProvider>
    )
  } else {
    return (
      <div
        style={{
          width: '100%',
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spinner />
      </div>
    )
  }
}

export default ContentPage
