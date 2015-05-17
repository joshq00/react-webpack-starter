import dispatcher from '../dispatcher';
import Store from '../store';
import { INIT, ADD, REMOVE } from '../actions/todo-actions';

class TodoStore extends Store {
	onAction ( payload ) {
		let { type, data } = payload;

		switch ( type ) {
		case INIT:
			init( data );
			// this.emit();
			break;
		case ADD:
			addTodo( data );
			this.emit();
			break;
		case 'RAW_TODOS':
			data.forEach( addTodo );
			this.emit();
			break;
		case REMOVE:
			removeTodo( data );
			this.emit();
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
let mapped = new Set();
// let cached = [];

// let _updateTo;
function init ( items ) {
	// Object.keys( todos ).forEach( key => delete todos[ key ] );
	todos = {};
	// mapped = [];
	mapped = new Set();
	// cached = [];

	if ( Array.isArray( items ) ) {
		items.forEach( addTodo );
	}
}

function addTodo ( todo ) {
	if ( !( todo.id in todos ) ) {
		// mapped.push( todo );
		todos[ todo.id ] = todo;
		mapped.add( todo );
	} else {
		// mapped[ mapped.indexOf( todos[ todo.id ] ) ] = todo;
		todos[ todo.id ].title = todo.title;
	}
}

function getTodo ( id ) {
	return todos[ id ];
}
function getAllTodos () {
	// return [ ...mapped ];
	try {
		console.time( 'getAll' );
		return Object.keys( todos ).map( key => todos[ key ] );
	} finally {
		console.timeEnd( 'getAll' );
	}
}

function removeTodo ( id ) {
	if ( id in todos ) {
		// mapped.splice( mapped.indexOf( todos[ id ] ), 1 );
		mapped.delete( todos[ id ] );
		delete todos[ id ];
	}
	return;

	// let todo = store.get( id );
	// if ( todo == null ) {
	// 	return;
	// }
	if ( id in todos ) {
		// mapped.splice( mapped.indexOf( todos[ id ] ), 1 );
		mapped.delete( todos[ id ] );
		delete todos[ id ];
	}
	// mapped.splice( mapped.indexOf( todo ), 1 );
	// mapped = mapped.filter( item => item === todo );
	// store.emit();
}
