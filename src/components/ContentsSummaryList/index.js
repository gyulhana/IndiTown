import ContentsSummary from '../ContentsSummary'
import { useContentsContext } from '../../contexts/ContentsProvider'
import moment from 'moment'
import styled from '@emotion/styled'

const Container = styled.div`
  padding: 1rem;
`

const ContentsSummaryList = ({ initialContents }) => {
  const { contents } = useContentsContext()

  const calculateTime = (time) => {
    const t1 = moment(time, 'YYYY-MM-DD hh:mm')
    const t2 = moment()
    const m = moment.duration(t1.diff(t2))
    console.log()
    return `${Math.floor(m.asDays())
      .toString()
      .padStart(2, '0')}일 ${Math.floor(m.asHours())
      .toString()
      .padStart(2, '0')}시 ${Math.floor(m.asMinutes() % 60)
      .toString()
      .padStart(2, '0')}분`
  }

  contents.forEach((content) => console.log(content))

  return (
    <Container>
      {contents.map((content) =>
        +calculateTime(JSON.parse(content.title).recruitmentDate).substr(
          0,
          2
        ) >= 0 ? (
          <ContentsSummary
            key={content._id}
            id={content._id}
            lazy
            userNickName={JSON.parse(content.author.fullName).userName}
            userId={content.author.email}
            userTown={JSON.parse(content.author.fullName).location}
            title={JSON.parse(content.title).title}
            progressTime={calculateTime(
              JSON.parse(content.title).recruitmentDate
            )}
          />
        ) : undefined
      )}
    </Container>
  )
}
export default ContentsSummaryList
