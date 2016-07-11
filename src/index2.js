import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory ,IndexRoute } from 'react-router'
import App from './modules/router/App'
import About from './modules/router/About'
import Repos from './modules/router/Repos'
import Repo from './modules/router/Repo'
import Home from './modules/router/Home'
// import chat from './modules/chat/chat'

import styles from './index.css'
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>

      <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('root'))
