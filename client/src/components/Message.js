/**
 * Created by yuxuan on 9/12/16.
 */
import React from 'react'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import {blue200} from 'material-ui/styles/colors'
import {convertByNow} from '../utils/DateTimeUtils'
import pureRender from 'pure-render-decorator'

@pureRender
export default class Message extends React.Component {
  render () {
    let isMe = this.props.from === Symbol.for('me')
    let style = {padding: '0 15px 15px 15px', display: 'flex', flex: 'none', alignItems: 'flex-start'}
    if (isMe) style.flexDirection = 'row-reverse'
    return (
      <div style={style}>
        <Avatar size={35} src={'avatar?avatar=' + this.props.avatar} style={{marginTop: '10px'}}/>
        <div style={{margin: '0 14px',
          display: 'flex',
          flexDirection: 'column',
          flex: 'none',
          maxWidth: '80%'
        }}>
          <div>
            <span style={{fontSize: '14px'}}>{this.props.from.username}</span>
            <span style={{fontSize: '12px', marginLeft: '2px'}}>{convertByNow(this.props.time)}</span>
          </div>
          <Paper zDepth={1} style={{
            backgroundColor: blue200,
            padding: '5px 10px',
            wordBreak: 'break-all'
          }}>{this.props.text}</Paper>
        </div>
      </div>
    )
  }
}
