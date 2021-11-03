import styled from '@emotion/styled'
import axios from 'axios'
import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import TextArea from '../TextArea'
import ChattingHistory from './ChattingHistory'

const ChattingContainer = styled.div`
  background-color: #fff;
  position: relative;
  height: 100%;
  border: 1px solid black;
  box-sizing: border-box;
`

const MessageArea = styled.div`
  height: calc(100% - 76px);
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`

const InputTextArea = styled.div`
  position: absolute;
  background-color: #fff;
  bottom: 0;
  width: 100%;
  height: 76px;
  padding: 20px;
  border: 1px solid;
  box-sizing: border-box;
`

const ChattingRoom = () => {
  const [messages, setMessages] = useState([])
  const messageRef = useRef(null)

  const formik = useFormik({
    initialValues: {
      chat: '',
    },
    onSubmit: async (value) => {
      const tokenMe =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxNzc5OTliNDdlYzMzMjlkNDM0YjkwYyIsImVtYWlsIjoiYUBhLmEifSwiaWF0IjoxNjM1NDkzNjc1fQ.etCO-YoKpVjszZ0zEslgDWL4ROmIetF50YkRVXHPxz8'
      const tokenYou =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxN2FiOWQ5MDBkOGFkMWYyYTk0YzFjNyIsImVtYWlsIjoiYUBhYi5jIn0sImlhdCI6MTYzNTQ5MzcyOH0.70KbJOsMhJrP_Z1qb-c2NYnkcrTSaSGKncMiOpsyFMc'

      const me = '6177999b47ec3329d434b90c'
      const you = '617ab9d900d8ad1f2a94c1c7'

      const data = {
        message: value.chat,
        receiver: me,
      }
      try {
        const messages = await axios({
          url: 'http://13.209.30.200/messages',
          method: 'GET',
          headers: {
            Authorization: `bearer ${tokenMe}`,
            'Content-Type': 'application/json;charset=utf-8',
          },
          params: {
            userId: `${you}`,
          },
        })

        // const message = await axios({
        //   url: 'http://13.209.30.200/messages/create',
        //   method: 'POST',
        //   headers: {
        //     Authorization: `bearer ${tokenYou}`,
        //     'Content-Type': 'application/json;charset=utf-8',
        //   },
        //   data: JSON.stringify(data),
        // })
        // console.log(message)
        // formik.setValues({
        //   chat: '',
        // })
      } catch (error) {
        console.log(error)
      }
    },
  })

  useEffect(() => {
    const tokenMe =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxNzc5OTliNDdlYzMzMjlkNDM0YjkwYyIsImVtYWlsIjoiYUBhLmEifSwiaWF0IjoxNjM1NDkzNjc1fQ.etCO-YoKpVjszZ0zEslgDWL4ROmIetF50YkRVXHPxz8'

    const you = '617ab9d900d8ad1f2a94c1c7'
    const getMessages = async () => {
      try {
        const messages = await axios({
          url: 'http://13.209.30.200/messages',
          method: 'GET',
          headers: {
            Authorization: `bearer ${tokenMe}`,
            'Content-Type': 'application/json;charset=utf-8',
          },
          params: {
            userId: `${you}`,
          },
        })

        setMessages(messages.data)
      } catch (error) {
        console.log(error)
      }
    }

    getMessages()
  }, [])

  return (
    <ChattingContainer>
      <MessageArea ref={messageRef}>
        <ChattingHistory message={messages} id="6177999b47ec3329d434b90c" />
      </MessageArea>
      <InputTextArea>
        <form onSubmit={formik.handleSubmit}>
          <TextArea
            name="chat"
            onChange={formik.handleChange}
            value={formik.values.chat}
          />
        </form>
      </InputTextArea>
    </ChattingContainer>
  )
}

export default ChattingRoom
