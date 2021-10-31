import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import theme from '../../themes'
import { Link } from 'react-router-dom'

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
      transition: all 0.5s ease-out;
    }

    &:not(:first-child) path {
      fill: ${({ active }) =>
        active ? `${theme.colors.primary}` : `${theme.colors.gray_7}`};
      transition: all 0.5s ease-out;
    }
  }
`

const NavItem = ({ bottom, icon, title, index, active, ...props }) => {
  return (
    <NavItemWrapper active={active} {...props}>
      <Link
        to={`/content/${index}`}
        style={{ width: '100%', padding: '1.4rem 4rem' }}
      >
        <div style={{ textAlign: 'center' }}>{icon ? icon : title}</div>
      </Link>
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
