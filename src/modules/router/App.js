import React from 'react'
import NavLink from './NavLink'
import Home from './Home'
import './stylesheets/nav.css'
import ocImage from '../../images/OutScence.jpg'

export default React.createClass({
  render() {
    // if(process.env.NODE_ENV === "development") var outScence = "http://localhost:8080"+ocImage;
    // if(process.env.NODE_ENV === "production") var outScence = ocImage;
    console.log(ocImage);
    let style = {
      backgroundImage: 'url('+ocImage+')',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundSize: '100% 100%'
    };
    if(process.env.NODE_ENV === "development")
      style.backgroundImage = "url(http://localhost:8080"+ocImage+")";
    return (
      <div>
        <div className="navbar">
          <div className="nav-inner">
            <NavLink to="/" onlyActiveOnIndex={true} className="nav-left">
              <h1>DYUXUAN</h1>
            </NavLink>
            <nav className="nav-right">
              <NavLink to="/about">About</NavLink>
              <NavLink to="/repos">Repos</NavLink>
            </nav>
          </div>
        </div>
        <div className="content" style={style}>
          <div className="container">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
})
