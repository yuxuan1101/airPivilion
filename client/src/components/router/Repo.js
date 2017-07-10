import React from 'react'
import pureRender from 'pure-render-decorator'

@pureRender
export default class Repo extends React.Component {
  render () {
    return (
      <div>
        <h2>{this.props.params.repoName}</h2>
      </div>
    )
  }
}
