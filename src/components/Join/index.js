import styled from '@emotion/styled'
import { useFormik } from 'formik'
import { Fragment, useMemo, useRef, useState } from 'react'
import Button from '../Button'
import Modal from '../Modal'
import * as Yup from 'yup'
import Input from '../Form'
import theme from '../../themes'

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

const Invalid = styled.div`
  height: 1rem;
  color: #dc3545;
  font-size: 0.875rem;
  margin: 0.25rem 0 1rem;
`

const Join = ({ initialState, isExpired, value }) => {
  const [show, setShow] = useState(false)
  const [join, setJoin] = useState(false)
  const [remainOptions, setRemainOptions] = useState(0)

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
    const { recruitmentOption, orderdOption } = JSON.parse(value.title)
    const sub = parseInt(recruitmentOption, 10) - parseInt(orderdOption, 10)
    setRemainOptions(sub)
    setJoin(true)
  }

  const inValidErrorMessage = {
    min: '0 이상의 값을 입력해 주세요',
    max: `${remainOptions} 이하의 값을 입력해 주세요`,
    required: '숫자를 입력해 주세요',
  }
  const formik = useFormik({
    initialValues: {
      options: 0,
    },
    validationSchema: Yup.object({
      options: Yup.number()
        .min(0, inValidErrorMessage.min)
        .max(remainOptions, inValidErrorMessage.max)
        .required(inValidErrorMessage.required),
    }),
    onSubmit: async () => {
      alert(formik.values.options)
    },
  })

  return (
    <Fragment>
      {!isExpired ? null : !initialState ? (
        <Button onClick={openModal}>참여하기</Button>
      ) : (
        <JoinButton disabled primary={false}>
          참여 중
        </JoinButton>
      )}

      <Modal show={show} onClose={() => setShow(false)}>
        {join ? (
          <Fragment>
            <form onSubmit={formik.handleSubmit}>
              <Input
                type="text"
                style={{
                  border: `1px solid ${theme.colors.gray_2}`,
                  margin: '1rem 0',
                }}
                id="options"
                name="options"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.options}
                placeholder="얼마나 구매할까요?"
              />
              {formik.errors.options ? (
                <Invalid>{formik.errors.options}</Invalid>
              ) : null}
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
