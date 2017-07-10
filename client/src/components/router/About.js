import React from 'react'
import pureRender from 'pure-render-decorator'

@pureRender
export default class About extends React.Component {
  // getInitialState () {
  //   let url = '/user'
  //   fetch(url).then(function (res) {
  //     return res.json()
  //   }).then(function (data) {
  //     console.log(data)
  //   }).catch(function (error) {
  //     console.log('fetch ' + url + ' error.')
  //     console.log(error)
  //   })
  //   return {}
  // },
  render () {
    return <div>About1</div>
  }
}
