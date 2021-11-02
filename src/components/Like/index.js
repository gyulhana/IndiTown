import React from 'react'
import styled from '@emotion/styled'

const LikeStyle = styled.svg`
  cursor: pointer;
`

const Button = styled.button`
  background-color: initial;
  border: none;
  margin: 0;
  padding: 0;
`

const Like = ({ initialState, onClick, isLoading }) => {
  return (
    <Button type="button" onClick={onClick}>
      {initialState ? (
        <LikeStyle
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.4999 5C24.5999 5 21.8166 6.35 19.9999 8.48333C18.1833 6.35 15.3999 5 12.4999 5C7.36659 5 3.33325 9.03333 3.33325 14.1667C3.33325 20.4667 8.99992 25.6 17.5833 33.4L19.9999 35.5833L22.4166 33.3833C30.9999 25.6 36.6666 20.4667 36.6666 14.1667C36.6666 9.03333 32.6333 5 27.4999 5Z"
            fill="#F6B545"
          />
        </LikeStyle>
      ) : (
        <LikeStyle
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.4999 5C24.5999 5 21.8166 6.35 19.9999 8.48333C18.1833 6.35 15.3999 5 12.4999 5C7.36659 5 3.33325 9.03333 3.33325 14.1667C3.33325 20.4667 8.99992 25.6 17.5833 33.4L19.9999 35.5833L22.4166 33.3833C30.9999 25.6 36.6666 20.4667 36.6666 14.1667C36.6666 9.03333 32.6333 5 27.4999 5ZM20.1666 30.9167L19.9999 31.0833L19.8333 30.9167C11.8999 23.7333 6.66659 18.9833 6.66659 14.1667C6.66659 10.8333 9.16659 8.33333 12.4999 8.33333C15.0666 8.33333 17.5666 9.98333 18.4499 12.2667H21.5666C22.4333 9.98333 24.9333 8.33333 27.4999 8.33333C30.8333 8.33333 33.3333 10.8333 33.3333 14.1667C33.3333 18.9833 28.0999 23.7333 20.1666 30.9167Z"
            fill="#F6B545"
          />
        </LikeStyle>
      )}
    </Button>
  )
}

export default React.memo(Like)
