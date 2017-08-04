/**
 * Created by yuxuan on 9/12/16.
 */
import React from 'react'
import Message from './Message'
import { connect } from 'react-redux'
import {getChatMessages} from '../actions/actions'
import pureRender from 'pure-render-decorator'

@pureRender
class ChatContent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      onBottom: true
    }
  }
  componentWillMount () {
    this.props.getChatMessages()
  }
  componentDidUpdate () {
    if (this.state.onBottom) this.refs.container.scrollTop = this.refs.container.scrollHeight
  }
  handleScroll () {
    if (this.refs.container.scrollTop >= this.refs.container.scrollHeight) this.setState({onBottom: true})
    else this.setState({onBottom: false})
  }
  render () {
    return (
      <div ref='container' className='scroll-bar' style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 'auto',
        overflowY: 'auto'
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
    chatContent: state.chatContent.map(message => {
      let isMe, from
      if (message.from === Symbol.for('me') || message.from === state.user.id) {
        isMe = true
        from = state.user
      } else if (message.from.includes('socket:')) {
        isMe = false
        from = {
          username: '匿名' + message.from.split(':')[1],
          avatar: 'avatar'
        }
      } else {
        isMe = false
        from = state.userList.filter(user => user.id === message.from)[0] || {avatar: 'avatar'}
      }
      return Object.assign({}, message, {isMe, from})
    })
  }),
  {getChatMessages}
)(ChatContent)
