import io from '../io';
import Todo from '../todo';

import { INIT, ADD, REMOVE, add, remove } from '../../src/actions/todo-actions';

// const todos = {};

// function add ( pojo ) {
// 	let todo = new Todo( pojo );
// 	todos[ todo.id ] = todo;
// 	emit( ADD, todo );
// }

// function get ( id ) {
// 	return todos[ id ];
// }
// function getAll () {
// 	return Object.keys( todos ).map( id => todos[ id ] );
// }

// function remove ( id ) {
// 	let todo = get( id );
// 	if ( !( todo instanceof Todo ) ) {
// 		return;
// 		// throw new Error( `Invalid Todo: "${id}"` );
// 	}

// 	delete todos[ id ];
// 	emit( REMOVE, id );
// }

function emit ( action, data ) {
	io.emit( action, data );
	console.log( `${ action } ${ JSON.stringify( data ) }` );
}
io.on( 'connection', socket => {
	console.log( 'connection established.' );
	// socket.emit( INIT, getAll() );
	socket.on( ADD, data => {
		let todo = new Todo( data );
		add( todo );
		emit( ADD, todo );
	} );
	socket.on( REMOVE, data => {
		remove( data );
		emit( REMOVE, data );
	} );
} );
