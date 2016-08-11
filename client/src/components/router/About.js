import React from 'react'

export default React.createClass({
  getInitialState() {
    let result;
    let url = "http://localhost:3000/getData/443"
    fetch(url).then(function (res) {
      return res.json();
    }).then(function(data) {
      console.log(data);
      result = data;
    }).catch(function (error) {
      console.log('fetch '+url+" error.");
      console.log(error);
    })
    return {}
  },
  render() {
    return <div>About111</div>
  }
})