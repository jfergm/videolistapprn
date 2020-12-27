import React from 'react';
import { Text, View, Button } from 'react-native';

const ListScreen = ({ navigation }) => {
  return(
    <View>
      <Text>List Screen</Text>
      <Button
        title="Go to Add Item"
        onPress={() => navigation.navigate('AddItem')}
      />
    </View>
  )
}

export default ListScreen;