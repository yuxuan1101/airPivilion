/**
 * Created by yuxuan on 9/12/16.
 */
import React from 'react'
import { connect } from 'react-redux'
import {othersLogin} from '../../actions/socketOn'
import Paper from 'material-ui/Paper';
import style from './chat.less';

import UserList from '../../components/UserList'

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.left}>

        </div>
        <div className={style.right}>
          <Paper zDepth={1} style={{
            flex: 'auto',
            margin: '5px'
          }}>
            <UserList userlist={this.props.userList}
                      othersLogin={this.props.othersLogin}/>
          </Paper>
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({
    chatContent: state.chatContent,
    userList: state.userList
  },
  {othersLogin})
)(Chat)