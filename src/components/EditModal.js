import styled from '@emotion/styled'
import Modal from './Modal'
import { useState } from 'react'

const Text = styled.li`
  list-style: none;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  width: 100%;
  color: ${({ remove }) => (remove ? '#DC3545' : '#000000')};

  &:not(:last-of-type)::after {
    content: '';
    display: block;
    border-bottom: 1px solid #e8e8e8;
    width: 311px;
    margin-top: 1rem;
    cursor: default;
  }
`

const EditModal = ({ remove, ...props }) => {
  const [show, setShow] = useState(true)
  const closeModal = (e) => {
    e.preventDefault()
    setShow(false)
  }

  const ModalStyle = {
    visibility: show ? 'visibile' : 'hidden',
  }

  return (
    <Modal {...props} style={{ ModalStyle }}>
      <Text remove>삭제하기</Text>
      <Text>수정하기</Text>
      <Text>취소</Text>
    </Modal>
  )
}

export default EditModal
