import React from 'react';
import { View, Text, Button } from 'react-native';

const AddItemScreen = ({ navigation }) => {
  return(
    <View>
      <Text>
        Add Item Screen
      </Text>
      <Button
        title="Go to List"
        onPress={() => navigation.navigate('List')}
      />
    </View>
  );
}

export default AddItemScreen;