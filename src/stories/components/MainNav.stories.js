import MainNav from '../../components/MainNav'

export default {
  title: 'Component/MainNav',
  component: MainNav,
  argTypes: {},
}

export const Default = (args) => {
  return <MainNav {...args} />
}
