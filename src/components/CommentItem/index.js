import styled from '@emotion/styled'
import theme from '../../themes'
import Profile from '../Profile'
import Text from '../Text'

const Container = styled.div`
  padding: 1rem;
  border-top: 1px solid ${theme.colors.gray_2};
`
const CommentContainer = styled.div`
  margin-left: 4rem;
`

const CommentItem = ({
  userImg,
  placeholder,
  alt,
  userNickName,
  userEmail,
  userTown,
  comment,
  createdAt,
  onClick,
}) => {
  return (
    <Container>
      <Profile
        lazy
        threshold={0.5}
        size="medium"
        src={userImg}
        placeholder={placeholder}
        alt={alt}
        nickName={userNickName}
        email={userEmail}
        town={userTown}
        style={{ marginBottom: '1rem' }}
        onClick={onClick}
      />
      <CommentContainer>
        <Text block size={14}>
          {comment}
        </Text>
        <Text
          block
          size={12}
          color={theme.colors.gray_4}
          style={{ marginTop: '2rem' }}
        >
          {new Date(createdAt).toLocaleString()}
        </Text>
      </CommentContainer>
    </Container>
  )
}

export default CommentItem
