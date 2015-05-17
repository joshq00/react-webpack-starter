import React from 'react';

import TodoList from './todo/list';
import todoStore from './stores/todo-store';
import * as TodoActions from './actions/todo-actions';
import {
	getAllTodos
} from './utils/todo-api-utils';
import { listen } from './io';

global.process = process;
global.store = todoStore;
global.actions = TodoActions;

export function render () {
	let renderer = process.browser ? browser : server;
	return renderer();
}

const factory = React.createFactory( TodoList );
function server () {
	let cmpnt = factory( {
		todos: todoStore.get()
	} );
	return React.renderToString( cmpnt );
}

function browser () {
	let cmpnt = <TodoList todos={ todoStore.get() } />;
	let el = document.querySelector( 'main' );
	React.render( cmpnt, el );
}

if ( process.browser ) {
	getAllTodos();
	listen();
	todoStore.on( render );
} else {
	// let todos = [];
	for ( let i = 0; i < 1000; i++ ) {
		// todos.push( { title: 'josh' } );
		TodoActions.add( [ { title: 'josh' } ] );
	}
	// TodoActions.init( todos );
}
