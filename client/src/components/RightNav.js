/**
 * Created by yuxuan on 8/23/16.
 */
import React from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import FontIcon from 'material-ui/FontIcon'
import {logout} from '../actions/actions'

class RightNav extends React.Component {
  render () {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <FontIcon className="material-icons" color="#FFF">more_vert</FontIcon>
          </IconButton>
        }
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
      >
        <MenuItem primaryText="About" leftIcon={<FontIcon className="material-icons">more</FontIcon>}/>
        <MenuItem primaryText="Github" leftIcon={<FontIcon className="muidocs-icon-custom-github" />}
                  onTouchTap={() => window.open('https://github.com/yuxuan1101/airPivilion', '_blank')}/>
        <Divider />
        <MenuItem primaryText={this.props.signed ? 'Log out' : 'Log in'} leftIcon={<FontIcon className="material-icons">exit_to_app</FontIcon>}
                  onTouchTap={() => this.props.logout(this.props.pathname)}/>
      </IconMenu>
    )
  }
}
export default connect(state => Object.assign({}, state.user, {
  pathname: state.routing.locationBeforeTransitions.pathname}
  ), {logout})(RightNav)
