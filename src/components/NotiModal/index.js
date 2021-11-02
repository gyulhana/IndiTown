import styled from '@emotion/styled'
import Modal from '../Modal'
import Button from '../Button'
import { useState } from 'react'

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

const NotiModal = ({ onClick, initialState = false }) => {
  const [show, setShow] = useState(initialState)
  const closeModal = (e) => {
    e.preventDefault()
    setShow(false)
  }

  return (
    <Modal show={show} onClose={() => setShow(false)}>
      <Header>참여하기</Header>
      <Text style={{ color: '#737373' }}>
        [안내] 현재 참여 후 취소 시 모집자와 채팅으로만 환불이 가능합니다.
      </Text>
      <Text style={{ color: '#333333' }}>참여하시겠어요?</Text>
      <ButtonContainer>
        <Button onClick={onClick}>참여하기</Button>
        <Button
          style={{ backgroundColor: '#ddd', width: '44%' }}
          onClick={(e) => closeModal(e)}
        >
          닫기
        </Button>
      </ButtonContainer>
    </Modal>
  )
}

export default NotiModal
