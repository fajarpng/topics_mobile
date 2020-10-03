import React, {Component} from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';

import Login from './src/screens/auth/login';
import Regis from './src/screens/auth/register';
import Profile from './src/screens/profile';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaView>
            <Profile/>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
}