import Nav from '../../components/Nav'

export default {
  title: 'Component/Nav',
  component: Nav,
  argTypes: {},
}

export const Default = () => {
  return (
    <Nav>
      <Nav.Item title="배달" index="item1">
        배달
      </Nav.Item>
      <Nav.Item title="택배" index="item2">
        택배
      </Nav.Item>
    </Nav>
  )
}
