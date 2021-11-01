import styled from '@emotion/styled'

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  z-index: 20;
  background-color: white;
  width: 100%;
  filter: drop-shadow(0 8px 16px rgba(51, 51, 51, 0.12));
  text-align: center;
  padding: 1rem;
  font-weight: 500;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  transition: all 0.5s ease-out;
`

const Header = ({ children, ...props }) => {
  return <HeaderContainer {...props}>{children}</HeaderContainer>
}

export default Header
