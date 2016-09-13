import socket from './socket'

export const SEND_CHATMESSAGE = "SEND_CHATMESSAGE";
export const SEND_SYSTEMMESSAGE = "SEND_SYSTEMMESSAGE";
export const LOGIN = "LOGIN";
export const CHANGE_TO = "CHANGE_TO";
export const OTHERS_LOGOUT = "OTHERS_LOGOUT";


export function sendChatMessage(from, to, text) {
  return {
    type: SEND_CHATMESSAGE,
    from: from,
    to: to,
    text: text
  }
}
export function sendSystemMessage(text) {
  return {
    type: SEND_SYSTEMMESSAGE,
    text: text
  }
}
export function login(obj) {
  return {
    type: LOGIN,
    token: obj.token,
    uname: obj.user.username,
    id: obj.user._id,
  }
}
export function changeTo(to) {
  return {
    type: CHANGE_TO,
    to: to
  }
}
export function othersLogout(obj) {
  return {
    type: OTHERS_LOGOUT,
    name: obj.name,
    users: obj.users
  }
}