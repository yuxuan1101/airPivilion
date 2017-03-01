/**
 * Created by yuxuan on 8/18/16.
 */

import React from 'react'
import { Link } from 'react-router'

export default class NavLink extends React.Component {
  render () {
    return <Link {...this.props} activeStyle={{color: '#00AA00'}} style={{
      'marginLeft': '10px',
      'fontSize': '1.5rem'
    }}/>
  }
}
