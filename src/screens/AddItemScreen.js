import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, Linking, Text, StyleSheet } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { Button, Input, Icon } from 'react-native-elements';
 
import { SocketIOContext } from '../context/SocketIOContext';
import { useTheme } from '@react-navigation/native';


const AddItemScreen = ({ navigation }) => {
  const [videoId, setVideoId] = useState('');
  const [socket] = useContext(SocketIOContext);
  const { colors } = useTheme();


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
    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
      <Input
        inputStyle={{color: colors.text}}
        value={videoId}
        disabled
        rightIcon={
          <TouchableOpacity onPress={handlePaste}>
            <Icon type="ionicon" name="clipboard" color={colors.text} />       
          </TouchableOpacity>
        }
      />  
  <View style={styles.container}>
     <View style={styles.buttonContainer}>
      <Button title="Search" containerStyle={{borderRadius: 10}} buttonStyle={{backgroundColor: colors.text}} onPress={handleSearch} />
    </View>
    <View style={styles.buttonContainer}>
      <Button title="Add" containerStyle={{borderRadius: 10}} buttonStyle={{backgroundColor: colors.text}} onPress={handleAdd} />
    </View>
  </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    margin: 10
  },
});

export default AddItemScreen;