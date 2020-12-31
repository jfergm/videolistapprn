import React from 'react';
import { FlatList } from 'react-native';

import ListItem from './ListItem';

const List = ({ queue }) => {
  return(
    <>
      {
        queue.queue.map( (item, index) => {
          return (<ListItem key={index} item={item} currentIndex={queue.currentIndex} index={index} ended={queue.ended}></ListItem>)
        })
      }
    </>
  );
}

export default List;