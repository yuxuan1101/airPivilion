import socket from './socket'

export const SEND_CHAT_MESSAGE = 'SEND_CHAT_MESSAGE'
export const RECEIVE_CHAT_MESSAGE = 'RECEIVE_CHAT_MESSAGE'

export function sendChatMessage (to, text) {
  socket.post('/chatMessage', {to, text})
  return {
    type: SEND_CHAT_MESSAGE,
    from: Symbol.for('me'),
    to,
    text
  }
}
export function receiveChatMessage (obj) {
  return {
    type: SEND_CHAT_MESSAGE,
    from: obj.from,
    to: obj.to,
    text: obj.text
  }
}
