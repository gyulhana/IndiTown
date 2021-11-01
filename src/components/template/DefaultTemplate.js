import { useLocation } from 'react-router'
import Header from '../Header'
import MainNav from '../MainNav'
import NavBottom from '../NavBottom'

const DefaultTemplate = ({ children }) => {
  const location = useLocation()
  const pathname = location.pathname.split('/')[1]
  let userName = null
  if (pathname === 'chatting') {
    userName = location.pathname.split('/')[2]
  }
  switch (pathname) {
    case 'food':
    case 'package':
    case 'content':
      return (
        <div>
          <MainNav />
          <main>{children}</main>
          <NavBottom />
        </div>
      )
    case 'chat':
      return (
        <div>
          <Header>채팅 페이지</Header>
          <main>{children}</main>
          <NavBottom />
        </div>
      )
    case 'chatting':
      return (
        <div>
          <Header>{userName}</Header>
          <main>{children}</main>
          <NavBottom />
        </div>
      )
    case 'profile':
      return (
        <div>
          <Header>내 정보</Header>
          <main>{children}</main>
          <NavBottom />
        </div>
      )
    default:
      return (
        <div>
          <main>{children}</main>
          <NavBottom />
        </div>
      )
  }
}

export default DefaultTemplate
