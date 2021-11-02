import styled from '@emotion/styled'
import Modal from '../Modal'
import { useState } from 'react'
import { useContentsContext } from '../../contexts/ContentsProvider'

const Text = styled.li`
  list-style: none;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  width: 100%;
  color: ${({ remove }) => (remove ? '#DC3545' : '#000000')};

  &:not(:last-of-type)::after {
    content: '';
    display: block;
    border-bottom: 1px solid #e8e8e8;
    width: 18rem;
    margin: 1.5rem 0 0.9rem 0;
    cursor: default;
  }
`
const EditModal = ({ id, onClick }) => {
  console.log(id)
  const [show, setShow] = useState(true)
  const { onDeleteContent } = useContentsContext()
  const closeModal = (e) => {
    e.preventDefault()
    setShow(false)
  }

  return (
    <Modal show={show} onClose={() => setShow(false)}>
      <Text remove onClick={() => onDeleteContent(id)}>
        삭제하기
      </Text>
      <Text>수정하기</Text>
      <Text onClick={(closeModal, onClick)}>취소</Text>
    </Modal>
  )
}

export default EditModal
