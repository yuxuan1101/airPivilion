import {FETCH_AUTH_REQUEST, FETCH_AUTH_FAILURE, POST_USER_REQUEST, POST_USER_SCCESS, POST_USER_FAILURE} from '../actions/user'

export default function login (state = {userPosting: false}, action) {
  switch (action.type) {
    case FETCH_AUTH_REQUEST:
      return Object.assign({}, state, {
        errMsg: undefined
      })
    case FETCH_AUTH_FAILURE:
      return Object.assign({}, state, {
        errMsg: action.errMsg
      })
    case POST_USER_REQUEST:
      return Object.assign({}, state, {
        userPosting: true,
        errMsg: undefined
      })
    case POST_USER_SCCESS:
      return Object.assign({}, state, {
        userPosting: false
      })
    case POST_USER_FAILURE:
      return Object.assign({}, state, {
        userPosting: false,
        errMsg: action.errMsg
      })
    default:
      return state
  }
}
