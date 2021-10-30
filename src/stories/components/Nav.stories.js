import Nav from '../../components/Nav'

export default {
  title: 'Component/Nav',
  component: Nav,
  argTypes: {},
}

export const Default = () => {
  return (
    <Nav>
      <Nav.Item></Nav.Item>
    </Nav>
  )
}
