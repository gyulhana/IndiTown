import styled from '@emotion/styled'
import { Fragment } from 'react'

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.7rem 1rem;
  font-size: 1rem;
  border-radius: 0.8rem;
  box-sizing: border-box;
  color: #333;
  background-color: ${({ type }) => (type === 'search' ? '#E8E8E8' : '#FFF')};
  border: none;

  &:focus {
    outline: none;
  }

  &.large {
    padding: 0.9rem 1.2rem;
    font-size: 1.25rem;
    border-radius: 0.9rem;
  }
`

const types = {
  id: 'text',
  password: 'password',
  email: 'email',
  search: 'text',
}

const Form = ({ id, name, type = 'id', large, placeholder, ...props }) => {
  return (
    <Fragment>
      <Input
        id={id}
        name={name}
        type={types[type]}
        placeholder={
          placeholder
            ? placeholder
            : type === 'search'
            ? '검색'
            : type.toUpperCase()
        }
        className={large ? 'large' : null}
        style={{ backgroundColor: type === 'search' ? '#E8E8E8' : '#FFF' }}
        autocomplete="off"
        {...props}
      />
    </Fragment>
  )
}

export default Form
