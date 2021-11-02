import styled from '@emotion/styled'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Input from '../Form'
import Button from '../Button'
import axios from 'axios'

const FormContainer = styled.form`
  padding: 1.25rem 3.75rem;
`

const ButtonContainer = styled.div`
  text-align: center;
`

const Invalid = styled.div`
  height: 1rem;
  color: #dc3545;
  font-size: 0.75rem;
  margin: 0.5rem 0 6.25rem;
  text-indent: 0.75rem;
`

const invalidErrorMessage = {
  required: '아이디 또는 비밀번호를 입력해주세요.',
  notCorrect: '아이디 또는 비밀번호가 올바르지 않습니다.',
}

const Signin = () => {
  const API_ENDPOINT = 'http://13.209.30.200'

  const formik = useFormik({
    initialValues: {
      userEmail: '',
      userPassword: '',
    },
    validationSchema: Yup.object({
      userEmail: Yup.string()
        .email(invalidErrorMessage.notCorrect)
        .required(invalidErrorMessage.required),
      userPassword: Yup.string().required(invalidErrorMessage.required),
    }),
    onSubmit: async (values) => {
      const userInfo = {
        email: values.userEmail,
        password: values.userPassword,
      }

      try {
        const result = await axios({
          url: `${API_ENDPOINT}/login`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          data: JSON.stringify(userInfo),
        })

        console.log(result)
      } catch (error) {
        console.log(error)
        formik.setErrors({ userEmail: invalidErrorMessage.notCorrect })
      }
    },
  })

  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      <Input
        large
        type="email"
        name="userEmail"
        placeholder="ID"
        style={{ marginBottom: '1.25rem' }}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.userEmail}
      />
      <Input
        large
        type="password"
        name="userPassword"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.userPassword}
      />
      {(formik.touched.userEmail && formik.errors.userEmail) ||
      (formik.touched.userPassword && formik.errors.userPassword) ? (
        <Invalid>{formik.errors.userEmail}</Invalid>
      ) : (
        <Invalid />
      )}
      <ButtonContainer>
        <Button
          style={{
            backgroundColor: 'initial',
            margin: '1rem 0',
          }}
          size="large"
          type="button"
        >
          회원가입
        </Button>
        <Button style={{ width: '100%' }} size="large" type="submit">
          로그인
        </Button>
      </ButtonContainer>
    </FormContainer>
  )
}

export default Signin
