/**
 * Created by yuxuan on 9/13/16.
 */
import {RECEIVE_USER_LIST} from '../actions/socketListener'

// test data
let testUser = [{
  id: 'test001',
  username: 'test001'
}, {
  id: 'test002',
  username: 'test002'
}]
export default function userList (state = [], action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return [...testUser, ...action.userList]
    default:
      return state
  }
}
