import styled from '@emotion/styled'
import { useRef, useState } from 'react'

const UploadContainer = styled.div`
  display: inline-flex;
  cursor: pointer;
  background-color: #e8e8e8;
  color: #d8d9d9;
  border-radius: 0.7rem;
  font-size: 0.8rem;
  text-align: center;
`
const Input = styled.input`
  display: none;
`

const UploadImage = ({
  children,
  droppable,
  name,
  accept,
  value,
  onChange,
  ...props
}) => {
  const [file, setFile] = useState(value)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)
  const photoRef = useRef(null)

  const handleFileChange = (e) => {
    const files = e.target.files
    const changedFile = files[0]
    setFile(changedFile)
    onChange && onChange(changedFile)

    if (changedFile) {
      const reader = new FileReader()
      reader.readAsDataURL(changedFile)

      reader.onload = () => {
        photoRef.current.style.background = `center 100% / auto 100% no-repeat url(${reader.result})`
      }
    }
  }

  const preventing = (e) => {
    if (!droppable) {
      return
    }

    e.preventDefault()
    e.stopPropagation()
  }

  const handleChooseFile = () => {
    inputRef.current.click()
  }

  const handleDragEnter = (e) => {
    preventing(e)

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true)
    }
  }

  const handleDragLeave = (e) => {
    preventing(e)
  }

  const handleDragOver = (e) => {
    preventing(e)
  }

  const handleFileDrop = (e) => {
    preventing(e)

    const files = e.dataTransfer.files
    const changedFile = files[0]
    setFile(changedFile)
    onChange && onChange(changedFile)

    if (changedFile) {
      const reader = new FileReader()
      reader.readAsDataURL(changedFile)

      reader.onload = () => {
        photoRef.current.style.background = `center 100% / auto 100% no-repeat url(${reader.result})`
      }
    }

    setDragging(false)
  }

  return (
    <UploadContainer
      ref={photoRef}
      onClick={handleChooseFile}
      onDrop={handleFileDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      {...props}
    >
      <Input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        onChange={handleFileChange}
      />
      {typeof children === 'function' ? children(file, dragging) : children}
    </UploadContainer>
  )
}

export default UploadImage
