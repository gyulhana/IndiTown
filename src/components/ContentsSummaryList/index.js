import ContentsSummary from '../ContentsSummary'
import { useContentsContext } from '../../contexts/ContentsProvider'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { TimeUtils } from '../../utils/time'
import { ProfileUtils } from '../../utils/profile'

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

const ContentsSummaryList = ({ subMenu, ...props }) => {
  const { contents } = useContentsContext()

  return (
    <Container {...props}>
      {contents.map((content) => (
        <LinkWrapper key={content._id}>
          <Link to={`/content/${content._id}`}>
            <ContentsSummary
              lazy
              userImg={
                content.author.image ||
                ProfileUtils.getDefaultImage(content.author.email)
              }
              userNickName={
                content.author.fullName[0] !== '{'
                  ? content.author.fullName
                  : JSON.parse(content.author.fullName).userName
              }
              userId={content.author.email}
              userTown={
                content.author.fullName[0] !== '{'
                  ? '동네정보없음'
                  : JSON.parse(content.author.fullName).location
              }
              title={JSON.parse(content.title).title}
              isExpired={!TimeUtils.checkExpired(content)}
              progress={JSON.parse(content.title)}
              progressTime={TimeUtils.calculateTime(
                JSON.parse(content.title).recruitmentDate
              )}
            />
          </Link>
        </LinkWrapper>
      ))}
    </Container>
  )
}
export default ContentsSummaryList
