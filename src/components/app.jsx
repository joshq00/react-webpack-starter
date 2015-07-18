import React from 'react';
import todoStore from '../stores/todo-store';
import activeTodoStore from '../stores/active-todo-store';
import TodoList from './todo/list';
import TodoForm from './todo/form';

function getTodoState () {
	let todos = todoStore.getMap();
	let active = activeTodoStore.get();
	return { todos, active };
}

export default class App extends React.Component {
	constructor ( ...args ) {
		super( ...args );
		this._updateTodos = this._updateTodos.bind( this );
		this.state = getTodoState();
		this.filesDone = this.filesDone.bind( this );
	}
	_updateTodos () {
		this.setState( getTodoState() );
	}
	componentDidMount () {
		todoStore.on( this._updateTodos );
		activeTodoStore.on( this._updateTodos );
	}
	componentWillUnmount () {
		todoStore.off( this._updateTodos );
		activeTodoStore.off( this._updateTodos );
	}
	filesDone ( e ) {
		let dn = React.findDOMNode( this.refs.file );
		let { files } = dn;
		files = [].slice.call( files, 0 );
		this.setState( {
			files
		} );
	}

	render () {
		// console.count( 'render' );
		let { active } = this.state;
		active = active || {};

		return (
		<div>
			{<TodoForm todo={ active } />}
			<div>{ this.state.todos.size/*length*/ }</div>
			<TodoList limit={50} todos={ this.state.todos } />
		</div>
		);
	}
}
