/**
 * Created by yuxuan on 8/31/16.
 */
import reducer from './reducers'
import chatContent from './chatContent'
import { combineReducers } from 'redux'
import {routerReducer as routing} from 'react-router-redux';

const rootReducer = combineReducers({
  reducer,
  chatContent,
  routing
})

export default rootReducer