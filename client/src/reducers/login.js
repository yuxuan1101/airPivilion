import {FETCH_AUTH_FAILURE} from '../actions/actions'

export default function login (state = {}, action) {
  switch (action.type) {
    case FETCH_AUTH_FAILURE:
      return Object.assign({}, state, {
        inError: true,
        errMsg: action.errMsg
      })
    default:
      return state
  }
}
