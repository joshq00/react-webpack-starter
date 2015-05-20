import React from 'react';
import todoStore from '../stores/todo-store';
import TodoList from './todo/list';

function getTodoState () {
	let todos = todoStore.get();
	return { todos };
}
export default class App extends React.Component {
	constructor ( ...args ) {
		super( ...args );
		this._updateTodos = this._updateTodos.bind( this );
		this.state = getTodoState();
	}
	_updateTodos () {
		this.setState( getTodoState() );
	}
	componentDidMount () {
		todoStore.on( this._updateTodos );
	}
	componentWillUnmount () {
		todoStore.off( this._updateTodos );
	}
	render () {
		return <TodoList todos={ this.state.todos } />;
	}
}
