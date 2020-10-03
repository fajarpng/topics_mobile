import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from '@react-native-community/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

// Import Reducer
import auth from './auth'

const persistConfig = {
  key: 'root',
  stateReconciler: hardSet,
  storage,
}

const rootReducer = combineReducers({
  auth,
})

export default persistReducer(persistConfig, rootReducer);