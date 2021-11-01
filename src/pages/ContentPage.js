import styled from '@emotion/styled'
import { Fragment, useCallback, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { useAsync } from '../hooks'
import ContentsDescription from '../components/ContentsDescription'
import CommentInput from '../components/CommentInput'
import CommentList from '../components/CommentList'
import Spinner from '../components/Spinner'
import moment from 'moment'
import theme from '../themes'
import useSessionStorage from '../hooks/useSessionStorage'
import { ApiUtils } from '../utils/api'

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

  console.log(content)

  const Container = styled.div`
    margin: 5rem 1rem 0 1rem;
    background-color: white;
    border-radius: 0.8rem;
  `
  const handleCommentSubmit = useCallback(
    async (comment) => {
      const createdComment = await ApiUtils.createComment({ token, comment })
      setComments([...comments, createdComment])
    },
    [token, comments]
  )

  const calculateTime = (time) => {
    const t1 = moment(time, 'YYYY-MM-DD hh:mm')
    const t2 = moment()
    const m = moment.duration(t1.diff(t2))

    return `${Math.floor(m.asDays())
      .toString()
      .padStart(2, '0')}일  ${Math.floor(m.asHours())
      .toString()
      .padStart(2, '0')}시  ${Math.floor(m.asMinutes() % 60)
      .toString()
      .padStart(2, '0')}분`
  }

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

  if (!content.isLoading && content.value) {
    return (
      <Container>
        <Fragment>
          <ContentsDescription
            style={{
              padding: '1rem',
              borderBottom: `1px solid ${theme.colors.gray_2}`,
            }}
            userEmail={content.value?.author.email}
            userNickName={JSON.parse(content.value.author.fullName).userName}
            userTown={JSON.parse(content.value.author.fullName).location}
            title={JSON.parse(content.value.title).title}
            contentImg={content.value.img}
            progressTime={calculateTime(
              JSON.parse(content.value.title).recruitmentDate
            )}
            createdAt={content.value.createdAt}
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
