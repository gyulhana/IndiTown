import styled from '@emotion/styled'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import theme from '../../themes'
import Avatar from '../Avatar'
import LastChattingDate from './LastChattingDate'

const ChattingContainer = styled.div`
  border: 1px solid ${theme.colors.gray_2};
  padding: 1rem;
  display: flex;
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

const ChatList = ({ src, onClick }) => {
  const [chatList, setChatList] = useState([])
  const [userList, setUserList] = useState([])
  const [idList, setIdList] = useState([])

  const tokenMe =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxNzc5OTliNDdlYzMzMjlkNDM0YjkwYyIsImVtYWlsIjoiYUBhLmEifSwiaWF0IjoxNjM1NDkzNjc1fQ.etCO-YoKpVjszZ0zEslgDWL4ROmIetF50YkRVXHPxz8'

  const me = '6177999b47ec3329d434b90c'

  useEffect(() => {
    const getMessageList = async () => {
      const messages = await axios({
        url: 'http://13.209.30.200/messages/conversations',
        method: 'GET',
        headers: {
          Authorization: `bearer ${tokenMe}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      })

      setChatList(messages.data)
    }

    const getContactUserList = async () => {
      const userIdList = await axios({
        url: `http://13.209.30.200/users/${me}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })

      for (const id of userIdList.data.messages) {
        if (!idList.includes(id)) {
          setIdList([...idList, id])
          const opponent = await axios({
            url: `http://13.209.30.200/users/${id}`,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
          })

          setUserList([...userList, opponent.data])
        }
      }
    }

    getContactUserList()
    getMessageList()
    console.log(chatList)
    console.log(userList)
  }, [])

  return (
    <Fragment>
      {chatList.map((chat, index) => (
        <ChattingContainer>
          <Avatar
            style={{
              alignSelf: 'flex-start',
              flexShrink: 0,
              marginRight: '0.875rem',
            }}
            size={40}
            src={src}
            onClick={onClick}
          />
          <Chat>
            <Id>
              {userList.length > 0
                ? userList[index].fullName.split(':')[2].split('"')[1]
                : ''}
            </Id>
            <Conversation>{chat.message}</Conversation>
          </Chat>
          <div>
            <LastChattingDate>{chat.createdAt}</LastChattingDate>
          </div>
        </ChattingContainer>
      ))}
    </Fragment>
  )
}

export default ChatList
