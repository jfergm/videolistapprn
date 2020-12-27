import io from 'socket.io-client';

const connect = async () => {
  return await io('http://10.0.2.2:4000');
}


export {
  connect
}