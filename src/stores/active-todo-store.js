import dispatcher from '../dispatcher';
import Store from '../store';
import todoStore from './todo-store';
import TodoConstants from '../constants/todo-constants';

let activeTodo = null;
class ActiveTodoStore extends Store {
	get () {
		return getActive();
	}
}

const store = new ActiveTodoStore();
export default store;

store.token = dispatcher.register( payload => {
	let { type } = payload;

	switch ( type ) {
	case TodoConstants.INIT:
	case TodoConstants.REMOVE:
		handleRemove();
		break;
	// case TodoConstants.ADD:
	// 	handleAdd( payload.data );
	// 	break;
	case TodoConstants.CLICK:
		let { data: id } = payload;
		handleClick( id );
		break;
	}
} );
// function handleAdd ( todos ) {
// 	if ( todos.map( todo => todo.id ).some( id => id === activeTodo ) ) {
// 		clear();
// 	}
// }
function getActive () {
	if ( activeTodo != null ) {
		return todoStore.get( activeTodo );
	}
	return null;
}

function clear () {
	activeTodo = null;
	store.emit();
}

function handleClick ( id ) {
	activeTodo = id;
	store.emit();
}

function handleRemove () {
	if ( activeTodo == null ) {
		return;
	}
	dispatcher.waitFor( [ todoStore.token ] );
	if ( getActive() == null ) {
		clear();
	}
}
