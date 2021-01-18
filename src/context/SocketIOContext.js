import React, { createContext, Component } from 'react';
import { View } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import { connect } from '../utils/socketio';
import { ConfigContext } from './ConfigContext';

import NoConnected from '../components/NoConnected';

const SocketIOContext = createContext();

class SocketIOProvider extends Component {
  static contextType = ConfigContext;
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  async connectToServer() {
    const { socketIPAddress } = this.context;
    let socket = await connect(socketIPAddress);
    console.log(socket.connected)
    this.setState({
      socket,
      socketIPAddress
    });
  }

  async componentDidMount() {
    const { socketIPAddress } = this.context;
    if(socketIPAddress) {
      this.connectToServer();
    }
  }

  async componentDidUpdate() {
    const { socketIPAddress } = this.context;
    if(this.state.socket && this.state.socketIPAddress !== socketIPAddress) {
     this.state.socket.disconnect();
     this.connectToServer();
    } 

    if(!this.state.socket) {
      this.connectToServer();
    }
  }

  render() {
    if(this.state.socket) {
      return (
        <SocketIOContext.Provider value={[this.state.socket]}>
          { this.props.children }
        </SocketIOContext.Provider>
      );
    } else {
      return (
        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
          <NoConnected />
        </View>
      );
    }

  }
}

export {
  SocketIOContext,
  SocketIOProvider
}
