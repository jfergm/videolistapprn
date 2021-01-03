import React from 'react';
import { FlatList } from 'react-native';
import { Divider } from 'react-native-elements';

import ListItem from './ListItem';

const List = ({ queue }) => {

  const renderItem = ({ item, index }) => {
    return <ListItem item={item} currentItem={queue.currentIndex === index} index={index}></ListItem>
  }

  return(
    <FlatList
      data={ queue.queue }
      renderItem={ renderItem }
      keyExtractor={ (item, index ) => `${index}` }
      ItemSeparatorComponent={ () => <Divider style={{ backgroundColor: 'transparent', height: 2 }}/>}
    ></FlatList>  
  )
}

export default List;