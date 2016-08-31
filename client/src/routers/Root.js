/**
 * Created by yuxuan on 8/12/16.
 */
import React,{Component} from 'react'
import {Link} from 'react-router'

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from '../components/Header'

export default class Root extends React.Component {
    constructor(props){
        super(props);
        this.muiTheme = getMuiTheme({
            palette: {
                primary1Color: 'rgba(0,0,0,0)'
            },
            appBar: {
                height: 50
            }
        });
    }


    render() {
        return (
            <MuiThemeProvider muiTheme={this.muiTheme}>
                <div>
                    <Header/>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}