import Profile from '../../components/Profile'

export default {
  title: 'Component/Profile',
  component: Profile,
  argTypes: {
    src: { defaultValue: 'https://picsum.photos/400/200' },
    size: {
      defaultValue: 'medium',
      options: ['medium', 'large'],
      control: { type: 'inline-radio' },
    },
    nickName: {
      defaultValue: '가양동식충벌레',
      control: { type: 'text' },
    },
    id: {
      defaultValue: 'correctid123',
      control: { type: 'text' },
    },
    town: {
      defaultValue: '강서구 화곡동',
      control: { type: 'text' },
    },
  },
}

export const Default = (args) => <Profile {...args} />
export const Size = (args) => (
  <div>
    <Profile {...args} size={'medium'} />
    <Profile {...args} size={'large'} />
  </div>
)
