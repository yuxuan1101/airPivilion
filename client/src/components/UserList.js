/**
 * Created by yuxuan on 9/13/16.
 */
import React from 'react'

export default class UserList extends React.Component {
  render () {
    console.log(this.props)
    this.props.othersLogin()
    return (
      <div>
        UserList
      </div>
    )
  }
}
