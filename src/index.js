import todoStore from './stores/todo-store';
import { add as addTodos } from './actions/todo-actions';

let todos = [];
function addEm () {
	if ( todos.length ) {
		addTodos( todos );
	}
	todos = [];
}
for ( let i = 1; i <= 5000; i++ ) {
	todos.push( { title: `Todo #${i}` } );
	if ( i % 5000 === 0 ) {
		addEm();
	}
}
addEm();

console.log( 'Initialized: %d todos', todoStore.get().length );

export function render () {
	return 'Loading...';
}
