import React from 'react'

export default React.createClass({
  getInitialState() {
    let result;
    let url = "./getData/443"
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
    return <div>About</div>
  }
})