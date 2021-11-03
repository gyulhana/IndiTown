import styled from '@emotion/styled'
import { useCallback } from 'react'
import ContentsEdit from '../components/ContentsEdit'
import Text from '../components/Text'
import theme from '../themes'
import ContentEditProvider from '../contexts/ContentEditProvider'
import moment from 'moment'
import useSessionStorage from '../hooks/useSessionStorage'
import { ApiUtils } from '../utils/api'
import { ProfileUtils } from '../utils/profile'
import { useHistory } from 'react-router'

const Container = styled.div`
  margin: 5rem 1rem;
  background-color: white;
  border-radius: 0.8rem;
`
const Header = styled.div`
  border-bottom: 1px solid ${theme.colors.gray_2};
  display: flex;
  justify-content: center;
  padding: 1rem;
`

const ContentEditPage = ({ match }) => {
  const MOMENT_DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm'
  const [userInfo] = useSessionStorage('IndiTown')
  const { user, token } = userInfo

  const initialState = {
    title: '',
    type: match.params.subMenu, // food or package
    selectedDate: '30분',
    recruitmentDate: moment()
      .clone()
      .add(30, 'minutes')
      .format(MOMENT_DEFAULT_FORMAT),
    selectedOption: '금액',
    recruitmentOption: null,
    orderedOption: 0,
    joined: [],
    token: token,
  }

  const validate = ({ title, recruitmentDate, recruitmentOption }, data) => {
    const errors = {}
    if (!title) {
      errors.title = '본문을 입력해 주세요'
    }

    const result = moment(
      recruitmentDate,
      MOMENT_DEFAULT_FORMAT,
      true
    ).isValid()
    const calculateTime = (time) => {
      const t1 = moment(time, 'YYYY-MM-DD hh:mm')
      const t2 = moment()
      const m = moment.duration(t1.diff(t2))
      return m
    }

    if (!recruitmentDate) {
      errors.recruitmentDate = '날짜를 입력해 주세요'
    } else if (!result) {
      errors.recruitmentDate = `${MOMENT_DEFAULT_FORMAT} 형식으로 입력해 주세요`
    } else if (calculateTime(recruitmentDate)._milliseconds <= 0) {
      errors.recruitmentDate = `${moment().format(
        MOMENT_DEFAULT_FORMAT
      )} 이후로 입력해 주세요`
    }

    if (!recruitmentOption) {
      errors.recruitmentOption = '옵션을 입력해 주세요'
    } else if (isNaN(+recruitmentOption)) {
      errors.recruitmentOption = '숫자 값을 입력해 주세요'
    }

    if (recruitmentOption && !JSON.parse(data.title).recruitmentOption) {
      errors.recruitmentOption = '옵션을 다시 타이핑 해 주세요'
    }

    return errors
  }
  const history = useHistory()
  const handleSubmitContent = useCallback(
    async (content) => {
      const { _id } = await ApiUtils.createContent({ content, token })
      history.push(`/content/${_id}`)
    },
    [history, token]
  )

  const userFullName = JSON.parse(user.fullName)

  return (
    <Container>
      <ContentEditProvider
        initialState={initialState}
        handleSubmitContent={handleSubmitContent}
        validate={validate}
      >
        <Header>
          <Text strong block size="h5">
            게시물 만들기
          </Text>
        </Header>
        <ContentsEdit
          style={{ padding: '1rem' }}
          alt={`${userFullName.userName}님의 프로필`}
          userImg={user.image || ProfileUtils.getDefaultImage(user.email)}
          userNickName={userFullName.userName}
          userEmail={user.email}
          userTown={userFullName.location}
        />
      </ContentEditProvider>
    </Container>
  )
}

export default ContentEditPage
