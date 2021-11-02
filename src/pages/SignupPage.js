import Input from '../components/Form'
import { useFormik } from 'formik'
import styled from '@emotion/styled'
import * as Yup from 'yup'
import { useCallback, useState } from 'react'
import axios from 'axios'
import Button from '../components/Button'
import { useLocation } from '../contexts/LocationProvider'
import Modal from '../components/Modal'
import { Link } from 'react-router-dom'

const SignupContainer = styled.div`
  padding: 2rem;
  height: 100vh;
  box-sizing: border-box;
`

const SignupLogo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 3rem;
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

const Valid = styled.div`
  color: #198754;
  font-size: 0.875rem;
  margin: 0.25rem 0 1rem;
`

const SignupButtonStyle = {
  width: '100%',
  fontSize: '1.25rem',
  padding: '0.875rem',
  marginTop: '3.5rem',
}

const invalidErrorMessage = {
  id: '6~12자 사이의 알파벳, 숫자만 가능합니다.',
  duplicateUserEmail: '이미 존재하는 이메일 입니다.',
  password: '8~15자 사이의 알파벳, 숫자만 가능합니다.',
  email: '올바른 이메일 형식이 아닙니다.',
  duplication: '이메일 중복을 확인해주세요.',
}

const SignupPage = () => {
  const [userTyping, setUserTyping] = useState(new Set())
  const [duplicationCheck, setDuplicationCheck] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const API_ENDPOINT = 'http://13.209.30.200'
  const { currentLocation } = useLocation()

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
        .required(invalidErrorMessage.id)
        .test(
          'is-error',
          invalidErrorMessage.duplicateUserEmail,
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
        .required(invalidErrorMessage.password),
      userEmail: Yup.string()
        .email(invalidErrorMessage.email)
        .required(invalidErrorMessage.email),
    }),
    onSubmit: async (values) => {
      if (!duplicationCheck) {
        formik.setErrors({ userEmail: invalidErrorMessage.duplication })
        return
      }
      const { userId, userPassword, userEmail } = values
      const userInfo = {
        team: 'Yohan1',
        userName: userId,
        location: currentLocation,
      }

      const data = {
        email: userEmail,
        fullName: JSON.stringify(userInfo),
        password: userPassword,
      }

      try {
        await axios({
          url: `${API_ENDPOINT}/signup`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTP-8',
          },
          data: JSON.stringify(data),
        })

        setIsSignup(true)
      } catch (error) {
        console.log(error)
      }
    },
  })

  const checkValidation = {
    email: formik.touched.userEmail && formik.errors.userEmail,
    id: formik.touched.userId && formik.errors.userId,
    password: formik.touched.userPassword && formik.errors.userPassword,
  }

  const getUserLists = useCallback(async () => {
    const userLists = await axios({
      url: `${API_ENDPOINT}/users/get-users`,
      method: 'GET',
    })

    return userLists.data
  }, [])

  const duplicationUserEmail = useCallback(async () => {
    const value = formik.values.userEmail
    if (!value) {
      return
    }

    const userLists = await getUserLists()
    userLists.forEach((user) => {
      if (user.email === value) {
        formik.setErrors({ userEmail: invalidErrorMessage.duplicateUserEmail })
        setUserTyping(() => new Set([...userTyping, value]))
        setDuplicationCheck(false)
        return
      }
    })

    setDuplicationCheck(true)
  }, [getUserLists, setUserTyping, userTyping, formik])

  return (
    <SignupContainer>
      <Link to="/">
        <SignupLogo>
          <svg
            width="36"
            height="40"
            viewBox="0 0 36 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.42896 21.8633L22.4466 38.8809C23.3627 39.7971 24.8744 39.7971 25.7906 38.8809L28.9055 35.766C29.249 35.4224 29.249 34.8498 28.9055 34.4834L10.8572 16.4351L5.42896 21.8633Z"
              fill="#E57D08"
            />
            <path
              d="M8.11387 19.1665C9.6076 17.6728 9.6076 15.251 8.11388 13.7573C6.62015 12.2636 4.19835 12.2636 2.70462 13.7573C1.2109 15.251 1.2109 17.6728 2.70463 19.1665C4.19835 20.6603 6.62015 20.6603 8.11387 19.1665Z"
              fill="#333333"
            />
            <path
              d="M19.6983 30.7275L16.9956 33.4302L19.6983 36.1329C18.2095 34.6441 18.2095 32.2163 19.6983 30.7275Z"
              fill="#F6B545"
            />
            <path
              d="M21.3931 0.699956L5.54357 16.5495C4.05481 18.0382 4.05481 20.466 5.54357 21.9777L17.0184 33.4526L18.0491 32.4219L35.5706 14.9004C36.1432 14.3278 36.1432 13.3887 35.5706 12.8161L23.4544 0.699956C22.8818 0.127358 21.9657 0.127358 21.3931 0.699956Z"
              fill="#F6B545"
            />
          </svg>
          <svg
            width="105"
            height="34"
            viewBox="0 0 105 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.728 25.224C7.23467 25.224 5.89067 24.968 4.696 24.456C3.50133 23.9227 2.56267 23.176 1.88 22.216C1.19733 21.256 0.856 20.136 0.856 18.856H4.76C4.84533 19.816 5.21867 20.6053 5.88 21.224C6.56267 21.8427 7.512 22.152 8.728 22.152C9.98667 22.152 10.968 21.8533 11.672 21.256C12.376 20.6373 12.728 19.848 12.728 18.888C12.728 18.1413 12.504 17.5333 12.056 17.064C11.6293 16.5947 11.0853 16.232 10.424 15.976C9.784 15.72 8.888 15.4427 7.736 15.144C6.28533 14.76 5.10133 14.376 4.184 13.992C3.288 13.5867 2.52 12.968 1.88 12.136C1.24 11.304 0.92 10.1947 0.92 8.808C0.92 7.528 1.24 6.408 1.88 5.448C2.52 4.488 3.416 3.752 4.568 3.24C5.72 2.728 7.05333 2.472 8.568 2.472C10.7227 2.472 12.4827 3.016 13.848 4.104C15.2347 5.17067 16.0027 6.64267 16.152 8.52H12.12C12.056 7.70933 11.672 7.016 10.968 6.44C10.264 5.864 9.336 5.576 8.184 5.576C7.13867 5.576 6.28533 5.84267 5.624 6.376C4.96267 6.90933 4.632 7.67733 4.632 8.68C4.632 9.36267 4.83467 9.928 5.24 10.376C5.66667 10.8027 6.2 11.144 6.84 11.4C7.48 11.656 8.35467 11.9333 9.464 12.232C10.936 12.6373 12.1307 13.0427 13.048 13.448C13.9867 13.8533 14.776 14.4827 15.416 15.336C16.0773 16.168 16.408 17.288 16.408 18.696C16.408 19.8267 16.0987 20.8933 15.48 21.896C14.8827 22.8987 13.9973 23.7093 12.824 24.328C11.672 24.9253 10.3067 25.224 8.728 25.224ZM22.5685 5.032C21.9072 5.032 21.3525 4.808 20.9045 4.36C20.4565 3.912 20.2325 3.35733 20.2325 2.696C20.2325 2.03467 20.4565 1.48 20.9045 1.032C21.3525 0.583999 21.9072 0.359999 22.5685 0.359999C23.2085 0.359999 23.7525 0.583999 24.2005 1.032C24.6485 1.48 24.8725 2.03467 24.8725 2.696C24.8725 3.35733 24.6485 3.912 24.2005 4.36C23.7525 4.808 23.2085 5.032 22.5685 5.032ZM24.3605 7.368V25H20.7125V7.368H24.3605ZM36.254 7.08C37.6193 7.08 38.8247 7.35733 39.87 7.912C40.9367 8.44533 41.7687 9.11733 42.366 9.928V7.368H46.046V25.288C46.046 26.9093 45.7047 28.3493 45.022 29.608C44.3393 30.888 43.3473 31.8907 42.046 32.616C40.766 33.3413 39.23 33.704 37.438 33.704C35.0487 33.704 33.0647 33.1387 31.486 32.008C29.9073 30.8987 29.0113 29.384 28.798 27.464H32.414C32.6913 28.3813 33.278 29.1173 34.174 29.672C35.0913 30.248 36.1793 30.536 37.438 30.536C38.91 30.536 40.094 30.088 40.99 29.192C41.9073 28.296 42.366 26.9947 42.366 25.288V22.344C41.7473 23.176 40.9047 23.88 39.838 24.456C38.7927 25.0107 37.598 25.288 36.254 25.288C34.718 25.288 33.31 24.904 32.03 24.136C30.7713 23.3467 29.7687 22.2587 29.022 20.872C28.2967 19.464 27.934 17.8747 27.934 16.104C27.934 14.3333 28.2967 12.7653 29.022 11.4C29.7687 10.0347 30.7713 8.97867 32.03 8.232C33.31 7.464 34.718 7.08 36.254 7.08ZM42.366 16.168C42.366 14.952 42.11 13.896 41.598 13C41.1073 12.104 40.4567 11.4213 39.646 10.952C38.8353 10.4827 37.9607 10.248 37.022 10.248C36.0833 10.248 35.2087 10.4827 34.398 10.952C33.5873 11.4 32.926 12.072 32.414 12.968C31.9233 13.8427 31.678 14.888 31.678 16.104C31.678 17.32 31.9233 18.3867 32.414 19.304C32.926 20.2213 33.5873 20.9253 34.398 21.416C35.23 21.8853 36.1047 22.12 37.022 22.12C37.9607 22.12 38.8353 21.8853 39.646 21.416C40.4567 20.9467 41.1073 20.264 41.598 19.368C42.11 18.4507 42.366 17.384 42.366 16.168ZM59.7335 7.08C61.1202 7.08 62.3575 7.368 63.4455 7.944C64.5548 8.52 65.4188 9.37333 66.0375 10.504C66.6562 11.6347 66.9655 13 66.9655 14.6V25H63.3495V15.144C63.3495 13.5653 62.9548 12.36 62.1655 11.528C61.3762 10.6747 60.2988 10.248 58.9335 10.248C57.5682 10.248 56.4802 10.6747 55.6695 11.528C54.8802 12.36 54.4855 13.5653 54.4855 15.144V25H50.8375V7.368H54.4855V9.384C55.0828 8.65867 55.8402 8.09333 56.7575 7.688C57.6962 7.28267 58.6882 7.08 59.7335 7.08ZM81.7873 5.032C81.1259 5.032 80.5713 4.808 80.1233 4.36C79.6753 3.912 79.4513 3.35733 79.4513 2.696C79.4513 2.03467 79.6753 1.48 80.1233 1.032C80.5713 0.583999 81.1259 0.359999 81.7873 0.359999C82.4273 0.359999 82.9713 0.583999 83.4193 1.032C83.8673 1.48 84.0913 2.03467 84.0913 2.696C84.0913 3.35733 83.8673 3.912 83.4193 4.36C82.9713 4.808 82.4273 5.032 81.7873 5.032ZM83.5793 7.368V25H79.9313V7.368H83.5793ZM97.2648 7.08C98.6514 7.08 99.8888 7.368 100.977 7.944C102.086 8.52 102.95 9.37333 103.569 10.504C104.187 11.6347 104.497 13 104.497 14.6V25H100.881V15.144C100.881 13.5653 100.486 12.36 99.6968 11.528C98.9074 10.6747 97.8301 10.248 96.4648 10.248C95.0994 10.248 94.0114 10.6747 93.2008 11.528C92.4114 12.36 92.0168 13.5653 92.0168 15.144V25H88.3688V7.368H92.0168V9.384C92.6141 8.65867 93.3714 8.09333 94.2888 7.688C95.2274 7.28267 96.2194 7.08 97.2648 7.08Z"
              fill="black"
            />
          </svg>
        </SignupLogo>
      </Link>

      <form onSubmit={formik.handleSubmit}>
        <Label htmlFor="userLocation">동네</Label>
        <Input
          value={currentLocation}
          style={{
            marginBottom: '2.25rem',
            color: '#808080',
          }}
          disabled
        />
        <Label htmlFor="userEmail">이메일</Label>
        <Flexbox>
          <Input
            id="userEmail"
            name="userEmail"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userEmail}
            style={{
              width: '70%',
              border: checkValidation.email
                ? '1px solid #dc3545'
                : '1px solid #fff',
              boxSizing: 'border-box',
            }}
          />
          <Button
            style={{ fontSize: '0.875rem', padding: '0.313rem 0.625rem' }}
            primary={false}
            type="button"
            onClick={duplicationUserEmail}
          >
            중복확인
          </Button>
        </Flexbox>
        {checkValidation.email ? (
          <Invalid>{formik.errors.userEmail}</Invalid>
        ) : duplicationCheck ? (
          <Valid>사용 가능한 이메일 입니다.</Valid>
        ) : (
          <Invalid />
        )}

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
            border: checkValidation.id ? '1px solid #dc3545' : '1px solid #fff',
            boxSizing: 'border-box',
          }}
          required
        />
        {checkValidation.id ? (
          <Invalid>{formik.errors.userId}</Invalid>
        ) : (
          <Invalid />
        )}

        <Label htmlFor="userPassword">비밀번호</Label>
        <Input
          id="userPassword"
          name="userPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userPassword}
          style={{
            width: '100%',
            border: checkValidation.password
              ? '1px solid #dc3545'
              : '1px solid #fff',
            boxSizing: 'border-box',
          }}
        />
        {checkValidation.password ? (
          <Invalid>{formik.errors.userPassword}</Invalid>
        ) : (
          <Invalid />
        )}

        <Button style={SignupButtonStyle} type="submit">
          회원가입
        </Button>
      </form>
      <Modal show={isSignup} style={{ textAlign: 'center' }}>
        <p style={{ paddingTop: '2rem' }}>회원가입이 완료 되었습니다.</p>
        <Link to="/signin" style={{ justifySelf: 'center' }}>
          <Button style={{ marginTop: '1rem' }} primary={false}>
            로그인 하기
          </Button>
        </Link>
      </Modal>
    </SignupContainer>
  )
}

export default SignupPage
