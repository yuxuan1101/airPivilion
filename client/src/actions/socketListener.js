/**
 * receive server socket requests & dispath actions
 */
import socket from './socket'
import store from '../store/configureStore'
import {receiveChatMessage} from './actions'

socket.on('connect', (clientId) => {
  store.dispatch(socketConnect(socket.id))
  socket.post('/userlist', store.getState().user.id)
  socket.get('/userlist')
})
socket.on('push_user_list', response => {
  store.dispatch(receiveUserList(response))
})
socket.on('push_chat_Message', chatMessage => {
  store.dispatch(receiveChatMessage(chatMessage))
})
export const SOCKET_CONNECT = 'SOCKET_CONNECT'
export const RECEIVE_USER_LIST = 'RECEIVE_USER_LIST'

export function socketConnect (socketId) {
  return {
    type: SOCKET_CONNECT,
    socketId: socketId
  }
}
export function receiveUserList (response) {
  let user = store.getState().user
  let userList = response.userList.filter(item => user.socketId !== item.socketId)
  return {
    type: RECEIVE_USER_LIST,
    userList,
    unsignedVisitors: response.unsignedVisitors
  }
}
