/**
 * Created by yuxuan on 9/13/16.
 */
import React from 'react'
import {List} from 'material-ui/List'
import UserItem from './UserItem.js'
import { connect } from 'react-redux'
import pureRender from 'pure-render-decorator'

@pureRender
class UserList extends React.Component {
  render () {
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
  null
)(UserList)
