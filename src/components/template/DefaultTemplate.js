import MainNav from '../MainNav'

const DefaultTemplate = ({ children }) => {
  return (
    <div>
      <MainNav />
      <main>{children}</main>
    </div>
  )
}

export default DefaultTemplate
