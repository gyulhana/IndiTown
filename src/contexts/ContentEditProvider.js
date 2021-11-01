import { createContext, useContext, useEffect, useState } from 'react'
import moment from 'moment'

const ContentEditContext = createContext()
export const useContentEditContext = () => useContext(ContentEditContext)

const ContentEditProvider = ({ children, handleSubmitContent, subMenu }) => {
  moment.defaultFormat = 'YYYY-MM-DD HH:mm'

  const [content, setContent] = useState({
    title: '',
    type: subMenu, // food or package
    selectedDate: '30분',
    recruitmentDate: moment().clone().add(30, 'minutes').format(),
    selectedOption: '금액',
    recruitmentOption: null,
  })

  const [data, setData] = useState({
    title: '',
    image: null,
    channelId: '616a205422996f0bc94f6e23',
  })

  useEffect(() => {
    setData({ ...data, title: JSON.stringify(content) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  console.log(content, data)

  const onRadioChange = ({ target }) => {
    const m = moment()
    let recruitmentDate
    console.log(target.id, target.name)

    if (target.id === '30분') {
      recruitmentDate = m.clone().add(30, 'minutes').format()
    } else if (target.id === '1시간') {
      recruitmentDate = m.clone().add(1, 'hours').format()
    }
    setContent({ ...content, [target.name]: target.id, recruitmentDate })
  }

  const onInputChange = ({ target }) => {
    console.log(target)
    setContent({ ...content, [target.name]: target.value })
  }

  const formData = new FormData()

  const onImgChange = (file, result) => {
    console.log('image', result)
    setData({ ...data, image: result })
  }

  const onSubmitContent = (e) => {
    e.preventDefault()
    formData.append('title', data.title)
    formData.append('channelId', data.channelId)
    formData.append('image', data.image)

    handleSubmitContent(formData)
  }

  return (
    <ContentEditContext.Provider
      value={{
        content,
        onInputChange,
        onRadioChange,
        onSubmitContent,
        onImgChange,
      }}
    >
      {children}
    </ContentEditContext.Provider>
  )
}

export default ContentEditProvider
