import ContentsSummary from '../ContentsSummary'
import { useContentsContext } from '../../contexts/ContentsProvider'
import moment from 'moment'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`

const LinkWrapper = styled.div`
  display: inline-block;
  max-width: 27rem;
  margin-bottom: 1rem;
`

const ContentsSummaryList = ({ ...props }) => {
  const { contents } = useContentsContext()

  const calculateTime = (time) => {
    const t1 = moment(time, 'YYYY-MM-DD hh:mm')
    const t2 = moment()
    const m = moment.duration(t1.diff(t2))
    console.log()
    return `${Math.floor(m.asDays())
      .toString()
      .padStart(2, '0')}일  ${Math.floor(m.asHours())
      .toString()
      .padStart(2, '0')}시  ${Math.floor(m.asMinutes() % 60)
      .toString()
      .padStart(2, '0')}분`
  }

  return (
    <Container {...props}>
      {contents.map((content) =>
        +calculateTime(JSON.parse(content.title).recruitmentDate).substr(
          0,
          2
        ) >= 0 ? (
          <LinkWrapper key={content._id}>
            <Link to={`/content/${content._id}`}>
              <ContentsSummary
                lazy
                userNickName={JSON.parse(content.author.fullName).userName}
                userId={content.author.email}
                userTown={JSON.parse(content.author.fullName).location}
                title={JSON.parse(content.title).title}
                progressTime={calculateTime(
                  JSON.parse(content.title).recruitmentDate
                )}
                progressTargetNum={JSON.parse(content.title).recruitmentOption}
                progressAmount={JSON.parse(content.title).recruitmentOption}
                selectedOption={JSON.parse(content.title).selectedOption}
              />
            </Link>
          </LinkWrapper>
        ) : undefined
      )}
    </Container>
  )
}
export default ContentsSummaryList
