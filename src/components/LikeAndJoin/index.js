import styled from '@emotion/styled'
import theme from '../../themes'
import Like from '../Like'

const Container = styled.div`
  padding: 1.25rem;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid ${theme.colors.gray_2};
`

const LikeAndJoin = ({ initialState, onClick, ...props }) => {
  return (
    <Container {...props}>
      <Like initialState={initialState} onClick={onClick} />
    </Container>
  )
}

export default LikeAndJoin
