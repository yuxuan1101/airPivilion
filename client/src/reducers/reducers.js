import {LOGIN, OTHERS_LOGIN, OTHERS_LOGOUT} from '../actions/actions'

// function inputBox(state = {from: "", to: "所有人"}, action) {
//   switch (action.type) {
//     case LOGIN:
//       return Object.assign({}, state, {
//         from: action.name
//       });
//     case CHANGE_TO:
//       return Object.assign({}, state, {
//         to: action.to
//       });
//     default:
//       return state
//   }
// }

function userList (state = [{name: '所有人', status: false}], action) {
  switch (action.type) {
    case LOGIN:
    case OTHERS_LOGIN:
    case OTHERS_LOGOUT:
      return [
        {name: '所有人', status: false},
        ...action.users
      ]
    default:
      return state
  }
}

// const reducer = combineReducers({
//     chatContent,
//     inputBox,
//     userList
// });
const reducer = userList

export default reducer
