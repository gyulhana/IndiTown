import useDebounce from '../hooks/useDebounce'
import { useState, useCallback } from 'react'
import Form from '../components/Form'
import styled from '@emotion/styled'
import theme from '../themes'
import Profile from '../components/Profile'
import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'
import moment from 'moment'
import { ApiUtils } from '../utils/api'
import { ProfileUtils } from '../utils/profile'
import { useHistory } from 'react-router'
import useSessionStorage from '../hooks/useSessionStorage'

const calculateTime = (time) => {
  const t1 = moment(time, 'YYYY-MM-DD hh:mm')
  const t2 = moment()
  const m = moment.duration(t1.diff(t2))

  return `${Math.floor(m.asDays()).toString().padStart(2, '0')}일  ${Math.floor(
    m.asHours() % 24
  )
    .toString()
    .padStart(2, '0')}시  ${Math.floor(m.asMinutes() % 60)
    .toString()
    .padStart(2, '0')}분`
}

const Container = styled.div`
  position: fixed;
  top: 4rem;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 1.5rem 1rem 8rem 1.5rem;
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
  overflow: hidden;
  text-overflow: ellipsis;
`

const PostContainer = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.4;
  cursor: pointer;
  margin-bottom: 1rem;
  background-color: #fff;
  border-radius: 12.8px;
  padding: 1rem;
  box-sizing: border-box;
`
const foodthumb =
  'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FxznxP%2FbtrjCACuE5H%2F7ZYQrKuvzJLaZr6kxqPBkk%2Fimg.png'
const parcelthumb =
  'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc5Y83o%2FbtrjAfMkXbm%2FcnJvyenK4RLrL2IpdTq7Hk%2Fimg.png'

export const SearchPage = () => {
  const data = useCallback(async (word) => {
    return await (
      await ApiUtils.searchPosts(word)
    ).data
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

  const history = useHistory()
  const [userInfo, setUserInfo] = useSessionStorage('IndiTown')
  const { _id } = userInfo
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

  return (
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
              const userInfo = JSON.parse(item.fullName)
              return (
                <div onClick={() => moveToChat(item)}>
                  <Profile
                    key={item._id}
                    lazy
                    threshold={0.5}
                    src={
                      item.image ||
                      (item.email && ProfileUtils.getDefaultImage(item.email))
                    }
                    alt={userInfo.userName}
                    nickName={userInfo.userName}
                    email={item.email}
                    town={userInfo.location}
                    style={{ marginBottom: '1rem' }}
                  />
                </div>
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
              const contentsInfo = JSON.parse(content.title)

              return (
                <Link to={`/content/${content._id}`}>
                  <PostContainer alt={contentsInfo.title}>
                    <Avatar
                      style={{ flexShrink: 0 }}
                      key={content._id}
                      lazy
                      size={48}
                      threshold={0.5}
                      src={
                        contentsInfo.type === 'food' ? foodthumb : parcelthumb
                      }
                    />
                    <div
                      style={{
                        marginLeft: '0.875rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <PostTitle strong size={theme.fontSizes.sm}>
                        {contentsInfo.title.length > 0
                          ? contentsInfo.title
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
                </Link>
              )
            })}
        </div>
      </div>
    </Container>
  )
}

export default SearchPage
