import React from 'react';
import { FlatList } from 'react-native';

import ListItem from './ListItem';

/*const List = ({ queue }) => {
  return(
    <ListBase>
      {
        queue.queue.map( (item, index) => {
          return (<ListItem key={index} item={item} currentIndex={queue.currentIndex} index={index} ended={queue.ended}></ListItem>)
        })
      }
    </ListBase>
  );
}*/

const List = ({ queue }) => {

  const renderItem = ({ item, index }) => {
    return <ListItem item={item} currentItem={queue.currentIndex === index}></ListItem>
  }

  return(
    <FlatList
      data={ queue.queue }
      renderItem={ renderItem }
      keyExtractor={ (item, index ) => `${index}` }
    ></FlatList>  
  )
}

export default List;