import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/index'

function configureStore(initialState = {}) {
  const middleware = window.devToolsExtension ?
    compose(applyMiddleware(thunk),window.devToolsExtension()) :
    compose(applyMiddleware(thunk));

  const store = createStore(rootReducer, middleware);

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
