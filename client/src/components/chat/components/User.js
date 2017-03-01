import React from 'react'

export default class User extends React.Component {
  render () {
    const {name} = this.props
    return (
        <li
            onClick={(e) => this.handleChange(name)}
            style={{
              background: this.props.selected ? '#5e5e5e' : '#ffffff'
            }}>
            {name}
        </li>
    )
  }
  handleChange (name) {
    this.props.onChangeClick(name)
  }
}

User.propTypes = {
}
