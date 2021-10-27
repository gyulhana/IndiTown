import Input from '../Form'
import { useFormik } from 'formik'
import styled from '@emotion/styled'
import * as Yup from 'yup'
import { useCallback, useState } from 'react'
import axios from 'axios'
import Button from '../Button'

const FormContainer = styled.form`
  padding: 1.25rem 2rem;
`
const Flexbox = styled.div`
  display: flex;
  justify-content: space-between;
`

const Label = styled.label`
  display: block;
  color: #808080;
  line-height: 1.25rem;
  font-size: 1rem;
  margin-bottom: 0.438rem;
`

const Invalid = styled.div`
  height: 1rem;
  color: #dc3545;
  font-size: 0.875rem;
  margin: 0.25rem 0 1rem;
`

const invalidErrorMessage = {
  id: '6~12자 사이의 알파벳, 숫자만 가능합니다.',
  duplicateUserId: '이미 존재하는 ID 입니다.',
  password: '8~15자 사이의 알파벳, 숫자만 가능합니다.',
  email: '올바른 이메일 형식이 아닙니다.',
  duplication: '아이디 중복을 확인해주세요.',
}

const SignupForm = () => {
  const [userTyping, setUserTyping] = useState(new Set())
  const [duplicationCheck, setDuplicationCheck] = useState(false)
  const API_ENDPOINT = 'http://13.209.30.200'

  const formik = useFormik({
    initialValues: {
      userId: '',
      userPassword: '',
      userEmail: '',
    },
    validationSchema: Yup.object({
      userId: Yup.string()
        .min(6, invalidErrorMessage.id)
        .max(12, invalidErrorMessage.id)
        .matches(/^[a-zA-Z0-9]+$/, invalidErrorMessage.id)
        .required('')
        .test(
          'is-error',
          invalidErrorMessage.duplicateUserId,
          function (value) {
            for (const duplicateId of userTyping) {
              if (value === duplicateId) {
                return false
              }
            }
            return true
          }
        ),
      userPassword: Yup.string()
        .min(8, invalidErrorMessage.password)
        .max(15, invalidErrorMessage.password)
        .matches(/^[a-zA-Z0-9]+$/, invalidErrorMessage.password)
        .required(''),
      userEmail: Yup.string().email(invalidErrorMessage.email).required(''),
    }),
    onSubmit: async (values) => {
      if (!duplicationCheck) {
        formik.setErrors({ userId: invalidErrorMessage.duplication })
        return
      }
      const { userId, userPassword, userEmail } = values
      const userInfo = {
        team: 'Yohan1',
        userName: userId,
        location: 'currentLocation',
      }

      const data = {
        email: JSON.stringify(userEmail),
        fullName: JSON.stringify(userInfo),
        password: JSON.stringify(userPassword),
      }

      console.log(data)
      try {
        const user = await axios({
          url: `${API_ENDPOINT}/signup`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTP-8',
          },
          data: JSON.stringify(data),
        })

        console.log(user.data)

        formik.setValues({
          userId: '',
          userPassword: '',
          userEmail: '',
        })
      } catch (error) {
        console.log(error)
      }
    },
  })

  const checkValidation = {
    id: formik.touched.userId && formik.errors.userId,
    password: formik.touched.userPassword && formik.errors.userPassword,
    email: formik.touched.userEmail && formik.errors.userEmail,
  }

  const getUserLists = useCallback(async () => {
    const userLists = await axios({
      url: `${API_ENDPOINT}/users/get-users`,
      method: 'GET',
    })

    return userLists.data
  }, [])

  const duplicationUserId = useCallback(async () => {
    const value = formik.values.userId
    if (!(value.length > 5 && value.length < 13)) {
      return
    }

    const userLists = await getUserLists()
    userLists.forEach((user) => {
      if (user.fullName === value) {
        formik.setErrors({ userId: invalidErrorMessage.duplicateUserId })
        setUserTyping(() => new Set([...userTyping, value]))
        setDuplicationCheck(false)
        return
      }
    })

    setDuplicationCheck(true)
  }, [getUserLists, setUserTyping, userTyping, formik])

  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <Label htmlFor="userId">아이디</Label>
        <Flexbox>
          <Input
            id="userId"
            name="userId"
            type="id"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userId}
            style={{
              width: '70%',
              border: checkValidation.id ? '1px solid #dc3545' : 'none',
            }}
            className={
              'form-control' + (checkValidation.id ? ' is-invalid' : '')
            }
            required
          />
          <Button
            style={{ fontSize: '0.875rem', padding: '0.313rem 0.625rem' }}
            primary={false}
            type="button"
            onClick={duplicationUserId}
          >
            중복확인
          </Button>
        </Flexbox>
        {checkValidation.id ? (
          <Invalid>{formik.errors.userId}</Invalid>
        ) : (
          <Invalid />
        )}
      </div>

      <Label htmlFor="userPassword">비밀번호</Label>
      <Input
        id="userPassword"
        name="userPassword"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.userPassword}
        style={{
          width: '70%',
          border: checkValidation.password ? '1px solid #dc3545' : 'none',
        }}
        className={
          'form-control' + (checkValidation.password ? ' is-invalid' : '')
        }
      />
      {checkValidation.password ? (
        <Invalid>{formik.errors.userPassword}</Invalid>
      ) : (
        <Invalid />
      )}

      <Label htmlFor="userEmail">이메일</Label>
      <Input
        id="userEmail"
        name="userEmail"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.userEmail}
        style={{
          border: checkValidation.email ? '1px solid #dc3545' : 'none',
        }}
        className={
          'form-control' + (checkValidation.email ? ' is-invalid' : '')
        }
      />
      {checkValidation.email ? (
        <Invalid>{formik.errors.userEmail}</Invalid>
      ) : (
        <Invalid />
      )}
      <Button style={{ width: '100%' }} type="submit">
        회원가입
      </Button>
    </FormContainer>
  )
}

export default SignupForm
