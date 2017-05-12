// import socket from './socket'
import history from '../history'
export const SEND_CHATMESSAGE = 'SEND_CHATMESSAGE'
export const SEND_SYSTEMMESSAGE = 'SEND_SYSTEMMESSAGE'
export const LOGIN = 'LOGIN'
export const CHANGE_TO = 'CHANGE_TO'
export const OTHERS_LOGOUT = 'OTHERS_LOGOUT'
export const LOGIN_SUB = 'LOGIN_SUB'
export const FETCH_AUTH_REQUEST = 'FETCH_AUTH_REQUEST'
export const FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS'
export const FETCH_AUTH_FAILURE = 'FETCH_AUTH_FAILURE'
export const POST_USER_REQUEST = 'POST_USER_REQUEST'
export const POST_USER_SCCESS = 'POST_USER_SCCESS'
export const POST_USER_FAILURE = 'POST_USER_FAILURE'

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
export function authRequest () {
  return {
    type: FETCH_AUTH_REQUEST
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
export function fetchAuth (subUser, nextUrl) {
  return function (dispatch) {
    dispatch(authRequest())
    return fetch('/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: subUser
    })
    // .then(res => new Promise(resolve => setTimeout(resolve, 3000, res)))
    .then(res => {
      if (res.ok) return res.json()
    }).then(data => {
      if (data.error) {
        throw new Error(data.errMsg)
      } else {
        dispatch(fetchAuthSuccess(data))
        history.push(nextUrl)
      }
    }).catch(error => dispatch(fetchAuthFailure(error)))
  }
}
export function postUserRequest () {
  return {
    type: POST_USER_REQUEST
  }
}
export function postUserSuccess (user) {
  return {
    type: POST_USER_SCCESS
  }
}
export function postUserFailure (error) {
  return {
    type: POST_USER_FAILURE,
    errMsg: error.message
  }
}
export function getAvatar (id) {
  return function (dispatch) {}
}
export function postUser (subUser, nextUrl) {
  return function (dispatch) {
    dispatch(postUserRequest())
    return fetch('/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: subUser
    })
    // .then(res => new Promise(resolve => setTimeout(resolve, 3000, res)))
    .then(function (res) {
      if (res.ok) return res.json()
    }).then(function (data) {
      if (data.error) {
        throw new Error(data.errMsg)
      } else {
        dispatch(postUserSuccess())
        dispatch(fetchAuthSuccess(data))
        history.push(nextUrl)
      }
    }).catch(function (error) {
      dispatch(postUserFailure(error))
    })
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
