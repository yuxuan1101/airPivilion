/**
 * Created by yuxuan on 8/12/16.
 */
import React,{Component} from 'react'
import {Menu,Row,Col} from 'antd'
import {Link} from 'react-router'
import NavLink from '../components/router/NavLink'
import castle from '../images/OutScence.jpg'
import road from '../images/road.jpg'
import 'index.less'

export default class Root extends React.Component {
    background = {
        castle: {
            backgroundImage: 'url('+castle+')',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: '100% 100%'
        },
        fontPark: {
            backgroundImage: 'url('+road+')',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: '100% 100%'
        }
    }
    state = {
        current: 'about',
        background: 'castle'
    }
    handleMenuClick(e) {
        this.setState({
            current: e.key,
            background: e.key!=='login'?'castle':'fontPark'
        });
    }
    render() {
        return (
            <div style={this.background[this.state.background]}>
                <div id="header">
                    <Row>
                        <Col xs={24} sm={7} md={6} lg={4}>
                            <Link to="/" onlyActiveOnIndex={true} id="logo"
                                  onClick={() => this.handleMenuClick({key:"about"})}>
                                <span>Air Pivilion</span>
                            </Link>
                        </Col>
                        <Col xs={0} sm={17} md={18} lg={16}>
                            <Menu id="nav" mode="horizontal"
                                  onClick={(e) => this.handleMenuClick(e)}
                                  selectedKeys={[this.state.current]}>
                                <Menu.Item key="about"><Link to="/about">About</Link></Menu.Item>
                                <Menu.Item key="repos"><Link to="/repos">Repos</Link></Menu.Item>
                                <Menu.Item key="chat"><Link to="/chat">Chat</Link></Menu.Item>
                                <Menu.Item key="login"><Link to="/login">登录</Link></Menu.Item>
                            </Menu>
                        </Col>
                    </Row>
                </div>
                <div className="main-wrapper">
                    {this.props.children}
                </div>
            </div>
        )
    }
}