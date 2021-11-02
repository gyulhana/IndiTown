import styled from '@emotion/styled'
import theme from '../../themes'

const Date = styled.div`
  background-color: ${theme.colors.gray_1};
  color: ${theme.colors.gray_5};
  font-size: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 13px;
  display: inline-block;
`

const ChattingDate = ({ children }) => {
  return <Date>{children}</Date>
}

export default ChattingDate
