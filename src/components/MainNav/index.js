import Nav from '../Nav'

export const MainNav = () => {
  return (
    <Nav style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
      <Nav.Item title="배달" index="delivery">
        배달 라우팅
      </Nav.Item>
      <Nav.Item title="택배" index="parcel">
        택배 라우팅
      </Nav.Item>
    </Nav>
  )
}

export default MainNav
