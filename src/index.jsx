import './style/main.less';
import React from 'react';


import dispatcher from './dispatcher';
import TodoList from './todo/list';
import todoStore from './stores/todo-store';
import { ADD, REMOVE, init, add, remove } from './actions/todo-actions';

init( global.ALL_TODOS || [] );
delete global.ALL_TODOS;

function render () {
	console.log( 'rendering' );
	React.render( <TodoList todos={ todoStore.get() } />, document.querySelector( 'main' ) );
}
let asyncRender = ( () => {
	let _TO;
	return () => {
		clearTimeout( _TO );
		_TO = setTimeout( render, 50 );
	};
} )();
todoStore.on( asyncRender );
render();

import Modify from './todo/modify';
React.render( <Modify />, document.querySelector( 'div.two' ) );
import Form from './todo/form';
React.render( <Form />, document.querySelector( 'div.three' ) );

// import MyApp from './myapp';
// React.render( <MyApp title='My App' />, document.querySelector( 'div.two' ) );

import io from './io';
global.io = io;

io.on( ADD, add );
io.on( REMOVE, remove );

dispatcher.register( ( { type, data } ) => {
	switch ( type ) {
	case 'CLICK_REMOVE_TODO':
		io.emit( 'REMOVE_TODO', data );
		break;
	case 'CLICK_ADD_TODO':
		io.emit( 'ADD_TODO', data );
		break;
	}
} );
// import Blah from './blah';
// React.render( <Blah title='hi' />, document.querySelector( 'main' ) );
