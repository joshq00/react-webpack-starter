// let io;
// if ( typeof window === 'undefined' ) {
// 	io = new require( 'events' ).EventEmitter;
// } else {
// 	io = new require( 'socket.io-client' )();
// }
// export default io;

import io from 'socket.io-client';
export default io();
// const socket = global.socket = io();
// export default socket;
