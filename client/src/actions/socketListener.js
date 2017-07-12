/**
 * receive server socket requests & dispath actions
 */
import socket from './socket'
import store from '../store/configureStore'
import {receiveChatMessage} from './actions'

socket.on('connect', (clientId) => {
  store.dispatch(socketConnect(socket.id))
  socket.post('/userlist', store.getState().user)
  socket.get('/userlist')
})
socket.on('push_user_list', userList => {
  store.dispatch(receiveUserList(userList))
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
export function receiveUserList (userList) {
  let user = store.getState().user
  userList = userList.filter(item => user.socketId !== item.socketId)
  return {
    type: RECEIVE_USER_LIST,
    userList: userList
  }
}
