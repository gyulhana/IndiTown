import { Route, Switch } from 'react-router'
import LocationProvider from './contexts/LocationProvider'
import { CheckLocation, MainPage, SigninPage, SignupPage } from './pages'

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/location" exact>
          <LocationProvider>
            <CheckLocation />
          </LocationProvider>
        </Route>
        <Route path="/signup">
          <LocationProvider>
            <SignupPage />
          </LocationProvider>
        </Route>
        <Route path="/signin" component={SigninPage}></Route>
      </Switch>
    </div>
  )
}

export default App
