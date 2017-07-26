/**
 * Created by yuxuan on 8/31/16.
 */
import {SEND_CHAT_MESSAGE, RECEIVE_CHAT_MESSAGE, GET_CHAT_MESSAGES_SUCCESS} from '../actions/actions'

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
    case GET_CHAT_MESSAGES_SUCCESS:
      return action.messageList
    default:
      return state
  }
}
