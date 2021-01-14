import io from 'socket.io-client';

const connect = async (socketIPAddress) => {
  return await io(socketIPAddress);
}


export {
  connect
}