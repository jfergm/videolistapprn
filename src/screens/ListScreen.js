import React from 'react';

import { SocketIOProvider } from '../context/SocketIOContext';

import List from '../components/List';
import { useNavigation, useTheme } from '@react-navigation/native';

const ListScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return(
    <SocketIOProvider>
      <List colors={colors} navigation={navigation}></List>
    </SocketIOProvider>
  )
}

export default ListScreen;