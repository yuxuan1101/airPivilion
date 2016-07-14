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
            flex: 'auto',
            display: 'flex',
            flexDirection: 'column',
            backgroundImage: 'url('+ocImage+')',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: '100% 100%'
        };
        if(process.env.NODE_ENV === "development")
            style.backgroundImage = "url(http://localhost:8080"+ocImage+")";

        return (
            <div style={{display: 'flex',flexDirection: 'column',height: '100vh'}}>
                <div style={{flex: '0 0 60px',background: '#000000',boxShadow: '0px 0px 10px #111111'}}>
                    <div style={{width:'80%',height:'100%',margin: '0px auto',display: 'flex',justifyContent:'space-between'}}>
                        <NavLink to="/" onlyActiveOnIndex={true}>
                            <h2>DYUXUAN</h2>
                        </NavLink>
                        <nav style={{display:'flex',alignItems:'center',height:'100%'}}>
                            <NavLink to="/about">About</NavLink>
                            <NavLink to="/repos">Repos</NavLink>
                            <NavLink to="/chat">聊天室</NavLink>
                        </nav>
                    </div>
                </div>
                <div style={style}>
                    {this.props.children}
                </div>
            </div>
        )
  }
})
