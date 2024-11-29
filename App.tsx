import React from 'react';
import StackNavigation from './src/navigation/Stack';
import {StatusBar} from 'react-native';
import {AuthProvider} from './src/context/AuthContext';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <StackNavigation />
      </Provider>
    </AuthProvider>
  );
};

export default App;
