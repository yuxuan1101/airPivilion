import React from 'react'

export default React.createClass({
  getInitialState () {
    let url = '/user'
    fetch(url).then(function (res) {
      return res.json()
    }).then(function (data) {
      console.log(data)
    }).catch(function (error) {
      console.log('fetch ' + url + ' error.')
      console.log(error)
    })
    return {}
  },
  render () {
    return <div>About1</div>
  }
})
