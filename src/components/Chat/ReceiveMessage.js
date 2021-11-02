import styled from '@emotion/styled'
import theme from '../../themes'
import Avatar from '../Avatar'

const MessageContainer = styled.li`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin-bottom: 1.75rem;
  gap: 0.75rem;
`

const Receive = styled.div`
  background-color: ${theme.colors.gray_2};
  color: ${theme.colors.gray_7};
  font-size: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0 14.4px 14.4px 14.4px;
  line-height: 1.4;
  width: fit-content;
  margin-top: 0.75rem;
`

const Time = styled.span`
  color: ${theme.colors.gray_5};
  font-size: 0.75rem;
  white-space: nowrap;
`

const ReceiveMessage = ({
  children,
  time = '2021-10-29T15:59:22.118Z',
  src,
  onClick,
}) => {
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
      <Avatar
        style={{
          alignSelf: 'flex-start',
          flexShrink: 0,
        }}
        size={40}
        src={src}
        onClick={onClick}
      />
      <Receive>{children}</Receive>
      <Time>{`${dt} ${hour}:${minute}`}</Time>
    </MessageContainer>
  )
}

export default ReceiveMessage
