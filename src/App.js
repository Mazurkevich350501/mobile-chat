import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { NativeRouter, Route, Switch, Redirect } from 'react-router-native'
import { persistStore } from 'redux-persist'
import SplashScreen from 'rn-splash-screen'
import {
  LOGIN_PATH,
  MATCHES_PATH,
  DISCOVER_PATH,
  ACCOUNT_PATH,
  USER_PATH,
  CHAT_PATH
} from './constants/paths'

import LoginPage from './containers/LoginPage'
import DiscoverPage from './containers/DiscoverPage'
import MatchesPage from './containers/MatchesPage'
import AccountPage from './containers/AccountPage'
import UserPage from './containers/UserPage'
import ChatPage from './containers/ChatPage'

import store from './store'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { loadInProgress: true }
    this.isLogged = this.isLogged.bind(this)
  }

  componentDidMount() {
    persistStore(store, null, () => {
      this.setState({ loadInProgress: false })
      SplashScreen.hide()
    })
  }

  isLogged() {
    return Object.keys(store.getState().account).length
  }

  render() {
    if (this.state.loadInProgress) { return false }
    return (
      <Provider store={store}>
        <NativeRouter>
          <Switch>
            <Route exact path='/' render={() => (
              this.isLogged() ? <Redirect to={ACCOUNT_PATH}/> : <Redirect to={LOGIN_PATH}/>
            )}/>
            <Route path={LOGIN_PATH} component={LoginPage} />
            <Route path={MATCHES_PATH} component={MatchesPage} />
            <Route path={DISCOVER_PATH} component={DiscoverPage} />
            <Route path={ACCOUNT_PATH} component={AccountPage} />
            <Route path={USER_PATH} component={UserPage} />
            <Route path={CHAT_PATH} component={ChatPage} />
          </Switch>
        </NativeRouter>
      </Provider>
    )
  }
}

export default App
