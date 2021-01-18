import React, { useContext } from 'react';
import { View } from 'react-native';

import AddItem from '../components/AddItem';
import NoConnected from '../components/NoConnected';
import { SocketIOContext } from '../context/SocketIOContext';


const AddItemScreen = ({ navigation }) => {
  const [socket] = useContext(SocketIOContext);

  if(socket) {
    return(
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
          <AddItem />
      </View>
    );
  } else {
    return(
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
        <NoConnected />
      </View>
    )
  }

}



export default AddItemScreen;