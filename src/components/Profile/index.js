import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Avatar from '../Avatar'
import Text from '../Text'
import theme from '../../themes'

const sizeStyles = {
  medium: {
    avatarSize: 48,
    fontsize_1: theme.fontSizes.sm,
    fontsize_2: theme.fontSizes.sm,
  },
  large: {
    avatarSize: 60,
    fontsize_1: theme.fontSizes.h6,
    fontsize_2: theme.fontSizes.sm,
  },
}

const StyledProfile = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.4;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const TextContainer = styled.div`
  display: flex;
  align-items: center;
`

const Profile = ({
  lazy,
  threshold,
  placeholder,
  src,
  size = 'medium',
  alt,
  nickName,
  email,
  town,
  onClick,
  ...props
}) => {
  return (
    <StyledProfile {...props}>
      <Avatar
        lazy={lazy}
        threshold={threshold}
        size={sizeStyles[size].avatarSize}
        src={src}
        placeholder={placeholder}
        alt={alt}
        onClick={onClick}
      ></Avatar>
      <div style={{ marginLeft: '0.875rem', overflow: 'hidden' }}>
        <TextContainer>
          <Text strong block size={sizeStyles[size].fontsize_1}>
            {nickName}
          </Text>
          <Text
            block
            className={theme.colors.gray_5}
            color={theme.colors.gray_5}
            size={sizeStyles[size].fontsize_1}
            style={{
              marginLeft: '0.4rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {email}
          </Text>
        </TextContainer>
        <Text
          block
          color={theme.colors.gray_5}
          size={sizeStyles[size].fontsize_2}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {town}
        </Text>
      </div>
    </StyledProfile>
  )
}

Profile.propTypes = {
  lazy: PropTypes.bool,
  threshold: PropTypes.number,
  placeholder: PropTypes.string,
  src: PropTypes.string,
  size: PropTypes.string, // medium, large
  alt: PropTypes.string,
  nickName: PropTypes.string,
  email: PropTypes.string,
  town: PropTypes.string,
}

export default Profile
