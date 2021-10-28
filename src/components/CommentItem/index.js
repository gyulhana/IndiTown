import styled from '@emotion/styled'
import theme from '../../themes'
import Profile from '../Profile'
import Text from '../Text'

const CommentContainer = styled.div`
  margin-left: 4rem;
`

const CommentItem = ({
  lazy,
  threshold,
  size,
  userImg,
  placeholder,
  alt,
  userNickName,
  userTown,
  comment,
  createdAt,
}) => {
  return (
    <div>
      <Profile
        lazy={lazy}
        threshold={threshold}
        size={size}
        src={userImg}
        placeholder={placeholder}
        alt={alt}
        nickName={userNickName}
        town={userTown}
        style={{ marginBottom: '1rem' }}
      />
      <CommentContainer>
        <Text block size={14}>
          {comment}
        </Text>
        <Text
          block
          size={12}
          color={theme.colors.gray_3}
          style={{ marginTop: '2rem' }}
        >
          {createdAt}
        </Text>
      </CommentContainer>
    </div>
  )
}

export default CommentItem
