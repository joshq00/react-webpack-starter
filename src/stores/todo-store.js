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
// let mapped = [];
// let _updateTo;
function init ( items ) {
	// Object.keys( todos ).forEach( key => delete todos[ key ] );
	todos = {};
	if ( Array.isArray( items ) ) {
		items.forEach( addTodo );
	}
}
init();

function addTodo ( todo ) {
	todos[ todo.id ] = todo;
	remapAsync();
}

function getTodo ( id ) {
	return todos[ id ];
}
function getAllTodos () {
	return Object.keys( todos ).map( id => todos[ id ] );
}

function removeTodo ( id ) {
	if ( getTodo( id ) == null ) {
		return;
	}
	delete todos[ id ];
	remapAsync();
}
function remap () {
	store.emit();
}
function remapAsync () {
	remap();
	// clearTimeout( _updateTo );
	// _updateTo = setTimeout( remap, 100 );
}
