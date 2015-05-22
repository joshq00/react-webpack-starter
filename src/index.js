import todoStore from './stores/todo-store';
import { add as addTodo } from './actions/todo-actions';
for ( let i = 1; i <= 1000; i++ ) {
	addTodo( [ { title: `Todo #${i}` } ] );
}

console.log( 'Initialized: %d todos', todoStore.get().length );

export function render () {
	return 'Loading...';
}
