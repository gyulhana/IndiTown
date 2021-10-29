import ContentsEdit from '../../components/ContentsEdit'

export default {
  title: 'Component/ContentsEdit',
  component: ContentsEdit,
  argTypes: {
    lazy: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    threshold: {
      type: { name: 'number' },
      defaultValue: 0.5,
      control: { type: 'number' },
    },
    placeholder: {
      type: { name: 'string', required: true },
      defaultValue: 'https://via.placeholder.com/200',
      control: { type: 'text' },
    },
    userImg: {
      type: { name: 'string', required: true },
      defaultValue: 'https://picsum.photos/200',
      control: { type: 'text' },
    },
    userNickName: {
      defaultValue: '가양동식충벌레',
      control: { type: 'text' },
    },
    userEmail: {
      defaultValue: 'correct@naver.com',
      control: { type: 'text' },
    },
    userTown: {
      defaultValue: '강서구 화곡동',
      control: { type: 'text' },
    },
  },
}

export const Default = (args) => {
  return (
    <div>
      <ContentsEdit {...args} />
    </div>
  )
}
