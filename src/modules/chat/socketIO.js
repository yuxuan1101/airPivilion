import { createStore } from 'redux';
//import {store} from '../chat/reducers';
import {store} from './store/configureStore';
import {sendChatMessage,sendSystemMessage,login,othersLogin,othersLogout} from './actions';
import $ from 'jquery';
import cookie from 'jquery.cookie';
import io from 'socket.io'

export let socket = io.connect();

let from = $.cookie("user");
//export let socket = io('/'+from);

$(document).ready(function() {
    socket.emit('online', {user: from});
    socket.on('online', function (data) {
        if(data.user === from) {
            store.dispatch(login(transformLoginAction(data)));
        }else {
            store.dispatch(othersLogin(transformOthersLoginAction(data)));
        }
    });
    socket.on('offline', function (data) {
        store.dispatch(othersLogout(transformOthersLoginAction(data)));
    });
    //服务器关闭
    socket.on('disconnect', function() {
        store.dispatch(sendSystemMessage("服务器连接失败"));
        /*var sys = '<div style="color:#f00">系统:连接服务器失败！</div>';
        $("#contents").append(sys + "<br/>");
        $("#list").empty();*/
    });
    //重新启动服务器
    socket.on('reconnect', function() {
        store.dispatch(sendSystemMessage("服务器重新连接"));
        /*var sys = '<div style="color:#f00">系统:重新连接服务器！</div>';
        $("#contents").append(sys + "<br/>");
        socket.emit('online', {user: from});*/
    });
    socket.on('say',function(data) {
        console.log("on say");
        console.log(data);
        store.dispatch(sendChatMessage(data.from,data.to,data.msg));
    })
})

//处理login的action属性名称，以后后端会改变
//data:{user:string,users:[...{name:string,isReady:bool}]} =>
//     {name:string,users:[...{name:string,status:string}]}
function transformLoginAction(data) {
    let action = {
        name: data.user,
        users: transform_dataUsers(data.user,data.users)
    };
    return action;
}
function transformOthersLoginAction(data) {
    let action = {
        name: data.user,
        users: transform_dataUsers(from,data.users)
    };
    return action;
}
//[...{name:string,isReady:bool}] => [...{name:string,status:string}]
function transform_dataUsers(username,users) {
    let newUsers = [];
    for(let user in users) {
        if(users[user].name != username) {
            newUsers.push({
                name: users[user].name,
                status: users[user].isReady?'已准备':'未准备'
            })
        }
    }
    return newUsers;
}
