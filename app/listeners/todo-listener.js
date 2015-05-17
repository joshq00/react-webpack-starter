import io from '../io';
import Todo from '../todo';

import {
	ADD,
	REMOVE
} from '../../src/constants/todo-constants';

import { add, remove } from '../../src/actions/todo-actions';

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
	console.log( 'emitting' );
	io.emit( action, data );
	console.log( `${ action } ${ JSON.stringify( data ) }` );
}
io.on( 'connection', socket => {
	console.log( 'connection established.' );

	socket.on( ADD, todos => {
		todos = todos.map( todo => new Todo( todo ) );
		add( todos );
		emit( ADD, todos );
	} );

	socket.on( REMOVE, ids => {
		remove( ids );
		emit( REMOVE, ids );
	} );
} );
