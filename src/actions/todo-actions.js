import dispatcher from '../dispatcher';
import { addTodos, removeTodos } from '../utils/todo-api-utils';

import TodoConstants from '../constants/todo-constants';

export default {
	init,
	add,
	remove,
	click,
	clickAdd,
	clickRemove
};

/* Initialize Todos */
function init ( todos ) {
	dispatch( TodoConstants.INIT, todos );
}

/* Add new Todos */
function add ( todos ) {
	dispatch( TodoConstants.ADD, todos );
}

/* Remove Todos by id */
function remove ( ids ) {
	dispatch( TodoConstants.REMOVE, ids );
}

/* Click on Todo */
function click ( todo ) {
	dispatch( TodoConstants.CLICK, todo.id );
}

function clickAdd ( todos ) {
	addTodos( todos );
}
/* Click remove on Todo */
function clickRemove ( ids ) {
	dispatch( TodoConstants.CLICK_REMOVE, ids );

	// tell the API to remove them
	removeTodos( ids );
}

function dispatch ( action, data ) {
	dispatcher.dispatch( {
		type: action,
		data
	} );
}
