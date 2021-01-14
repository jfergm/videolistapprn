import React from 'react';
import { View } from 'react-native';

import AddItem from '../components/AddItem';
import { SocketIOProvider } from '../context/SocketIOContext';


const AddItemScreen = ({ navigation }) => {
  return(
    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
      <SocketIOProvider>
        <AddItem />
      </SocketIOProvider>
    </View>
  );
}



export default AddItemScreen;