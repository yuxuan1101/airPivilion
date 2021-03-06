/**
 * Created by yuxuan on 8/22/16.
 */

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import {Tabs, Tab} from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'
import {blue500} from 'material-ui/styles/colors'
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin'
import RightNav from './RightNav'
import Avatar from 'material-ui/Avatar'
import history from '../history'
import pureRender from 'pure-render-decorator'

@pureRender
class Header extends React.Component {
  render () {
    return (
      <div id="header">
        <AppBar
          title="Air Pivilion"
          titleStyle={{textAlign: 'center'}}
          zDepth={0}
          iconElementRight={<RightNav />}
        />
        <div style={{display: 'inline-flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%'}}>
          <div>
            <Avatar src={this.props.user.avatar} size={80} style={{margin: '0 0 0 80px'}}/>
          </div>
          <div style={{
            display: 'inline-flex',
            flexFlow: 'column nowrap',
            justifyContent: 'space-around',
            color: '#ffffff',
            height: '80px',
            paddingLeft: '10px',
            flex: '1 1 auto'
          }}>
            <span style={{display: 'block', fontWeight: '100'}}>@{this.props.user.username}</span>
            <span style={{display: 'block', fontWeight: 'bolder', fontSize: 'larger'}}>{this.props.user.username}</span>
          </div>
          <Tabs style={{flex: '1 1 auto'}}
                inkBarStyle={{backgroundColor: blue500}}
                value={'/' + window.location.pathname.split('/')[1]}
                onChange={(value) => history.push(value)}
          >
            <Tab
              icon={<FontIcon className="material-icons">chat</FontIcon>}
              label="PUBLIC"
              value="/chat"
            />
            <Tab
              icon={<FontIcon className="material-icons">favorite</FontIcon>}
              label="FAVORITES"
              value="/group"
            />
            <Tab
              icon={<MapsPersonPin />}
              label="NEARBY"
              value="/user"
            />
          </Tabs>
        </div>
      </div>
    )
  }
}
Header.contextTypes = {
  router: PropTypes.object.isRequired
}
function mapStateToProps (state) {
  return {
    user: state.user
    // pathname: state.routing.locationBeforeTransitions.pathname
  }
}
export default connect(mapStateToProps)(Header)
