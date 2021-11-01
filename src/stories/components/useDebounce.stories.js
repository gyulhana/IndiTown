import axios from 'axios'
import useDebounce from '../../hooks/useDebounce'
import { Fragment, useState, useCallback } from 'react'
import Form from '../../components/Form'

export default {
  title: 'Hook/useDebounce',
}

export const NewSearch = () => {
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
        console.log(reqeustedData)
        setResult(reqeustedData)
      }
    },
    300,
    [value]
  )

  return (
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
        <h3>❤유저❤</h3>
        {result
          ?.filter((item) => item.fullName)
          ?.filter((item) => item.fullName.includes('Yohan1'))
          ?.map((item) => {
            console.log('아이템 타입', typeof item.fullName)
            console.log('아이템', item.fullName)

            return (
              <div key={item._id}>
                {item.email}
                <br />
              </div>
            )
          })}
      </div>
      <br />
      <div>
        <h1>✨게시물✨</h1>
        {result
          ?.filter(
            (item) =>
              'title' in item && item.channel === '616a205422996f0bc94f6e23'
          )
          .map((item) => {
            console.log(typeof item)
            console.log(item)
            console.log('title 타입', typeof item.title)

            return (
              <div key={item._id}>
                {item.title}
                <br />
              </div>
            )
          })}
      </div>
    </div>
  )
}

const companies = [
  'cobalt',
  'grepp',
  'kakao',
  'naver',
  'danggn',
  'coupang',
  'line',
  'baemin',
  'bccard',
]

export const Default = () => {
  const [value, setValue] = useState('')
  const [result, setResult] = useState([])

  useDebounce(
    () => {
      if (value === '') {
        setResult([])
      } else {
        setResult(
          companies.filter((company) =>
            company.toLowerCase().includes(value.toLowerCase())
          )
        )
      }
    },
    1000,
    [value]
  )

  console.log(result)

  return (
    <div>
      <Form
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div>
        {result.map((item) => (
          <Fragment key={item}>
            {item.email}
            <br />
          </Fragment>
        ))}
      </div>
    </div>
  )
}
