import styled from '@emotion/styled'
import theme from '../../themes'
import Text from '../..//components/Text'
import { useContentEditContext } from '../../contexts/ContentEditProvider'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledOption = styled.div`
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
`
const StyledInput = styled.input`
  padding: 0.325rem 1rem;
  text-align: justify;
  border-radius: 0.5rem;
  border: 1px solid ${theme.colors.gray_4};
  outline: none;
  width: 6.6rem;
  margin-right: 0.4rem;

  &:disabled {
    border: 1px solid ${theme.colors.gray_3};
    color: ${theme.colors.gray_3};
  }
`
const StyledInputForm = styled.form`
  margin-top: 1rem;
  margin-left: auto;
`

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  font-size: 0.875rem;

  input[type='radio'] {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border: 1px solid ${theme.colors.gray_2};
    border-radius: 50%;
    outline: none;
    background: ${theme.colors.gray_1};
    margin-left: 1rem;
  }
  input[type='radio']:before {
    content: '';
    display: block;
    width: 60%;
    height: 60%;
    margin: 20% auto;
    border-radius: 50%;
  }
  input[type='radio']:checked:before {
    background: ${theme.colors.primary};
  }
`

const ContentsEditOption = ({ onSubmit, ...props }) => {
  const { content, errors, onRadioChange, onInputChange } =
    useContentEditContext()

  return (
    <div {...props}>
      <Container>
        <FlexBox>
          <StyledOption>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99163 1.66699C5.39163 1.66699 1.66663 5.40033 1.66663 10.0003C1.66663 14.6003 5.39163 18.3337 9.99163 18.3337C14.6 18.3337 18.3333 14.6003 18.3333 10.0003C18.3333 5.40033 14.6 1.66699 9.99163 1.66699ZM9.99996 16.667C6.31663 16.667 3.33329 13.6837 3.33329 10.0003C3.33329 6.31699 6.31663 3.33366 9.99996 3.33366C13.6833 3.33366 16.6666 6.31699 16.6666 10.0003C16.6666 13.6837 13.6833 16.667 9.99996 16.667ZM9.81663 5.83366H9.76663C9.43329 5.83366 9.16663 6.10033 9.16663 6.43366V10.367C9.16663 10.6587 9.31663 10.9337 9.57496 11.0837L13.0333 13.1587C13.3166 13.3253 13.6833 13.242 13.85 12.9587C14.025 12.6753 13.9333 12.3003 13.6416 12.1337L10.4166 10.217V6.43366C10.4166 6.10033 10.15 5.83366 9.81663 5.83366V5.83366Z"
                fill="#F6B545"
              />
            </svg>
            <Text bold block style={{ marginLeft: '0.4rem' }} size="h6">
              ????????????
            </Text>
          </StyledOption>
          <div>
            <StyledForm onSubmit={onSubmit}>
              <input
                name="selectedDate"
                id="30???"
                type="radio"
                onChange={onRadioChange}
                checked={content.selectedDate === '30???'}
              />
              <label htmlFor="30???">30???</label>
              <input
                name="selectedDate"
                id="1??????"
                type="radio"
                onChange={onRadioChange}
              />
              <label htmlFor="1??????">1??????</label>
              <input
                name="selectedDate"
                id="????????????"
                type="radio"
                onChange={onRadioChange}
              />
              <label htmlFor="????????????">????????????</label>
            </StyledForm>
          </div>
        </FlexBox>
        <StyledInputForm onSubmit={onSubmit}>
          <StyledInput
            type="text"
            name="recruitmentDate"
            disabled={content.selectedDate !== '????????????'}
            value={content.recruitmentDate}
            onChange={onInputChange}
            onSubmit={(e) => e.preventDefault}
            style={{
              borderColor: errors.recruitmentDate
                ? theme.colors.warning
                : undefined,
            }}
          />
          <Text color={theme.colors.gray_5}>??????</Text>
        </StyledInputForm>
        <Text
          block
          color={theme.colors.warning}
          size="sm"
          style={{ margin: '0.5rem 1.4rem 0 0', textAlign: 'right' }}
        >
          {errors.recruitmentDate}
        </Text>
      </Container>
      <Container style={{ marginTop: '2rem' }}>
        <FlexBox>
          <StyledOption>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99996 1.66699C5.39996 1.66699 1.66663 5.40033 1.66663 10.0003C1.66663 14.6003 5.39996 18.3337 9.99996 18.3337C14.6 18.3337 18.3333 14.6003 18.3333 10.0003C18.3333 5.40033 14.6 1.66699 9.99996 1.66699ZM9.99996 16.667C6.32496 16.667 3.33329 13.6753 3.33329 10.0003C3.33329 6.32533 6.32496 3.33366 9.99996 3.33366C13.675 3.33366 16.6666 6.32533 16.6666 10.0003C16.6666 13.6753 13.675 16.667 9.99996 16.667ZM10.7416 9.25033C9.25829 8.75866 8.54163 8.45033 8.54163 7.66699C8.54163 6.81699 9.46663 6.50866 10.05 6.50866C11.1416 6.50866 11.5416 7.33366 11.6333 7.62533L12.95 7.06699C12.825 6.70033 12.2666 5.47533 10.7333 5.20866V4.16699H9.27496V5.21699C7.10829 5.68366 7.09163 7.59199 7.09163 7.68366C7.09163 9.57533 8.96663 10.1087 9.88329 10.442C11.2 10.9087 11.7833 11.3337 11.7833 12.1337C11.7833 13.0753 10.9083 13.4753 10.1333 13.4753C8.61663 13.4753 8.18329 11.917 8.13329 11.7337L6.74996 12.292C7.27496 14.117 8.64996 14.6087 9.26663 14.7587V15.8337H10.725V14.8003C11.1583 14.7253 13.2416 14.3087 13.2416 12.117C13.25 10.9587 12.7416 9.94199 10.7416 9.25033Z"
                fill="#F6B545"
              />
            </svg>

            <Text bold block style={{ marginLeft: '0.4rem' }} size="h6">
              ????????????
            </Text>
          </StyledOption>
          <div>
            <StyledForm onSubmit={onSubmit}>
              <input
                name="selectedOption"
                id="??????"
                type="radio"
                onChange={onRadioChange}
                checked={content.selectedOption === '??????'}
              />
              <label htmlFor="??????">??????</label>
              <input
                name="selectedOption"
                id="??????"
                type="radio"
                onChange={onRadioChange}
              />
              <label htmlFor="??????">??????</label>
              <input
                name="selectedOption"
                id="??????"
                type="radio"
                onChange={onRadioChange}
              />
              <label htmlFor="??????">??????</label>
            </StyledForm>
          </div>
        </FlexBox>
        <StyledInputForm onSubmit={onSubmit}>
          <StyledInput
            type="text"
            name="recruitmentOption"
            onChange={onInputChange}
            style={{
              textAlign: 'right',
              borderColor: errors.recruitmentOption
                ? theme.colors.warning
                : undefined,
            }}
          />
          <Text color={theme.colors.gray_5}>
            {content.selectedOption === '??????'
              ? '???'
              : content.selectedOption === '??????'
              ? '???'
              : content.selectedOption === '??????'
              ? '???'
              : ''}
          </Text>
        </StyledInputForm>
        <Text
          block
          color={theme.colors.warning}
          size="sm"
          style={{ margin: '0.5rem 1.4rem 0 0', textAlign: 'right' }}
        >
          {errors.recruitmentOption}
        </Text>
      </Container>
    </div>
  )
}

export default ContentsEditOption
