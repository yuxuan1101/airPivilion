/**
 * Created by yuxuan on 8/22/16.
 */

import React from 'react'
import {Link} from 'react-router'
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import {blue500} from 'material-ui/styles/colors';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';

import RightNav from './RightNav'
import Avatar from 'material-ui/Avatar';
import board from '../images/OutScence.jpg'

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let rightNav = (
      <nav style={{height: '48px'}}>
        <Link to="/about">About</Link>
        <Link to="/repos">Repos</Link>
        <Link to="/chat">聊天室</Link>
      </nav>
    );
    return (
      <div id="header">
        <AppBar
          title="Air Pivilion"
          titleStyle={{textAlign: 'center'}}
          zDepth={0}
          iconElementRight={<RightNav location={this.props.location}/>}
        />
        <div style={{display: 'inline-flex',justifyContent: 'space-between',alignItems: 'flex-end',width: '100%'}}>
          <div>
            <Avatar src={board} size={80} style={{margin: '0 0 0 80px'}}/>
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
            <span style={{display: 'block',fontWeight: '100'}}>@游客A1111</span>
            <span style={{display: 'block',fontWeight: 'bolder',fontSize: 'larger'}}>游客A1111</span>
          </div>
          <Tabs style={{flex: '1 1 auto'}}
                inkBarStyle={{backgroundColor: blue500}}
                value={'/'+window.location.pathname.split('/')[1]}
                onChange={(value) => this.context.router.push(value)}
          >
            <Tab
              icon={<FontIcon className="material-icons">chat</FontIcon>}
              label="PUBLIC"
              value="/about"
            />
            <Tab
              icon={<FontIcon className="material-icons">favorite</FontIcon>}
              label="FAVORITES"
              value="/"
            />
            <Tab
              icon={<MapsPersonPin />}
              label="NEARBY"
              value="/repos"
            />
          </Tabs>
        </div>
      </div>
    )
  }
}
Header.contextTypes = {
  router: React.PropTypes.object.isRequired
}