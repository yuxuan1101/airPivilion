import React from 'react';
import {render} from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ChatApp from '../chat/containers/ChatApp';
//import {store} from '../chat/reducers';
//import socket from '../chat/socketIO';
import {store} from '../chat/store/configureStore';

let rootElement = document.getElementById('root')
render(
    <Provider store={store}>
        <ChatApp />
    </Provider>,
    rootElement
)


/*
setTimeout(function () {
    console.log(store.getState());
},3000)*/
