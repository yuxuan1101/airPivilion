/**
 * Created by yuxuan on 8/31/16.
 */
import chatContent from './chatContent'
import user from './user'
import userList from './userList'
import { combineReducers } from 'redux'
import {routerReducer as routing} from 'react-router-redux'

const rootReducer = combineReducers({
  // reducer,
  chatContent,
  user,
  userList,
  routing
})

export default rootReducer
