import React from 'react';
import TodoList from 'todo/list';
import TodoForm from 'todo/form';
import todoStore from 'stores/todo-store';

import { INIT, ADD, REMOVE, init, add, remove } from 'actions/todo-actions';
import io from 'io';
io.on( INIT, init );
io.on( ADD, add );
io.on( REMOVE, remove );

export default class MyApp extends React.Component {
	constructor ( props ) {
		super( props );
		this.state = { todos: todoStore.get() };
		this.todosChanged = this.todosChanged.bind( this );
	}

	componentDidMount () {
		todoStore.on( this.todosChanged );
	}

	componentWillUnmount () {
		todoStore.off( this.todosChanged );
	}

	todosChanged () {
		this.setState( {
			todos: todoStore.get()
		} );
	}

	render () {
		return (
		<div>
			<h1>{ this.props.title }</h1>
			<TodoForm />
			<TodoList { ...this.state } />
		</div>
		);
	}
}
MyApp.propTypes = {
	title: React.PropTypes.string
};
