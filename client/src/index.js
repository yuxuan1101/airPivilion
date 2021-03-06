import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Switch, Redirect } from 'react-router'
import history from './history'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import Root from './components/Root'
import User from './components/User'
import Group from './components/Group'
import Login from './components/Login'
import Chat from './components/Chat'
import './actions/socketListener'
import {getUser} from './actions/user'
import './stylesheets/index.less'
import './stylesheets/font/icons.css'

import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

let token = window.localStorage.getItem('token')
if (token) store.dispatch(getUser(token))

render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={(props) => (
          <Root {...props}>
            <Switch>
              <Route exact path="/" render={() => (
                <Redirect to="/chat"/>
              )}/>
              <Route path="/chat" component={Chat}/>
              <Route path="/login" component={Login}/>
              <Route path="/user" component={User}/>
              <Route path="/group" component={Group}/>
            </Switch>
          </Root>
        )}/>
      </Router>
    </Provider>
), document.getElementById('app'))
