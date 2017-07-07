/**
 * Created by yuxuan on 9/12/16.
 */
import React from 'react'
import Message from './Message'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'

class ChatContent extends React.Component {
  render () {
    console.log(this.props)
    return (
      <Paper zDepth={1} style={{
        flex: 'auto',
        margin: '5px',
        marginTop: '15px'
      }}>
        {this.props.chatContent.map((message, index) =>
          <Message
            {...message}
            key={index}
          />
        )}
      </Paper>
    )
  }
}
export default connect(
  state => ({
    chatContent: state.chatContent,
    userList: state.userList
  }),
  null
)(ChatContent)
