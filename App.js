import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {AuthProvider} from './src/context/AuthContext';
import Orientation from 'react-native-orientation-locker';
const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;