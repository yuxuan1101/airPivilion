// modules/NavLink.js
import React from 'react'
import { Link } from 'react-router'
import styles from './stylesheets/Nav.less';

export default React.createClass({

  render() {
    return <Link {...this.props} activeStyle={{color: '#00AA00'}} style={{
      'marginLeft': '10px',
      'fontSize': '1.5rem'
    }}/>
  }
})
