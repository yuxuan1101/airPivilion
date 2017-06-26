import React from 'react'
import { connect } from 'react-redux'

class Home extends React.Component {
  render () {
    return <div>Home: {this.props.user.username}</div>
  }
}
function mapStateToProps (state) {
  console.log(state)
  return {user: state.user}
}
export default connect(mapStateToProps)(Home)
