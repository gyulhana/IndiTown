import styled from '@emotion/styled'
import { Fragment, useEffect, useState } from 'react'
import theme from '../themes'
import Avatar from '../components/Avatar'
import LastChattingDate from '../components/Chat/LastChattingDate'
import { useHistory } from 'react-router'
import useSessionStorage from '../hooks/useSessionStorage'
import { ApiUtils } from '../utils/api'
import { ProfileUtils } from '../utils/profile'

const ChatListContainer = styled.div`
  background-color: #fff;
  border-radius: 12.8px;
  margin: 5rem 1rem 1rem 1rem;
  border: none;
  overflow-y: auto;
`

const ChattingContainer = styled.div`
  border: 1px solid ${theme.colors.gray_2};
  padding: 1rem;
  display: flex;
  cursor: pointer;
`

const Chat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`

const Id = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
`

const Conversation = styled.span`
  font-size: 0.875rem;
  color: ${theme.colors.gray_5};
`

const ChattingListPage = ({ src, onClick }) => {
  const [chatList, setChatList] = useState([])
  const [userInfo, setUserInfo] = useSessionStorage('IndiTown')
  const { token, _id } = userInfo
  const history = useHistory()

  useEffect(() => {
    const getMessageList = async () => {
      try {
        const messageList = await ApiUtils.getMessageList(token)
        setChatList(messageList.data)
      } catch (error) {
        console.log(error)
      }
    }

    getMessageList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(chatList)

  const moveChattingPage = (value) => {
    let contactUserId = ''
    let userName = ''
    if (value.receiver._id === _id) {
      contactUserId = value.sender._id
      userName = JSON.parse(value.sender.fullName).userName
    } else {
      contactUserId = value.receiver._id
      userName = JSON.parse(value.receiver.fullName).userName
    }

    setUserInfo({
      ...userInfo,
      contactUserId,
    })

    history.push(`/chatting/${userName}`)
  }

  const displayUserName = (chat) => {
    let userName = ''
    if (chat.receiver._id === _id) {
      userName = JSON.parse(chat.sender.fullName).userName
    } else {
      userName = JSON.parse(chat.receiver.fullName).userName
    }

    return userName
  }

  return (
    <Fragment>
      <ChatListContainer>
        {chatList.map((chat) => (
          <ChattingContainer onClick={() => moveChattingPage(chat)}>
            <Avatar
              style={{
                alignSelf: 'flex-start',
                flexShrink: 0,
                marginRight: '0.875rem',
              }}
              size={40}
              src={
                chat.receiver.image ||
                ProfileUtils.getDefaultImage(chat.receiver.email)
              }
              onClick={onClick}
            />
            <Chat>
              <Id>{displayUserName(chat)}</Id>
              <Conversation>{chat.message}</Conversation>
            </Chat>
            <div>
              <LastChattingDate>{chat.createdAt}</LastChattingDate>
            </div>
          </ChattingContainer>
        ))}
      </ChatListContainer>
    </Fragment>
  )
}

export default ChattingListPage
