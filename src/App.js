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
  SearchPage,
  ChattingListPage,
  ChattingRoomPage,
  ProfilePage,
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
            <Route exact path="/food">
              <ContentsPage subMenu="food" />
            </Route>
            <Route exact path="/package">
              <ContentsPage subMenu="package" />
            </Route>
            <Route path="/:subMenu/edit" component={ContentEditPage} />
            <Route exact path="/content/:contentId">
              <ContentPage />
            </Route>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Route path="/chat">
              <ChattingListPage />
            </Route>
            <Route path="/chatting/:userName">
              <ChattingRoomPage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
          </Switch>
        </DefaultTemplate>
      </Switch>
    </div>
  )
}

export default App
