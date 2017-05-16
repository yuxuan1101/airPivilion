/**
 * Created by yuxuan on 8/31/16.
 */
import {LOGOUT, FETCH_AUTH_REQUEST, FETCH_AUTH_SUCCESS, FETCH_AUTH_FAILURE} from '../actions/actions'
// username
// id ?
// password ?
// avatar ==
// token
// signed 是否登录

export function user (state = {username: '游客', signed: false}, action) {
  switch (action.type) {
    case LOGOUT:
      return {username: '游客', signed: false}
    case FETCH_AUTH_SUCCESS:
      return Object.assign({}, state, action.user, {
        signed: true,
        id: action.user._id
      })
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
