import dispatcher from 'dispatcher';
import Store from 'store';
import { INIT, ADD, REMOVE } from 'actions/todo-actions';

class TodoStore extends Store {
	onAction ( payload ) {
		let { type, data } = payload;

		switch ( type ) {
		case INIT:
			init( data );
			break;
		case ADD:
			addTodo( data );
			break;
		case REMOVE:
			removeTodo( data );
			break;
		}
	}

	get ( id ) {
		if ( id == null ) {
			return getAllTodos();
		}
		return getTodo( id );
	}
}
let store = new TodoStore( dispatcher );
export default store;


let todos = {};
let mapped = [];

// let _updateTo;
function init ( items ) {
	// Object.keys( todos ).forEach( key => delete todos[ key ] );
	todos = {};
	mapped = [];
	if ( Array.isArray( items ) ) {
		items.forEach( addTodo );
	}
}
init();

function addTodo ( todo ) {
	if ( !( todo.id in todos ) ) {
		mapped.push( todo );
	} else {
		mapped[ mapped.indexOf( todos[ todo.id ] ) ] = todo;
	}
	todos[ todo.id ] = todo;
	store.emit();
}

function getTodo ( id ) {
	return todos[ id ];
}
function getAllTodos () {
	return mapped;
}

function removeTodo ( id ) {
	let todo = store.get( id );
	if ( todo == null ) {
		return;
	}
	delete todos[ id ];
	mapped.splice( mapped.indexOf( todo ), 1 );
	store.emit();
}
