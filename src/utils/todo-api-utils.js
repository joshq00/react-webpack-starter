import io from 'socket.io-client';
import TodoConstants from '../constants/todo-constants';

export default {
	removeTodo,
	removeTodos,
	addTodo,
	addTodos
};

/**
 * Remove todo
 * @param  {number} id - id of the todos to remove
 */
function removeTodo ( id ) {
	removeTodos( [ id ] );
}
/**
 * Remove todo(s)
 * @param  {number[]} ids - ids of the todos to remove
 */
function removeTodos ( ids ) {
	io().emit( TodoConstants.REMOVE, ids );
}


/**
 * Add todo
 * @param {Object} todo
 */
function addTodo ( todo ) {
	addTodos( [ todo ] );
}
/**
 * Add todo(s)
 * @param  {Object[]} todos
 */
function addTodos ( todos ) {
	io().emit( TodoConstants.ADD, todos );
}
