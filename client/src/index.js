import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory ,IndexRoute } from 'react-router'
import Root from './routers/Root'
import Home from './components/router/Home'
import About from './components/router/About'
import Repos from './components/router/Repos'
import Repo from './components/router/Repo'
import Login from './routers/login'

render((
  <Router history={browserHistory}>
    <Route path="/" component={Root}>
      <IndexRoute component={Home}/>

      <Route path="/login" component={Login}/>
      <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
      <Route path="/about" component={About}/>
      <Route path="/chat" component={Home}/>
    </Route>
  </Router>
), document.getElementById('app'))
