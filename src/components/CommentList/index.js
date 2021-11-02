import { useHistory } from 'react-router'
import useSessionStorage from '../../hooks/useSessionStorage'
import CommentItem from '../CommentItem'
import { ProfileUtils } from '../../utils/profile'

const CommentList = ({ comments }) => {
  const history = useHistory()
  const [userInfo, setUserInfo] = useSessionStorage('IndiTown')
  const { _id } = userInfo
  const moveToChat = (value) => {
    if (_id !== value._id) {
      const userName = JSON.parse(value.fullName).userName
      setUserInfo({
        ...userInfo,
        contactUserId: '',
      })
      setUserInfo({
        ...userInfo,
        contactUserId: value._id,
      })
      history.push(`/chatting/${userName}`)
    }
  }

  return (
    <div>
      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          userImg={
            comment.author.image ||
            ProfileUtils.getDefaultImage(comment.author.email)
          }
          userNickName={JSON.parse(comment.author.fullName).userName}
          userEmail={comment.author.email}
          comment={comment.comment}
          createdAt={comment.createdAt}
          onClick={() => moveToChat(comment.author)}
        />
      ))}
    </div>
  )
}

export default CommentList
