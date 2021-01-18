import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { Divider, Button } from 'react-native-elements';
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
    return <ListItem item={item} currentItem={this.state.currentIndex === index} index={index}></ListItem>
  }


  componentDidMount() {
    const [ socket ] = this.context;
    socket.emit('init-queue');
    socket.on('start-queue', queue => {
      this.setState({...queue})
    })
    socket.on('queue-changed', data => {
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
    if(this.state.queue.length > 0) {
      return (
        <View style={{margin: 10}}>
          <FlatList
            data={ this.state.queue }
            renderItem={ this.renderItem.bind(this) }
            keyExtractor={ (item, index ) => `${index}` }
            ItemSeparatorComponent={ () => <Divider style={{ backgroundColor: 'transparent', height: 2 }}/>}
          ></FlatList>  
        </View>
      )
    } else {
      return(
        <View style={{flex: 1,justifyContent: "center", alignItems:"center", direction:"row"}}>
          <Text style={{color: this.props.colors.textSecondary}}>No items</Text> 
          <View style={styles.container}>
            <View style={styles.buttonContainer}>
              <Button title="add" containerStyle={{borderRadius: 10}} buttonStyle={{backgroundColor: this.props.colors.active}} onPress={() => this.props.navigation.navigate("Add")} />
            </View>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    flex: 1,
    margin: 10
  },
});
export default List;