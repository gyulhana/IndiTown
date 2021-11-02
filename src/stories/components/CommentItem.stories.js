import CommentItem from '../../components/CommentItem'

export default {
  title: 'Component/CommentItem',
  component: CommentItem,
  argTypes: {
    src: { defaultValue: 'https://picsum.photos/400/200' },
    size: {
      defaultValue: 'medium',
      options: ['medium', 'large'],
      control: { type: 'inline-radio' },
    },
    userNickName: {
      defaultValue: '가양동식충벌레',
      control: { type: 'text' },
    },
    userTown: {
      defaultValue: '강서구 화곡동',
      control: { type: 'text' },
    },
    comment: {
      defaultValue: '여기 게살버거 맛없어요 찐찌버거 추천드립니다',
      control: { type: 'text' },
    },
    createdAt: {
      defaultValue: '2021년 10월 21일  14:00',
      control: { type: 'text' },
    },
  },
}

export const Default = (args) => <CommentItem {...args} />
