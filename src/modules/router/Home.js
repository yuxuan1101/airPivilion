import React from 'react'
import bg from '../../images/bg_anime.jpg'
import bg3 from '../../images/bg03.gif'

export default React.createClass({
  render() {
    console.log("localhost:3001"+bg3);
    let style = {
      width: '100%',
      height:'200px',
      backgroundImage: 'url(./aa1762dad2408319e78e4b1df07da5e9.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center'
    }
    return <div style={style}>Home1</div>
  }
})
