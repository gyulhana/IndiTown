import styled from '@emotion/styled'
import theme from '../../themes'
import Join from '../Join'
import Like from '../Like'

const Container = styled.div`
  padding: 1.25rem;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid ${theme.colors.gray_2};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LikeAndJoin = ({
  likeState,
  onLikeClick,
  joinState,
  onJoinClick,
  isExpired,
  count,
  openJoinClick,
  ...props
}) => {
  return (
    <Container {...props}>
      <Like initialState={likeState} count={count} onClick={onLikeClick} />
      <Join
        initialState={joinState}
        isExpired={isExpired}
        onClick={onJoinClick}
        openJoinClick={openJoinClick}
      />
    </Container>
  )
}

export default LikeAndJoin
