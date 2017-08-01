import React from 'react'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import {List, ListItem} from 'material-ui/List'
import FormItem from '../FormItem'
import { connect } from 'react-redux'
import pureRender from 'pure-render-decorator'
import {patchUserAvatar} from '../../actions/user'

@pureRender
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {avatarHover: false}
  }
  commit (key, value, oldValue) {
    if (value === oldValue) return
    console.log(key, value, oldValue)
  }
  handleImageChange () {
    const image = this.imageInput.files[0]
    if (!image) return
    const reader = new FileReader()
    let props = this.props
    // 内存溢出？？？
    reader.onloadend = function () {
      console.log(this)
      console.log(arguments)
      // user.updateAvatar(this.result).then(response => {
      //   if (response.status === 200) {
      //     ui.closeUserSetting()
      //     ui.closeMaskLayout()
      //   }
      // })
      props.patchUserAvatar(props.user.id, this.result)
    }
    reader.readAsDataURL(image)
  }
  render () {
    return (
      <Paper style={{
        width: '380px',
        margin: '75px auto 0 auto',
        padding: '5px'
      }}>
        <List>
          <ListItem disabled innerDivStyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 0,
            marginTop: '-50px'
          }}>
            <Avatar size={90} style={{cursor: 'pointer'}}
              src={'avatar?avatar=' + this.props.user.avatar}
              onClick={() => this.imageInput.click()}
              onMouseEnter={() => this.setState({ avatarHover: true })}
              onMouseLeave={() => this.setState({ avatarHover: false })}
            />
            {this.state.avatarHover ? <Avatar size={90}
              icon={<FontIcon className="material-icons">cloud_upload</FontIcon>}
              style={{
                marginTop: '-90px',
                backgroundColor: 'rgba(0,0,0,0.3)',
                pointerEvents: 'none'
              }}
            /> : null}
            <span style={{margin: '16px', fontSize: '25px'}}>{this.props.user.username}</span>
            <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png"
              onChange={() => this.handleImageChange()} style={{display: 'none'}}
              ref={imageInput => { this.imageInput = imageInput }}
            />
          </ListItem>
          <Divider/>
          <ListItem disabled>
            <FormItem label='注册时间' value={this.props.user.createTime} commit={this.commit}/>
          </ListItem>
          <ListItem>
            <FormItem label='地址' value={this.props.user.address} commit={this.commit}/>
          </ListItem>
          <ListItem>
            <FormItem label='github' value={this.props.user.github} commit={this.commit}/>
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
export default connect(mapStateToProps, {patchUserAvatar})(Home)
