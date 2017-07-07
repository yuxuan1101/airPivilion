/**
 * Created by yuxuan on 9/12/16.
 */
import React from 'react'
import Paper from 'material-ui/Paper'
import style from './chat.less'
import {grey200, blue200} from 'material-ui/styles/colors'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import UserList from '../../components/UserList'
import ChatContent from '../../components/ChatContent'
export default class Chat extends React.Component {
  render () {
    return (
      <div style={{backgroundColor: grey200}} className={style.container}>
        <div className={style.left}>
          <Paper zDepth={1} style={{
            flex: 'auto',
            margin: '5px'
          }}>
            <UserList />
          </Paper>
        </div>
        <div className={style.middle}>
          <ChatContent />
        </div>
        <div className={style.right}>
          <Paper zDepth={2} circle={true} style={{
            width: '50px',
            height: '50px',
            marginTop: '35px',
            alignSelf: 'center'
          }}>
            <Avatar backgroundColor={blue200} size={50} icon={<FontIcon className="material-icons">border_color</FontIcon>}/>
          </Paper>
        </div>
      </div>
    )
  }
}
