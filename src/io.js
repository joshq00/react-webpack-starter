import io from 'socket.io-client';
const socket = global.socket = io();
export default socket;
