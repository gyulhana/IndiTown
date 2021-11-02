import SendMessage from './SendMessage'
import ReceiveMessage from './ReceiveMessage'

const ChattingHistory = ({ message, id }) => {
  return (
    <ul>
      {message.map((msg) =>
        msg.sender._id === id ? (
          <SendMessage key={msg._id} time={msg.createdAt}>
            {msg.message}
          </SendMessage>
        ) : (
          <ReceiveMessage key={msg._id} time={msg.createdAt}>
            {msg.message}
          </ReceiveMessage>
        )
      )}
    </ul>
  )
}

export default ChattingHistory
