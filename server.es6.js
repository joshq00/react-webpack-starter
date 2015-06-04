import { server } from './app';
server.listen( process.env.VCAP_APP_PORT || process.env.PORT || 3000 );

import { app, config } from './app';
config( app );

import listenToTodo from './app/todo-listener';

import { io } from './app';
io.on( 'connection', socket => {
	console.log( 'websocket connected.' );
	listenToTodo( socket );
	// socket.on( 'REMOVE_TODOS', data => io.emit( 'REMOVE_TODOS', data ) );
	// socket.on( 'REMOVE_TODOS', data => io.emit( 'REMOVE_TODOS', data ) );
} );
