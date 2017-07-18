/**
 * Created by yuxuan on 9/12/16.
 */
import React from 'react'
import Message from './Message'
import { connect } from 'react-redux'
import pureRender from 'pure-render-decorator'

@pureRender
class ChatContent extends React.Component {
  render () {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 'auto'
      }}>
        {this.props.chatContent.map((message, index) =>
          <Message
            {...message}
            key={index}
          />
        )}
      </div>
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
