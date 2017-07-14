/**
 * Created by yuxuan on 8/31/16.
 */
import {SEND_CHAT_MESSAGE, RECEIVE_CHAT_MESSAGE, SEND_SYSTEMMESSAGE, LOGIN, OTHERS_LOGIN, OTHERS_LOGOUT} from '../actions/actions'

export default function chatContent (state = [], action) {
  switch (action.type) {
    case SEND_CHAT_MESSAGE:
    case RECEIVE_CHAT_MESSAGE:
      return [
        ...state,
        {
          system: false,
          from: action.from,
          to: action.to,
          text: action.text,
          time: Date.now()
        }
      ]
    case SEND_SYSTEMMESSAGE:
      return [
        ...state,
        {
          system: true,
          text: action.text,
          data: action.data
        }
      ]
    case LOGIN:
    case OTHERS_LOGIN:
      return [
        ...state,
        {
          system: true,
          text: '用户 ' + action.name + ' 已登陆'
        }
      ]
    case OTHERS_LOGOUT:
      return [
        ...state,
        {
          system: true,
          text: '用户 ' + action.name + ' 已离线'
        }
      ]
    default:
      return state
  }
}
