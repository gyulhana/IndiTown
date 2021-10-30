import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import theme from '../../themes'

const NavItemWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  transition: all 0.5s ease-out;

  &:nth-child(n) {
    color: ${({ active }) =>
      active ? `${theme.colors.gray_7}` : `${theme.colors.gray_5}`};
    font-weight: ${({ active }) => (active ? `800` : `500`)};

    &:first-child path {
      stroke: ${({ active }) =>
        active ? `${theme.colors.primary}` : `${theme.colors.gray_7}`};
    }

    &:not(:first-child) path {
      fill: ${({ active }) =>
        active ? `${theme.colors.primary}` : `${theme.colors.gray_7}`};
    }
  }
`

const NavItem = ({ bottom, icon, title, index, active, ...props }) => {
  return (
    <NavItemWrapper active={active} {...props}>
      <div>{icon ? icon : title}</div>
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
