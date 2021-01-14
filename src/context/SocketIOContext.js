import React, { createContext, Component } from 'react';
import { ThemeConsumer } from 'react-native-elements';
import { connect } from '../utils/socketio';
import { ConfigContext } from './ConfigContext';

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
      socket
    });
  }

  async componentDidMount() {
    const { socketIPAddress } = this.context;
    if(socketIPAddress) {
      this.connectToServer();
    }
  }

  async componentDidUpdate() {
    const { socketIPAddress } = this.context
    if(this.state.socket) {
      if(!this.state.socket.nsp.contains(socketIPAddress)) {
        this.connectToServer();
      }
    } else {
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
        <></>
      );
    }

  }
}

export {
  SocketIOContext,
  SocketIOProvider
}
