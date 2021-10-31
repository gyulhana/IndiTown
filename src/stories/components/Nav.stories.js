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

export const MyProfileNav = () => {
  return (
    <Nav style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
      <Nav.Item title="모집내역" index="writes">
        모집
      </Nav.Item>
      <Nav.Item title="참여내역" index="participant">
        참여
      </Nav.Item>
      <Nav.Item title="관심내역" index="likes">
        관심
      </Nav.Item>
    </Nav>
  )
}

export const OtherProfileNav = () => {
  return (
    <Nav style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
      <Nav.Item title="모집내역" index="writes">
        모집
      </Nav.Item>
      <Nav.Item title="참여내역" index="participant">
        참여
      </Nav.Item>
    </Nav>
  )
}
