import { app, config } from './app';
config( app );

import { server } from './app';
import listenToTodo from './app/todo-listener';
server.listen( process.env.VCAP_APP_PORT || process.env.PORT || 3000 );

import { io } from './app';
io.on( 'connection', socket => {
	console.log( 'websocket connected.' );
	listenToTodo( socket );
	// socket.on( 'REMOVE_TODOS', data => io.emit( 'REMOVE_TODOS', data ) );
	// socket.on( 'REMOVE_TODOS', data => io.emit( 'REMOVE_TODOS', data ) );
} );
