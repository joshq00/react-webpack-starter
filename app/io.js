import socketio from 'socket.io';
import server from './server';

const io = socketio( server );

export default io;
