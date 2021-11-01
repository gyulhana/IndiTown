import axios from 'axios'
import useDebounce from '../hooks/useDebounce'
import { useState, useCallback } from 'react'
import Form from '../components/Form'
import styled from '@emotion/styled'
import theme from '../themes'
import Profile from '../components/Profile'
import ContentsSummary, {
  calculateTime,
  LinkWrapper,
} from '../components/ContentsSummary'
import { Link } from 'react-router-dom'

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

export const SearchPage = () => {
  const API_END_POINT = 'http://13.209.30.200'

  const data = useCallback(async (word) => {
    return await axios
      .get(`${API_END_POINT}/search/all/${word}`)
      .then((response) => response.data)
  }, [])

  const [value, setValue] = useState('')
  const [result, setResult] = useState([])
  const [onlyUser, setOnlyUser] = useState(false)

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
          <input
            type="checkbox"
            id="useronly"
            onlyUser={onlyUser}
            OnCheckedChanged={() => setOnlyUser(!onlyUser)}
          />
          <label for="useronly">유저만 보기</label>
          <div>
            <Title>사용자</Title>
            {result
              ?.filter((item) => item.fullName)
              ?.filter((item) => item.fullName.includes('Yohan1'))
              ?.map((item) => {
                return (
                  <Profile
                    lazy
                    threshold={0.5}
                    src={'https://picsum.photos/400'}
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
              .map((item) => {
                return (
                  <div key={item._id}>
                    {JSON.parse(item.title).title}
                    <br />
                  </div>
                )
              })}
          </div>
        </div>
      </Container>
    </>
  )
}

export default SearchPage
