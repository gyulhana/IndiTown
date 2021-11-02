import styled from '@emotion/styled'
import { Fragment, useCallback, useEffect, useState } from 'react'
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
import axios from 'axios'
import LikeAndJoin from '../components/LikeAndJoin'

const ContentPage = () => {
  const { contentId } = useParams()
  const [userInfo, setUserInfo] = useSessionStorage('IndiTown')
  const { token, _id } = userInfo
  const [comments, setComments] = useState([])
  const history = useHistory()
  const [like, setLike] = useState(false)

  const content = useAsync(async () => {
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
  const handleCommentSubmit = useCallback(
    async (comment) => {
      const createdComment = await ApiUtils.createComment({ token, comment })
      setComments([...comments, createdComment])
    },
    [token, comments]
  )

  const calculateTime = (time) => {
    const t1 = moment(time, 'YYYY-MM-DD hh:mm') // 언제까지 시킬건지 지정 날짜 값
    const t2 = moment() // 현재시간
    const m = moment.duration(t1.diff(t2)) // t1 - t2

    return `${Math.floor(m.asDays()) // 1.6456456546(일) -> 01(일)
      .toString()
      .padStart(2, '0')}일  ${Math.floor(m.asHours()) // 시간
      .toString()
      .padStart(2, '0')}시  ${Math.floor(m.asMinutes() % 60) // 분
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

  const likePost = async () => {
    const data = {
      postId: content.value._id,
    }

    await ApiUtils.likePost({
      token,
      postId: data,
    })
    setLike(true)
  }

  const checkLikeId = () => {
    const likeList = content.value.likes
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
    setLike(false)
    await axios({
      method: 'delete',
      url: 'http://13.209.30.200/likes/delete',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      data: JSON.stringify(data),
    })
  }

  if (!content.isLoading && content.value) {
    return (
      <Container>
        <Fragment>
          <ContentsDescription
            style={{
              padding: '1rem',
              // borderBottom: `1px solid ${theme.colors.gray_2}`,
            }}
            userEmail={content.value?.author.email}
            userNickName={JSON.parse(content.value.author.fullName).userName}
            userTown={JSON.parse(content.value.author.fullName).location}
            title={JSON.parse(content.value.title).title}
            contentImg={content.value.img}
            progressTime={calculateTime(
              JSON.parse(content.value.title).recruitmentDate // 언제까지 시킬건지 지정 날짜 값
            )}
            createdAt={content.value.createdAt}
            onClick={() => moveToChat(content.value.author)}
          />
        </Fragment>
        <LikeAndJoin
          initialState={like}
          onClick={like ? dislikePost : likePost}
        />
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
