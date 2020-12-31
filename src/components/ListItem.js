import React from 'react';
import { View, Text } from 'react-native';

const ListItem = ({item, currentIndex, index, ended}) => {
  return (
    <View>
      <Text>{ (!ended && (currentIndex === index)) ? '>' : (index + 1)} { item.title ? item.title : 'item' }</Text>
      <Text>{ item.duration ? item.duration : 'duration' }</Text>
    </View>
  );
}

export default ListItem;