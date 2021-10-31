import { Route, Switch } from 'react-router'
import LocationProvider from './contexts/LocationProvider'
import DefaultTemplate from './components/template/DefaultTemplate'
import {
  CheckLocationPage,
  MainPage,
  SigninPage,
  SignupPage,
  ContentEditPage,
  ContentsPage,
  ContentPage,
  ChattingListPage,
  ChattingRoomPage,
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
        <DefaultTemplate>
          <Switch>
            <Route exact path="/content/food">
              <ContentsPage subMenu="food" />
            </Route>
            <Route exact path="/content/package">
              <ContentsPage subMenu="package" />
            </Route>
            <Route path="/content/:subMenu/edit" component={ContentEditPage} />
            <Route exact path="/content/:contentId">
              <ContentPage />
            </Route>
            <Route path="/chat">
              <ChattingListPage />
            </Route>
            <Route path="/chatting/:user">
              <ChattingRoomPage />
            </Route>
          </Switch>
        </DefaultTemplate>
      </Switch>
    </div>
  )
}

export default App
