/**
 * Created by yuxuan on 8/31/16.
 */
import {LOGIN,LOGOUT} from '../actions/actions'
//uname
//id ?
//password ?
//avatar ==
//token

export default function user(state = {uname:'游客',signed:false}, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign(state,{
        signed: true,
        uname: action.uname,
        id: action.id,
        avatar: action.avatar,
        token: action.token
      });
    default:
      return state
  }
}