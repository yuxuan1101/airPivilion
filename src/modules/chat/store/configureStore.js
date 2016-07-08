import { createStore } from 'redux';
import chatReducer from '../reducers';

export default function configureStore(initialState) {
    const store = (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(chatReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

export const store = configureStore();
