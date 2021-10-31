import MainNav from '../MainNav'
import NavBottom from '../NavBottom'

const DefaultTemplate = ({ children }) => {
  return (
    <div>
      <MainNav />
      <main>{children}</main>
      <NavBottom />
    </div>
  )
}

export default DefaultTemplate
