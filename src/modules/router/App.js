import React from 'react'
import NavLink from './NavLink'
import Home from './Home'
import './stylesheets/nav.css'

export default React.createClass({
  render() {
    return (
      <div>
        <div className="navbar">
          <div className="nav-inner">
            <NavLink to="/" onlyActiveOnIndex={true} className="nav-left">
              <h1>DYUXUAN</h1>
            </NavLink>
            <nav className="nav-right">
              <NavLink to="/about">About</NavLink>
              <NavLink to="/repos">Repos</NavLink>
            </nav>
          </div>
        </div>
        <div className="content">
          <div className="container">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
})
