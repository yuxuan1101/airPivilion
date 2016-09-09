/**
 * Created by yuxuan on 8/31/16.
 */
import {LOGIN,LOGOUT} from '../actions/actions'
//uname
//id ?
//password ?
//avatar ==
//token

export default function user(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign(state,{
        uname: action.uname,
        id: action.id,
        avatar: action.avatar,
        token: action.token
      });
    default:
      return state
  }
}