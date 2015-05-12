import React from 'react';
import Item from './item';

export default class TodoList extends React.Component {
	render () {
		let Todo = ( todo, i ) =>
			<Item key={ todo.id } todo={ todo } />;

		return (
		<div className='todo-list'>
			{ this.props.todos.map( Todo ) }
		</div>
		);
	}
}

TodoList.propTypes = {
	todos: React.PropTypes.array.isRequired
};
