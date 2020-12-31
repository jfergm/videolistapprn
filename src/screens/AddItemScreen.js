import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, TextInput, Linking } from 'react-native';
import Clipboard from '@react-native-community/clipboard';

import { SocketIOContext } from '../context/SocketIOContext';


const AddItemScreen = ({ navigation }) => {
  const [videoId, setVideoId] = useState('');
  const [socket] = useContext(SocketIOContext);

  useEffect(() => {
    socket.on('link-recieved', msg => {
      console.log(msg)
    })
  }, []);

  const handleSearch = async () => {
    const supported = await Linking.canOpenURL('vnd.youtube://');
    if (supported) {
      await Linking.openURL('vnd.youtube://');
    } else {
      await Linking.openURL('https://youtube.com')
    }
  }

  const handlePaste = async () => {
    const clipboard = await Clipboard.getString();
    const linkSplitted = clipboard.split('/')
    const videoId = linkSplitted[linkSplitted.length - 1]
    setVideoId(videoId);
  }

  const handleAdd = () => {
    console.log(videoId);
    socket.emit('send-video-id', videoId);
    //navigation.navigate('List');
  }

  return(
    <View>
      <Text>
        Add Item Screen
      </Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        value={videoId}
      />  
      <Button
        title="Paste"
        onPress={handlePaste}
      />
      <Button
        title="Search"
        onPress={handleSearch}
      />
      <Button
        title="Add"
        onPress={handleAdd}
      />
    </View>
  );
}

export default AddItemScreen;