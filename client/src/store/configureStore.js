import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/index'

function configureStore(initialState = {}) {
  const createStoreWithMW = applyMiddleware(thunk)(createStore);
  const store = (window.devToolsExtension ? window.devToolsExtension()(createStoreWithMW) : createStoreWithMW)(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

const store = configureStore();
window.store = store;

export default store;
