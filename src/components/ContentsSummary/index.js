import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Profile from '../Profile'
import Progress from '../Progress'
import Text from '../Text'
import theme from '../../themes'
import { useEffect } from 'react'

const StyledContentsSummary = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.8rem;
  line-height: 1.4;
`
const selectedOptions = {
  금액: '원',
  수량: '개',
  인원: '명',
  '': '',
}
const ContentsSummary = ({
  lazy,
  threshold,
  placeholder,
  size = 'medium',
  alt,
  userImg,
  userNickName,
  userEmail,
  userTown,
  title,
  isExpired,
  progress,
  progressTime,
  ...props
}) => {
  useEffect(() => {
    return () => {} // cleanup function을 이용
  }, [])

  return (
    <StyledContentsSummary {...props}>
      <Profile
        lazy
        threshold={0.5}
        size={size}
        src={userImg}
        placeholder={placeholder}
        alt={alt}
        nickName={userNickName}
        email={userEmail}
        town={userTown}
        style={{ marginBottom: '1rem' }}
      />
      <Text
        children={title}
        size={'h6'}
        color={theme.colors.gray_6}
        style={{
          marginBottom: '1.75rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        block
      />
      {!isExpired && (
        <Progress
          size={size}
          children={progressTime}
          style={{ marginBottom: '0.5rem' }}
        />
      )}
      <Progress
        size={size}
        targetNum={progress.recruitmentOption}
        isExpired={isExpired}
        resultNum={progress.orderedOption}
        children={
          isExpired
            ? '모집마감'
            : `${
                progress.orderedOption
                  ? progress.recruitmentOption - progress.orderedOption
                  : progress.recruitmentOption
              }${selectedOptions[progress.selectedOption]} 남음`
        }
      />
    </StyledContentsSummary>
  )
}

Progress.propTypes = {
  lazy: PropTypes.bool,
  threshold: PropTypes.number,
  placeholder: PropTypes.string,
  size: PropTypes.string, // medium, large
  alt: PropTypes.string,
  userImg: PropTypes.string,
  userNickName: PropTypes.string,
  userEmail: PropTypes.string,
  userTown: PropTypes.string,
  title: PropTypes.string,
  isExpired: PropTypes.boolean,
  progress: PropTypes.object,
}
export default ContentsSummary
