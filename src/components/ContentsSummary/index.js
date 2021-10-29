import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Profile from '../Profile'
import Progress from '../Progress'
import Text from '../Text'
import theme from '../../themes'

const StyledContentsSummary = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.8rem;
  line-height: 1.4;
  max-width: 25rem;
`
const ContentsSummary = ({
  lazy,
  threshold,
  placeholder,
  size = 'medium',
  alt,
  userImg = 'https://picsum.photos/400',
  userNickName,
  userEmail,
  userTown,
  title,
  progressTargetNum,
  progressResultNum,
  progressTime,
  progressAmount,
  ...props
}) => {
  return (
    <StyledContentsSummary {...props}>
      <Profile
        lazy={lazy}
        threshold={threshold}
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
      <Progress
        size={size}
        children={progressTime}
        style={{ marginBottom: '0.5rem' }}
      />
      <Progress
        size={size}
        targetNum={progressTargetNum}
        resultNum={progressResultNum}
        children={progressAmount}
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
  userImg: PropTypes.string.isRequired,
  userNickName: PropTypes.string,
  userEmail: PropTypes.string,
  userTown: PropTypes.string,
  title: PropTypes.string,
  progressTargetNum: PropTypes.number,
  progressResultNum: PropTypes.number,
  progressTime: PropTypes.string,
  progressAmount: PropTypes.string,
}
export default ContentsSummary
