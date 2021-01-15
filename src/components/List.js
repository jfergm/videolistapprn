import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
import { SocketIOContext } from '../context/SocketIOContext';

import ListItem from './ListItem';

class List extends Component {
  static contextType = SocketIOContext;
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      currentIndex: null,
      ended: true
    }
  }

  renderItem({ item, index }) {
    console.log("renderitem", this.state, item, index)
    return <ListItem item={item} currentItem={this.state.currentIndex === index} index={index}></ListItem>
  }


  componentDidMount() {
    const [ socket ] = this.context;
    socket.emit('init-queue');
    socket.on('start-queue', queue => {
      console.log(queue)
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
    });
  }

  render() {
    return (
      <FlatList
        data={ this.state.queue }
        renderItem={ this.renderItem.bind(this) }
        keyExtractor={ (item, index ) => `${index}` }
        ItemSeparatorComponent={ () => <Divider style={{ backgroundColor: 'transparent', height: 2 }}/>}
      ></FlatList>  
    )
  }
}

export default List;