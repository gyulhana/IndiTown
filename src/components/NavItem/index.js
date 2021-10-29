import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import theme from '../../themes'

const NavItemWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 60px;
  color: ${(active) =>
    active ? `${theme.colors.gray_7}` : `${theme.colors.gray_3}`};
  border-bottom: 0.3rem solid
    ${({ active }) => (active ? `${theme.colors.primary}` : 'white')};
  transition: all 0.5s ease-out;
`

const NavItem = ({ title, index, active, ...props }) => {
  return (
    <NavItemWrapper active={active} {...props}>
      <div>{title}</div>
    </NavItemWrapper>
  )
}

NavItem.defaultProps = {
  __TYPE: 'Nav.Item',
}

NavItem.propTypes = {
  __TYPE: PropTypes.oneOf(['Nav.Item']),
}

export default NavItem
