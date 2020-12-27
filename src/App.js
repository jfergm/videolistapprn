import React from 'react';
import { Text } from 'react-native';

import { SocketIOProvider } from './context/SocketIOContext';

const App = () => {
  return (
    <SocketIOProvider>
      <Text>Hello World</Text>
    </SocketIOProvider>
  )
};

export default App;