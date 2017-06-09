/**
 * Created by yuxuan on 9/13/16.
 */
import React from 'react'
import {List} from 'material-ui/List'
import UserItem from './UserItem.js'
import { connect } from 'react-redux'
import {othersLogin} from '../actions/socketOn'

class UserList extends React.Component {
  render () {
    this.props.othersLogin()
    return (
      <List>
        {this.props.userList.map((user, index) =>
          <UserItem
            {...user}
            key={index}
          />
        )}
      </List>
    )
  }
}
export default connect(
  state => ({
    // chatContent: state.chatContent,
    userList: state.userList
  }),
  {othersLogin}
)(UserList)
