import styled from '@emotion/styled'

const BackButtons = styled.div`
  display: inline-block;
  cursor: pointer;
  position: fixed;
  left: 1.5rem;
`

const goBack = (e) => {
  e.preventDefault()
  window.history.go(-1)
  return
}

const BackButton = ({ children, ...props }) => {
  return (
    <BackButtons {...props} onClick={goBack}>
      <svg
        width="23"
        height="24"
        viewBox="0 0 23 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.9409 0.94043L0.940918 11.9404" stroke="#333333" />
        <path d="M11.8514 22.8516L0.851442 11.8516" stroke="#333333" />
      </svg>
    </BackButtons>
  )
}

export default BackButton
