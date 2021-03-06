import React, { createContext, Component } from 'react';
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
    const { socketIPAddress, setIsAdmin, adminKey } = this.context;
    let socket = await connect(socketIPAddress);
    console.log(socket.connected)
    this.setState({
      socket,
      socketIPAddress
    });

    socket.emit('check-AdminKey', adminKey)

    socket.on('adminKey-checked', isAdmin => {
      setIsAdmin(isAdmin);
    })

    socket.on('adminKey-updated', () => {
      socket.emit('check-AdminKey', adminKey)
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
   
      return (
        <SocketIOContext.Provider value={[this.state.socket]}>
          { this.props.children }
        </SocketIOContext.Provider>
      );
  }
}

export {
  SocketIOContext,
  SocketIOProvider
}
