import React from 'react';
import { View, Text } from 'react-native';

const ListItem = ({ item, currentItem }) => {

  return(
    <View>
      <View>
        <Text>{ item.title ? item.title : '-' }</Text>
        <Text>{ item.duration ? item.duration : '-' }</Text>
      </View>
      <View>
      </View>
    </View>
  )
}


export default ListItem;