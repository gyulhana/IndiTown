import { createContext, useContext, useEffect, useState } from 'react'
import moment from 'moment'

const ContentEditContext = createContext()
export const useContentEditContext = () => useContext(ContentEditContext)

const ContentEditProvider = ({ children, handleSubmitContent }) => {
  const getTime = () => {
    const date = moment().format('YYYY-MM-DD hh:mm')
    return date
  }

  const [content, setContent] = useState({
    title: '',
    selectedDate: '30분',
    recruitmentDate: getTime(),
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
    moment.defaultFormat = 'YYYY-MM-DD hh:mm'
    if (e.target.id === '30분') {
      const m = moment(getTime()).clone().add(30, 'minutes').format()
      setContent({ ...content, selectedDate: e.target.id, recruitmentDate: m })
    } else if (e.target.id === '1시간') {
      const m = moment(getTime()).clone().add(1, 'hours').format()
      setContent({ ...content, selectedDate: e.target.id, recruitmentDate: m })
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
