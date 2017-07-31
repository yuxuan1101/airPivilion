import React from 'react'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import FormItem from '../FormItem'
import { connect } from 'react-redux'
import pureRender from 'pure-render-decorator'

@pureRender
class Home extends React.Component {
  render () {
    let commit = (key, value, oldValue) => {
      if (value === oldValue) return
      console.log(key, value, oldValue)
    }
    return (
      <Paper style={{
        width: '380px',
        margin: '25px auto 0 auto',
        padding: '5px'
      }}>
        <List>
          <ListItem primaryText='头像'/>
          <Divider/>
          <ListItem disabled>
            <FormItem label='名称' value={this.props.user.username} disabled/>
          </ListItem>
          <ListItem disabled>
            <FormItem label='注册时间' value={this.props.user.createTime} commit={commit}/>
          </ListItem>
          <ListItem>
            <FormItem label='地址' value={this.props.user.address} commit={commit}/>
          </ListItem>
          <ListItem>
            <FormItem label='github' value={this.props.user.github} commit={commit}/>
          </ListItem>
        </List>
      </Paper>
    )
  }
}
function mapStateToProps (state) {
  // console.log(state)
  return {user: state.user}
}
export default connect(mapStateToProps)(Home)
