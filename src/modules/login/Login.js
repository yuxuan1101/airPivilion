/**
 * Created by yuxuan on 7/8/16.
 */

import React from 'react'

export default React.createClass({
  render() {
    if (process.env.NODE_ENV === "development") {
      console.log("success.");
    }else {
      console.log("failed.");
    }
    return <div>Login </div>
  }
})
