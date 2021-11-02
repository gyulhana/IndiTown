import ContentsSummary from '../../components/ContentsSummary'

export default {
  title: 'Component/ContentsSummary',
  component: ContentsSummary,
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
      defaultValue: 'correctid@naver.com',
      control: { type: 'text' },
    },
    userTown: {
      defaultValue: '강서구 화곡동',
      control: { type: 'text' },
    },
    title: {
      defaultValue:
        '배구파요 같이시켜요.....배구파요 같이시켜요.....배구파요 같이시켜요.....배구파요 같이시켜요.....',
      control: { type: 'text' },
    },
    progressTargetNum: {
      control: { type: 'range', min: 1, max: 100 },
    },
    progressResultNum: {
      control: { type: 'range', min: 1, max: 100 },
    },
    progressTime: {
      defaultValue: '00 : 28 : 49',
      control: { type: 'text' },
    },
    progressAmount: {
      defaultValue: '￦ 5,100원 남음',
      control: { type: 'text' },
    },
  },
}

export const Default = (args) => {
  return (
    <div style={{ width: 375 }}>
      <ContentsSummary {...args} size={'medium'} />
    </div>
  )
}
