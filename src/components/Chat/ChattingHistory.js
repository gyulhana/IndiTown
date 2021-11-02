import SendMessage from './SendMessage'
import ReceiveMessage from './ReceiveMessage'
import { ProfileUtils } from '../../utils/profile'

const ChattingHistory = ({ message, id }) => {
  console.log(message)
  return (
    <ul>
      {message.map((msg) =>
        msg.sender._id === id ? (
          <SendMessage
            key={msg._id}
            time={msg.createdAt}
            src={
              msg.sender.image || ProfileUtils.getDefaultImage(msg.sender.email)
            }
          >
            {msg.message}
          </SendMessage>
        ) : (
          <ReceiveMessage
            key={msg._id}
            time={msg.createdAt}
            src={
              msg.sender.image || ProfileUtils.getDefaultImage(msg.sender.email)
            }
          >
            {msg.message}
          </ReceiveMessage>
        )
      )}
    </ul>
  )
}

export default ChattingHistory
