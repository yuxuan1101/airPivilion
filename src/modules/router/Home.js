import React from 'react'
import bg from '../../images/bg_anime.jpg'
import bg3 from '../../images/bg03.gif'
import ocImage from '../../images/OutScence.jpg'

export default React.createClass({
  render() {
    let style = {
      position: 'fixed',
      left: '0px',
      top: '0px',
      right: '0px',
      bottom: '0px',
      backgroundImage: 'url('+ocImage+')',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundSize: '100% 100%'
    }
    return <div style={style}>Home11</div>
  }
})
