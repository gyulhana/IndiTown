import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import theme from '../../themes'
import { darken } from 'polished'

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.gray_2};
  border-radius: 0.8rem;
`
const StyledTextArea = styled.textarea`
  background-color: ${theme.colors.gray_2};
  outline: none;
  border: none;
  border-radius: 0.8rem;
  resize: none;
  height: 35px;
  width: 100%;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  font-family: 'Noto Sans KR', sans-serif;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledButton = styled.button`
  border: none;
  padding: 0;
  background-color: transparent;
  line-height: 1;

  &:active svg path {
    fill: ${darken(0.1, theme.colors.gray_5)};
  }
`

const TextArea = ({
  placeholder = 'Text...',
  width = '100%',
  onChange,
  value,
  id,
  name,
  onSubmit,
  ...props
}) => {
  function resize(element) {
    element.style.height = '1px'
    element.style.height = element.scrollHeight + 'px'
  }

  return (
    <StyledForm
      {...props}
      style={{ width }}
      id="commentForm"
      onSubmit={onSubmit}
    >
      <StyledTextArea
        placeholder={placeholder}
        onKeyUp={(event) => {
          if (event.ctrlKey && event.key === 'Enter') {
            event.target.value += '\n'
            resize(event.target)
          } else {
            resize(event.target)
          }
        }}
        onKeyDown={(event) => {
          if (!event.ctrlKey && event.key === 'Enter') {
            event.preventDefault()
          }
        }}
        spellcheck="false"
        onChange={onChange}
        value={value}
        id={id}
        name={name}
        form="commentForm"
      ></StyledTextArea>
      <StyledButton>
        <svg
          width="22"
          height="18"
          viewBox="0 0 22 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: '0.8rem' }}
        >
          <path
            d="M1.84037 16.0394C1.84147 16.7424 2.54852 17.2249 3.20355 16.9695L18.6932 10.9317C19.5423 10.6007 19.5423 9.39925 18.6932 9.06828L3.20355 3.03047C2.54852 2.77514 1.84147 3.25759 1.84037 3.96061L1.83489 7.44582C1.8341 7.95217 2.21189 8.3792 2.71456 8.44013L7.39344 9.00727C8.56634 9.14943 8.56634 10.8506 7.39344 10.9927L2.71456 11.5599C2.21189 11.6208 1.8341 12.0478 1.83489 12.5542L1.84037 16.0394Z"
            fill={theme.colors.gray_5}
          />
        </svg>
      </StyledButton>
    </StyledForm>
  )
}

TextArea.propsTypes = {
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default TextArea
