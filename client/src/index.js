import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory ,IndexRoute } from 'react-router'
import App from './components/router/App'
import About from './components/router/About'
import Repos from './components/router/Repos'
import Repo from './components/router/Repo'
import Home from './components/router/Home'
import Login from './components/login/login'
import Chat from './components/chat/chat'

import styles from './index.css'
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>

      <Route path="/login" component={Login}/>
      <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
      <Route path="/about" component={About}/>
      <Route path="/chat" component={Chat}/>
    </Route>
  </Router>
), document.getElementById('client'))
