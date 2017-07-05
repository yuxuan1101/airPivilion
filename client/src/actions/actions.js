// import socket from './socket'
import history from '../history'
import socket from './socket'
export const FETCH_AUTH_REQUEST = 'FETCH_AUTH_REQUEST'
export const FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS'
export const FETCH_AUTH_FAILURE = 'FETCH_AUTH_FAILURE'
export const POST_USER_REQUEST = 'POST_USER_REQUEST'
export const POST_USER_SCCESS = 'POST_USER_SCCESS'
export const POST_USER_FAILURE = 'POST_USER_FAILURE'
export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILURE = 'GET_USER_FAILURE'
export const LOGOUT = 'LOGOUT'

export function logout (thisUrl) {
  window.localStorage.removeItem('token')
  history.push({
    pathname: '/login',
    state: {nextUrl: thisUrl}
  })
  return {
    type: LOGOUT
  }
}
export function authRequest () {
  return {
    type: FETCH_AUTH_REQUEST
  }
}
export function fetchAuthSuccess (res) {
  socket.post('/user', res.user)
  window.localStorage.setItem('token', res.token)
  return {
    type: FETCH_AUTH_SUCCESS,
    token: res.token,
    user: res.user,
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
        if (nextUrl === '/login') nextUrl = '/'
        history.push(nextUrl)
      }
    }).catch(function (error) {
      dispatch(postUserFailure(error))
    })
  }
}
export function getUserRequest () {
  return {
    type: GET_USER_REQUEST
  }
}
export function getUserFailure (error) {
  return {
    type: GET_USER_FAILURE,
    errMsg: error.message
  }
}
export function getUser (token) {
  return function (dispatch) {
    dispatch(getUserRequest())
    return fetch('/user', {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: token
      }
    })
    // .then(res => new Promise(resolve => setTimeout(resolve, 3000, res)))
    .then(function (res) {
      if (res.ok) return res.json()
    }).then(function (data) {
      if (data.error) {
        throw new Error(data.errMsg)
      } else {
        dispatch(fetchAuthSuccess({user: data, token: token}))
      }
    }).catch(function (error) {
      dispatch(getUserFailure(error))
    })
  }
}
