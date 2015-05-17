import dispatcher from '../dispatcher';
import Store from '../store';
import {
	INIT,
	ADD,
	REMOVE
} from '../constants/todo-constants';

class TodoStore extends Store {
	getOne ( id ) {
		return getTodo( id );
	}

	get () {
		return getAllTodos();
	}
}

const store = new TodoStore();
export default store;

export const handler = ( payload ) => {
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
};

export const token = dispatcher.register( handler );

let _todos = {};

/* getters */
function getTodo ( id ) {
	return _todos[ id ];
}
function getAllTodos () {
	return Object.keys( _todos ).map( key => _todos[ key ] );
}

/* initialize */
function init ( todos ) {
	_todos = {};

	if ( Array.isArray( todos ) ) {
		todos.forEach( addTodo );
	}
}

let i = 0;
function getNextId () {
	return i++;
}
class Todo {
	constructor ( { id, title } ) {
		if ( id == null ) {
			id = getNextId();
		}

		this.id = id;
		this.title = title;
	}
}

/* add */
function addTodos ( todos ) {
	todos.forEach( addTodo );
}
function addTodo ( todo ) {
	todo = new Todo( todo );
	_todos[ todo.id ] = todo;
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
