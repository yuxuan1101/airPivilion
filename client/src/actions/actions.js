// import socket from './socket'

export const SEND_CHATMESSAGE = 'SEND_CHATMESSAGE'
export const SEND_SYSTEMMESSAGE = 'SEND_SYSTEMMESSAGE'
export const LOGIN = 'LOGIN'
export const CHANGE_TO = 'CHANGE_TO'
export const OTHERS_LOGOUT = 'OTHERS_LOGOUT'
export const LOGIN_SUB = 'LOGIN_SUB'
export const FETCH_AUTH_REQUEST = 'FETCH_AUTH_REQUEST'
export const FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS'
export const FETCH_AUTH_FAILURE = 'FETCH_AUTH_FAILURE'

export function sendChatMessage (from, to, text) {
  return {
    type: SEND_CHATMESSAGE,
    from: from,
    to: to,
    text: text
  }
}
export function sendSystemMessage (text) {
  return {
    type: SEND_SYSTEMMESSAGE,
    text: text
  }
}
export function login (obj) {
  return {
    type: LOGIN,
    token: obj.token,
    uname: obj.user.username,
    id: obj.user._id
  }
}
export function loginSub (subUser) {
  return {
    type: LOGIN_SUB,
    subUser
  }
}
export function authRequest (obj) {
  return {
    type: FETCH_AUTH_REQUEST,
    obj
  }
}
export function fetchAuthSuccess (obj) {
  return {
    type: FETCH_AUTH_SUCCESS,
    token: obj.token,
    uname: obj.user.username,
    id: obj.user._id,
    receiveTime: Date.now()

  }
}
export function fetchAuthFailure (error) {
  return {
    type: FETCH_AUTH_FAILURE,
    errMsg: error.message
  }
}
export function fetchAuth (subUser) {
  return function (dispatch) {
    dispatch(authRequest(subUser))
    return fetch('/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'username=' + this.refs.username.getValue() + '&password=' + this.refs.password.getValue()
    }).then(res => {
      if (res.ok) return res.json()
    }).then(data => {
      if (data.error) {
        throw new Error(data.errMsg)
      } else {
        dispatch(fetchAuthSuccess(data))
      }
    }).catch(error => dispatch(fetchAuthFailure(error)))
  }
}

export function changeTo (to) {
  return {
    type: CHANGE_TO,
    to: to
  }
}
export function othersLogout (obj) {
  return {
    type: OTHERS_LOGOUT,
    name: obj.name,
    users: obj.users
  }
}
