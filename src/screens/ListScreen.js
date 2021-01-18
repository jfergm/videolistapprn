import React, { useContext } from 'react';
import  { View } from 'react-native';
import { SocketIOContext } from '../context/SocketIOContext';

import List from '../components/List';
import NoConnected from '../components/NoConnected';
import { useNavigation, useTheme } from '@react-navigation/native';

const ListScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [socket] = useContext(SocketIOContext);

  if(socket) {
    return(
      <List colors={colors} navigation={navigation}></List>
    )
  } else {
    return(
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
        <NoConnected />
      </View>
    )
  }
}

export default ListScreen;