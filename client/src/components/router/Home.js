import React from 'react'
import { connect } from 'react-redux'

class Home extends React.Component {
  render () {
    return <div>Home</div>
  }
}
function mapStateToProps (state) {
  console.log(state)
  return state
}
export default connect(mapStateToProps)(Home)
