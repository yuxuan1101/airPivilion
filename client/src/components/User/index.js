import React from 'react'
import { connect } from 'react-redux'
import pureRender from 'pure-render-decorator'

@pureRender
class Home extends React.Component {
  render () {
    return <div>user: {this.props.user.username}</div>
  }
}
function mapStateToProps (state) {
  console.log(state)
  return {user: state.user}
}
export default connect(mapStateToProps)(Home)
