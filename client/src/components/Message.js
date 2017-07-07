/**
 * Created by yuxuan on 9/12/16.
 */
import React from 'react'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import {blue200} from 'material-ui/styles/colors'
import {convertByNow} from '../utils/DateTimeUtils'
export default class Message extends React.Component {
  render () {
    console.log(this.props)
    return (
      <div style={{margin: '15px', display: 'flex', alignItems: 'flex-start'}}>
        <Avatar size={35} src={'avatar?avatar=' + this.props.avatar}/>
        <div style={{margin: '0 14px'}}>
          <div>
            <span style={{fontSize: '14px'}}>{this.props.from}</span>
            <span style={{fontSize: '12px', marginLeft: '2px'}}>{convertByNow(this.props.time)}</span>
          </div>
          <Paper zDepth={1} style={{
            backgroundColor: blue200,
            padding: '5px 10px'
          }}>{this.props.text}</Paper>
        </div>
      </div>
    )
  }
}
