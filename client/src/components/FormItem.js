import React from 'react'
import PropTypes from 'prop-types'
import FontIcon from 'material-ui/FontIcon'
import {red100, red400, green100, green400} from 'material-ui/styles/colors'
import pureRender from 'pure-render-decorator'

@pureRender
export default class FormItem extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    commit: (props, propName, componentName) => {
      if (!(props.disabled || props.commit instanceof Function)) {
        return new Error('Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.')
      }
    }
  }
  static defaultProps ={
    disabled: false,
    type: 'text'
  }
  constructor (props) {
    super(props)
    this.state = {
      editing: false
    }
  }
  render () {
    let buttonStyle = {
      cursor: 'pointer'
    }
    if (this.state.editing) {
      return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
          <span style={{marginTop: '5px', width: '70px'}}>{this.props.label + ':'}</span>
          <input type={this.props.type} defaultValue={this.props.value} ref='input'/>
          <div>
            <FontIcon onClick={() => this.props.commit(this.props.label, this.refs.input.value, this.props.value)} style={buttonStyle} color={green100} hoverColor={green400} className="material-icons">check</FontIcon>
            <FontIcon onClick={() => this.setState({editing: false})} style={buttonStyle} color={red100} hoverColor={red400} className="material-icons">close</FontIcon>
          </div>
        </div>
      )
    } else {
      return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>
          <span style={{marginTop: '5px', width: '70px'}}>{this.props.label + ':'}</span>
          <span style={{marginTop: '5px'}}>{this.props.value}</span>
          <div>
            {this.props.disabled ? '' : <FontIcon onClick={() => this.setState({editing: true})} style={buttonStyle} className="material-icons">edit</FontIcon>}
          </div>
        </div>
      )
    }
  }
}
