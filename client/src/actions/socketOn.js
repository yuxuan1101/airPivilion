/**
 * Created by yuxuan on 9/13/16.
 */
// import socket from './socket'
export const SOCKET_CONNECT = 'SOCKET_CONNECT'
export const OTHERS_LOGIN = 'OTHERS_LOGIN'

export function socketConnect (socketId) {
  return {
    type: SOCKET_CONNECT,
    socketId: socketId
  }
}
export function othersLogin (obj) {
  return {
    type: OTHERS_LOGIN
  }
}

// 以下action只向服务器提交数据，不改变前端数据
