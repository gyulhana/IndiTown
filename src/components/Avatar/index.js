import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import ImageComponent from '../Image'
import AvatarGroup from './AvatarGroup'

const ShapeToCssValue = {
  circle: '50%',
  round: '1rem',
  square: '0',
}

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  border: 1px solid #f5f5f5;
  border-radius: ${({ shape }) => ShapeToCssValue[shape]};
  background-color: #f5f5f5;
  overflow: hidden;

  > img {
    transition: opacity 0.2s ease-out;
  }
`

const Avatar = ({
  lazy,
  threshold,
  placeholder,
  src,
  size = 70,
  shape = 'circle',
  alt,
  mode = 'dover',
  __TYPE,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const image = new Image()
    image.src = src
    image.onload = () => setLoaded(true)
  }, [src])

  return (
    <AvatarWrapper {...props} shape={shape}>
      <ImageComponent
        block
        lazy={lazy}
        threshold={threshold}
        width={size}
        height={size}
        src={src}
        placeholder={placeholder}
        alt={alt}
        mode={mode}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </AvatarWrapper>
  )
}

Avatar.defaultProps = {
  __TYPE: 'Avatar',
}

Avatar.propTypes = {
  __TYPE: PropTypes.string,
  lazy: PropTypes.bool,
  threshold: PropTypes.number,
  placeholder: PropTypes.string,
  src: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shape: PropTypes.string,
  alt: PropTypes.string,
  mode: PropTypes.string,
}

Avatar.Group = AvatarGroup

export default Avatar
