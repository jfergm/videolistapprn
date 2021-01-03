import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import { SocketIOContext } from '../context/SocketIOContext';

import List from '../components/List';

class ListScreen extends Component {
  static contextType = SocketIOContext;
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      currentIndex: null,
      ended: true
    }
  }

  componentDidMount() {
    const [socket ] = this.context;
    socket.emit('init-queue');

    socket.on('start-queue', queue => {
      this.setState({...queue})
    })

    socket.on('queue-changed', data => {
      console.log("queuechanged", data);

      switch(data.type) {
        case 'addToList':
          this.setState({
            queue: data.payload
          })
          break;
        case 'removeFromList':
          this.setState({
            queue: data.payload
          })
          break;
        case 'currentIndex':
          this.setState({
            currentIndex: data.payload
          });
          break;
        case 'ended':
          this.setState({
            ended: data.payload
          })
          break;
        case 'currentVideoInfo':
          this.setState({
            queue: data.payload
          })
          break;
      }
    })
  }

  render() {
    return(
      <View style={{margin: 10}}>
          <List queue={this.state}></List>
      </View>
    )
  }
}

export default ListScreen;