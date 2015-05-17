import TodoConstants from '../constants/todo-constants';
import { init } from '../actions/todo-actions';
import dispatcher from '../dispatcher';
import io from '../io';

export function getAllTodos () {
	let rq = new XMLHttpRequest();
	rq.open( 'GET', '/todos.json' );
	rq.onload = () => {
		let todos = JSON.parse( rq.response );
		init( todos );
	};
	rq.send();
}
export function removeTodo ( id ) {
	removeTodos( [ id ] );
}
export function removeTodos ( ids ) {
	io().emit( TodoConstants.REMOVE, ids );
}
dispatcher.register( payload => {
	let { type, data } = payload;
	if ( type === TodoConstants.CLICK_REMOVE ) {
		removeTodo( data.id );
	}
} );
