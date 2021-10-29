import { Fragment } from 'react'
import SendMessage from './SendMessage'
import ReceiveMessage from './ReceiveMessage'

const ChattingList = ({ message, id }) => {
  return (
    <Fragment>
      {message.map((msg) =>
        msg.sender._id === id ? (
          <div>
            <SendMessage time={msg.createdAt}>{msg.message}</SendMessage>
          </div>
        ) : (
          <ReceiveMessage time={msg.createdAt}>{msg.message}</ReceiveMessage>
        )
      )}
    </Fragment>
  )
}

export default ChattingList
