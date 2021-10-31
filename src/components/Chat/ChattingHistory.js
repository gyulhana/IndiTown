import { Fragment } from 'react'
import SendMessage from './SendMessage'
import ReceiveMessage from './ReceiveMessage'

const ChattingHistory = ({ message, id }) => {
  return (
    <Fragment>
      {message.map((msg) =>
        msg.sender._id === id ? (
          <SendMessage time={msg.createdAt}>{msg.message}</SendMessage>
        ) : (
          <ReceiveMessage time={msg.createdAt}>{msg.message}</ReceiveMessage>
        )
      )}
    </Fragment>
  )
}

export default ChattingHistory
