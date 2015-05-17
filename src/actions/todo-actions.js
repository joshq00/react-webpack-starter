import dispatcher from '../dispatcher';
import {
	INIT,
	ADD,
	REMOVE,
	CLICK_REMOVE
} from '../constants/todo-constants';

function dispatch ( action, data ) {
	dispatcher.dispatch( {
		type: action,
		data
	} );
}

/* Initialize Todos */
export function init ( todos ) {
	dispatch( INIT, todos );
}

/* Add new Todos */
export function add ( todos ) {
	dispatch( ADD, todos );
}

/* Remove Todos by id */
export function remove ( ids ) {
	dispatch( REMOVE, ids );
}

/* Click remove on Todo */
export function clickRemove ( todo ) {
	dispatch( CLICK_REMOVE, todo );
}
