/* listen to socket.io */
import { listen } from './io';
listen();


/* initialize todo-store */
import { init } from './actions/todo-actions';
init( global.TODOS || [] );
delete global.TODOS;


/* render application */
import React from 'react';
import App from './components/app';
export const app = React.render( <App />, document.querySelector( 'main' ) );


/* debug mode - hot reload */
if ( module.hot ) {
	require( './hot-reload' )( app );
}
