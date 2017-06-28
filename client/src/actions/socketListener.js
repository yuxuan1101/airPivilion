/**
 * receive server socket requests & dispath actions
 */
import socket from './socket'
import store from '../store/configureStore'

socket.on('connect', (clientId) => {
  store.dispatch(socketConnect(socket.id))
})
socket.on('othersLogin', userList => {
  store.dispatch(othersLogin(userList))
})
export const SOCKET_CONNECT = 'SOCKET_CONNECT'
export const OTHERS_LOGIN = 'OTHERS_LOGIN'

export function socketConnect (socketId) {
  return {
    type: SOCKET_CONNECT,
    socketId: socketId
  }
}
export function othersLogin (userList) {
  console.log(userList)
  return {
    type: OTHERS_LOGIN,
    userList: userList
  }
}
