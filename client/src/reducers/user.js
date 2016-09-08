/**
 * Created by yuxuan on 8/31/16.
 */
import {LOGIN,LOGOUT} from '../actions/actions'
//name
//password
//avatar

export default function user(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return [
        ...state,
        {
          system: false,
          from: action.from,
          to: action.to,
          text: action.text
        }
      ]
    default:
      return state
  }
}