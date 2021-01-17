import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useTheme, useNavigation } from '@react-navigation/native';

const NoConnected = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return(
  <>
    <Text style={{color: colors.textSecondary}}>No connected</Text> 
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="config" containerStyle={{borderRadius: 10}} buttonStyle={{backgroundColor: colors.text}} onPress={() => navigation.navigate("Config")} />
      </View>
    </View>
  </>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    flex: 1,
    margin: 10
  },
});

export default NoConnected;