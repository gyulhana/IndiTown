import styled from '@emotion/styled'
import { useFormik } from 'formik'
import { Fragment, useEffect, useState } from 'react'
import TextArea from '../components/TextArea'
import ChattingHistory from '../components/Chat/ChattingHistory'
import useSessionStorage from '../hooks/useSessionStorage'
import theme from '../themes'
import { ApiUtils } from '../utils/api'
import useScroll from '../hooks/useScroll'

const ChattingContainer = styled.div`
  background-color: #fff;
  position: relative;
  height: 75vh;
  background-color: #fff;
  border-radius: 12.8px;
  margin: 1rem;
  padding: 1rem;
  border: none;
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
  left: 0;
  width: 100%;
  height: 76px;
  padding: 20px;
  border-top: 1px solid ${theme.colors.gray_2};
  box-sizing: border-box;
`

const ChattingRoomPage = () => {
  const [messages, setMessages] = useState([])
  const [userInfo] = useSessionStorage('IndiTown')
  const { token, contactUserId, _id } = userInfo
  const [ref] = useScroll()

  const getMessages = async () => {
    try {
      const messages = await ApiUtils.getMessages({ token, contactUserId })
      setMessages(messages.data)
    } catch (error) {
      console.error(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      chat: '',
    },
    onSubmit: async (value) => {
      const messageData = {
        message: value.chat,
        receiver: contactUserId,
      }
      try {
        await ApiUtils.sendMessage({
          token,
          messageData,
        })

        formik.setValues({
          chat: '',
        })

        await getMessages()
      } catch (error) {
        console.log(error)
      }
    },
  })

  useEffect(() => {
    getMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  return (
    <Fragment>
      <ChattingContainer>
        <MessageArea ref={ref}>
          <ChattingHistory message={messages} id={_id} />
        </MessageArea>
        <InputTextArea>
          <TextArea
            placeholder={'메세지를 입력하세요!'}
            onSubmit={formik.handleSubmit}
            name="chat"
            onChange={formik.handleChange}
            value={formik.values.chat}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.ctrlKey) {
                formik.handleSubmit()
              }
            }}
          />
        </InputTextArea>
      </ChattingContainer>
    </Fragment>
  )
}

export default ChattingRoomPage
