import dispatcher from '../dispatcher';

export const INIT = 'INIT_TODOS';
export const ADD = 'ADD_TODO';
export const REMOVE = 'REMOVE_TODO';

function dispatch ( action, data ) {
	dispatcher.dispatch( {
		type: action,
		data
	} );
}

/* Initialize Todos */
export function init ( todos ) {
	dispatch( INIT, ...arguments );
}

/* Add a new Todo */
export function add ( todo ) {
	dispatch( ADD, ...arguments );
}

/* Remove a Todo */
export function remove ( id ) {
	dispatch( REMOVE, ...arguments );
}
