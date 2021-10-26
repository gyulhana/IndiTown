import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const Buttons = styled.button`
  border: none;
  border-radius: 0.9rem;
  cursor: pointer;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1.4rem;

  &:hover {
    background-color: #111;
  }

  &:active {
    background-color: #222;
  }
`

const Button = ({ children, large, size, color, primary = true, ...props }) => {
  const buttonStyle = {
    ...props.style,
    backgroundColor: primary === true ? '#F6B545' : '#333333',
    color: primary === true ? '#333333' : '#FAFAFA',
    filter:
      primary === true
        ? 'drop-shadow(0 8px 16px rgba(229, 125, 8, 0.12))'
        : 'drop-shadow(0 8px 16px rgba(51, 51, 51, 0.12))',
  }

  return (
    <Buttons style={buttonStyle} {...props}>
      {children}
    </Buttons>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Button
