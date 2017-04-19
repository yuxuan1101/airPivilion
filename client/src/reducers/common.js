/**
 * Created by yuxuan on 8/31/16.
 */
import {LOGIN, FETCH_AUTH_REQUEST, FETCH_AUTH_SUCCESS, FETCH_AUTH_FAILURE} from '../actions/actions'
// uname
// id ?
// password ?
// avatar ==
// token
// signed 是否登录

export function user (state = {uname: '游客', signed: false}, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        signed: true,
        uname: action.uname,
        id: action.id,
        avatar: action.avatar
      })
    case FETCH_AUTH_SUCCESS:
      return Object.assign({}, state, {
        signed: true,
        uname: action.uname,
        id: action.id,
        avatar: action.avatar
      })
    default:
      return state
  }
}
export function auth (state = {
  isfeting: false,
  didInvalidate: false
}, action) {
  switch (action.type) {
    case FETCH_AUTH_REQUEST:
      return Object.assign({}, state, {isfeting: true})
    case FETCH_AUTH_SUCCESS:
      return Object.assign({}, state, {
        isfeting: false,
        didInvalidate: false,
        token: action.token,
        lastUpdated: action.receiveTime
      })
    case FETCH_AUTH_FAILURE:
      return Object.assign({}, state, {isfeting: false})
    default:
      return state
  }
}
