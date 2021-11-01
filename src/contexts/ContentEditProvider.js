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

  const onRadioChange = ({ target }) => {
    const m = moment()
    let recruitmentDate

    if (target.id === '30분') {
      recruitmentDate = m.clone().add(30, 'minutes').format()
    } else if (target.id === '1시간') {
      recruitmentDate = m.clone().add(1, 'hours').format()
    } else if (target.id === '직접입력') {
      recruitmentDate = m.clone().add(1, 'hours').format()
    }
    setContent({ ...content, [target.name]: target.id, recruitmentDate })
  }

  const onInputChange = ({ target }) => {
    setContent({ ...content, [target.name]: target.value })
    console.log(content)
  }

  const onImgChange = (file, url) => {
    setData({
      ...data,
      image: {
        file,
        url,
      },
    })
    console.log(content)
  }

  const onSubmitContent = async (e) => {
    const formData = new FormData()
    setIsLoading(true)
    e.preventDefault()

    const newErrors = validate ? validate(content) : {}

    if (Object.keys(newErrors).length === 0) {
      formData.append('image', data.image)
      setData({ ...data, title: JSON.stringify(content) })
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
