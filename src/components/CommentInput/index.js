import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Avatar from '../Avatar'
import TextArea from '../TextArea'

const StyledCommentInput = styled.div`
  display: flex;
  align-items: center;
`
const CommentInput = ({
  lazy,
  threshold,
  userImg,
  imgPlaceholder,
  imgAlt,
  textPlaceholder,
  ...props
}) => {
  return (
    <StyledCommentInput {...props}>
      <Avatar
        lazy={lazy}
        threshold={threshold}
        size={48}
        src={userImg}
        placeholder={imgPlaceholder}
        alt={imgAlt}
        style={{ marginRight: '1rem', flexShrink: 0 }}
      />
      <TextArea placeholder={textPlaceholder} name="comment" />
    </StyledCommentInput>
  )
}

TextArea.propsTypes = {
  lazy: PropTypes.bool,
  threshold: PropTypes.number,
  userImg: PropTypes.string.isRequired,
  imgPlaceholder: PropTypes.string,
  imgAlt: PropTypes.string,
  textPlaceholder: PropTypes.string,
}

export default CommentInput
