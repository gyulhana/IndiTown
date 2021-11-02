import styled from '@emotion/styled'
import { Fragment } from 'react'
import theme from '../../themes'

const ChattingDate = styled.span`
  color: ${theme.colors.gray_4};
  font-size: 0.75rem;
`

const LastChattingDate = ({ children = '2021-10-29T08:25:51.344Z' }) => {
  const date = new Date(children)
  let month = date.getMonth() + 1
  let day = date.getDate()

  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }

  return (
    <Fragment>
      <ChattingDate>{`${month}월 ${day}일`}</ChattingDate>
    </Fragment>
  )
}

export default LastChattingDate
