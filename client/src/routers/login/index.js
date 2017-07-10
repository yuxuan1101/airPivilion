/**
 * Created by yuxuan on 7/8/16.
 */

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import {fetchAuth, postUser} from '../../actions/actions'
import pureRender from 'pure-render-decorator'

@pureRender
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.face = {
      open: '.˚‧ºฅ(´ •ω• ‘)ฅº·˚.',
      close: '.˚‧º·(´ ฅωฅ ‘)·º·˚.'
    }
    this.state = {
      topFace: 'open'
    }
    this.style = {
      button: {
        marginBottom: '5px'
      }
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.errMsg.pass) {
      setTimeout(() => this.refs.password.select(), 500)
    } else if (nextProps.errMsg.name) {
      setTimeout(() => this.refs.username.select(), 500)
    }
  }
  componentDidMount () {
    setTimeout(() => this.refs.username.focus(), 500)
  }
  registerTouch = () => {
    this.props.postUser('username=' + this.refs.username.getValue() + '&password=' + this.refs.password.getValue(), this.props.nextUrl)
  }
  login = () => {
    this.props.fetchAuth('username=' + this.refs.username.getValue() + '&password=' + this.refs.password.getValue(), this.props.nextUrl)
  }
  render () {
    return (
      <Paper zDepth={1} rounded={false} style={{
        width: '380px',
        margin: '50px auto 0 auto',
        padding: '5px'
      }}>
        <h1 style={{width: '100%', textAlign: 'center'}}>
          {this.face[this.state.topFace]}
        </h1>
        <div>
          <TextField
            ref="username"
            hintText="Username Field"
            errorText={this.props.errMsg.name}
            floatingLabelText="Username"
            style={{width: '100%'}}
          />
        </div>
        <div>
          <TextField
            ref="password"
            hintText="Password Field"
            errorText={this.props.errMsg.pass}
            floatingLabelText="Password"
            type="password"
            style={{width: '100%'}}
            onFocus={() => this.setState({topFace: 'close'})}
            onBlur={() => this.setState({topFace: 'open'})}
          />
        </div>
        <RaisedButton label="登录" primary={true} fullWidth={true}
                      style={this.style.button} onTouchTap={this.login}/>

        <RaisedButton label="注册" secondary={true} fullWidth={true}
                      style={this.style.button} onTouchTap={this.registerTouch}/>
        <Snackbar
          open={this.props.authFetcing || this.props.userPosting}
          message={this.props.authFetcing ? '登录信息验证中...' : '用户信息提交中...'}
          action={<CircularProgress size={35}/>}
          onActionTouchTap={this.login}
        />
      </Paper>
    )
  }
}
Login.contextTypes = {
  router: PropTypes.object.isRequired
}
export default connect(state => {
  let errMsg = {}
  switch (state.login.errMsg) {
    case '此用户不存在':
    case '此名称已被注册':
      errMsg = {name: state.login.errMsg}
      break
    case '密码错误':
      errMsg = {pass: state.login.errMsg}
      break
    case undefined:
      break
    default:
      console.log(state.login.errMsg)
  }
  return {
    nextUrl: state.routing.locationBeforeTransitions.state ? state.routing.locationBeforeTransitions.state.nextUrl : '/',
    errMsg,
    authFetcing: state.auth.isfetching,
    userPosting: state.login.userPosting
  }
}, { fetchAuth, postUser })(Login)
