/**
 * Created by yuxuan on 8/12/16.
 */
import React from 'react'
// import {Link} from 'react-router'
// import {Provider} from 'react-redux'

// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
// import {blue500} from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Header from '../components/Header'
import headerImg from '../images/bg_anime.jpg'
import pureRender from 'pure-render-decorator'

@pureRender
export default class Root extends React.Component {
  constructor (props) {
    super(props)
    this.muiTheme = getMuiTheme({
      appBar: {
        color: 'rgba(0,0,0,0)',
        height: 50
      },
      tabs: {
        backgroundColor: 'rgba(0,0,0,0)'
      }
    })
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <div style={{
          backgroundImage: 'url(' + headerImg + ')',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: '100% 100%',
          height: '100%',
          display: 'flex',
          flexFlow: 'column nowrap'
        }}>
          <Header />
          <div style={{
            backgroundColor: '#fff',
            flex: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
