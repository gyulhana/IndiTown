import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { darken } from 'polished'
import theme from '../../themes'

const sizeStyles = {
  small: {
    padding: '0.25rem 0.625rem',
    fontsize: theme.fontSizes.sm,
  },
  medium: {
    padding: '0.5rem 1.4rem',
    fontsize: theme.fontSizes.h6,
  },
  large: {
    padding: '0.875rem 2rem',
    fontsize: theme.fontSizes.h5,
  },
}

const Buttons = styled.button`
  border: none;
  border-radius: 0.7rem;
  cursor: pointer;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
  padding: ${({ size }) => sizeStyles[size].padding};
  font-size: ${({ size }) => sizeStyles[size].fontsize};
  transition: all 0.2s ease-in;
  background-color: ${({ primary }) => (primary ? '#F6B545' : '#333333')};
  color: ${({ primary }) => (primary ? '#333333' : '#FAFAFA')};
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.4;
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

const Button = ({ children, size = 'medium', primary = true, ...props }) => {
  return (
    <Buttons {...props} primary={primary} size={size}>
      {children}
    </Buttons>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  size: PropTypes.string,
}

export default Button
