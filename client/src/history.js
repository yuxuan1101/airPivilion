import store from './store/configureStore'
import {browserHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

export default syncHistoryWithStore(browserHistory, store)
