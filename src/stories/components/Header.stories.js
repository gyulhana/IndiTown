import Header from '../../components/Header'

export default {
  title: 'Component/Header',
  component: Header,
}

export const Default = (args) => {
  return <Header {...args}>내 정보</Header>
}
