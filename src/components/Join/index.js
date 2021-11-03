import styled from '@emotion/styled'
import { useFormik } from 'formik'
import { Fragment, useEffect, useState } from 'react'
import Button from '../Button'
import Modal from '../Modal'
import theme from '../../themes'
import { ApiUtils } from '../../utils/api'
import useSessionStorage from '../../hooks/useSessionStorage'
import { useHistory } from 'react-router'

const JoinButton = styled(Button)`
  cursor: auto;
  &:hover {
    background-color: #333333;
  }
`
const Header = styled.h4`
  color: #333333;
  padding: 0;
  margin: 0;
`
const Text = styled.div`
  font-size: 0.9rem;
  line-height: 1.4rem;
`
const ButtonContainer = styled.div`
  margin-top: 24px;
  width: calc(100%);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const OptionText = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`

const JoinText = styled.div`
  color: ${theme.colors.warning};
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  text-align: center;
  margin-top: 0.5rem;
`

const Join = ({ initialState, isExpired, value }) => {
  const [show, setShow] = useState(false)
  const [join, setJoin] = useState(false)
  const [remainOptions, setRemainOptions] = useState(0)
  const [userInfo] = useSessionStorage('IndiTown')
  const { token } = userInfo
  const history = useHistory()
  const [joined, setJoined] = useState(0)

  useEffect(() => {
    const { joined } = JSON.parse(value.title)
    if (!joined) {
      setJoined(0)
    } else {
      setJoined(joined.length)
    }
  }, [])

  const closeModal = (e) => {
    e.preventDefault()
    setJoin(false)
    setShow(false)
  }
  const openModal = () => {
    setJoin(false)
    setShow(true)
  }
  const calculateRemainingOptions = (value) => {
    let { recruitmentOption, orderedOption } = JSON.parse(value.title)
    if (!orderedOption) {
      orderedOption = 0
    }
    const sub = parseInt(recruitmentOption, 10) - parseInt(orderedOption, 10)
    setRemainOptions(sub)
    setJoin(true)
  }

  const formik = useFormik({
    initialValues: {
      options: 0,
    },
    onSubmit: async () => {
      const formData = new FormData()
      const title = JSON.parse(value.title)
      if (!title.orderedOption) {
        title.orderedOption = formik.values.options
      } else {
        title.orderedOption += formik.values.options
      }

      if (!title.joined) {
        title.joined = [value.author._id]
      } else {
        title.joined.push(value.author._id)
      }

      formData.append('postId', value._id)
      formData.append('title', JSON.stringify(title))
      formData.append('image', value.image ? value.image : null)
      formData.append('channelId', value.channel._id)

      await ApiUtils.updatePost({ token, content: formData })
      history.go(0)
    },
  })

  return (
    <Fragment>
      {!isExpired ? null : !initialState ? (
        <div>
          <Button onClick={openModal}>참여하기</Button>
          <JoinText>{joined}명 참여 중</JoinText>
        </div>
      ) : (
        <div>
          <JoinButton disabled primary={false}>
            참여 중
          </JoinButton>
          <JoinText>{joined}명 참여 중</JoinText>
        </div>
      )}

      <Modal show={show} onClose={() => setShow(false)}>
        {join ? (
          <Fragment>
            <form style={{ width: '14rem' }} onSubmit={formik.handleSubmit}>
              <div style={{ textAlign: 'center' }}>얼마나 구매할까요?</div>
              <input
                type="range"
                style={{
                  border: `1px solid ${theme.colors.gray_2}`,
                  margin: '1rem 0',
                  width: '100%',
                }}
                id="options"
                name="options"
                min="0"
                max={remainOptions}
                onChange={formik.handleChange}
                value={formik.values.options}
                placeholder="얼마나 구매할까요?"
              />
              <OptionText>{formik.values.options}</OptionText>
              <Button type="submit" style={{ width: '100%' }}>
                참여하기
              </Button>
            </form>
          </Fragment>
        ) : (
          <Fragment>
            <Header>참여하기</Header>
            <Text style={{ color: '#737373' }}>
              [안내] 현재 참여 후 취소 시 모집자와 채팅으로만 환불이 가능합니다.
            </Text>
            <Text style={{ color: '#333333' }}>참여하시겠어요?</Text>
            <ButtonContainer>
              <Button onClick={() => calculateRemainingOptions(value)}>
                참여하기
              </Button>
              <Button
                style={{ backgroundColor: '#ddd', width: '44%' }}
                onClick={(e) => closeModal(e)}
              >
                닫기
              </Button>
            </ButtonContainer>
          </Fragment>
        )}
      </Modal>
    </Fragment>
  )
}

export default Join
