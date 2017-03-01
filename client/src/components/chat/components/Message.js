import React from 'react'
import styles from './Message.less'

export default class Message extends React.Component {
  render () {
    let message
    if (this.props.system) {
      message = (
        <li className={styles.message}
        >
            <div style={{color: 'red'}}>系统({this.now()}): {this.props.text}</div>
        </li>
      )
    } else {
      message = (
        <li className={styles.message}
        >
            <div>{this.props.from}({this.now()})对 {this.props.to} 说：</div>
            <div>{this.props.text}</div>
        </li>
      )
    }
    return message
  }
    // 获取当前时间
  now () {
    var date = new Date()
    var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ':' + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds())
    return time
  }
}

Message.propTypes = {
}
