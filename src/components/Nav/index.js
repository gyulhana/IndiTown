import styled from '@emotion/styled'
import React, { useState, useMemo } from 'react'
import NavItem from '../NavItem'
import theme from '../../themes'

const childrenToArray = (children, types) => {
  return React.Children.toArray(children).filter((element) => {
    if (React.isValidElement(element) && types.includes(element.props.__TYPE)) {
      return true
    }

    console.warn(
      `Only accepts ${
        Array.isArray(types) ? types.join(', ') : types
      } as it's children.`
    )
    return false
  })
}

const NavItemContainer = styled.div`
  background-color: white;
  cursor: pointer;
  width: 100vh;
`

const Nav = ({ children, active, ...props }) => {
  const [currentActive, setCurrentActive] = useState(() => {
    if (active) {
      return active
    } else {
      const index = childrenToArray(children, 'Nav.Item')[0].props.index
      return index
    }
  })

  const items = useMemo(() => {
    return childrenToArray(children, 'Nav.Item').map((element) => {
      return React.cloneElement(element, {
        ...element.props,
        key: element.props.index,
        active: element.props.index === currentActive,
        onClick: () => {
          setCurrentActive(element.props.index)
        },
      })
    })
  }, [children, currentActive])

  const activeItem = useMemo(
    () => items.find((element) => currentActive === element.props.index),
    [currentActive, items]
  )

  return (
    <div>
      <NavItemContainer>{items}</NavItemContainer>
      <div>{activeItem.props.children}</div>
    </div>
  )
}

Nav.Item = NavItem

export default Nav
