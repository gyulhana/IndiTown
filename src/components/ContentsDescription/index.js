import PropTypes from 'prop-types'
import Profile from '../Profile'
import Text from '../Text'
import Image from '../Image'
import Progress from '../Progress'
import EditModal from '../EditModal'
import styled from '@emotion/styled'
import theme from '../../themes'
import useSessionStorage from '../../hooks/useSessionStorage'
import { useState } from 'react'

const FlexBox = styled.div`
  display: flex;
  align-items: center;
`

const ImgWrapper = styled.div`
  width: 100%;
  border-radius: 0.8rem;
  margin: 2rem 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
`

const selectedOptions = {
  금액: '원',
  수량: '개',
  인원: '명',
  '': '',
}

const EditButton = ({ handleClick }) => {
  return (
    <div style={{ padding: '0.325rem' }} onClick={handleClick}>
      <svg
        width="6"
        height="24"
        viewBox="0 0 6 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 6C4.65 6 6 4.65 6 3C6 1.35 4.65 0 3 0C1.35 0 0 1.35 0 3C0 4.65 1.35 6 3 6ZM3 9C1.35 9 0 10.35 0 12C0 13.65 1.35 15 3 15C4.65 15 6 13.65 6 12C6 10.35 4.65 9 3 9ZM3 18C1.35 18 0 19.35 0 21C0 22.65 1.35 24 3 24C4.65 24 6 22.65 6 21C6 19.35 4.65 18 3 18Z"
          fill="#D8D9D9"
        />
      </svg>
    </div>
  )
}

const ContentsDescription = ({
  threshold,
  placeholder,
  id,
  alt,
  userImg,
  userNickName,
  userEmail,
  userTown,
  title,
  isExpired,
  progress,
  progressTime,
  contentImg,
  updatedAt,
  onClick,
  ...props
}) => {
  const [userInfo] = useSessionStorage('IndiTown')
  const isAuthor = userInfo.user.email === userEmail

  const [isClickEdit, setIsClickEdit] = useState(false)

  return (
    <div {...props}>
      {isClickEdit && (
        <EditModal
          defaultShow={isClickEdit}
          handleClick={() => setIsClickEdit(!isClickEdit)}
          id={id}
        />
      )}
      <FlexBox
        style={{ marginBottom: '1rem', justifyContent: 'space-between' }}
      >
        <Profile
          lazy
          threshold={0.5}
          size="medium"
          src={userImg}
          placeholder="https://via.placeholder.com/200"
          alt={alt}
          nickName={userNickName}
          email={userEmail}
          town={userTown}
          onClick={onClick}
        />
        {isAuthor && (
          <EditButton handleClick={() => setIsClickEdit(!isClickEdit)} />
        )}
      </FlexBox>

      <Text children={title} size={'h6'} color={theme.colors.gray_6} block />

      <ImgWrapper>
        <Image
          lazy
          block
          src={contentImg}
          mode="cover"
          style={{ maxWidth: '30rem', borderRadius: '0.8rem' }}
        ></Image>
      </ImgWrapper>

      <FlexBox
        style={{
          marginBottom: '0.5rem',
        }}
      >
        {!isExpired && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Progress width="11rem" size="large" children={progressTime} />
            <Text size={14} block strong style={{ marginLeft: '0.6rem' }}>
              남음
            </Text>
          </div>
        )}
      </FlexBox>

      <Progress
        size="medium"
        targetNum={progress.recruitmentOption}
        resultNum={progress.orderedOption}
        isExpired={isExpired}
        children={
          isExpired
            ? '모집마감'
            : `${progress.recruitmentOption - progress.orderedOption}${
                selectedOptions[progress.selectedOption]
              } 남음`
        }
      />
      <Text
        block
        size="h6"
        color={theme.colors.gray_4}
        style={{ textAlign: 'end', margin: '0.4rem 0.8rem 0 0' }}
      >
        {`${progress.recruitmentOption} ${
          selectedOptions[progress.selectedOption]
        }`}
      </Text>
      <Text
        block
        size={12}
        color={theme.colors.gray_4}
        style={{ marginTop: '2rem' }}
      >
        {new Date(updatedAt).toLocaleString()}
      </Text>
    </div>
  )
}

Progress.propTypes = {
  alt: PropTypes.string,
  userImg: PropTypes.string,
  userNickName: PropTypes.string,
  userEmail: PropTypes.string,
  userTown: PropTypes.string,
  title: PropTypes.string,
  contentImg: PropTypes.string,
  progressTargetNum: PropTypes.number,
  progressResultNum: PropTypes.number,
  progressTime: PropTypes.string,
  progressAmount: PropTypes.string,
  imgSrc: PropTypes.string,
  updatedAt: PropTypes.string,
}

export default ContentsDescription
