import PropTypes from 'prop-types'
import './Text.css'

const Text = ({
  children,
  block,
  paragraph,
  size,
  strong,
  color,
  ...props
}) => {
  const Tag = block ? 'div' : paragraph ? 'p' : 'span'
  const fontStyle = {
    fontSize: typeof size === 'number' ? `${size / 16}rem` : undefined,
    fontWeight: strong ? '500' : undefined,
    color,
  }

  return (
    <Tag
      className={typeof size === 'string' ? `text--size-${size}` : undefined}
      style={{ ...props.style, ...fontStyle }}
    >
      {children}
    </Tag>
  )
}

Text.propsTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  block: PropTypes.bool,
  paragraph: PropTypes.bool,
  strong: PropTypes.bool,
  color: PropTypes.string,
}

export default Text
