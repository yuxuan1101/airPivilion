import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import {sendChatMessage} from '../actions/actions'

import pureRender from 'pure-render-decorator'

@pureRender
class InputBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      input: ''
    }
  }
  send = () => {
    this.props.sendChatMessage('all', this.state.input)
    this.setState({input: ''})
  }
  render () {
    return (
      <Paper zDepth={1} style={{
        display: 'flex',
        flex: 'none'
      }}>
        <div style={{display: 'flex', flex: 'auto', paddingLeft: '5px'}}>
          <TextField name='input_box' multiLine={true} hintText='输入信息'
            rowsMax={3} fullWidth={true} value={this.state.input}
            onChange={event => this.setState({input: event.target.value})}/>
        </div>
        <Avatar icon={<FontIcon className="material-icons">send</FontIcon>}
          size={30} style={{
            display: 'flex',
            flex: 'none',
            margin: '5px',
            marginTop: '10px',
            cursor: 'pointer'
          }}
          onClick={this.send}/>
      </Paper>
    )
  }
}
export default connect(null, {sendChatMessage})(InputBox)
