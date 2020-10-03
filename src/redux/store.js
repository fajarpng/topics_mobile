import {createStore, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { persistStore } from 'redux-persist';

import rootReducer from './reducers'

const middleware = applyMiddleware(promiseMiddleware)
const store = createStore(rootReducer, middleware);
const persistor = persistStore(store);

export { persistor, store };