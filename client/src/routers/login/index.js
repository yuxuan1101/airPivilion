/**
 * Created by yuxuan on 7/8/16.
 */

import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';

export default class Login extends React.Component{
  constructor(props) {
    super(props);
    this.face = {
      open: ".˚‧ºฅ(´ •ω• ‘)ฅº·˚.",
      close: ".˚‧º·(´ ฅωฅ ‘)·º·˚."
    };
    this.state = {
      topFace: "open",
      open: false,
      registerLoading: false,
      errMsg: {}
    };
    this.style = {
      button: {
        marginBottom: '5px'
      }
    }
  }
  registerTouch = () => {
    const context = this;
    fetch("/user",{
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "username="+this.refs.username.getValue()+"&password="+this.refs.password.getValue()
    }).then(function(res) {
      if (res.ok) return res.json();
    }).then(function (data) {
      if(data.error) {
        throw new Error(data.errMsg);
      }else {
        let user = data.user;
        context.setState({
          registerLoading: false,
        });
      }
    }).catch(function(e) {
      switch (e.message) {
        case "用户已存在":
          context.setState({
            open: false,
            registerLoading: false,
            errMsg: {name: "此名称已存在。"}
          });
          setTimeout(()=>context.refs.username.focus(),500);
          break;
      }
    });
    this.setState({
      registerLoading: true,
      open: true,
    });
  };
  snackbarClose = () => {
    this.setState({
      open: true,
    });
  };
  login = () => {
    const context = this;
    fetch("/auth",{
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "username="+this.refs.username.getValue()+"&password="+this.refs.password.getValue()
    }).then(function(res) {
      if (res.ok) return res.json();
    }).then(function (data) {
      if(data.error) {
        throw new Error(data.errMsg);
      }else {
        let user = data.user;
        console.log(data);
      }
    }).catch(function(e) {
      switch (e.message) {
        case "此用户不存在":
          context.setState({
            open: false,
            registerLoading: false,
            errMsg: {name: "此用户不存在。"}
          });
          setTimeout(()=>context.refs.username.focus(),500);
          break;
        case "密码错误":
          context.setState({
            open: false,
            registerLoading: false,
            errMsg: {pass: "密码错误。"}
          });
          setTimeout(()=>context.refs.password.focus(),500);
          break;
      }
    });
  };
  componentDidMount() {
    setTimeout(()=>this.refs.username.focus(),500);

  };
  render() {
    return (
      <Paper zDepth={1} rounded={false} style={{
        width: '380px',
        margin: '50px auto 0 auto',
        padding: '5px'
      }}>
        <h1 style={{width:'100%',textAlign:'center'}}>
          {this.face[this.state.topFace]}
        </h1>
        <div>
          <TextField
            ref="username"
            onChange={() =>{if(this.state.errMsg.name) this.setState({errMsg:{name:undefined}})}}
            hintText="Username Field"
            errorText={this.state.errMsg.name}
            floatingLabelText="Username"
            style={{width:'100%'}}
          />
        </div>
        <div>
          <TextField
            ref="password"
            onChange={() =>{if(this.state.errMsg.pass) this.setState({errMsg:{pass:undefined}})}}
            hintText="Password Field"
            errorText={this.state.errMsg.pass}
            floatingLabelText="Password"
            type="password"
            style={{width:'100%'}}
            onFocus={()=>this.setState({topFace: 'close'})}
            onBlur={()=>this.setState({topFace: 'open'})}
          />
        </div>
        <RaisedButton label="登录" primary={true} fullWidth={true}
                      style={this.style.button} onTouchTap={this.login}/>

        <RaisedButton label="注册" secondary={true} fullWidth={true}
                      style={this.style.button} onTouchTap={this.registerTouch}/>
        <Snackbar
          open={this.state.open}
          message={this.state.registerLoading?"注册信息加载中...":"注册成功"}
          autoHideDuration={0}
          action={this.state.registerLoading?<CircularProgress style={{bottom:'5px'}}size={0.5}/>:"直接登陆"}
          onActionTouchTap={this.login}
          onRequestClose={this.snackbarClose}
        />
      </Paper>
    );
  }
}
