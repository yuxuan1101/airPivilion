import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'

import pureRender from 'pure-render-decorator'

@pureRender
export default class InputBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      input: ''
    }
  }
  render () {
    return (
      <Paper zDepth={1} style={{
        display: 'flex',
        flex: 'none'
      }}>
        <div style={{display: 'flex', flex: 'auto'}}>
          <TextField name='input_box' multiLine={true} hintText='输入信息' rowsMax={3} ref='input' fullWidth={true}/>
        </div>
        <Avatar style={{display: 'flex', flex: 'none', margin: '5px', marginTop: '10px'}} size={30} icon={<FontIcon className="material-icons">send</FontIcon>}/>
      </Paper>
    )
  }
}
