/**
 * Created by yuxuan on 8/23/16.
 */
import React from 'react'
import {Link} from 'react-router'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';

export default class RightNav extends React.Component {
    render() {
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton><FontIcon className="material-icons" color="#FFF">more_vert</FontIcon></IconButton>
                }
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
            >
                <MenuItem primaryText="About" leftIcon={<FontIcon className="material-icons">more</FontIcon>}/>
                <MenuItem primaryText="Github" leftIcon={<FontIcon className="muidocs-icon-custom-github" />}/>
                <Divider />
                <MenuItem primaryText="Log out" leftIcon={<FontIcon className="material-icons">exit_to_app</FontIcon>}/>
            </IconMenu>
        )
    }
}
