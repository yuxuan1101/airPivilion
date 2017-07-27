import React from 'react'
import { Link } from 'react-router'
import pureRender from 'pure-render-decorator'

@pureRender
export default class Repos extends React.Component {
  render () {
    return (
      <div>
        <h2>Repos </h2>
        <ul>
          <li><Link to="/repos/reactjs/react-router">React Router</Link></li>
          <li><Link to="/repos/facebook/react">React</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
