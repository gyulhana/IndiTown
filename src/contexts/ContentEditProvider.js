import { createContext, useContext, useEffect, useState } from 'react'
import moment from 'moment'

const ContentEditContext = createContext()
export const useContentEditContext = () => useContext(ContentEditContext)

const ContentEditProvider = ({ children, handleSubmitContent, subMenu }) => {
  moment.defaultFormat = 'YYYY-MM-DD HH:mm'
  const getTime = () => {
    const date = moment()
    return date
  }

  const [content, setContent] = useState({
    title: '',
    type: subMenu, // food or package
    selectedDate: '30분',
    recruitmentDate: moment(getTime()).clone().add(30, 'minutes').format(),
    selectedOption: '금액',
    recruitmentOption: null,
  })

  const [data, setData] = useState({
    title: '',
    img: null,
    channelId: '616a205422996f0bc94f6e23',
  })

  useEffect(() => {
    setData({ ...data, title: JSON.stringify(content) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  console.log(content, data)

  const onDateRadioChange = (e) => {
    const m = moment(getTime())
    console.log(m)
    if (e.target.id === '30분') {
      const recruitmentDate = m.clone().add(30, 'minutes').format()
      console.log(m)
      setContent({ ...content, selectedDate: e.target.id, recruitmentDate })
    } else if (e.target.id === '1시간') {
      const recruitmentDate = m.clone().add(1, 'hours').format()
      setContent({ ...content, selectedDate: e.target.id, recruitmentDate })
    } else if (e.target.id === '직접입력') {
      setContent({ ...content, selectedDate: e.target.id })
    }
  }

  const onDateInputChange = (e) => {
    setContent({ ...content, recruitmentDate: e.target.value })
  }

  const onOptionRadioChange = (e) => {
    setContent({ ...content, selectedOption: e.target.id })
  }

  const onOptionInputChange = (e) => {
    setContent({ ...content, recruitmentOption: e.target.value })
  }

  const onChangeTitle = (e) => {
    setContent({ ...content, title: e.target.value })
  }

  const onSubmitContent = (e) => {
    e.preventDefault()
    handleSubmitContent(data)
  }

  return (
    <ContentEditContext.Provider
      value={{
        content,
        onChangeTitle,
        onDateRadioChange,
        onDateInputChange,
        onOptionRadioChange,
        onOptionInputChange,
        onSubmitContent,
      }}
    >
      {children}
    </ContentEditContext.Provider>
  )
}

export default ContentEditProvider
