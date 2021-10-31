import CommentItem from '../CommentItem'

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          userNickName={JSON.parse(comment.author.fullName).userName}
          userEmail={comment.author.email}
          comment={comment.comment}
          createdAt={comment.createdAt}
        />
      ))}
    </div>
  )
}

export default CommentList
