import styled from '@emotion/styled'
import { Fragment } from 'react'
import Button from '../Button'

const JoinButton = styled(Button)`
  cursor: auto;
  &:hover {
    background-color: #333333;
  }
`

const Join = ({ initialState, isExpired, openJoinClick }) => {
  return (
    <Fragment>
      {!isExpired ? (
        ''
      ) : !initialState ? (
        <Button onClick={openJoinClick}>참여하기</Button>
      ) : (
        <JoinButton disabled primary={false}>
          참여 중
        </JoinButton>
      )}
    </Fragment>
  )
}

export default Join
