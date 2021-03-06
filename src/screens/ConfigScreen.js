import React, { useContext, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Input, Button, Divider } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

import { ConfigContext } from '../context/ConfigContext';

import Scan from '../components/Scan';

const ConfigScreen = () => {
  const [visibleScan, setVisibleScan] = useState(false);
  const { colors } = useTheme();
  const { socketIPAddress, adminKey } = useContext(ConfigContext);
  const [ config, setConfig ] = useState({socketIPAddress: null, adminKey: null})

  const handleSave = () => {
    console.log("save")
  }

  const hideScan = () => {
    setVisibleScan(false)
  }

  return(
    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
      <Input
        label="Current IP"
        disabled
        inputStyle={{color: colors.text}}
        value={socketIPAddress}
      />  
      <Input
        disabled
        label="Current Admin Key"
        inputStyle={{color: colors.text}}
        value={adminKey}
      /> 
      <Divider style={{ height: 50 }}/>
      <Input
        placeholder='IP Address'
        inputStyle={{color: colors.text}}
        value={config.socketIPAddress}
      />  
       <Input
        placeholder='Admin Key'
        inputStyle={{color: colors.text}}
        value={config.adminKey}
      /> 
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title="Save" containerStyle={{borderRadius: 10}} buttonStyle={{backgroundColor: colors.text}} onPress={handleSave} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Scann code" containerStyle={{borderRadius: 10}} buttonStyle={{backgroundColor: colors.text}} onPress={() => setVisibleScan(true)} />
        </View>
      </View>

      {visibleScan && <Scan setScanVisible={hideScan} />}
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

export default ConfigScreen;