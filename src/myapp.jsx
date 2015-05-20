import React from 'react';
import Modifier from 'todo/modify';
import TodoList from 'todo/list';
import TodoForm from 'todo/form';
import todoStore from 'stores/todo-store';

global.React = React;
global.store = todoStore;

// import { INIT, ADD, REMOVE, init, add, remove } from 'actions/todo-actions';
// import io from 'io';
// io.on( INIT, init );
// io.on( ADD, add );
// io.on( REMOVE, remove );

export default class MyApp extends React.Component {
	constructor ( props ) {
		super( props );
		this.state = { todos: todoStore.get() };
		this.todosChanged = this.todosChanged.bind( this );
		this.updateTodos = this.updateTodos.bind( this );
	}

	componentDidMount () {
		// todoStore.on( this.todosChanged );
	}

	componentWillUnmount () {
		todoStore.off( this.todosChanged );
	}
	updateTodos () {
/*
		let todos = [ ...todoStore.get() ];
		todos.reverse();
*/
		let todos = todoStore.get();
		this.setState( {
			todos
		} );
		console.log( 'updating' );
	}
	todosChanged () {
		clearTimeout( this._TO );
		this._TO = setTimeout( this.updateTodos, 500 );
		// this.updateTodos();
	}

	render () {
		return (
		<div>
			<h1>{ this.props.title }</h1>
			<Modifier />
			<TodoForm />
			<TodoList { ...this.state } />
		</div>
		);
	}
}
MyApp.propTypes = {
	title: React.PropTypes.string
};
