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
import LikeAndJoin from '../components/LikeAndJoin'
import { TimeUtils } from '../utils/time'
import { ProfileUtils } from '../utils/profile'

const ContentPage = () => {
  const { contentId } = useParams()
  const [userInfo, setUserInfo] = useSessionStorage('IndiTown')
  const { token, _id } = userInfo
  const [comments, setComments] = useState([])
  const history = useHistory()
  const [like, setLike] = useState(false)

  const { isLoading, value } = useAsync(async () => {
    const response = await ApiUtils.getContentDetail(contentId)
    setComments(response.comments)

    const checkLikePost = (likeList) => {
      if (likeList.length === 0) {
        return setLike(false)
      }
      for (const post of likeList) {
        if (post.user === _id) {
          return setLike(true)
        }
      }
    }
    checkLikePost(response.likes)

    return response
  }, [contentId])

  const Container = styled.div`
    margin: 5rem 1rem 0 1rem;
    background-color: white;
    border-radius: 0.8rem;
  `

  const handleDeleteContent = useCallback(
    async (contentId) => {
      await ApiUtils.deleteContent({ token, contentId })
      history.goBack()
      history.goBack()
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

  const likePost = async () => {
    const data = {
      postId: value._id,
    }

    try {
      await ApiUtils.likePost({ token, postId: data })
      setLike(true)
    } catch (error) {
      console.error(error)
    }
  }

  const checkLikeId = () => {
    const likeList = value.likes
    if (likeList.length === 0) {
      return
    }
    for (const post of likeList) {
      if (post.user === _id) {
        return post._id
      }
    }
  }

  const dislikePost = async () => {
    const likeId = checkLikeId()
    const data = {
      id: likeId,
    }

    try {
      await ApiUtils.dislikePost({ token, id: data })
      setLike(false)
    } catch (error) {
      console.error(error)
    }
  }

  if (!isLoading && value) {
    return (
      <ContentsProvider handleDeleteContent={handleDeleteContent}>
        <Container>
          <Fragment>
            <ContentsDescription
              id={value?._id}
              style={{
                padding: '1rem',
                borderBottom: `1px solid ${theme.colors.gray_2}`,
              }}
              userEmail={value.author.email}
              userImg={
                value.author.image ||
                ProfileUtils.getDefaultImage(value.author.email)
              }
              userNickName={
                value.author.fullName[0] !== '{'
                  ? value.author.fullName
                  : JSON.parse(value.author.fullName).userName
              }
              userTown={
                value.author.fullName[0] !== '{'
                  ? '동네정보없음'
                  : JSON.parse(value.author.fullName).location
              }
              title={JSON.parse(value.title).title}
              contentImg={value.image}
              isExpired={!TimeUtils.checkExpired(value)}
              progress={JSON.parse(value.title)}
              progressTime={TimeUtils.calculateTime(
                JSON.parse(value.title).recruitmentDate
              )}
              updatedAt={value.updatedAt}
              onClick={() => moveToChat(value.author)}
            />
          </Fragment>

          <CommentInput
            style={{
              padding: '1rem',
            }}
            userImg={
              value.author.image ||
              ProfileUtils.getDefaultImage(value.author.email)
            }
            onSubmit={(e) => {
              e.preventDefault()
              handleCommentSubmit({
                comment: e.target[0].value,
                postId: contentId,
              })
            }}
          />
          <LikeAndJoin
            initialState={like}
            onClick={like ? dislikePost : likePost}
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
