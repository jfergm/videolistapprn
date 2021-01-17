import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import { SocketIOProvider } from '../context/SocketIOContext';

import List from '../components/List';

class ListScreen extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return(
      <SocketIOProvider>
        <View style={{margin: 10}}>
            <List></List>
        </View>
      </SocketIOProvider>
    )
  }
}

export default ListScreen;