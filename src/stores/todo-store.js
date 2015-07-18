import dispatcher from '../dispatcher';
import Store from '../store';
import TodoConstants from '../constants/todo-constants';

export default class Todo {
	constructor ( { id, title } ) {
		if ( id == null ) {
			id = getNextId();
		}

		this.id = id;
		this.title = title;
	}
}

class TodoStore extends Store {
	getMap () {
		return getMap();
	}
	get ( id ) {
		if ( id != null ) {
			return getTodo( id );
		}
		return getAllTodos();
	}
	get size () {
		return getMap().size;
	}
}

const store = new TodoStore();
export default store;

store.token = dispatcher.register( payload => {
	let { type, data } = payload;

	switch ( type ) {
	case TodoConstants.INIT:
		init( data );
		store.emit();
		break;
	case TodoConstants.ADD:
		addTodos( data );
		store.emit();
		break;
	case TodoConstants.REMOVE:
		removeTodos( data );
		store.emit();
		break;
	}
} );


let _todos = new Map();
init();

/* getters */
function getTodo ( id ) {
	return _todos.get( id );
}

function getAllTodos () {
	return [ ..._todos.values() ];
}
function getMap () {
	return _todos;
}

/* initialize */
function init ( todos ) {
	_todos.clear();
	// _todoset = new Set();
	if ( Array.isArray( todos ) ) {
		todos.forEach( addTodo );
	}
}

let max = Number.MAX_SAFE_INTEGER - 1;
let lastId = 0;
function getNextId () {
	lastId = ( lastId % max ) + 1;
	return lastId;
}

/* add */
function addTodos ( todos ) {
	todos.forEach( addTodo );
}
function addTodo ( todo ) {
	if ( todo.id == null ) {
		todo.id = getNextId();
	}
	_todos.set( todo.id, Object.freeze( todo ) );
}

/* remove */
function removeTodos ( ids ) {
	ids.forEach( removeTodo );
}
function removeTodo ( id ) {
	_todos.delete( id );
}
