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

  console.log('result', result)

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
        {' '}
        유저
        {result &&
          result.map(({ email, _id }) => (
            <div key={_id}>
              {email}
              <br />
            </div>
          ))}
      </div>
      <br />
      <div>
        {' '}
        게시물
        {result &&
          result.map((item) => (
            <div key={item._id}>
              {item.title.title}
              <br />
            </div>
          ))}
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
