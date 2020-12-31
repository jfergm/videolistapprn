import React, { createContext, Component } from 'react';
import { connect } from '../utils/socketio';

const SocketIOContext = createContext();

class SocketIOProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  async componentDidMount() {
    let socket = await connect();
    console.log(socket.connected)
    this.setState({
      socket
    })

  }

  render() {

    if(this.state.socket) {
      return (
        <SocketIOContext.Provider value={[this.state.socket]}>
          { this.props.children }
        </SocketIOContext.Provider>
      );
    } else {
      return (<></>)
    }

  }
}

export {
  SocketIOContext,
  SocketIOProvider
}
