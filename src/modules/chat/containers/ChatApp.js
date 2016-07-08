import React from 'react';
import { connect } from 'react-redux'
import { sendChatMessage,login,changeTo } from '../actions'
import Content from '../components/Content';
import InputBox from '../components/InputBox';
import  UserList from '../components/UserList';
import styles from './ChatApp.less';
//import {socket} from '../socketIO';

class ChatApp extends React.Component {
    render() {
        // Injected by connect() call:
        const { dispatch, chatContent, inputBox,userList } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <Content
                        chatContent={chatContent}
                    />
                    <InputBox
                        inputBox={inputBox}
                        onSend = {(from,to,text) => {
                            dispatch(sendChatMessage(from,to,text));
                            console.log(from,to,text);
                            //socket.emit('say',{'from':from,'to':to,'msg':text});
                        }}
                    />
                </div>
                <div className={styles.right}>
                    <UserList
                        to={inputBox.to}
                        userList={userList}
                        onChangeClick = {(to) => dispatch(changeTo(to))}
                    />
                </div>
            </div>
        )
    }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    return {
        chatContent: state.chatContent,
        inputBox: state.inputBox,
        userList: state.userList
    }
};
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(ChatApp);
