import Nav from '../Nav'

export const MainNav = () => {
  return (
    <Nav
      style={{
        gridTemplateColumns: 'repeat(2, 1fr)',
        position: 'fixed',
        top: 0,
        zIndex: 20,
      }}
    >
      <Nav.Item title="배달" index="food" />
      <Nav.Item title="택배" index="package" />
    </Nav>
  )
}

export default MainNav
