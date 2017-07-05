/**
 * Created by yuxuan on 9/13/16.
 */
import React from 'react'
import {ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import FontIcon from 'material-ui/FontIcon'
import PropTypes from 'prop-types'

export default class UserItem extends React.Component {
  render () {
    return (
      <div>
        <ListItem
          primaryText={this.props.username}
          secondaryText={'last content.....'}
          leftAvatar={<Avatar size={50} src={'avatar?avatar=' + this.props.avatar} />}
          rightIcon={<FontIcon className="material-icons">chat_bubble</FontIcon>}
        />
        <Divider inset={true}/>
      </div>
    )
  }
}
UserItem.defaultProps = {
  avatar: 'default-1.jpg'
}
UserItem.propTypes = {
  username: PropTypes.string.isRequired
}
