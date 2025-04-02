import React from 'react';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

const App = () => {
  return (
    <SafeAreaProvider>
      <Text>App</Text>
    </SafeAreaProvider>
  );
};

export default App;
