import React, { useContext } from 'react';
import { ListItem as ListItemElement, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native'

import { useTheme } from '@react-navigation/native';
import { SocketIOContext } from '../context/SocketIOContext';

const ListItem = ({ item, currentItem, index }) => {
  const [ socket ] = useContext(SocketIOContext);
  const { colors } = useTheme();

  const handleDelete = () => {
    console.log("delete")
    socket.emit('delete-item', { index, videoId: item.videoId});
  }

  const handleSelectItem = () => {
    socket.emit('select-item', { index, videoId: item.videoId});
  }
  
  return(
    <ListItemElement containerStyle={{backgroundColor: colors.card, borderRadius: 10}}>
      {
        currentItem && <Icon type="ionicon" name="play" color="white" />
      }
      <ListItemElement.Content>
        <TouchableOpacity onPress={handleSelectItem} disabled={currentItem}>
          <ListItemElement.Title style={{color: currentItem ? colors.text : 'white'}}>{item.title || '-'}</ListItemElement.Title>
          <ListItemElement.Subtitle style={{color: 'white'}}>{item.duration || '-'}</ListItemElement.Subtitle>
        </TouchableOpacity>
      </ListItemElement.Content>
      
      <TouchableOpacity onPress={ handleDelete }>
        {
          !currentItem &&  <Icon type="ionicon" name="close" color="" />
        }
      </TouchableOpacity>
    </ListItemElement>
  )
}

export default ListItem;