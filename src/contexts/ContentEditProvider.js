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
    image: null,
    channelId: '616a205422996f0bc94f6e23',
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setData({ ...data, title: JSON.stringify(content) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  console.log(content, data)

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
    console.log(target)
    setContent({ ...content, [target.name]: target.value })
  }

  const onImgChange = (file, result) => {
    console.log('image', result)
    setData({ ...data, image: result })
  }

  const formData = new FormData()

  const onSubmitContent = async (e) => {
    setIsLoading(true)
    e.preventDefault()

    const newErrors = validate ? validate(content) : {}

    if (Object.keys(newErrors).length === 0) {
      formData.append('title', data.title)
      formData.append('channelId', data.channelId)
      formData.append('image', data.image)

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
