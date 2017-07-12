import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import history from './history'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import Root from './routers/Root'
import Home from './components/router/Home'
import About from './components/router/About'
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
          <IndexRoute component={Home}/>

          <Route path="/login" component={Login}/>
          <Route path="/repos" component={Repos}>
            <Route path="/repos/:userName/:repoName" component={Repo}/>
          </Route>
          <Route path="/about" component={About}/>
          <Route path="/chat" component={Chat}/>
        </Route>
      </Router>
    </Provider>
), document.getElementById('app'))
