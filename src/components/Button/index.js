const Button = ({ children, large, size, color, primary = true, ...props }) => {
  const buttonStyle = {
    display: large ? 'block' : undefined,
    width: large ? '100%' : undefined,
    border: 'none',
    borderRadius: '.9rem',
    backgroundColor: primary ? '#F6B545' : '#333333',
    color: primary ? '#333333' : '#FAFAFA',
    fontSize: '1.25rem',
    padding: large ? '.9rem 1.4rem' : '.5rem 1.4rem',
    boxSizing: 'border-box',
    cursor: 'pointer',
    filter: primary
      ? 'drop-shadow(0 8px 16px rgba(229, 125, 8, .12))'
      : 'drop-shadow(0 8px 16px rgba(51, 51, 51, .12))',
    height: size,
  }

  return (
    <button style={buttonStyle} {...props}>
      {children}
    </button>
  )
}

Button.propTypes = {}

export default Button
