import { createContext, useContext, useEffect, useState } from 'react'
import moment from 'moment'

const ContentEditContext = createContext()
export const useContentEditContext = () => useContext(ContentEditContext)

const ContentEditProvider = ({
  initialState,
  validate,
  handleSubmitContent,
  children,
}) => {
  const MOMENT_DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm'
  moment.defaultFormat = MOMENT_DEFAULT_FORMAT
  const [content, setContent] = useState(initialState)

  const [data, setData] = useState({
    title: '',
    channelId: '616a205422996f0bc94f6e23',
    image: null,
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const onRadioChange = (e) => {
    const { id, name } = e.target

    if (name === 'selectedDate') {
      const m = moment()
      let recruitmentDate

      // eslint-disable-next-line default-case
      switch (id) {
        case '30분':
          recruitmentDate = m.clone().add(30, 'minutes').format()
          break
        case '1시간':
          recruitmentDate = m.clone().add(1, 'hours').format()
          break
        case '직접입력':
          recruitmentDate = m.clone().add(1, 'hours').format()
      }
      setContent({ ...content, [name]: id, recruitmentDate })
    } else {
      setContent({ ...content, [name]: id })
    }
    setData({ ...data, title: JSON.stringify(content) })
  }

  const onInputChange = ({ target }) => {
    setContent({ ...content, [target.name]: target.value })
    setData({ ...data, title: JSON.stringify(content) })
  }

  const onImgChange = (file, url) => {
    setData({
      ...data,
      image: {
        file,
        url,
      },
    })
  }

  const onSubmitContent = async (e) => {
    const formData = new FormData()
    setIsLoading(true)

    e.preventDefault()

    const newErrors = validate ? validate(content) : {}

    if (Object.keys(newErrors).length === 0) {
      formData.append('image', data.image)
      formData.append('channelId', data.channelId)
      formData.append('title', data.title)

      await handleSubmitContent(formData)
    }
    setErrors(newErrors)
    setIsLoading(false)
  }

  return (
    <ContentEditContext.Provider
      value={{
        content,
        errors,
        isLoading,
        onInputChange,
        onRadioChange,
        onImgChange,
        onSubmitContent,
      }}
    >
      {children}
    </ContentEditContext.Provider>
  )
}

export default ContentEditProvider
