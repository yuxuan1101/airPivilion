import React from 'react'
import styles from './UserList.less'
import User from './User'

export default class UserList extends React.Component {
  render () {
    return (
        <div className={styles.userList}>
            <div className={styles.label}>在线用户</div>
            <ul className="list">
                {this.props.userList.map((user, index) =>
                    <User
                        {...user}
                        selected={this.props.to === user.name}
                        key={index}
                        onChangeClick={this.props.onChangeClick}
                    />
                )}
            </ul>
        </div>
    )
  }
}
UserList.propTypes = {
  to: React.PropTypes.string.isRequired,
  userList: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    status: React.PropTypes.oneOf([
      false,
      '未准备',
      '已准备',
      '游戏中'
    ]).isRequired
  })),
  onChangeClick: React.PropTypes.func.isRequired
}
