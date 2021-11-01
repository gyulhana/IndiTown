import styled from '@emotion/styled'
import axios from 'axios'
import { Fragment, useCallback } from 'react'
import { useParams } from 'react-router'
import { useAsync } from '../hooks'
import ContentsDescription from '../components/ContentsDescription'
import CommentInput from '../components/CommentInput'
import CommentList from '../components/CommentList'
import Spinner from '../components/Spinner'
import moment from 'moment'
import theme from '../themes'

const ContentPage = () => {
  const { contentId } = useParams()

  const API_END_POINT = 'http://13.209.30.200'
  const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxNzc5OTliNDdlYzMzMjlkNDM0YjkwYyIsImVtYWlsIjoiYUBhLmEifSwiaWF0IjoxNjM1MzE2OTY1fQ._m_M1OchkSKUL88dxYwFlNITRgYDjodN9cQdL3RHyWY`

  const content = useAsync(async () => {
    return await axios
      .get(`${API_END_POINT}/posts/${contentId}`)
      .then((response) => response.data)
  }, [contentId])

  console.log(content)

  const Container = styled.div`
    margin: 5rem 1rem 0 1rem;
    background-color: white;
    border-radius: 0.8rem;
  `
  const handleCommentSubmit = useCallback(
    async (comment) => {
      return await axios({
        method: 'post',
        url: `${API_END_POINT}/comments/create`,
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
        data: comment,
      }).then((response) => response.data)
    },
    [TOKEN]
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
              JSON.parse(content.value.title).recruitmentDate // 언제까지 시킬건지 지정 날짜 값
            )}
            createdAt={content.value.createdAt}
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
        <CommentList comments={content.value?.comments} />
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
