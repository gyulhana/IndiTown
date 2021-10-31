import { Fragment } from 'react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import LocationProvider from './contexts/LocationProvider'
import {
  CheckLocationPage,
  MainPage,
  SigninPage,
  SignupPage,
  ContentEditPage,
  ContentsPage,
} from './pages'

function App() {
  return (
    <div>
      <Switch>
        <Fragment>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/location" exact>
            <LocationProvider>
              <CheckLocationPage />
            </LocationProvider>
          </Route>
          <Route path="/signup">
            <LocationProvider>
              <SignupPage />
            </LocationProvider>
          </Route>
          <Route path="/signin" component={SigninPage}></Route>
          <main>
            <nav>
              <ul>
                <li>
                  <Link to="/content/food">배달</Link>
                </li>
                <li>
                  <Link to="/content/package">택배</Link>
                </li>
              </ul>
            </nav>

            <Route exact path="/content/food">
              <ContentsPage subMenu="food" />
            </Route>
            <Route exact path="/content/package">
              <ContentsPage subMenu="package" />
            </Route>
            <Route path="/content/:subMenu/edit" component={ContentEditPage} />
          </main>
        </Fragment>
      </Switch>
    </div>
  )
}

export default App
