/**
 * Created by yuxuan on 8/31/16.
 */
import {LOGOUT, FETCH_AUTH_REQUEST, FETCH_AUTH_SUCCESS, FETCH_AUTH_FAILURE, GET_USER_REQUEST, GET_USER_FAILURE, PUT_AVATAR_SUCCESS, PATCH_USER_SUCCESS} from '../actions/user'
import {SOCKET_CONNECT} from '../actions/socketListener'
// username
// id ?
// password ?
// avatar ==
// token
// signed 是否登录
const visitor = {
  username: '游客',
  id: undefined,
  avatar: 'avatar/default-1.jpg',
  signed: false,
  isfetching: false
}
export function user (state = visitor, action) {
  switch (action.type) {
    case GET_USER_REQUEST:
      return Object.assign({}, state, {isfetching: true})
    case GET_USER_FAILURE:
    case LOGOUT:
      return Object.assign({}, state, visitor)
    case FETCH_AUTH_SUCCESS:
      return Object.assign({}, state, action.user, {
        signed: true,
        isfetching: false
      })
    case SOCKET_CONNECT:
      return Object.assign({}, state, {socketId: action.socketId})
    case PUT_AVATAR_SUCCESS:
      return Object.assign({}, state, {avatar: action.avatar})
    case PATCH_USER_SUCCESS:
      return Object.assign({}, state, {[action.key]: action.value})
    default:
      return state
  }
}
export function auth (state = {
  isfetching: false,
  didInvalidate: false
}, action) {
  switch (action.type) {
    case FETCH_AUTH_REQUEST:
      return Object.assign({}, state, {isfetching: true})
    case FETCH_AUTH_SUCCESS:
      return Object.assign({}, state, {
        isfetching: false,
        didInvalidate: false,
        token: action.token,
        lastUpdated: action.receiveTime
      })
    case FETCH_AUTH_FAILURE:
      return Object.assign({}, state, {isfetching: false})
    default:
      return state
  }
}
