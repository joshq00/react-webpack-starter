import io from 'socket.io-client';
import TodoConstants from '../constants/todo-constants';


/**
 * Remove todo
 * @param  {number} id - id of the todos to remove
 */
export function removeTodo ( id ) {
	removeTodos( [ id ] );
}
/**
 * Remove todo(s)
 * @param  {number[]} ids - ids of the todos to remove
 */
export function removeTodos ( ids ) {
	io().emit( TodoConstants.REMOVE, ids );
}


/**
 * Add todo
 * @param {Object} todo
 */
export function addTodo ( todo ) {
	addTodos( [ todo ] );
}
/**
 * Add todo(s)
 * @param  {Object[]} todos
 */
export function addTodos ( todos ) {
	io().emit( TodoConstants.ADD, todos );
}
