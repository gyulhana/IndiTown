import styled from '@emotion/styled'
import theme from '../../themes'

const MessageContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 1.75rem;
  gap: 0.75rem;
`

const Send = styled.div`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.gray_7};
  font-size: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 14.4px 0 14.4px 14.4px;
  line-height: 1.4;
  width: fit-content;
  position: relative;
  right: 0;
`

const Time = styled.span`
  color: ${theme.colors.gray_5};
  font-size: 0.75rem;
  white-space: nowrap;
`

const SendMessage = ({ children, time = '2021-10-29T15:59:22.118Z' }) => {
  const date = new Date(time)
  const dt = date.toLocaleString().substr(date.toLocaleString().search('오'), 2)
  let hour = date.getHours()
  let minute = date.getMinutes()

  if (hour > 12) {
    hour -= 12
  }
  if (minute < 10) {
    minute = '0' + minute
  }

  return (
    <MessageContainer>
      <Time>{`${dt} ${hour}:${minute}`}</Time>
      <Send>{children}</Send>
    </MessageContainer>
  )
}

export default SendMessage
