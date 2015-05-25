import { io } from './';
// import Todo from './todo';
import TodoStore from '../src/stores/todo-store';
import {
	ADD,
	REMOVE
} from '../src/constants/todo-constants';

import { add, remove } from '../src/actions/todo-actions';

function emit ( action, data ) {
	io.emit( action, data );
	console.log( `emitted %s : %d`,
		action,
		// Array.isArray( data ) ? data.length : data,
		TodoStore.size
	);
	// console.log( `${ action } ${ JSON.stringify( data ) }` );
}

export default function listen ( socket ) {
	socket.on( ADD, todos => {
		add( todos );
		emit( ADD, todos );
	} );

	socket.on( REMOVE, ids => {
		remove( ids );
		emit( REMOVE, ids );
	} );
}
