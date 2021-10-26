import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { darken } from 'polished'

const Buttons = styled.button`
  border: none;
  border-radius: 0.9rem;
  cursor: pointer;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1.4rem;
  transition: all 0.2s ease-in;
  background-color: ${({ primary }) => (primary ? '#F6B545' : '#333333')};
  color: ${({ primary }) => (primary ? '#333333' : '#FAFAFA')};
  filter: ${({ primary }) =>
    primary
      ? 'drop-shadow(0 8px 16px rgba(229, 125, 8, 0.12))'
      : 'drop-shadow(0 8px 16px rgba(51, 51, 51, 0.12))'};

  &:hover {
    background-color: ${({ primary }) =>
      primary ? darken(0.1, '#F6B545') : darken(0.1, '#333333')};
  }

  &:active {
    background-color: ${({ primary }) =>
      primary ? darken(0.13, '#F6B545') : darken(0.13, '#333333')};
  }
`

const Button = ({ children, large, size, color, primary = true, ...props }) => {
  return (
    <Buttons primary={primary} {...props}>
      {children}
    </Buttons>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Button
