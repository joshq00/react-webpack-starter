/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

/* test modules */
import { expect } from 'chai';

/* todo web api */
import {
	removeTodo, removeTodos, addTodo, addTodos
} from '../todo-api-utils';

describe( 'todo-api-utils', () => {
	it( 'calls', () => {
		removeTodo( 1 );
		addTodo( { title: 'hi' } );
	} );
} );
