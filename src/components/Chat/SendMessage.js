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
  const timeArray = time.split('T')[1].split(':')
  let hour = parseInt(timeArray[0], 10) + 9
  let minute = parseInt(timeArray[1], 10)

  if (hour >= 24) {
    hour -= 24
  }
  if (minute < 10) {
    minute = `0${minute}`
  }

  return (
    <MessageContainer>
      <Time>
        {hour < 12 ? `오전 ${hour}:${minute}` : `오후 ${hour - 12}:${minute}`}
      </Time>
      <Send>{children}</Send>
    </MessageContainer>
  )
}

export default SendMessage
