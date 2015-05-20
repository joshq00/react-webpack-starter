import dispatcher from '../dispatcher';
import Store from '../store';
import {
	INIT,
	ADD,
	REMOVE
} from '../constants/todo-constants';

class TodoStore extends Store {
	get ( id ) {
		if ( id != null ) {
			return getTodo( id );
		}
		return getAllTodos();
	}
}

const store = new TodoStore();
export default store;

store.token = dispatcher.register( payload => {
	let { type, data } = payload;

	switch ( type ) {
	case INIT:
		init( data );
		store.emit();
		break;
	case ADD:
		addTodos( data );
		store.emit();
		break;
	case REMOVE:
		removeTodos( data );
		store.emit();
		break;
	}
} );


let _todos = {};

/* getters */
function getTodo ( id ) {
	return _todos[ id ];
}
function getAllTodos () {
	return Object.keys( _todos ).map( key => _todos[ key ] );
}


let i = 0;
function getNextId () {
	return i++;
}


/* initialize */
function init ( todos ) {
	_todos = {};

	if ( Array.isArray( todos ) ) {
		todos.forEach( addTodo );
	}
}


/* add */
function addTodos ( todos ) {
	todos.forEach( addTodo );
}
function addTodo ( { id, title } ) {
	if ( id == null ) {
		id = getNextId();
	}
	_todos[ id ] = { id, title };
}


/* remove */
function removeTodos ( ids ) {
	ids.forEach( removeTodo );
}
function removeTodo ( id ) {
	if ( id in _todos ) {
		delete _todos[ id ];
	}
}
