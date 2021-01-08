import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Overlay, Button} from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { ConfigContext } from '../context/ConfigContext';
import { set } from 'react-native-reanimated';

const Scan = ( { setScanVisible }) => {
  const {colors} = useTheme();
  const { setConfig } = useContext(ConfigContext);

  const toggleOverlay = ( ) => {
    setScanVisible(false);
  };

  useEffect(() =>{
    console.log("mount")
    return () =>{
      console.log("unmount")
    }
  }, []);
  const onSuccess = e => {
    const data = e.data;
    try {
      const config = JSON.parse(data);
      setConfig({...config})
    } catch(e) {

    }
    setScanVisible(false)
  }
  return(
    <Overlay isVisible={true} onBackdropPress={toggleOverlay}>
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
        <QRCodeScanner
          onRead={onSuccess}
          bottomContent={
            <TouchableOpacity>
              <Text>OK. Got it!</Text>
            </TouchableOpacity>
          }
        />
      </View>
      <Button title="Close camera" containerStyle={{borderRadius: 10}} buttonStyle={{backgroundColor: colors.text}} onPress={ () => setScanVisible(false)} />
    </Overlay>
    
  )
}

export default Scan;