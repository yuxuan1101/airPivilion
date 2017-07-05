/**
 * Created by yuxuan on 9/13/16.
 */
import {RECEIVE_USER_LIST} from '../actions/socketListener'

export default function userList (state = [], action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.userList
    default:
      return state
  }
}
