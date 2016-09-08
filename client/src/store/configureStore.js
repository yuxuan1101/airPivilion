import {createStore} from 'redux';
import rootReducer from '../reducers/index';

function configureStore(initialState = {}) {
  console.log(rootReducer);
  const store = (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(rootReducer, initialState);

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
