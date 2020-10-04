import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from '@react-native-community/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

// Import Reducer
import auth from './auth'
import topic from './topic'
import comment from './comment'

const persistConfig = {
  key: 'root',
  stateReconciler: hardSet,
  storage,
}

const rootReducer = combineReducers({
  auth,
  topic,
  comment,
})

export default persistReducer(persistConfig, rootReducer);