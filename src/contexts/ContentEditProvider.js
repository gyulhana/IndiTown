import { createContext, useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { useHistory } from 'react-router'

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

  const onChangeDateRadio = ({ target }) => {
    const m = moment(getTime())
    if (target.id === '30분') {
      const recruitmentDate = m.clone().add(30, 'minutes').format()
      console.log(m)
      setContent({ ...content, selectedDate: target.id, recruitmentDate })
    } else if (target.id === '1시간') {
      const recruitmentDate = m.clone().add(1, 'hours').format()
      setContent({ ...content, selectedDate: target.id, recruitmentDate })
    } else if (target.id === '직접입력') {
      setContent({ ...content, selectedDate: target.id })
    }
  }

  const onChangeDateInput = ({ target }) => {
    setContent({ ...content, recruitmentDate: target.value })
  }

  const onChangeOptionRadio = ({ target }) => {
    setContent({ ...content, selectedOption: target.id })
  }

  const onChangeOptionInput = ({ target }) => {
    setContent({ ...content, recruitmentOption: target.value })
  }

  const onChangeTitle = ({ target }) => {
    setContent({ ...content, title: target.value })
  }

  const onChangeImg = ({ file, url }) => {
    console.log(file, url)
    setData({ ...data, img: { file, url } })
  }

  const history = useHistory()

  const onSubmitContent = async (e) => {
    e.preventDefault()
    const create = await handleSubmitContent(data)
    history.push(`/content/${create._id}`)
  }

  return (
    <ContentEditContext.Provider
      value={{
        content,
        onChangeTitle,
        onChangeDateRadio,
        onChangeDateInput,
        onChangeOptionRadio,
        onChangeOptionInput,
        onChangeImg,
        onSubmitContent,
      }}
    >
      {children}
    </ContentEditContext.Provider>
  )
}

export default ContentEditProvider
