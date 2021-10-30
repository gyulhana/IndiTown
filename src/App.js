import { Route, Switch } from 'react-router'
import LocationProvider from './contexts/LocationProvider'
import {
  CheckLocationPage,
  MainPage,
  SigninPage,
  SignupPage,
  ContentsEditPage,
} from './pages'

function App() {
  return (
    <div>
      <Switch>
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
        <Route path="/contents/edit">
          <ContentsEditPage />
        </Route>
      </Switch>
    </div>
  )
}

export default App
