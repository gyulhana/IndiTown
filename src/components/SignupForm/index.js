import Input from '../Form'
import { useFormik } from 'formik'
import styled from '@emotion/styled'
import * as Yup from 'yup'

const FormContainer = styled.form`
  width: 85%;
  margin: 0 auto;
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
  password: '8~15자 사이의 알파벳, 숫자만 가능합니다.',
  email: '올바른 이메일 형식이 아닙니다.',
}

const SignupForm = () => {
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
        .required(''),
      userPassword: Yup.string()
        .min(8, invalidErrorMessage.password)
        .max(15, invalidErrorMessage.password)
        .matches(/^[a-zA-Z0-9]+$/, invalidErrorMessage.password)
        .required(''),
      userEmail: Yup.string().email(invalidErrorMessage.email).required(''),
    }),
    onSubmit: async (values) => {
      alert(JSON.stringify(values))
    },
  })

  const checkValidation = {
    id: formik.touched.userId && formik.errors.userId,
    password: formik.touched.userPassword && formik.errors.userPassword,
    email: formik.touched.userEmail && formik.errors.userEmail,
  }

  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <Label htmlFor="userId">아이디</Label>
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
          className={'form-control' + (checkValidation.id ? ' is-invalid' : '')}
          required
        />
        {checkValidation.id ? (
          <Invalid>{formik.errors.userId}</Invalid>
        ) : (
          <Invalid />
        )}
        <div class="valid-feedback">Looks good!</div>
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
      <button type="submit">Sign In</button>
    </FormContainer>
  )
}

export default SignupForm
