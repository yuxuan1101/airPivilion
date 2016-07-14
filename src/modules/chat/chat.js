import React from 'react';
import {render} from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ChatApp from '../chat/containers/ChatApp';
import {store} from '../chat/store/configureStore';


export default React.createClass({
  render() {
    return (<Provider store={store}>
              <ChatApp />
            </Provider>)
  }
})


