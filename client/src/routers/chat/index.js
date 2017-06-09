/**
 * Created by yuxuan on 9/12/16.
 */
import React from 'react'
import Paper from 'material-ui/Paper'
import style from './chat.less'

import UserList from '../../components/UserList'

export default class Chat extends React.Component {
  render () {
    return (
      <div className={style.container}>
        <div className={style.left}>

        </div>
        <div className={style.right}>
          <Paper zDepth={1} style={{
            flex: 'auto',
            margin: '5px'
          }}>
            <UserList />
          </Paper>
        </div>
      </div>
    )
  }
}
