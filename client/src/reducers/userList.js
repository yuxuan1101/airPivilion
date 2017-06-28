/**
 * Created by yuxuan on 9/13/16.
 */
import {OTHERS_LOGIN} from '../actions/socketListener'

export default function userList (state = [], action) {
  switch (action.type) {
    case OTHERS_LOGIN:
      return action.userList
    default:
      return state
  }
}
