import React from 'react';
import { View } from 'react-native';

import AddItem from '../components/AddItem';
import { SocketIOProvider } from '../context/SocketIOContext';


const AddItemScreen = ({ navigation }) => {
  return(
  <SocketIOProvider>
    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
        <AddItem />
    </View>
  </SocketIOProvider>

  );
}



export default AddItemScreen;