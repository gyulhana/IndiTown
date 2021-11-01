import axios from 'axios'
import useDebounce from '../hooks/useDebounce'
import { useState, useCallback } from 'react'
import Form from '../components/Form'
import styled from '@emotion/styled'
import theme from '../themes'
import Profile from '../components/Profile'
import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'
import moment from 'moment'

const calculateTime = (time) => {
  const t1 = moment(time, 'YYYY-MM-DD hh:mm')
  const t2 = moment()
  const m = moment.duration(t1.diff(t2))
  console.log()
  return `${Math.floor(m.asDays()).toString().padStart(2, '0')}일  ${Math.floor(
    m.asHours() % 24
  )
    .toString()
    .padStart(2, '0')}시  ${Math.floor(m.asMinutes() % 60)
    .toString()
    .padStart(2, '0')}분`
}

const Header = styled.div`
  background-color: white;
  width: 100vw;
  height: 4rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  font-size: 1.25rem;
  font-weight: 500;
  filter: drop-shadow(0 2px 40px rgba(51, 51, 51, 0.18));
`

const Container = styled.div`
  position: fixed;
  top: 4rem;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 1.5rem 1rem 4rem 1.5rem;
  box-sizing: border-box;
  background-color: ${theme.colors.gray_1};
  overflow: scroll;
`

const Title = styled.h3`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
`

const PostTitle = styled.h3`
  font-weight: 500;
  display: box;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const PostContainer = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.4;
  cursor: pointer;
  margin-bottom: 1rem;
`

export const SearchPage = () => {
  const API_END_POINT = 'http://13.209.30.200'

  const data = useCallback(async (word) => {
    return await axios
      .get(`${API_END_POINT}/search/all/${word}`)
      .then((response) => response.data)
  }, [])

  const [value, setValue] = useState('')
  const [result, setResult] = useState([])

  useDebounce(
    async () => {
      if (value === '') {
        setResult([])
      } else {
        const reqeustedData = await data(value)
        setResult(reqeustedData)
      }
    },
    300,
    [value]
  )

  return (
    <>
      <Header>검색</Header>
      <Container>
        <div>
          <Form
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div>
            <Title>사용자</Title>
            {result
              ?.filter((item) => item.fullName)
              ?.filter((item) => item.fullName.includes('Yohan1'))
              ?.map((item) => {
                console.log(item)
                return (
                  <Profile
                    key={item._id}
                    lazy
                    threshold={0.5}
                    src={
                      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbDh7FL%2FbtrjyIagzyN%2FTXsUFujA0H8NykBT8C0WZk%2Fimg.png'
                    }
                    alt={JSON.parse(item.fullName).userName}
                    nickName={JSON.parse(item.fullName).userName}
                    email={item.email}
                    town={JSON.parse(item.fullName).location}
                    style={{ marginBottom: '1rem' }}
                  />
                )
              })}
          </div>
          <div>
            <Title>포스트</Title>
            {result
              ?.filter(
                (item) =>
                  'title' in item && item.channel === '616a205422996f0bc94f6e23'
              )
              .map((content) => {
                const leftTime = calculateTime(
                  JSON.parse(content.title).recruitmentDate
                )

                return (
                  <PostContainer alt={JSON.parse(content.title).title}>
                    <Avatar
                      key={content._id}
                      lazy
                      size={48}
                      threshold={0.5}
                      src={
                        JSON.parse(content.title).type === 'food'
                          ? 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FxznxP%2FbtrjCACuE5H%2F7ZYQrKuvzJLaZr6kxqPBkk%2Fimg.png'
                          : 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc5Y83o%2FbtrjAfMkXbm%2FcnJvyenK4RLrL2IpdTq7Hk%2Fimg.png'
                      }
                    />
                    <div style={{ marginLeft: '0.875rem' }}>
                      <PostTitle
                        strong
                        size={theme.fontSizes.sm}
                        style={{
                          overflow: 'hidden',
                          lineClamp: 1,
                          display: 'box',
                        }}
                      >
                        {JSON.parse(content.title).title.length > 0
                          ? JSON.parse(content.title).title
                          : '제목 없음'}
                      </PostTitle>
                      <div
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          color: `${theme.colors.primary}`,
                        }}
                      >
                        {+leftTime.substr(0, 2) >= 0
                          ? `${leftTime} 남음`
                          : '모집 기한 종료'}
                      </div>
                    </div>
                  </PostContainer>
                )
              })}
          </div>
        </div>
      </Container>
    </>
  )
}

export default SearchPage
