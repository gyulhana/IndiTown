import Profile from '../../components/Profile'

export default {
  title: 'Component/Profile',
  component: Profile,
}

export const Default = (args) => <Profile {...args} />
export const Size = (args) => (
  <div>
    <Profile {...args} size={'medium'} />
    <Profile {...args} size={'large'} />
  </div>
)
