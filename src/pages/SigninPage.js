import styled from '@emotion/styled'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Input from '../components/Form'
import Button from '../components/Button'
import axios from 'axios'
import { Link } from 'react-router-dom'

const FormContainer = styled.form`
  padding: 2rem;
`

const ButtonContainer = styled.div`
  text-align: center;
`

const Logo = styled.div`
  text-align: center;
  margin: 9.75rem 0 3rem;
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

const SigninPage = () => {
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
      <Logo>
        <svg
          width="210"
          height="40"
          viewBox="0 0 210 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.46631 21.7415L22.6011 38.8763C23.5236 39.7987 25.0456 39.7987 25.9681 38.8763L29.1045 35.7399C29.4504 35.394 29.4504 34.8174 29.1045 34.4485L10.9319 16.2759L5.46631 21.7415Z"
            fill="#E57D08"
          />
          <path
            d="M8.16974 19.026C9.67375 17.522 9.67376 15.0835 8.16975 13.5795C6.66574 12.0755 4.22726 12.0755 2.72325 13.5795C1.21924 15.0835 1.21924 17.522 2.72325 19.026C4.22726 20.53 6.66573 20.53 8.16974 19.026Z"
            fill="#333333"
          />
          <path
            d="M19.8337 30.6665L17.1124 33.3878L19.8337 36.1091C18.3347 34.61 18.3347 32.1655 19.8337 30.6665Z"
            fill="#FEB83F"
          />
          <path
            d="M21.5403 0.432406L5.58165 16.3911C4.08265 17.8901 4.08265 20.3346 5.58165 21.8567L17.1355 33.4105L18.1733 32.3728L35.8154 14.7306C36.392 14.1541 36.392 13.2086 35.8154 12.632L23.6159 0.432406C23.0393 -0.144135 22.1168 -0.144135 21.5403 0.432406Z"
            fill="#FEB83F"
          />
          <path
            d="M47.3002 10.3779V35.2845H41.2811V10.3779H47.3002Z"
            fill="#333333"
          />
          <path
            d="M69.301 17.6652C70.6386 19.1642 71.2843 21.2398 71.2843 23.8688V35.2843H65.2652V24.5837C65.2652 23.2692 64.9193 22.2314 64.2274 21.4935C63.5356 20.7555 62.6131 20.3865 61.46 20.3865C60.2378 20.3865 59.2692 20.7785 58.5543 21.5396C57.8394 22.3237 57.4704 23.4076 57.4704 24.8605V35.2843H51.4513V15.6358H57.4704V19.2334C58.0239 18.0573 58.8771 17.1348 59.9841 16.443C61.0911 15.7511 62.4056 15.4282 63.9046 15.4282C66.1877 15.4052 67.9634 16.1662 69.301 17.6652Z"
            fill="#333333"
          />
          <path
            d="M86.5972 16.3968C87.6811 17.0886 88.4652 18.0111 88.9495 19.1872V9.22461H94.9686V35.2843H88.9495V31.7328C88.4652 32.9089 87.6811 33.8314 86.5972 34.5232C85.5133 35.2151 84.2219 35.5379 82.7229 35.5379C81.1086 35.5379 79.6557 35.1228 78.3642 34.3157C77.0958 33.5085 76.0811 32.3324 75.3432 30.8103C74.6052 29.2882 74.2362 27.4894 74.2362 25.46C74.2362 23.3845 74.6052 21.6087 75.3432 20.0866C76.0811 18.5646 77.0958 17.4115 78.3642 16.6043C79.6326 15.7972 81.0855 15.3821 82.7229 15.3821C84.2219 15.3821 85.5133 15.728 86.5972 16.3968ZM81.5467 21.9316C80.7627 22.7849 80.3706 23.961 80.3706 25.46C80.3706 26.959 80.7627 28.1351 81.5467 28.9884C82.3308 29.8417 83.3686 30.2568 84.6601 30.2568C85.9285 30.2568 86.9662 29.8187 87.7734 28.9654C88.5805 28.089 88.9957 26.9359 88.9957 25.4831C88.9957 24.0071 88.5805 22.831 87.7734 21.9777C86.9662 21.1244 85.9285 20.6862 84.6601 20.6862C83.3686 20.6632 82.3308 21.0783 81.5467 21.9316Z"
            fill="#333333"
          />
          <path
            d="M99.5579 7.81786C100.204 7.21826 101.08 6.91846 102.164 6.91846C103.248 6.91846 104.101 7.21826 104.77 7.81786C105.416 8.41746 105.762 9.1785 105.762 10.0779C105.762 10.9773 105.439 11.7153 104.77 12.3149C104.101 12.9145 103.248 13.2143 102.164 13.2143C101.08 13.2143 100.204 12.9145 99.5579 12.3149C98.8891 11.7153 98.5663 10.9773 98.5663 10.0779C98.5663 9.1785 98.8891 8.41746 99.5579 7.81786ZM105.162 15.6358V35.2843H99.1428V15.6358H105.162Z"
            fill="#333333"
          />
          <path
            d="M134.243 10.3779V15.1748H127.486V35.2845H121.42V15.1748H114.732V10.3779H134.243Z"
            fill="#333333"
          />
          <path
            d="M151.193 16.6046C152.738 17.4117 153.937 18.5879 154.814 20.11C155.69 21.632 156.128 23.4308 156.128 25.4603C156.128 27.5127 155.69 29.2885 154.814 30.8106C153.937 32.3326 152.715 33.5088 151.193 34.3159C149.648 35.1231 147.918 35.5382 145.958 35.5382C144.021 35.5382 142.268 35.1231 140.723 34.3159C139.178 33.5088 137.955 32.3326 137.079 30.8106C136.203 29.2885 135.765 27.4897 135.765 25.4603C135.765 23.4078 136.203 21.632 137.079 20.11C137.955 18.5879 139.178 17.4117 140.723 16.6046C142.268 15.7974 144.021 15.3823 145.958 15.3823C147.918 15.3823 149.648 15.7744 151.193 16.6046ZM143.052 21.8396C142.268 22.6698 141.876 23.869 141.876 25.4372C141.876 27.0054 142.268 28.2046 143.052 29.0348C143.836 29.865 144.805 30.2571 145.958 30.2571C147.111 30.2571 148.08 29.842 148.841 29.0348C149.625 28.2046 149.994 27.0054 149.994 25.4372C149.994 23.869 149.602 22.6698 148.841 21.8396C148.056 21.0094 147.111 20.5943 145.958 20.5943C144.805 20.5943 143.836 21.0094 143.052 21.8396Z"
            fill="#333333"
          />
          <path
            d="M187.999 15.6357L182.972 35.2843H176.238L172.686 22.1161L169.089 35.2843H162.355L157.327 15.6357H163.346L165.952 29.7956L169.619 15.6357H176.03L179.789 29.8186L182.395 15.6357H187.999Z"
            fill="#333333"
          />
          <path
            d="M208.017 17.6652C209.354 19.1642 210 21.2398 210 23.8688V35.2843H203.981V24.5837C203.981 23.2692 203.635 22.2314 202.943 21.4935C202.251 20.7555 201.329 20.3865 200.176 20.3865C198.953 20.3865 197.985 20.7785 197.27 21.5396C196.555 22.3237 196.186 23.4076 196.186 24.8605V35.2843H190.19V15.6358H196.209V19.2334C196.763 18.0573 197.616 17.1348 198.723 16.443C199.83 15.7511 201.144 15.4282 202.643 15.4282C204.903 15.4052 206.702 16.1662 208.017 17.6652Z"
            fill="#333333"
          />
        </svg>
      </Logo>

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
        <Link to="/location">
          <Button
            style={{
              backgroundColor: 'initial',
              margin: '1rem 0',
              padding: 0,
            }}
            type="button"
          >
            회원가입
          </Button>{' '}
        </Link>
        <Button
          style={{ fontSize: '1.25rem', width: '100%', padding: '0.875rem' }}
          type="submit"
        >
          로그인
        </Button>
      </ButtonContainer>
    </FormContainer>
  )
}

export default SigninPage
