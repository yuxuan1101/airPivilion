import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import history from './history'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import Root from './routers/Root'
import User from './components/User'
import Group from './components/Group'
import Repos from './components/router/Repos'
import Repo from './components/router/Repo'
import Login from './routers/login'
import Chat from './routers/chat'
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
        <Route path="/" component={Root}>
          <IndexRoute component={Chat}/>
          <Route path="/chat" component={Chat}/>
          <Route path="/login" component={Login}/>
          <Route path="/repos" component={Repos}>
            <Route path="/repos/:userName/:repoName" component={Repo}/>
          </Route>
          <Route path="/user" component={User}/>
          <Route path="/group" component={Group}/>
        </Route>
      </Router>
    </Provider>
), document.getElementById('app'))
