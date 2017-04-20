/**
 * Created by yuxuan on 8/31/16.
 */
import chatContent from './chatContent'
import {user, auth} from './common'
import userList from './userList'
import login from './login'
import { combineReducers } from 'redux'
import {routerReducer as routing} from 'react-router-redux'

const rootReducer = combineReducers({
  // reducer,
  chatContent,
  user,
  auth,
  login,
  userList,
  routing
})

export default rootReducer
