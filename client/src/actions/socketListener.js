/**
 * receive server socket requests & dispath actions
 */
import socket from './socket'
import store from '../store/configureStore'

socket.on('connect', (clientId) => {
  store.dispatch(socketConnect(socket.id))
  console.log(store.getState().user)
})
socket.on('othersLogin', userList => {
  console.log('othersLogin')
  console.log(userList)
})
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
