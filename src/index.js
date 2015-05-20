import React from 'react';

import App from './components/app';

export function render () {
	return React.renderToString( <App /> );
}

import { add as addTodo } from './actions/todo-actions';
for ( let i = 1; i <= 1000; i++ ) {
	addTodo( [ { title: `Todo #${i}` } ] );
}
