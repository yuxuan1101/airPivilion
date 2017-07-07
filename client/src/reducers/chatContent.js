/**
 * Created by yuxuan on 8/31/16.
 */
import {SEND_CHATMESSAGE, SEND_SYSTEMMESSAGE, LOGIN, OTHERS_LOGIN, OTHERS_LOGOUT} from '../actions/actions'

export default function chatContent (state = [{
  system: false,
  from: 'test001',
  to: 'test002',
  time: 1499417746066,
  text: '001 to 002'
}, {
  system: false,
  from: 'test002',
  to: 'test001',
  time: 1499411746066,
  text: '002 to 001'
}, {
  system: false,
  from: 'test002',
  to: 'test001',
  time: 1499417746066,
  text: '长文本！！！ send a long message！！！ 长文本！！！ send a long message！！！ 长文本！！！ send a long message！！！ 长文本！！！ send a long message！！！'
}], action) {
  switch (action.type) {
    case SEND_CHATMESSAGE:
      return [
        ...state,
        {
          system: false,
          from: action.from,
          to: action.to,
          text: action.text,
          data: action.data
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
