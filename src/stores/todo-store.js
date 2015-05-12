import dispatcher from 'dispatcher';
import Store from 'store';
import { INIT, ADD, REMOVE } from 'actions/todo-actions';

let todos = {};

function init ( items ) {
	todos = {};
	if ( Array.isArray( items ) ) {
		items.forEach( addTodo );
	}
}
init();

function addTodo ( todo ) {
	todos[ todo.id ] = todo;
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
}

class TodoStore extends Store {
	onAction ( payload ) {
		let { type, data } = payload;

		switch ( type ) {
		case INIT:
			init( data );
			this.emit();
			break;
		case ADD:
			addTodo( data );
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

export default new TodoStore( dispatcher );
